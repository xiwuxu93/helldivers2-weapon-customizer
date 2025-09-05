-- AI工具站订阅积分系统数据库设计
-- 使用 PostgreSQL

-- 用户表
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE,
    password_hash VARCHAR(255),
    full_name VARCHAR(200),
    avatar_url TEXT,
    phone VARCHAR(20),
    
    -- 用户状态
    status VARCHAR(20) DEFAULT 'active', -- active, suspended, deleted
    email_verified BOOLEAN DEFAULT false,
    phone_verified BOOLEAN DEFAULT false,
    
    -- OAuth登录信息
    google_id VARCHAR(100),
    github_id VARCHAR(100),
    
    -- 用户偏好
    language VARCHAR(10) DEFAULT 'en',
    timezone VARCHAR(50) DEFAULT 'UTC',
    
    -- 时间戳
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login_at TIMESTAMP
);

-- 订阅计划表
CREATE TABLE subscription_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    
    -- 计费信息
    price DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    billing_cycle VARCHAR(20) NOT NULL, -- monthly, yearly, lifetime
    
    -- 功能限制
    monthly_credits INTEGER NOT NULL,
    max_file_size INTEGER, -- MB
    max_concurrent_jobs INTEGER DEFAULT 1,
    priority_processing BOOLEAN DEFAULT false,
    api_access BOOLEAN DEFAULT false,
    
    -- 状态
    active BOOLEAN DEFAULT true,
    featured BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0,
    
    -- 时间戳
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 用户订阅表
CREATE TABLE user_subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    plan_id UUID NOT NULL REFERENCES subscription_plans(id),
    
    -- 订阅状态
    status VARCHAR(20) NOT NULL, -- active, canceled, expired, pending
    
    -- 计费周期
    current_period_start TIMESTAMP NOT NULL,
    current_period_end TIMESTAMP NOT NULL,
    cancel_at_period_end BOOLEAN DEFAULT false,
    canceled_at TIMESTAMP,
    
    -- 支付信息
    stripe_subscription_id VARCHAR(100),
    
    -- 时间戳
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 用户积分表
CREATE TABLE user_credits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- 积分余额
    balance INTEGER NOT NULL DEFAULT 0,
    total_earned INTEGER NOT NULL DEFAULT 0,
    total_spent INTEGER NOT NULL DEFAULT 0,
    
    -- 时间戳
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(user_id)
);

-- 积分交易记录表
CREATE TABLE credit_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- 交易信息
    type VARCHAR(20) NOT NULL, -- earn, spend, refund, expire
    amount INTEGER NOT NULL, -- 正数为获得，负数为消费
    balance_after INTEGER NOT NULL,
    
    -- 交易原因
    reason VARCHAR(50) NOT NULL, -- subscription, purchase, usage, bonus, refund
    reference_id UUID, -- 关联的订单、使用记录等ID
    reference_type VARCHAR(50), -- order, usage, bonus等
    
    -- 描述
    description TEXT,
    
    -- 时间戳
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 工具使用记录表
CREATE TABLE tool_usage_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- 工具信息
    tool_name VARCHAR(100) NOT NULL,
    tool_version VARCHAR(20),
    
    -- 使用详情
    input_file_size INTEGER, -- bytes
    output_file_size INTEGER, -- bytes
    processing_time INTEGER, -- seconds
    
    -- 计费信息
    credits_cost INTEGER NOT NULL,
    credits_balance_before INTEGER NOT NULL,
    credits_balance_after INTEGER NOT NULL,
    
    -- 状态
    status VARCHAR(20) NOT NULL, -- pending, processing, completed, failed
    error_message TEXT,
    
    -- 文件信息
    input_file_url TEXT,
    output_file_url TEXT,
    
    -- 参数
    parameters JSONB,
    
    -- 时间戳
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP
);

-- 支付记录表
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- 支付信息
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    status VARCHAR(20) NOT NULL, -- pending, completed, failed, refunded
    
    -- 支付方式
    payment_method VARCHAR(50) NOT NULL, -- stripe, paypal, alipay等
    payment_provider_id VARCHAR(100), -- 第三方支付平台的交易ID
    
    -- 购买内容
    product_type VARCHAR(50) NOT NULL, -- credits, subscription
    product_id UUID,
    credits_amount INTEGER, -- 如果是购买积分
    
    -- 发票信息
    invoice_url TEXT,
    receipt_email VARCHAR(255),
    
    -- 时间戳
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 积分商品表（购买积分的套餐）
CREATE TABLE credit_packages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    
    -- 积分和价格
    credits_amount INTEGER NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    
    -- 优惠信息
    bonus_credits INTEGER DEFAULT 0,
    discount_percentage DECIMAL(5,2) DEFAULT 0,
    
    -- 状态
    active BOOLEAN DEFAULT true,
    featured BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0,
    
    -- 时间戳
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 工具配置表（定义每个工具的积分消费）
CREATE TABLE tool_configurations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tool_name VARCHAR(100) NOT NULL UNIQUE,
    display_name VARCHAR(200) NOT NULL,
    description TEXT,
    
    -- 计费配置
    base_credits_cost INTEGER NOT NULL, -- 基础积分消费
    credits_per_mb INTEGER DEFAULT 0, -- 每MB额外消费
    max_file_size INTEGER, -- 最大文件大小限制（MB）
    
    -- 功能配置
    enabled BOOLEAN DEFAULT true,
    requires_subscription BOOLEAN DEFAULT false,
    min_subscription_level VARCHAR(50),
    
    -- 处理配置
    max_processing_time INTEGER DEFAULT 300, -- 最大处理时间（秒）
    priority_multiplier DECIMAL(3,2) DEFAULT 1.0,
    
    -- 时间戳
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 创建索引
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_status ON users(status);
CREATE INDEX idx_user_subscriptions_user_id ON user_subscriptions(user_id);
CREATE INDEX idx_user_subscriptions_status ON user_subscriptions(status);
CREATE INDEX idx_credit_transactions_user_id ON credit_transactions(user_id);
CREATE INDEX idx_credit_transactions_created_at ON credit_transactions(created_at);
CREATE INDEX idx_tool_usage_records_user_id ON tool_usage_records(user_id);
CREATE INDEX idx_tool_usage_records_status ON tool_usage_records(status);
CREATE INDEX idx_payments_user_id ON payments(user_id);
CREATE INDEX idx_payments_status ON payments(status);

-- 初始数据插入

-- 免费计划
INSERT INTO subscription_plans (name, description, price, billing_cycle, monthly_credits) VALUES
('Free', 'Basic plan with limited credits', 0.00, 'monthly', 100),
('Pro', 'Professional plan with more credits and features', 9.99, 'monthly', 1000),
('Premium', 'Premium plan with unlimited access', 29.99, 'monthly', 5000),
('Enterprise', 'Enterprise plan with custom features', 99.99, 'monthly', 20000);

-- 积分购买套餐
INSERT INTO credit_packages (name, description, credits_amount, price, bonus_credits) VALUES
('Starter Pack', '100 credits for beginners', 100, 2.99, 10),
('Standard Pack', '500 credits with bonus', 500, 12.99, 75),
('Power Pack', '1000 credits with bonus', 1000, 24.99, 200),
('Ultimate Pack', '5000 credits with bonus', 5000, 99.99, 1000);

-- 工具配置
INSERT INTO tool_configurations (tool_name, display_name, description, base_credits_cost, credits_per_mb) VALUES
('image-enhancer', 'Image Enhancer', 'Enhance image quality using AI', 5, 2),
('pdf-converter', 'PDF Converter', 'Convert documents to PDF format', 3, 1),
('text-generator', 'Text Generator', 'Generate text using AI models', 10, 0),
('video-compressor', 'Video Compressor', 'Compress video files', 15, 5);