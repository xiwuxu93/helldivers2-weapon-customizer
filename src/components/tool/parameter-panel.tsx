"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RotateCcw, Info } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ToolParameter } from "@/types"

export interface ParameterPanelProps {
  parameters: ToolParameter[]
  values: Record<string, any>
  onChange: (values: Record<string, any>) => void
  onReset?: () => void
  className?: string
}

export function ParameterPanel({
  parameters,
  values,
  onChange,
  onReset,
  className
}: ParameterPanelProps) {
  // 参数分组
  const groupedParameters = React.useMemo(() => {
    const groups: Record<string, ToolParameter[]> = {}
    
    parameters.forEach(param => {
      const category = 'Basic Settings'
      if (!groups[category]) {
        groups[category] = []
      }
      groups[category].push(param)
    })
    
    return groups
  }, [parameters])

  // 更新单个参数值
  const updateParameter = (paramId: string, value: any) => {
    onChange({
      ...values,
      [paramId]: value
    })
  }

  // 重置所有参数
  const handleReset = () => {
    const defaultValues: Record<string, any> = {}
    parameters.forEach(param => {
      defaultValues[param.id] = param.defaultValue
    })
    onChange(defaultValues)
    onReset?.()
  }

  // 渲染不同类型的参数控件
  const renderParameterControl = (parameter: ToolParameter) => {
    const value = values[parameter.id] ?? parameter.defaultValue

    switch (parameter.type) {
      case 'string':
        return (
          <Input
            value={value || ''}
            onChange={(e) => updateParameter(parameter.id, e.target.value)}
            placeholder=""
          />
        )

      case 'number':
        return (
          <Input
            type="number"
            value={value || ''}
            onChange={(e) => updateParameter(parameter.id, Number(e.target.value))}
            min={parameter.min}
            max={parameter.max}
            step={parameter.step}
            placeholder=""
          />
        )

      case 'boolean':
        return (
          <div className="flex items-center space-x-2">
            <Switch
              checked={value || false}
              onCheckedChange={(checked) => updateParameter(parameter.id, checked)}
            />
            <span className="text-sm text-muted-foreground">
              {value ? 'On' : 'Off'}
            </span>
          </div>
        )

      case 'select':
        return (
          <Select
            value={value?.toString() || ''}
            onValueChange={(newValue) => {
              // 尝试转换为数字，如果原始值是数字的话
              const option = parameter.options?.find(opt => opt.value.toString() === newValue)
              updateParameter(parameter.id, option?.value || newValue)
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Please select..." />
            </SelectTrigger>
            <SelectContent>
              {parameter.options?.map((option) => (
                <SelectItem key={option.value.toString()} value={option.value.toString()}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )

      case 'range':
        return (
          <div className="space-y-3">
            <Slider
              value={[value || parameter.defaultValue || 0]}
              onValueChange={(newValue) => updateParameter(parameter.id, newValue[0])}
              min={parameter.min || 0}
              max={parameter.max || 100}
              step={parameter.step || 1}
              className="flex-1"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{parameter.min || 0}</span>
              <span className="font-medium">{value}</span>
              <span>{parameter.max || 100}</span>
            </div>
          </div>
        )

      case 'color':
        return (
          <div className="flex items-center space-x-3">
            <input
              type="color"
              value={value || '#000000'}
              onChange={(e) => updateParameter(parameter.id, e.target.value)}
              className="h-10 w-16 rounded-md border border-input cursor-pointer"
            />
            <Input
              value={value || '#000000'}
              onChange={(e) => updateParameter(parameter.id, e.target.value)}
              placeholder="#000000"
              className="flex-1"
            />
          </div>
        )

      default:
        return (
          <Input
            value={value || ''}
            onChange={(e) => updateParameter(parameter.id, e.target.value)}
            placeholder=""
          />
        )
    }
  }

  return (
    <div className={cn("space-y-6", className)}>
      {Object.entries(groupedParameters).map(([category, categoryParams]) => (
        <Card key={category}>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{category}</CardTitle>
              {category === Object.keys(groupedParameters)[0] && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReset}
                  className="text-xs"
                >
                  <RotateCcw className="h-3 w-3 mr-1" />
                  Reset
                </Button>
              )}
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {categoryParams.map((parameter) => (
              <div key={parameter.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor={parameter.id} className="text-sm font-medium">
                    {parameter.label}
                    {parameter.required && (
                      <span className="text-error-500 ml-1">*</span>
                    )}
                  </Label>
                  
                  {parameter.description && (
                    <div className="group relative">
                      <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                      <div className="absolute right-0 top-6 w-64 p-2 bg-popover text-popover-foreground text-xs rounded-md border shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                        {parameter.description}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="space-y-1">
                  {renderParameterControl(parameter)}
                  
                  {/* 参数提示信息 */}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}

      {/* 参数预览卡片 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Parameter Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {parameters.map((param) => {
              const value = values[param.id] ?? param.defaultValue
              return (
                <div key={param.id} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{param.label}:</span>
                  <span className="font-mono text-xs">
                    {typeof value === 'boolean' 
                      ? (value ? 'Yes' : 'No')
                      : value?.toString() || 'Not set'
                    }
                  </span>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}