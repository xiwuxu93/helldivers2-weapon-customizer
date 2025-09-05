export interface ToolParameter {
  id: string
  name: string
  label: string
  type: 'string' | 'number' | 'boolean' | 'select' | 'range' | 'color'
  defaultValue: any
  value: any
  category?: string
  options?: Array<{ label: string; value: any }>
  min?: number
  max?: number
  step?: number
  required?: boolean
  description?: string
  hint?: string
  placeholder?: string
}