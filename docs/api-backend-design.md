# API接口和后端服务设计

## 1. API架构概览

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   API Gateway   │    │   Auth Service  │    │   Core Services │
│                 │    │                 │    │                 │
│ • 路由管理      │◄──►│ • JWT验证       │◄──►│ • 用户服务      │
│ • 限流控制      │    │ • 权限检查      │    │ • 积分服务      │
│ • 负载均衡      │    │ • 会话管理      │    │ • 订阅服务      │
│ • 请求日志      │    │ • OAuth集成     │    │ • 支付服务      │
└─────────────────┘    └─────────────────┘    │ • 工具服务      │
                                              └─────────────────┘
```

## 2. RESTful API接口设计

### 2.1 认证相关API
```typescript
// 基础路径: /api/v1/auth

// 用户注册
POST /auth/register
{
  "email": "user@example.com",
  "password": "password123",
  "fullName": "John Doe",
  "acceptTerms": true
}
Response: {
  "success": true,
  "message": "Registration successful",
  "data": {
    "user": { ... },
    "token": "jwt_token"
  }
}

// 用户登录
POST /auth/login
{
  "email": "user@example.com",
  "password": "password123"
}
Response: {
  "success": true,
  "data": {
    "user": { ... },
    "token": "jwt_token",
    "refreshToken": "refresh_token"
  }
}

// 刷新Token
POST /auth/refresh
{
  "refreshToken": "refresh_token"
}

// 退出登录
POST /auth/logout
Headers: { "Authorization": "Bearer jwt_token" }

// 忘记密码
POST /auth/forgot-password
{
  "email": "user@example.com"
}

// 重置密码
POST /auth/reset-password
{
  "token": "reset_token",
  "newPassword": "new_password"
}

// OAuth登录
GET /auth/oauth/google
GET /auth/oauth/github
POST /auth/oauth/callback
```

### 2.2 用户管理API
```typescript
// 基础路径: /api/v1/users

// 获取当前用户信息
GET /users/me
Headers: { "Authorization": "Bearer jwt_token" }
Response: {
  "success": true,
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "fullName": "John Doe",
    "avatar": "avatar_url",
    "status": "active",
    "createdAt": "2024-01-01T00:00:00Z",
    "subscription": { ... },
    "credits": { ... }
  }
}

// 更新用户信息
PUT /users/me
{
  "fullName": "John Smith",
  "avatar": "new_avatar_url",
  "language": "en",
  "timezone": "UTC"
}

// 更改密码
POST /users/me/change-password
{
  "currentPassword": "old_password",
  "newPassword": "new_password"
}

// 删除账户
DELETE /users/me
{
  "password": "current_password",
  "reason": "reason_for_deletion"
}
```

### 2.3 积分管理API
```typescript
// 基础路径: /api/v1/credits

// 获取积分余额
GET /credits/balance
Response: {
  "success": true,
  "data": {
    "balance": 1500,
    "totalEarned": 5000,
    "totalSpent": 3500,
    "nextRefillDate": "2024-02-01T00:00:00Z",
    "nextRefillAmount": 1000
  }
}

// 获取积分交易历史
GET /credits/transactions?page=1&limit=20&type=all&startDate=2024-01-01&endDate=2024-01-31
Response: {
  "success": true,
  "data": {
    "transactions": [
      {
        "id": "uuid",
        "type": "spend",
        "amount": -10,
        "balanceAfter": 1490,
        "reason": "usage",
        "description": "Used 10 credits for image enhancement",
        "referenceId": "usage_record_id",
        "createdAt": "2024-01-15T10:30:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 100,
      "totalPages": 5
    }
  }
}

// 获取积分套餐
GET /credits/packages
Response: {
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "Starter Pack",
      "description": "100 credits for beginners",
      "creditsAmount": 100,
      "bonusCredits": 10,
      "price": 2.99,
      "currency": "USD",
      "featured": false
    }
  ]
}

// 购买积分
POST /credits/purchase
{
  "packageId": "uuid",
  "paymentMethodId": "stripe_payment_method_id"
}
Response: {
  "success": true,
  "data": {
    "paymentIntent": {
      "id": "pi_xxx",
      "clientSecret": "pi_xxx_secret",
      "status": "requires_confirmation"
    },
    "payment": { ... }
  }
}

// 确认积分购买
POST /credits/purchase/confirm
{
  "paymentIntentId": "pi_xxx"
}
```

### 2.4 订阅管理API
```typescript
// 基础路径: /api/v1/subscriptions

// 获取订阅计划
GET /subscriptions/plans
Response: {
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "Pro",
      "description": "Professional plan",
      "price": 9.99,
      "currency": "USD",
      "billingCycle": "monthly",
      "monthlyCredits": 1000,
      "features": ["Priority processing", "API access"],
      "active": true,
      "featured": true
    }
  ]
}

// 获取当前订阅
GET /subscriptions/current
Response: {
  "success": true,
  "data": {
    "id": "uuid",
    "planId": "uuid",
    "status": "active",
    "currentPeriodStart": "2024-01-01T00:00:00Z",
    "currentPeriodEnd": "2024-02-01T00:00:00Z",
    "cancelAtPeriodEnd": false,
    "plan": { ... }
  }
}

// 创建订阅
POST /subscriptions/create
{
  "planId": "uuid",
  "paymentMethodId": "stripe_payment_method_id"
}

// 更改订阅计划
PUT /subscriptions/change-plan
{
  "newPlanId": "uuid",
  "prorated": true
}

// 取消订阅
POST /subscriptions/cancel
{
  "cancelAtPeriodEnd": true,
  "reason": "Too expensive"
}

// 恢复订阅
POST /subscriptions/resume

// 获取账单历史
GET /subscriptions/billing-history?page=1&limit=10
Response: {
  "success": true,
  "data": {
    "payments": [
      {
        "id": "uuid",
        "amount": 9.99,
        "currency": "USD",
        "status": "completed",
        "createdAt": "2024-01-01T00:00:00Z",
        "invoiceUrl": "https://..."
      }
    ],
    "pagination": { ... }
  }
}
```

### 2.5 工具使用API
```typescript
// 基础路径: /api/v1/tools

// 获取工具配置
GET /tools/configurations
Response: {
  "success": true,
  "data": [
    {
      "toolName": "image-enhancer",
      "displayName": "Image Enhancer",
      "description": "Enhance image quality",
      "baseCreditsCost": 5,
      "creditsPerMB": 2,
      "maxFileSize": 50,
      "enabled": true,
      "requiresSubscription": false,
      "acceptedFormats": [".jpg", ".png", ".webp"],
      "parameters": [
        {
          "name": "quality",
          "type": "select",
          "label": "Output Quality",
          "options": ["low", "medium", "high"],
          "default": "medium"
        }
      ]
    }
  ]
}

// 验证工具使用权限
POST /tools/validate-usage
{
  "toolName": "image-enhancer",
  "fileSize": 1048576,
  "parameters": { "quality": "high" }
}
Response: {
  "success": true,
  "data": {
    "canUse": true,
    "estimatedCost": 7,
    "userBalance": 1500,
    "warnings": []
  }
}

// 使用工具处理文件
POST /tools/process
Content-Type: multipart/form-data
{
  "toolName": "image-enhancer",
  "file": File,
  "parameters": JSON.stringify({ "quality": "high" }),
  "priority": false
}
Response: {
  "success": true,
  "data": {
    "usageRecordId": "uuid",
    "status": "processing",
    "estimatedTime": 30,
    "creditsDeducted": 7
  }
}

// 获取处理状态
GET /tools/process/:usageRecordId/status
Response: {
  "success": true,
  "data": {
    "id": "uuid",
    "status": "completed",
    "progress": 100,
    "resultUrl": "https://...",
    "processingTime": 25,
    "creditsUsed": 7
  }
}

// 获取使用历史
GET /tools/usage-history?page=1&limit=20&toolName=image-enhancer&status=completed
Response: {
  "success": true,
  "data": {
    "records": [
      {
        "id": "uuid",
        "toolName": "image-enhancer",
        "status": "completed",
        "creditsUsed": 7,
        "inputFileSize": 1048576,
        "outputFileSize": 1200000,
        "processingTime": 25,
        "createdAt": "2024-01-15T10:30:00Z",
        "resultUrl": "https://..."
      }
    ],
    "pagination": { ... }
  }
}

// 下载处理结果
GET /tools/download/:usageRecordId
Headers: { "Authorization": "Bearer jwt_token" }
Response: File download or redirect to signed URL
```

### 2.6 支付相关API
```typescript
// 基础路径: /api/v1/payments

// 创建支付方法
POST /payments/payment-methods
{
  "type": "card",
  "card": {
    "token": "stripe_token"
  }
}

// 获取支付方法列表
GET /payments/payment-methods

// 删除支付方法
DELETE /payments/payment-methods/:id

// 设置默认支付方法
PUT /payments/payment-methods/:id/default

// Stripe Webhook
POST /payments/webhooks/stripe
Headers: { "Stripe-Signature": "..." }
Body: Stripe Event Object

// 获取支付历史
GET /payments/history?page=1&limit=20&type=all
Response: {
  "success": true,
  "data": {
    "payments": [
      {
        "id": "uuid",
        "amount": 9.99,
        "currency": "USD",
        "status": "completed",
        "productType": "subscription",
        "description": "Pro Monthly Subscription",
        "createdAt": "2024-01-01T00:00:00Z"
      }
    ],
    "pagination": { ... }
  }
}
```

## 3. 中间件设计

### 3.1 认证中间件
```typescript
// middleware/auth.ts
export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Access token required'
        }
      });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;
    const user = await User.findById(decoded.userId);
    
    if (!user || user.status !== 'active') {
      return res.status(401).json({
        success: false,
        error: {
          code: 'INVALID_TOKEN',
          message: 'Invalid or expired token'
        }
      });
    }
    
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: {
        code: 'TOKEN_ERROR',
        message: 'Token validation failed'
      }
    });
  }
};

// 可选认证中间件
export const optionalAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;
      const user = await User.findById(decoded.userId);
      if (user && user.status === 'active') {
        req.user = user;
      }
    } catch (error) {
      // 忽略错误，继续请求
    }
  }
  
  next();
};
```

### 3.2 权限验证中间件
```typescript
// middleware/permissions.ts
export const requireSubscription = (minLevel?: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user!;
    const subscription = await getUserActiveSubscription(user.id);
    
    if (!subscription) {
      return res.status(403).json({
        success: false,
        error: {
          code: 'SUBSCRIPTION_REQUIRED',
          message: 'Active subscription required'
        }
      });
    }
    
    if (minLevel && !hasSubscriptionLevel(subscription.plan, minLevel)) {
      return res.status(403).json({
        success: false,
        error: {
          code: 'INSUFFICIENT_SUBSCRIPTION',
          message: `${minLevel} subscription required`
        }
      });
    }
    
    req.subscription = subscription;
    next();
  };
};

export const requireCredits = (minimumCredits: number) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user!;
    const credits = await getUserCredits(user.id);
    
    if (credits.balance < minimumCredits) {
      return res.status(402).json({
        success: false,
        error: {
          code: 'INSUFFICIENT_CREDITS',
          message: 'Insufficient credits',
          data: {
            required: minimumCredits,
            available: credits.balance
          }
        }
      });
    }
    
    req.credits = credits;
    next();
  };
};
```

### 3.3 限流中间件
```typescript
// middleware/rateLimit.ts
export const createRateLimit = (options: RateLimitOptions) => {
  return rateLimit({
    windowMs: options.windowMs || 15 * 60 * 1000, // 15分钟
    max: options.max || 100,
    keyGenerator: (req) => {
      // 对于认证用户使用用户ID，否则使用IP
      return req.user?.id || req.ip;
    },
    handler: (req, res) => {
      res.status(429).json({
        success: false,
        error: {
          code: 'RATE_LIMIT_EXCEEDED',
          message: 'Too many requests, please try again later'
        }
      });
    },
    standardHeaders: true,
    legacyHeaders: false
  });
};

// 不同端点的限流配置
export const authRateLimit = createRateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5 // 15分钟内最多5次登录尝试
});

export const toolUsageRateLimit = createRateLimit({
  windowMs: 60 * 1000,
  max: 10 // 1分钟内最多10次工具使用
});
```

### 3.4 请求验证中间件
```typescript
// middleware/validation.ts
export const validateRequest = (schema: Joi.Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body);
    
    if (error) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Request validation failed',
          details: error.details.map(detail => ({
            field: detail.path.join('.'),
            message: detail.message
          }))
        }
      });
    }
    
    req.body = value;
    next();
  };
};

// 验证schemas
export const schemas = {
  register: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    fullName: Joi.string().min(2).max(100).required(),
    acceptTerms: Joi.boolean().valid(true).required()
  }),
  
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }),
  
  toolUsage: Joi.object({
    toolName: Joi.string().required(),
    parameters: Joi.object().default({}),
    priority: Joi.boolean().default(false)
  })
};
```

## 4. 服务层设计

### 4.1 用户服务
```typescript
// services/UserService.ts
export class UserService {
  static async createUser(userData: CreateUserData): Promise<User> {
    // 检查邮箱是否已存在
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      throw new AppError('Email already registered', 409, 'EMAIL_EXISTS');
    }
    
    // 加密密码
    const hashedPassword = await bcrypt.hash(userData.password, 12);
    
    // 创建用户
    const user = await User.create({
      ...userData,
      password: hashedPassword
    });
    
    // 创建积分记录
    await CreditsService.initializeUserCredits(user.id);
    
    // 发送欢迎邮件
    await EmailService.sendWelcomeEmail(user);
    
    return user;
  }
  
  static async authenticateUser(email: string, password: string): Promise<AuthResult> {
    const user = await User.findOne({ email }).select('+password');
    
    if (!user || !await bcrypt.compare(password, user.password)) {
      throw new AppError('Invalid credentials', 401, 'INVALID_CREDENTIALS');
    }
    
    if (user.status !== 'active') {
      throw new AppError('Account suspended', 403, 'ACCOUNT_SUSPENDED');
    }
    
    // 更新最后登录时间
    await User.findByIdAndUpdate(user.id, { lastLoginAt: new Date() });
    
    // 生成JWT Token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    );
    
    const refreshToken = jwt.sign(
      { userId: user.id, type: 'refresh' },
      process.env.JWT_REFRESH_SECRET!,
      { expiresIn: '7d' }
    );
    
    return { user, token, refreshToken };
  }
}
```

### 4.2 积分服务
```typescript
// services/CreditsService.ts
export class CreditsService {
  static async getUserCredits(userId: string): Promise<UserCredits> {
    let credits = await UserCredits.findOne({ userId });
    
    if (!credits) {
      credits = await this.initializeUserCredits(userId);
    }
    
    return credits;
  }
  
  static async addCredits(
    userId: string, 
    amount: number, 
    reason: string, 
    referenceId?: string
  ): Promise<void> {
    await db.transaction(async (tx) => {
      // 更新积分余额
      const credits = await tx.userCredits.findUnique({ where: { userId } });
      if (!credits) throw new AppError('Credits account not found', 404);
      
      const newBalance = credits.balance + amount;
      
      await tx.userCredits.update({
        where: { userId },
        data: {
          balance: newBalance,
          totalEarned: credits.totalEarned + amount,
          updatedAt: new Date()
        }
      });
      
      // 创建交易记录
      await tx.creditTransactions.create({
        data: {
          userId,
          type: 'earn',
          amount,
          balanceAfter: newBalance,
          reason,
          referenceId,
          description: `Earned ${amount} credits from ${reason}`
        }
      });
    });
    
    // 通知用户
    await NotificationService.sendCreditAddedNotification(userId, amount);
  }
  
  static async deductCredits(
    userId: string, 
    amount: number, 
    reason: string, 
    referenceId: string
  ): Promise<boolean> {
    return await db.transaction(async (tx) => {
      const credits = await tx.userCredits.findUnique({ 
        where: { userId },
        select: { balance: true, totalSpent: true }
      });
      
      if (!credits || credits.balance < amount) {
        throw new AppError('Insufficient credits', 402, 'INSUFFICIENT_CREDITS');
      }
      
      const newBalance = credits.balance - amount;
      
      await tx.userCredits.update({
        where: { userId },
        data: {
          balance: newBalance,
          totalSpent: credits.totalSpent + amount,
          updatedAt: new Date()
        }
      });
      
      await tx.creditTransactions.create({
        data: {
          userId,
          type: 'spend',
          amount: -amount,
          balanceAfter: newBalance,
          reason,
          referenceId,
          description: `Used ${amount} credits for ${reason}`
        }
      });
      
      return true;
    });
  }
  
  static async calculateToolCost(
    toolName: string, 
    fileSize: number, 
    parameters: any
  ): Promise<number> {
    const toolConfig = await ToolConfiguration.findOne({ toolName });
    if (!toolConfig) {
      throw new AppError('Tool not found', 404, 'TOOL_NOT_FOUND');
    }
    
    const baseCost = toolConfig.baseCreditsCost;
    const fileSizeMB = fileSize / (1024 * 1024);
    const fileSizeCost = Math.ceil(fileSizeMB) * toolConfig.creditsPerMB;
    
    // 根据参数计算额外费用
    let parameterCost = 0;
    if (parameters.priority) {
      parameterCost += Math.ceil((baseCost + fileSizeCost) * 0.5);
    }
    
    return baseCost + fileSizeCost + parameterCost;
  }
}
```

### 4.3 订阅服务
```typescript
// services/SubscriptionService.ts
export class SubscriptionService {
  static async createSubscription(
    userId: string, 
    planId: string, 
    paymentMethodId: string
  ): Promise<UserSubscription> {
    const user = await User.findById(userId);
    const plan = await SubscriptionPlan.findById(planId);
    
    if (!user || !plan) {
      throw new AppError('User or plan not found', 404);
    }
    
    // 检查是否已有活跃订阅
    const existingSubscription = await this.getCurrentSubscription(userId);
    if (existingSubscription && existingSubscription.status === 'active') {
      throw new AppError('User already has active subscription', 409);
    }
    
    // 创建Stripe订阅
    const stripeSubscription = await StripeService.createSubscription(
      user.stripeCustomerId || await StripeService.createCustomer(user),
      plan.stripePriceId,
      paymentMethodId
    );
    
    // 保存到数据库
    const subscription = await UserSubscription.create({
      userId,
      planId,
      stripeSubscriptionId: stripeSubscription.id,
      status: stripeSubscription.status,
      currentPeriodStart: new Date(stripeSubscription.current_period_start * 1000),
      currentPeriodEnd: new Date(stripeSubscription.current_period_end * 1000)
    });
    
    return subscription;
  }
  
  static async handleSubscriptionWebhook(event: Stripe.Event): Promise<void> {
    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        await this.handleSubscriptionUpdated(event.data.object as Stripe.Subscription);
        break;
        
      case 'customer.subscription.deleted':
        await this.handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
        break;
        
      case 'invoice.payment_succeeded':
        await this.handlePaymentSucceeded(event.data.object as Stripe.Invoice);
        break;
        
      case 'invoice.payment_failed':
        await this.handlePaymentFailed(event.data.object as Stripe.Invoice);
        break;
    }
  }
  
  private static async handlePaymentSucceeded(invoice: Stripe.Invoice): Promise<void> {
    const subscription = await UserSubscription.findOne({
      stripeSubscriptionId: invoice.subscription as string
    }).populate('plan user');
    
    if (!subscription) return;
    
    // 更新订阅状态
    await UserSubscription.findByIdAndUpdate(subscription.id, {
      status: 'active',
      currentPeriodStart: new Date(invoice.period_start * 1000),
      currentPeriodEnd: new Date(invoice.period_end * 1000)
    });
    
    // 充值月度积分
    await CreditsService.addCredits(
      subscription.userId,
      subscription.plan.monthlyCredits,
      'subscription',
      subscription.id
    );
    
    // 记录支付
    await PaymentService.recordPayment({
      userId: subscription.userId,
      amount: invoice.amount_paid / 100,
      currency: invoice.currency,
      status: 'completed',
      paymentMethod: 'stripe',
      paymentProviderId: invoice.id,
      productType: 'subscription',
      productId: subscription.planId
    });
  }
}
```

## 5. 错误处理

### 5.1 统一错误处理中间件
```typescript
// middleware/errorHandler.ts
export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public code?: string,
    public data?: any
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let errorCode = 'INTERNAL_SERVER_ERROR';
  let message = 'Something went wrong';
  let data: any = undefined;
  
  // 自定义错误
  if (error instanceof AppError) {
    statusCode = error.statusCode;
    errorCode = error.code || 'APP_ERROR';
    message = error.message;
    data = error.data;
  }
  
  // Mongoose验证错误
  else if (error.name === 'ValidationError') {
    statusCode = 400;
    errorCode = 'VALIDATION_ERROR';
    message = 'Validation failed';
    data = Object.values(error.errors).map(err => ({
      field: err.path,
      message: err.message
    }));
  }
  
  // JWT错误
  else if (error.name === 'JsonWebTokenError') {
    statusCode = 401;
    errorCode = 'INVALID_TOKEN';
    message = 'Invalid token';
  }
  
  // Stripe错误
  else if (error.type?.startsWith('Stripe')) {
    statusCode = 400;
    errorCode = 'PAYMENT_ERROR';
    message = error.message;
  }
  
  // 记录错误日志
  if (statusCode >= 500) {
    console.error('Server Error:', {
      error: error.message,
      stack: error.stack,
      url: req.url,
      method: req.method,
      userId: req.user?.id,
      timestamp: new Date().toISOString()
    });
  }
  
  res.status(statusCode).json({
    success: false,
    error: {
      code: errorCode,
      message,
      ...(data && { data })
    }
  });
};
```

## 6. API文档规范

### 6.1 OpenAPI/Swagger配置
```yaml
# swagger.yaml
openapi: 3.0.0
info:
  title: AI Tools API
  version: 1.0.0
  description: API for AI Tools platform with subscription and credits system
  contact:
    email: api@aitools.com
  
servers:
  - url: https://api.aitools.com/v1
    description: Production server
  - url: https://staging-api.aitools.com/v1
    description: Staging server

components:
  securitySchemes:
    BearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
  
  schemas:
    User:
      type: object
      properties:
        id:
          type: string
          format: uuid
        email:
          type: string
          format: email
        fullName:
          type: string
        avatar:
          type: string
          format: uri
        status:
          type: string
          enum: [active, suspended, deleted]
        createdAt:
          type: string
          format: date-time
    
    Credits:
      type: object
      properties:
        balance:
          type: integer
        totalEarned:
          type: integer
        totalSpent:
          type: integer
        nextRefillDate:
          type: string
          format: date-time
    
    Error:
      type: object
      properties:
        success:
          type: boolean
          example: false
        error:
          type: object
          properties:
            code:
              type: string
            message:
              type: string
            data:
              type: object

security:
  - BearerAuth: []

paths:
  /auth/login:
    post:
      summary: User login
      tags: [Authentication]
      security: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                email:
                  type: string
                  format: email
                password:
                  type: string
      responses:
        200:
          description: Login successful
          content:
            application/json:
              schema:
                type: object
                properties:
                  success:
                    type: boolean
                  data:
                    type: object
                    properties:
                      user:
                        $ref: '#/components/schemas/User'
                      token:
                        type: string
        401:
          description: Invalid credentials
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'
```

### 6.2 响应格式标准
```typescript
// 统一响应格式
interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    data?: any;
  };
  meta?: {
    pagination?: PaginationMeta;
    requestId?: string;
    timestamp?: string;
  };
}

interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// 响应工具函数
export const createResponse = {
  success: <T>(data: T, meta?: any): APIResponse<T> => ({
    success: true,
    data,
    ...(meta && { meta })
  }),
  
  error: (code: string, message: string, data?: any): APIResponse => ({
    success: false,
    error: { code, message, ...(data && { data }) }
  }),
  
  paginated: <T>(data: T[], pagination: PaginationMeta): APIResponse<T[]> => ({
    success: true,
    data,
    meta: { pagination }
  })
};
```

<function_calls>
<invoke name="TodoWrite">
<parameter name="todos">[{"id": "1", "content": "\u8bbe\u8ba1\u6570\u636e\u5e93schema\u548c\u7528\u6237\u7cfb\u7edf\u67b6\u6784", "status": "completed"}, {"id": "2", "content": "\u89c4\u5212\u79ef\u5206\u7cfb\u7edf\u7684\u6838\u5fc3\u903b\u8f91", "status": "completed"}, {"id": "3", "content": "\u8bbe\u8ba1\u8ba2\u9605\u8ba1\u5212\u548c\u652f\u4ed8\u6d41\u7a0b", "status": "completed"}, {"id": "4", "content": "\u89c4\u5212\u524d\u7aef\u7ec4\u4ef6\u548c\u9875\u9762\u7ed3\u6784", "status": "completed"}, {"id": "5", "content": "\u8bbe\u8ba1API\u63a5\u53e3\u548c\u540e\u7aef\u670d\u52a1", "status": "completed"}]