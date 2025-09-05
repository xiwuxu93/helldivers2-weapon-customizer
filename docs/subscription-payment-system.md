# 订阅计划和支付流程设计

## 1. 订阅计划设计

### 1.1 计划层级结构
```typescript
interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  
  // 价格信息
  price: number;
  currency: string;
  billingCycle: 'monthly' | 'yearly' | 'lifetime';
  
  // 功能限制
  monthlyCredits: number;        // 每月积分配额
  maxFileSize: number;           // 最大文件大小(MB)
  maxConcurrentJobs: number;     // 最大并发任务数
  priorityProcessing: boolean;   // 优先处理
  apiAccess: boolean;           // API访问权限
  
  // 额外权益
  features: string[];           // 特殊功能列表
  supportLevel: 'community' | 'email' | 'priority' | 'dedicated';
  
  // 状态
  active: boolean;
  featured: boolean;
  sortOrder: number;
}
```

### 1.2 具体计划配置
```json
{
  "plans": [
    {
      "name": "Free",
      "description": "Perfect for trying out our AI tools",
      "price": 0,
      "billingCycle": "monthly",
      "monthlyCredits": 100,
      "maxFileSize": 5,
      "maxConcurrentJobs": 1,
      "priorityProcessing": false,
      "apiAccess": false,
      "features": ["Basic tools", "Community support"],
      "supportLevel": "community"
    },
    {
      "name": "Pro",
      "description": "Great for individuals and small teams",
      "price": 9.99,
      "billingCycle": "monthly",
      "monthlyCredits": 1000,
      "maxFileSize": 50,
      "maxConcurrentJobs": 3,
      "priorityProcessing": true,
      "apiAccess": true,
      "features": ["All tools", "Priority processing", "API access", "Email support"],
      "supportLevel": "email"
    },
    {
      "name": "Premium",
      "description": "Perfect for growing businesses",
      "price": 29.99,
      "billingCycle": "monthly",
      "monthlyCredits": 5000,
      "maxFileSize": 200,
      "maxConcurrentJobs": 10,
      "priorityProcessing": true,
      "apiAccess": true,
      "features": ["Unlimited tools", "Priority support", "Advanced features", "Team collaboration"],
      "supportLevel": "priority"
    },
    {
      "name": "Enterprise",
      "description": "Custom solution for large organizations",
      "price": 99.99,
      "billingCycle": "monthly",
      "monthlyCredits": 20000,
      "maxFileSize": 1000,
      "maxConcurrentJobs": 50,
      "priorityProcessing": true,
      "apiAccess": true,
      "features": ["White-label solution", "Dedicated support", "Custom integrations", "SLA guarantee"],
      "supportLevel": "dedicated"
    }
  ]
}
```

## 2. 支付流程设计

### 2.1 支付流程状态机
```
[用户选择计划] -> [创建订单] -> [支付处理] -> [订阅激活]
                      ↓
                [支付验证] -> [失败处理] / [成功处理]
                      ↓
                [Webhook处理] -> [订阅状态更新]
```

### 2.2 Stripe集成流程
```typescript
// 1. 创建Stripe客户
const createStripeCustomer = async (user: User): Promise<string> => {
  const customer = await stripe.customers.create({
    email: user.email,
    name: user.fullName,
    metadata: {
      userId: user.id
    }
  });
  
  // 保存Stripe客户ID到用户记录
  await updateUser(user.id, { stripeCustomerId: customer.id });
  
  return customer.id;
};

// 2. 创建订阅
const createSubscription = async (userId: string, planId: string, paymentMethodId: string) => {
  const user = await getUser(userId);
  const plan = await getSubscriptionPlan(planId);
  
  let customerId = user.stripeCustomerId;
  if (!customerId) {
    customerId = await createStripeCustomer(user);
  }
  
  // 创建Stripe价格对象（如果不存在）
  let stripePriceId = plan.stripePriceId;
  if (!stripePriceId) {
    const price = await stripe.prices.create({
      currency: plan.currency.toLowerCase(),
      unit_amount: Math.round(plan.price * 100), // 转换为分
      recurring: { interval: plan.billingCycle === 'yearly' ? 'year' : 'month' },
      product_data: {
        name: plan.name,
        description: plan.description
      }
    });
    stripePriceId = price.id;
    await updateSubscriptionPlan(planId, { stripePriceId });
  }
  
  // 创建订阅
  const subscription = await stripe.subscriptions.create({
    customer: customerId,
    items: [{ price: stripePriceId }],
    default_payment_method: paymentMethodId,
    payment_behavior: 'default_incomplete',
    expand: ['latest_invoice.payment_intent']
  });
  
  // 保存订阅信息到数据库
  await createUserSubscription({
    userId,
    planId,
    stripeSubscriptionId: subscription.id,
    status: subscription.status,
    currentPeriodStart: new Date(subscription.current_period_start * 1000),
    currentPeriodEnd: new Date(subscription.current_period_end * 1000)
  });
  
  return subscription;
};
```

### 2.3 支付确认流程
```typescript
// Stripe Webhook处理
const handleStripeWebhook = async (event: Stripe.Event) => {
  switch (event.type) {
    case 'customer.subscription.created':
    case 'customer.subscription.updated':
      await handleSubscriptionUpdated(event.data.object as Stripe.Subscription);
      break;
      
    case 'customer.subscription.deleted':
      await handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
      break;
      
    case 'invoice.payment_succeeded':
      await handlePaymentSucceeded(event.data.object as Stripe.Invoice);
      break;
      
    case 'invoice.payment_failed':
      await handlePaymentFailed(event.data.object as Stripe.Invoice);
      break;
  }
};

const handlePaymentSucceeded = async (invoice: Stripe.Invoice) => {
  const subscription = await db.userSubscriptions.findFirst({
    where: { stripeSubscriptionId: invoice.subscription as string },
    include: { plan: true, user: true }
  });
  
  if (!subscription) return;
  
  // 1. 更新订阅状态
  await updateUserSubscription(subscription.id, {
    status: 'active',
    currentPeriodStart: new Date(invoice.period_start * 1000),
    currentPeriodEnd: new Date(invoice.period_end * 1000)
  });
  
  // 2. 充值月度积分
  await addCredits(
    subscription.userId, 
    subscription.plan.monthlyCredits, 
    'subscription', 
    subscription.id
  );
  
  // 3. 记录支付
  await createPayment({
    userId: subscription.userId,
    amount: invoice.amount_paid / 100,
    currency: invoice.currency,
    status: 'completed',
    paymentMethod: 'stripe',
    paymentProviderId: invoice.id,
    productType: 'subscription',
    productId: subscription.planId
  });
  
  // 4. 发送确认邮件
  await sendSubscriptionConfirmationEmail(subscription.user, subscription.plan);
};
```

## 3. 订阅生命周期管理

### 3.1 订阅状态转换
```typescript
type SubscriptionStatus = 'pending' | 'active' | 'past_due' | 'canceled' | 'expired';

const subscriptionStatusMap = {
  'incomplete': 'pending',
  'incomplete_expired': 'expired',
  'trialing': 'active',
  'active': 'active',
  'past_due': 'past_due',
  'canceled': 'canceled',
  'unpaid': 'expired'
};

const updateSubscriptionStatus = async (subscriptionId: string, stripeStatus: string) => {
  const newStatus = subscriptionStatusMap[stripeStatus] || 'expired';
  
  await db.userSubscriptions.update({
    where: { stripeSubscriptionId: subscriptionId },
    data: { 
      status: newStatus,
      updatedAt: new Date()
    }
  });
  
  // 如果订阅被取消或过期，停止服务
  if (['canceled', 'expired'].includes(newStatus)) {
    await handleSubscriptionTermination(subscriptionId);
  }
};
```

### 3.2 订阅升级/降级
```typescript
const changeSubscription = async (userId: string, newPlanId: string, prorated: boolean = true) => {
  const currentSubscription = await getCurrentSubscription(userId);
  if (!currentSubscription) {
    throw new Error('No active subscription found');
  }
  
  const newPlan = await getSubscriptionPlan(newPlanId);
  const stripeSubscription = await stripe.subscriptions.retrieve(currentSubscription.stripeSubscriptionId);
  
  // 更新Stripe订阅
  const updatedSubscription = await stripe.subscriptions.update(currentSubscription.stripeSubscriptionId, {
    items: [{
      id: stripeSubscription.items.data[0].id,
      price: newPlan.stripePriceId
    }],
    proration_behavior: prorated ? 'create_prorations' : 'none'
  });
  
  // 更新数据库记录
  await updateUserSubscription(currentSubscription.id, {
    planId: newPlanId,
    currentPeriodStart: new Date(updatedSubscription.current_period_start * 1000),
    currentPeriodEnd: new Date(updatedSubscription.current_period_end * 1000)
  });
  
  // 如果是升级，立即给用户充值差额积分
  if (newPlan.monthlyCredits > currentSubscription.plan.monthlyCredits) {
    const creditDifference = newPlan.monthlyCredits - currentSubscription.plan.monthlyCredits;
    const daysRemaining = Math.ceil((currentSubscription.currentPeriodEnd.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    const proratedCredits = Math.round((creditDifference * daysRemaining) / 30);
    
    await addCredits(userId, proratedCredits, 'upgrade', currentSubscription.id);
  }
};
```

### 3.3 订阅取消处理
```typescript
const cancelSubscription = async (userId: string, cancelAtPeriodEnd: boolean = true) => {
  const subscription = await getCurrentSubscription(userId);
  if (!subscription) {
    throw new Error('No active subscription found');
  }
  
  // 取消Stripe订阅
  if (cancelAtPeriodEnd) {
    await stripe.subscriptions.update(subscription.stripeSubscriptionId, {
      cancel_at_period_end: true
    });
  } else {
    await stripe.subscriptions.del(subscription.stripeSubscriptionId);
  }
  
  // 更新数据库记录
  await updateUserSubscription(subscription.id, {
    cancelAtPeriodEnd,
    canceledAt: new Date()
  });
  
  // 发送取消确认邮件
  await sendCancellationConfirmationEmail(subscription.user);
};
```

## 4. 积分购买流程

### 4.1 一次性积分购买
```typescript
const purchaseCreditPackage = async (userId: string, packageId: string, paymentMethodId: string) => {
  const user = await getUser(userId);
  const package = await getCreditPackage(packageId);
  
  // 创建Stripe支付意图
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(package.price * 100),
    currency: package.currency.toLowerCase(),
    customer: user.stripeCustomerId,
    payment_method: paymentMethodId,
    confirmation_method: 'manual',
    confirm: true,
    metadata: {
      userId,
      packageId,
      creditsAmount: package.creditsAmount + package.bonusCredits
    }
  });
  
  // 创建支付记录
  const payment = await createPayment({
    userId,
    amount: package.price,
    currency: package.currency,
    status: 'pending',
    paymentMethod: 'stripe',
    paymentProviderId: paymentIntent.id,
    productType: 'credits',
    productId: packageId,
    creditsAmount: package.creditsAmount + package.bonusCredits
  });
  
  return { paymentIntent, payment };
};

// 处理积分购买成功
const handleCreditPurchaseSuccess = async (paymentIntentId: string) => {
  const payment = await db.payments.findFirst({
    where: { paymentProviderId: paymentIntentId }
  });
  
  if (!payment) return;
  
  // 更新支付状态
  await updatePayment(payment.id, { status: 'completed' });
  
  // 添加积分
  await addCredits(payment.userId, payment.creditsAmount, 'purchase', payment.id);
  
  // 发送购买确认邮件
  await sendCreditPurchaseConfirmationEmail(payment.userId, payment.creditsAmount);
};
```

## 5. 退款处理

### 5.1 订阅退款
```typescript
const processSubscriptionRefund = async (subscriptionId: string, amount?: number) => {
  const subscription = await db.userSubscriptions.findUnique({
    where: { id: subscriptionId },
    include: { payments: { orderBy: { createdAt: 'desc' } } }
  });
  
  if (!subscription || !subscription.payments.length) {
    throw new Error('No recent payment found for refund');
  }
  
  const latestPayment = subscription.payments[0];
  const refundAmount = amount || latestPayment.amount;
  
  // 创建Stripe退款
  const refund = await stripe.refunds.create({
    payment_intent: latestPayment.paymentProviderId,
    amount: Math.round(refundAmount * 100)
  });
  
  // 记录退款
  await createPayment({
    userId: subscription.userId,
    amount: -refundAmount,
    currency: latestPayment.currency,
    status: 'completed',
    paymentMethod: 'stripe',
    paymentProviderId: refund.id,
    productType: 'refund',
    productId: subscriptionId
  });
  
  // 扣除相应积分（如果有的话）
  const creditsToDeduct = Math.round((refundAmount / latestPayment.amount) * subscription.plan.monthlyCredits);
  if (creditsToDeduct > 0) {
    await deductCredits(subscription.userId, creditsToDeduct, 'refund', subscription.id);
  }
};
```

## 6. 订阅分析和报告

### 6.1 收入统计
```typescript
const getRevenueAnalytics = async (startDate: Date, endDate: Date) => {
  const analytics = await db.payments.aggregateRaw({
    pipeline: [
      {
        $match: {
          status: 'completed',
          createdAt: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
            productType: '$productType'
          },
          totalRevenue: { $sum: '$amount' },
          transactionCount: { $sum: 1 }
        }
      }
    ]
  });
  
  return analytics;
};
```

### 6.2 用户生命周期价值
```typescript
const calculateCustomerLTV = async (userId: string): Promise<number> => {
  const payments = await db.payments.findMany({
    where: { 
      userId, 
      status: 'completed',
      amount: { gt: 0 }
    }
  });
  
  return payments.reduce((total, payment) => total + payment.amount, 0);
};
```

## 7. 免费试用机制

### 7.1 试用期管理
```typescript
const startFreeTrial = async (userId: string, planId: string, trialDays: number = 14) => {
  const plan = await getSubscriptionPlan(planId);
  const trialEndDate = new Date(Date.now() + trialDays * 24 * 60 * 60 * 1000);
  
  // 创建试用订阅
  const subscription = await createUserSubscription({
    userId,
    planId,
    status: 'trialing',
    currentPeriodStart: new Date(),
    currentPeriodEnd: trialEndDate
  });
  
  // 给用户试用积分
  await addCredits(userId, plan.monthlyCredits, 'trial', subscription.id);
  
  // 设置试用结束提醒
  await scheduleTrialEndReminder(userId, trialEndDate);
  
  return subscription;
};
```