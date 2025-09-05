# 前端组件和页面结构设计

## 1. 总体架构

```
src/
├── components/          # 通用组件
│   ├── auth/           # 认证相关组件
│   ├── subscription/   # 订阅相关组件
│   ├── credits/        # 积分相关组件
│   ├── payments/       # 支付相关组件
│   ├── tools/          # 工具相关组件
│   └── ui/             # 基础UI组件
├── pages/              # 页面组件
│   ├── auth/           # 认证页面
│   ├── dashboard/      # 用户仪表板
│   ├── subscription/   # 订阅管理
│   ├── credits/        # 积分管理
│   └── admin/          # 管理后台
├── hooks/              # 自定义Hooks
├── stores/             # 状态管理
├── types/              # TypeScript类型定义
└── utils/              # 工具函数
```

## 2. 核心组件设计

### 2.1 认证组件
```tsx
// components/auth/AuthProvider.tsx
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  // ... 认证逻辑
  
  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

// components/auth/LoginForm.tsx
export const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
    } catch (error) {
      // 处理错误
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button type="submit" loading={loading} className="w-full">
        Sign In
      </Button>
    </form>
  );
};

// components/auth/ProtectedRoute.tsx
export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }
  
  return <>{children}</>;
};
```

### 2.2 积分管理组件
```tsx
// components/credits/CreditBalance.tsx
export const CreditBalance: React.FC = () => {
  const { credits, loading } = useCredits();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Coins className="h-5 w-5" />
          Credit Balance
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className="h-8 w-20" />
        ) : (
          <div className="text-3xl font-bold text-primary">
            {credits?.balance?.toLocaleString() || 0}
          </div>
        )}
        <p className="text-sm text-muted-foreground">
          Credits available for use
        </p>
      </CardContent>
    </Card>
  );
};

// components/credits/CreditHistory.tsx
export const CreditHistory: React.FC = () => {
  const { transactions, loading } = useCreditHistory();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Credit History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {loading ? (
            <CreditHistorySkeleton />
          ) : (
            transactions?.map((transaction) => (
              <CreditTransactionItem key={transaction.id} transaction={transaction} />
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// components/credits/CreditPurchase.tsx
export const CreditPurchase: React.FC = () => {
  const { packages, loading } = useCreditPackages();
  const { purchaseCredits } = useCredits();
  
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      {packages?.map((package) => (
        <Card key={package.id} className="relative">
          {package.featured && (
            <Badge className="absolute -top-2 left-4" variant="default">
              Most Popular
            </Badge>
          )}
          <CardHeader>
            <CardTitle>{package.name}</CardTitle>
            <div className="text-2xl font-bold">
              {package.creditsAmount.toLocaleString()} 
              <span className="text-sm font-normal text-muted-foreground"> credits</span>
            </div>
            {package.bonusCredits > 0 && (
              <Badge variant="secondary">
                +{package.bonusCredits} bonus
              </Badge>
            )}
          </CardHeader>
          <CardContent>
            <div className="text-xl font-semibold mb-4">
              ${package.price}
            </div>
            <Button 
              onClick={() => purchaseCredits(package.id)}
              className="w-full"
            >
              Purchase
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
```

### 2.3 订阅管理组件
```tsx
// components/subscription/SubscriptionPlans.tsx
export const SubscriptionPlans: React.FC = () => {
  const { plans, loading } = useSubscriptionPlans();
  const { currentPlan } = useSubscription();
  const { subscribe } = usePayments();
  
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {plans?.map((plan) => (
        <Card 
          key={plan.id} 
          className={cn(
            "relative",
            plan.featured && "ring-2 ring-primary",
            currentPlan?.id === plan.id && "border-primary"
          )}
        >
          {plan.featured && (
            <Badge className="absolute -top-2 left-4" variant="default">
              Recommended
            </Badge>
          )}
          <CardHeader>
            <CardTitle>{plan.name}</CardTitle>
            <CardDescription>{plan.description}</CardDescription>
            <div className="text-3xl font-bold">
              ${plan.price}
              <span className="text-sm font-normal text-muted-foreground">
                /{plan.billingCycle}
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                {plan.monthlyCredits.toLocaleString()} credits/month
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                Max {plan.maxFileSize}MB file size
              </li>
              {plan.priorityProcessing && (
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  Priority processing
                </li>
              )}
              {plan.apiAccess && (
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  API access
                </li>
              )}
            </ul>
            
            {currentPlan?.id === plan.id ? (
              <Button variant="outline" className="w-full" disabled>
                Current Plan
              </Button>
            ) : (
              <Button 
                onClick={() => subscribe(plan.id)}
                className="w-full"
              >
                {currentPlan ? 'Switch Plan' : 'Subscribe'}
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

// components/subscription/SubscriptionStatus.tsx
export const SubscriptionStatus: React.FC = () => {
  const { subscription, loading } = useSubscription();
  
  if (loading) return <Skeleton className="h-32 w-full" />;
  if (!subscription) return null;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Subscription Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span>Current Plan</span>
            <Badge variant="default">{subscription.plan.name}</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span>Status</span>
            <Badge 
              variant={subscription.status === 'active' ? 'default' : 'destructive'}
            >
              {subscription.status}
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span>Next Billing</span>
            <span>{new Date(subscription.currentPeriodEnd).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Monthly Credits</span>
            <span>{subscription.plan.monthlyCredits.toLocaleString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
```

### 2.4 工具使用组件
```tsx
// components/tools/ToolCard.tsx
interface ToolCardProps {
  tool: ToolConfiguration;
  onUse: (toolName: string) => void;
}

export const ToolCard: React.FC<ToolCardProps> = ({ tool, onUse }) => {
  const { user } = useAuth();
  const { credits } = useCredits();
  
  const canUse = credits?.balance >= tool.baseCreditsCost;
  const requiresSubscription = tool.requiresSubscription && !user?.subscription;
  
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5" />
          {tool.displayName}
        </CardTitle>
        <CardDescription>{tool.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Base Cost</span>
            <Badge variant="secondary">
              {tool.baseCreditsCost} credits
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Max File Size</span>
            <span className="text-sm">{tool.maxFileSize}MB</span>
          </div>
          
          {requiresSubscription && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Subscription required for this tool
              </AlertDescription>
            </Alert>
          )}
          
          <Button 
            onClick={() => onUse(tool.toolName)}
            disabled={!canUse || requiresSubscription}
            className="w-full"
          >
            {!canUse ? 'Insufficient Credits' : 'Use Tool'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// components/tools/ToolUsageModal.tsx
interface ToolUsageModalProps {
  tool: ToolConfiguration;
  isOpen: boolean;
  onClose: () => void;
}

export const ToolUsageModal: React.FC<ToolUsageModalProps> = ({ tool, isOpen, onClose }) => {
  const [file, setFile] = useState<File | null>(null);
  const [parameters, setParameters] = useState<Record<string, any>>({});
  const [estimatedCost, setEstimatedCost] = useState(0);
  const { processFile } = useToolProcessing();
  
  useEffect(() => {
    if (file) {
      // 计算预估费用
      const cost = tool.baseCreditsCost + Math.ceil(file.size / (1024 * 1024)) * tool.creditsPerMb;
      setEstimatedCost(cost);
    }
  }, [file, tool]);
  
  const handleProcess = async () => {
    if (!file) return;
    
    try {
      await processFile(tool.toolName, file, parameters);
      onClose();
    } catch (error) {
      // 处理错误
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{tool.displayName}</DialogTitle>
          <DialogDescription>{tool.description}</DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <FileUpload
            accept={tool.acceptedFormats}
            maxSize={tool.maxFileSize * 1024 * 1024}
            onFileSelect={setFile}
          />
          
          {file && (
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                <span>Estimated Cost</span>
                <Badge>{estimatedCost} credits</Badge>
              </div>
              
              <ParameterPanel
                parameters={tool.parameters}
                values={parameters}
                onChange={setParameters}
              />
              
              <Button onClick={handleProcess} className="w-full">
                Process File ({estimatedCost} credits)
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
```

## 3. 页面结构设计

### 3.1 用户仪表板
```tsx
// pages/dashboard/Dashboard.tsx
export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <UserMenu />
      </div>
      
      {/* 概览卡片 */}
      <div className="grid md:grid-cols-3 gap-6">
        <CreditBalance />
        <SubscriptionStatus />
        <UsageStats />
      </div>
      
      {/* 工具快速访问 */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Quick Access Tools</h2>
        <QuickAccessTools />
      </section>
      
      {/* 最近使用记录 */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
        <RecentUsageHistory />
      </section>
    </div>
  );
};
```

### 3.2 积分管理页面
```tsx
// pages/credits/CreditsPage.tsx
export const CreditsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'purchase' | 'history'>('overview');
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Credits Management</h1>
        <p className="text-muted-foreground">
          Manage your credits and view usage history
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="purchase">Purchase</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <CreditBalance />
            <CreditUsageChart />
          </div>
          <NextRefillInfo />
        </TabsContent>
        
        <TabsContent value="purchase">
          <CreditPurchase />
        </TabsContent>
        
        <TabsContent value="history">
          <CreditHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
};
```

### 3.3 订阅管理页面
```tsx
// pages/subscription/SubscriptionPage.tsx
export const SubscriptionPage: React.FC = () => {
  const { subscription } = useSubscription();
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Subscription</h1>
        <p className="text-muted-foreground">
          Manage your subscription and billing
        </p>
      </div>
      
      {subscription ? (
        <div className="space-y-8">
          <SubscriptionStatus />
          <BillingHistory />
          <SubscriptionActions />
        </div>
      ) : (
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>No Active Subscription</CardTitle>
              <CardDescription>
                Subscribe to unlock premium features and get more credits
              </CardDescription>
            </CardHeader>
          </Card>
          <SubscriptionPlans />
        </div>
      )}
    </div>
  );
};
```

## 4. 状态管理设计

### 4.1 Zustand Store结构
```tsx
// stores/authStore.ts
interface AuthState {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (data: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  loading: true,
  
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    set({ user: response.data.user });
  },
  
  logout: async () => {
    await api.post('/auth/logout');
    set({ user: null });
  },
  
  updateUser: (data) => {
    const currentUser = get().user;
    if (currentUser) {
      set({ user: { ...currentUser, ...data } });
    }
  }
}));

// stores/creditsStore.ts
interface CreditsState {
  balance: number;
  totalEarned: number;
  totalSpent: number;
  transactions: CreditTransaction[];
  loading: boolean;
  
  fetchCredits: () => Promise<void>;
  addCredits: (amount: number) => void;
  deductCredits: (amount: number) => void;
  fetchTransactions: (page?: number) => Promise<void>;
}

export const useCreditsStore = create<CreditsState>((set, get) => ({
  balance: 0,
  totalEarned: 0,
  totalSpent: 0,
  transactions: [],
  loading: false,
  
  fetchCredits: async () => {
    set({ loading: true });
    const response = await api.get('/credits');
    set({ 
      ...response.data,
      loading: false 
    });
  },
  
  addCredits: (amount) => {
    const current = get();
    set({ 
      balance: current.balance + amount,
      totalEarned: current.totalEarned + amount
    });
  },
  
  deductCredits: (amount) => {
    const current = get();
    set({ 
      balance: current.balance - amount,
      totalSpent: current.totalSpent + amount
    });
  },
  
  fetchTransactions: async (page = 1) => {
    const response = await api.get(`/credits/transactions?page=${page}`);
    set({ transactions: response.data.transactions });
  }
}));
```

## 5. 自定义Hooks

### 5.1 认证相关Hooks
```tsx
// hooks/useAuth.ts
export const useAuth = () => {
  const { user, loading, login, logout, updateUser } = useAuthStore();
  
  const register = async (data: RegisterData) => {
    const response = await api.post('/auth/register', data);
    return response.data;
  };
  
  const resetPassword = async (email: string) => {
    await api.post('/auth/reset-password', { email });
  };
  
  return {
    user,
    loading,
    login,
    logout,
    register,
    resetPassword,
    updateUser,
    isAuthenticated: !!user
  };
};
```

### 5.2 积分相关Hooks
```tsx
// hooks/useCredits.ts
export const useCredits = () => {
  const store = useCreditsStore();
  
  useEffect(() => {
    store.fetchCredits();
  }, []);
  
  const purchaseCredits = async (packageId: string) => {
    const response = await api.post('/credits/purchase', { packageId });
    // 处理支付流程
    return response.data;
  };
  
  return {
    ...store,
    purchaseCredits
  };
};

// hooks/useCreditHistory.ts
export const useCreditHistory = (page: number = 1) => {
  const [transactions, setTransactions] = useState<CreditTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  
  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get(`/credits/transactions?page=${page}`);
      setTransactions(response.data.transactions);
      setHasMore(response.data.hasMore);
    } finally {
      setLoading(false);
    }
  }, [page]);
  
  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);
  
  return { transactions, loading, hasMore, refetch: fetchTransactions };
};
```

## 6. 路由设计

```tsx
// App.tsx
export const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* 公开路由 */}
          <Route path="/" element={<Homepage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
          
          {/* 受保护的路由 */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/credits" element={
            <ProtectedRoute>
              <DashboardLayout>
                <CreditsPage />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/subscription" element={
            <ProtectedRoute>
              <DashboardLayout>
                <SubscriptionPage />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/tools/:toolName" element={
            <ProtectedRoute>
              <DashboardLayout>
                <ToolPage />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          
          {/* 管理员路由 */}
          <Route path="/admin/*" element={
            <AdminRoute>
              <AdminLayout>
                <AdminRoutes />
              </AdminLayout>
            </AdminRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
};
```