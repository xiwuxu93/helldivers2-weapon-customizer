# 积分系统核心逻辑设计

## 1. 积分获取规则

### 1.1 订阅获取积分
```typescript
// 每月订阅自动充值积分
interface SubscriptionCredit {
  planId: string;
  monthlyCredits: number;
  refillDate: Date; // 每月充值日期
  rolloverAllowed: boolean; // 是否允许积分结转
  maxRollover: number; // 最大结转数量
}

// 订阅充值逻辑
const refillSubscriptionCredits = async (userId: string) => {
  const subscription = await getCurrentSubscription(userId);
  if (!subscription || subscription.status !== 'active') return;
  
  const plan = await getSubscriptionPlan(subscription.planId);
  const creditsToAdd = plan.monthlyCredits;
  
  // 检查是否需要清除过期积分
  if (!plan.rolloverAllowed) {
    await clearExpiredCredits(userId);
  }
  
  await addCredits(userId, creditsToAdd, 'subscription', subscription.id);
};
```

### 1.2 购买积分套餐
```typescript
// 一次性购买积分
interface CreditPurchase {
  packageId: string;
  baseCredits: number;
  bonusCredits: number;
  totalCredits: number;
  price: number;
}

const purchaseCredits = async (userId: string, packageId: string) => {
  const package = await getCreditPackage(packageId);
  const totalCredits = package.baseCredits + package.bonusCredits;
  
  // 创建支付订单
  const payment = await createPayment({
    userId,
    amount: package.price,
    productType: 'credits',
    productId: packageId,
    creditsAmount: totalCredits
  });
  
  // 支付成功后添加积分
  if (payment.status === 'completed') {
    await addCredits(userId, totalCredits, 'purchase', payment.id);
  }
};
```

### 1.3 新用户注册奖励
```typescript
const registerBonus = async (userId: string) => {
  const bonusCredits = 50; // 新用户奖励50积分
  await addCredits(userId, bonusCredits, 'bonus', 'registration');
};
```

## 2. 积分消费规则

### 2.1 工具使用计费算法
```typescript
interface ToolUsageCost {
  baseCost: number;      // 基础费用
  fileSizeCost: number;  // 文件大小费用
  priorityCost: number;  // 优先处理费用
  totalCost: number;     // 总费用
}

const calculateToolCost = async (toolName: string, fileSize: number, isPriority: boolean = false): Promise<ToolUsageCost> => {
  const toolConfig = await getToolConfiguration(toolName);
  
  const baseCost = toolConfig.baseCost;
  const fileSizeMB = fileSize / (1024 * 1024);
  const fileSizeCost = Math.ceil(fileSizeMB) * toolConfig.creditsPerMB;
  
  let priorityCost = 0;
  if (isPriority) {
    priorityCost = Math.ceil((baseCost + fileSizeCost) * 0.5); // 优先处理额外收费50%
  }
  
  const totalCost = baseCost + fileSizeCost + priorityCost;
  
  return {
    baseCost,
    fileSizeCost,
    priorityCost,
    totalCost
  };
};
```

### 2.2 使用前权限验证
```typescript
const validateToolUsage = async (userId: string, toolName: string, fileSize: number): Promise<ValidationResult> => {
  // 1. 检查用户状态
  const user = await getUser(userId);
  if (user.status !== 'active') {
    return { valid: false, error: 'User account is not active' };
  }
  
  // 2. 检查工具是否启用
  const toolConfig = await getToolConfiguration(toolName);
  if (!toolConfig.enabled) {
    return { valid: false, error: 'Tool is currently disabled' };
  }
  
  // 3. 检查文件大小限制
  if (fileSize > toolConfig.maxFileSize * 1024 * 1024) {
    return { valid: false, error: 'File size exceeds limit' };
  }
  
  // 4. 检查订阅要求
  if (toolConfig.requiresSubscription) {
    const subscription = await getCurrentSubscription(userId);
    if (!subscription || subscription.status !== 'active') {
      return { valid: false, error: 'Active subscription required' };
    }
  }
  
  // 5. 检查积分余额
  const cost = await calculateToolCost(toolName, fileSize);
  const credits = await getUserCredits(userId);
  if (credits.balance < cost.totalCost) {
    return { 
      valid: false, 
      error: 'Insufficient credits',
      required: cost.totalCost,
      available: credits.balance
    };
  }
  
  return { valid: true, cost: cost.totalCost };
};
```

### 2.3 积分扣除逻辑
```typescript
const deductCredits = async (userId: string, amount: number, reason: string, referenceId: string): Promise<boolean> => {
  return await db.transaction(async (tx) => {
    // 1. 锁定用户积分记录
    const credits = await tx.userCredits.findUnique({
      where: { userId },
      select: { balance: true, totalSpent: true }
    });
    
    if (!credits || credits.balance < amount) {
      throw new Error('Insufficient credits');
    }
    
    // 2. 更新积分余额
    await tx.userCredits.update({
      where: { userId },
      data: {
        balance: credits.balance - amount,
        totalSpent: credits.totalSpent + amount,
        updatedAt: new Date()
      }
    });
    
    // 3. 创建交易记录
    await tx.creditTransactions.create({
      data: {
        userId,
        type: 'spend',
        amount: -amount,
        balanceAfter: credits.balance - amount,
        reason,
        referenceId,
        description: `Used ${amount} credits for ${reason}`
      }
    });
    
    return true;
  });
};
```

## 3. 使用流程控制

### 3.1 工具使用完整流程
```typescript
const processToolUsage = async (userId: string, toolName: string, file: File, options: ToolOptions) => {
  // 1. 预验证和费用计算
  const validation = await validateToolUsage(userId, toolName, file.size);
  if (!validation.valid) {
    throw new Error(validation.error);
  }
  
  // 2. 创建使用记录（pending状态）
  const usageRecord = await createUsageRecord({
    userId,
    toolName,
    inputFileSize: file.size,
    creditsCost: validation.cost,
    status: 'pending',
    parameters: options
  });
  
  try {
    // 3. 扣除积分
    await deductCredits(userId, validation.cost, 'usage', usageRecord.id);
    
    // 4. 更新使用记录状态
    await updateUsageRecord(usageRecord.id, { 
      status: 'processing',
      creditsBalanceBefore: await getUserCreditsBalance(userId) + validation.cost,
      creditsBalanceAfter: await getUserCreditsBalance(userId)
    });
    
    // 5. 处理文件
    const result = await processFile(toolName, file, options);
    
    // 6. 完成处理
    await updateUsageRecord(usageRecord.id, {
      status: 'completed',
      outputFileSize: result.fileSize,
      outputFileUrl: result.fileUrl,
      completedAt: new Date()
    });
    
    return result;
    
  } catch (error) {
    // 处理失败，退还积分
    await refundCredits(userId, validation.cost, 'refund', usageRecord.id);
    await updateUsageRecord(usageRecord.id, {
      status: 'failed',
      errorMessage: error.message
    });
    
    throw error;
  }
};
```

## 4. 积分管理功能

### 4.1 积分余额查询
```typescript
const getUserCreditsInfo = async (userId: string) => {
  const credits = await getUserCredits(userId);
  const subscription = await getCurrentSubscription(userId);
  const nextRefill = subscription ? getNextRefillDate(subscription) : null;
  
  return {
    balance: credits.balance,
    totalEarned: credits.totalEarned,
    totalSpent: credits.totalSpent,
    subscriptionCredits: subscription?.monthlyCredits || 0,
    nextRefillDate: nextRefill,
    transactions: await getRecentTransactions(userId, 10)
  };
};
```

### 4.2 积分历史记录
```typescript
const getCreditHistory = async (userId: string, page: number = 1, limit: number = 20) => {
  const transactions = await db.creditTransactions.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    skip: (page - 1) * limit,
    take: limit,
    include: {
      // 关联相关记录
    }
  });
  
  return {
    transactions,
    pagination: {
      page,
      limit,
      total: await db.creditTransactions.count({ where: { userId } })
    }
  };
};
```

## 5. 防滥用机制

### 5.1 频率限制
```typescript
const rateLimitCheck = async (userId: string, toolName: string): Promise<boolean> => {
  const key = `rate_limit:${userId}:${toolName}`;
  const current = await redis.get(key);
  
  if (current && parseInt(current) >= RATE_LIMITS[toolName]) {
    return false;
  }
  
  await redis.incr(key);
  await redis.expire(key, 3600); // 1小时窗口
  
  return true;
};
```

### 5.2 异常检测
```typescript
const detectAbnormalUsage = async (userId: string): Promise<boolean> => {
  const recentUsage = await db.toolUsageRecords.count({
    where: {
      userId,
      createdAt: {
        gte: new Date(Date.now() - 24 * 60 * 60 * 1000) // 24小时内
      }
    }
  });
  
  // 如果24小时内使用超过100次，标记为异常
  return recentUsage > 100;
};
```

## 6. 积分过期机制（可选）

```typescript
const expireCredits = async () => {
  // 查找90天前购买的积分
  const expiredTransactions = await db.creditTransactions.findMany({
    where: {
      type: 'earn',
      reason: 'purchase',
      createdAt: {
        lte: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)
      }
    }
  });
  
  for (const transaction of expiredTransactions) {
    // 扣除过期积分
    await addCredits(transaction.userId, -transaction.amount, 'expire', transaction.id);
  }
};
```