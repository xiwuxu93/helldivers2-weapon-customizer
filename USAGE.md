# 使用指南

本文档详细介绍如何使用AI工具站模板快速构建你的AI工具网站。

## 🎯 快速开始

### 1. 克隆模板

```bash
# 克隆仓库
git clone https://github.com/your-username/ai-tool-template.git
cd ai-tool-template

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 2. 自定义配置

#### 修改站点信息

编辑 `src/app/layout.tsx` 中的metadata：

```tsx
export const metadata: Metadata = {
  title: {
    default: '你的AI工具站',
    template: '%s | 你的AI工具站'
  },
  description: '你的工具站描述',
  keywords: ['AI工具', '你的关键词'],
  // ...
}
```

#### 更新环境变量

复制 `.env.example` 为 `.env.local` 并填入你的配置：

```bash
cp .env.example .env.local
```

#### 修改主题颜色

在 `tailwind.config.js` 中修改颜色配置：

```javascript
primary: {
  50: '#your-color-50',
  500: '#your-primary-color',
  // ...
}
```

## 🔧 核心组件使用

### 文件上传组件

```tsx
import { FileUpload } from '@/components/tool/file-upload'

<FileUpload
  accept="image/*"           // 接受的文件类型
  maxSize={10 * 1024 * 1024} // 最大文件大小 (10MB)
  maxFiles={5}               // 最大文件数量
  onFilesChange={setFiles}   // 文件变化回调
  disabled={isProcessing}    // 是否禁用
/>
```

### 参数控制面板

```tsx
import { ParameterPanel } from '@/components/tool/parameter-panel'

const parameters: ToolParameter[] = [
  {
    id: 'quality',
    name: 'quality',
    label: '输出质量',
    type: 'select',
    defaultValue: 'high',
    category: '基础设置',
    options: [
      { label: '高质量', value: 'high' },
      { label: '中等质量', value: 'medium' }
    ]
  },
  {
    id: 'brightness',
    label: '亮度',
    type: 'range',
    defaultValue: 0,
    min: -100,
    max: 100,
    step: 1,
    category: '图像调整'
  }
]

<ParameterPanel
  parameters={parameters}
  values={parameterValues}
  onChange={setParameterValues}
  onReset={handleReset}
/>
```

### 结果展示组件

```tsx
import { ResultDisplay } from '@/components/tool/result-display'

<ResultDisplay
  results={processResults}
  viewMode="grid"              // 'grid' | 'list'
  onViewModeChange={setViewMode}
  onDownload={handleDownload}
  onShare={handleShare}
/>
```

## 📄 页面自定义

### 修改首页

编辑 `src/app/page.tsx` 和相关组件：

- `src/components/layout/hero.tsx` - Hero区域
- `src/components/layout/feature-grid.tsx` - 特性展示
- `src/components/layout/stats.tsx` - 统计数据

### 添加新页面

1. 在 `src/app/` 下创建新目录
2. 添加 `page.tsx` 文件
3. 配置metadata

```tsx
// src/app/new-page/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '新页面标题',
  description: '页面描述',
}

export default function NewPage() {
  return (
    <div>
      <h1>新页面内容</h1>
    </div>
  )
}
```

### 更新导航菜单

修改 `src/components/layout/header.tsx` 中的navigation数组：

```tsx
const navigation = [
  { name: "首页", href: "/" },
  { name: "工具", href: "/tools" },
  { name: "新页面", href: "/new-page" }, // 添加新菜单项
  // ...
]
```

## 🎨 样式自定义

### 使用设计系统

模板提供了完整的设计系统，使用预定义的样式类：

```tsx
// 按钮样式
<button className="btn btn-primary">主要按钮</button>
<button className="btn btn-secondary">次要按钮</button>

// 卡片样式
<div className="card card-hover">
  <div className="p-6">卡片内容</div>
</div>

// 输入框样式
<input className="input" placeholder="请输入内容" />
```

### 自定义样式

在 `src/app/globals.css` 中添加自定义样式：

```css
/* 自定义组件样式 */
.my-custom-button {
  @apply px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors;
}

/* 自定义动画 */
@keyframes slideIn {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}

.slide-in {
  animation: slideIn 0.3s ease-out;
}
```

## 🔌 AI服务集成

### OpenAI集成示例

```tsx
// src/lib/openai.ts
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function processWithOpenAI(input: string) {
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: input }],
  })
  
  return completion.choices[0].message.content
}
```

### API路由创建

```tsx
// src/app/api/process/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { processWithOpenAI } from '@/lib/openai'

export async function POST(request: NextRequest) {
  try {
    const { input } = await request.json()
    
    const result = await processWithOpenAI(input)
    
    return NextResponse.json({ 
      success: true, 
      data: result 
    })
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: 'Processing failed' 
    }, { status: 500 })
  }
}
```

### 前端调用

```tsx
const handleProcess = async () => {
  try {
    setIsProcessing(true)
    
    const response = await fetch('/api/process', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input: userInput })
    })
    
    const result = await response.json()
    
    if (result.success) {
      setResults(prev => [...prev, result.data])
    } else {
      console.error('Processing failed:', result.error)
    }
  } catch (error) {
    console.error('Request failed:', error)
  } finally {
    setIsProcessing(false)
  }
}
```

## 📱 响应式设计

### 断点系统

模板使用Tailwind的响应式断点：

```tsx
<div className="
  grid 
  grid-cols-1     // 移动端：1列
  md:grid-cols-2  // 平板：2列  
  lg:grid-cols-3  // 桌面：3列
  gap-6
">
  {/* 内容 */}
</div>
```

### 移动端优化

```tsx
// 移动端隐藏/显示
<div className="hidden md:block">桌面端显示</div>
<div className="block md:hidden">移动端显示</div>

// 移动端导航
<button className="md:hidden" onClick={toggleMenu}>
  <Menu className="h-6 w-6" />
</button>
```

## 🔍 SEO优化

### 页面级SEO

```tsx
// 动态meta标签
export async function generateMetadata({ params }): Promise<Metadata> {
  const tool = await getTool(params.id)
  
  return {
    title: `${tool.name} - AI工具`,
    description: tool.description,
    keywords: tool.tags,
    openGraph: {
      title: tool.name,
      description: tool.description,
      images: [tool.previewImage],
    },
  }
}
```

### 结构化数据

```tsx
// src/components/structured-data.tsx
export function StructuredData({ data }: { data: any }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  )
}

// 使用示例
<StructuredData
  data={{
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "AI工具名称",
    "description": "工具描述",
    "applicationCategory": "Utility",
    "operatingSystem": "Web Browser"
  }}
/>
```

## 🗄️ 状态管理

### 使用Zustand

```tsx
// src/store/app-store.ts
import { create } from 'zustand'

interface AppState {
  files: File[]
  parameters: Record<string, any>
  results: ProcessResult[]
  setFiles: (files: File[]) => void
  setParameters: (params: Record<string, any>) => void
  addResult: (result: ProcessResult) => void
}

export const useAppStore = create<AppState>((set) => ({
  files: [],
  parameters: {},
  results: [],
  setFiles: (files) => set({ files }),
  setParameters: (parameters) => set({ parameters }),
  addResult: (result) => set((state) => ({ 
    results: [result, ...state.results] 
  })),
}))

// 组件中使用
const { files, setFiles } = useAppStore()
```

## 🧪 测试

### 单元测试示例

```tsx
// __tests__/components/file-upload.test.tsx
import { render, screen } from '@testing-library/react'
import { FileUpload } from '@/components/tool/file-upload'

describe('FileUpload', () => {
  it('renders upload area', () => {
    render(<FileUpload onFilesChange={() => {}} />)
    expect(screen.getByText(/拖拽文件到此处/)).toBeInTheDocument()
  })
})
```

### E2E测试

```typescript
// e2e/tool-workflow.spec.ts
import { test, expect } from '@playwright/test'

test('complete tool workflow', async ({ page }) => {
  await page.goto('/tools')
  
  // 上传文件
  await page.setInputFiles('input[type="file"]', 'test-file.jpg')
  
  // 调整参数
  await page.selectOption('select[name="quality"]', 'high')
  
  // 开始处理
  await page.click('button:has-text("开始处理")')
  
  // 验证结果
  await expect(page.locator('.result-item')).toBeVisible()
})
```

## 🚀 部署优化

### 构建优化

```javascript
// next.config.js
const nextConfig = {
  // 开启压缩
  compress: true,
  
  // 图片优化
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
  },
  
  // 实验性功能
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
}
```

### 性能监控

```tsx
// src/lib/analytics.ts
export function trackEvent(event: string, properties?: any) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', event, properties)
  }
}

// 使用示例
trackEvent('tool_used', {
  tool_name: 'image_processor',
  processing_time: 2500,
})
```

## 🐛 调试技巧

### 开发工具

```tsx
// 调试组件状态
const DebugPanel = () => {
  const state = useAppStore()
  
  if (process.env.NODE_ENV !== 'development') return null
  
  return (
    <div className="fixed bottom-4 right-4 bg-black text-white p-4 rounded">
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  )
}
```

### 错误边界

```tsx
// src/components/error-boundary.tsx
'use client'

import { Component, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="text-center p-8">
          <h2>出现错误</h2>
          <button onClick={() => this.setState({ hasError: false })}>
            重试
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
```

## ❓ 常见问题

### Q: 如何添加新的参数类型？

A: 在 `ParameterPanel` 组件中的 `renderParameterControl` 函数中添加新的case：

```tsx
case 'your_new_type':
  return (
    <YourCustomInput
      value={value}
      onChange={(newValue) => updateParameter(parameter.id, newValue)}
    />
  )
```

### Q: 如何自定义文件上传验证？

A: 修改 `FileUpload` 组件中的 `validateFile` 函数：

```tsx
const validateFile = (file: File): string | null => {
  // 自定义验证逻辑
  if (file.name.includes('invalid')) {
    return '文件名不符合要求'
  }
  return null
}
```

### Q: 如何添加多语言支持？

A: 使用next-intl或react-i18next：

```bash
npm install next-intl
```

详细配置参考 [next-intl文档](https://next-intl-docs.vercel.app/)。

---

需要更多帮助？请查看 [FAQ](./src/app/faq/page.tsx) 或 [创建Issue](../../issues)。