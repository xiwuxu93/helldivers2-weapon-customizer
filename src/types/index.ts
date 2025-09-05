/**
 * 基础类型定义
 */
export interface BaseEntity {
  id: string
  createdAt: Date
  updatedAt: Date
}

/**
 * API响应类型
 */
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

/**
 * 分页类型
 */
export interface Pagination {
  page: number
  limit: number
  total: number
  totalPages: number
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: Pagination
}

/**
 * 文件相关类型
 */
export interface FileInfo {
  id: string
  name: string
  size: number
  type: string
  url?: string
  extension: string
  uploadedAt: Date
}

export interface UploadProgress {
  fileId: string
  progress: number
  status: 'pending' | 'uploading' | 'completed' | 'error'
  error?: string
}

/**
 * 工具参数类型
 */
export interface ToolParameter {
  id: string
  name: string
  label: string
  type: 'string' | 'number' | 'boolean' | 'select' | 'range' | 'color'
  defaultValue: any
  value: any
  options?: Array<{ label: string; value: any }>
  min?: number
  max?: number
  step?: number
  required?: boolean
  description?: string
}

export interface ToolConfig {
  id: string
  name: string
  description: string
  parameters: ToolParameter[]
  category: string
  tags: string[]
}

/**
 * 处理结果类型
 */
export interface ProcessResult {
  id: string
  toolId: string
  input: any
  output: any
  status: 'pending' | 'processing' | 'completed' | 'error'
  progress?: number
  error?: string
  createdAt: Date
  completedAt?: Date
  processingTime?: number
}

/**
 * 用户设置类型
 */
export interface UserSettings {
  theme: 'light' | 'dark' | 'system'
  language: 'zh' | 'en' | 'ja'
  autoSave: boolean
  notifications: boolean
  maxFileSize: number
  defaultParameters: Record<string, any>
}

/**
 * 通知类型
 */
export interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message: string
  duration?: number
  actions?: Array<{
    label: string
    action: () => void
  }>
  createdAt: Date
}

/**
 * 导航菜单类型
 */
export interface NavItem {
  id: string
  label: string
  href: string
  icon?: string
  badge?: string
  children?: NavItem[]
  external?: boolean
}

/**
 * 页面元数据类型
 */
export interface PageMeta {
  title: string
  description: string
  keywords?: string[]
  image?: string
  url?: string
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  author?: string
  section?: string
}

/**
 * 功能特性类型
 */
export interface Feature {
  id: string
  title: string
  description: string
  icon: string
  category: string
  highlighted?: boolean
}

/**
 * 统计数据类型
 */
export interface Statistics {
  totalUsers: number
  totalFiles: number
  totalProcesses: number
  successRate: number
  averageProcessingTime: number
}

/**
 * FAQ类型
 */
export interface FAQ {
  id: string
  question: string
  answer: string
  category: string
  tags: string[]
  helpful: number
  notHelpful: number
  createdAt: Date
  updatedAt: Date
}

/**
 * 示例类型
 */
export interface Example {
  id: string
  title: string
  description: string
  category: string
  difficulty: 'basic' | 'intermediate' | 'advanced'
  input: any
  output: any
  parameters: Record<string, any>
  tags: string[]
  previewImage?: string
  featured?: boolean
}

/**
 * 更新日志类型
 */
export interface Changelog {
  id: string
  version: string
  date: Date
  type: 'major' | 'minor' | 'patch'
  changes: Array<{
    type: 'feature' | 'improvement' | 'bugfix' | 'breaking'
    description: string
  }>
  breaking?: boolean
}

/**
 * 联系表单类型
 */
export interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
  type: 'bug' | 'feature' | 'question' | 'other'
}

/**
 * 搜索结果类型
 */
export interface SearchResult {
  id: string
  title: string
  description: string
  url: string
  type: 'page' | 'feature' | 'faq' | 'example'
  relevance: number
}

/**
 * 主题类型
 */
export type Theme = 'light' | 'dark' | 'system'

/**
 * 语言类型
 */
export type Language = 'zh' | 'en' | 'ja'

/**
 * 设备类型
 */
export type DeviceType = 'mobile' | 'tablet' | 'desktop'

/**
 * 错误类型
 */
export interface AppError {
  code: string
  message: string
  details?: any
  timestamp: Date
  userId?: string
  sessionId?: string
  url?: string
  userAgent?: string
}

/**
 * 性能指标类型
 */
export interface PerformanceMetrics {
  loadTime: number
  renderTime: number
  interactionTime: number
  memoryUsage: number
  networkLatency: number
  errorRate: number
}