"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { FileUpload } from "@/components/tool/file-upload"
import { ParameterPanel } from "@/components/tool/parameter-panel"
import { ResultDisplay } from "@/components/tool/result-display"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, Square, RotateCcw } from "lucide-react"
import type { ToolParameter, ProcessResult } from "@/types"

export function ToolDemo() {
  const [files, setFiles] = React.useState<File[]>([])
  const [isProcessing, setIsProcessing] = React.useState(false)
  const [progress, setProgress] = React.useState(0)
  const [results, setResults] = React.useState<ProcessResult[]>([])
  const [parameters, setParameters] = React.useState<Record<string, any>>({})

  // 工具参数配置
  const toolParameters: ToolParameter[] = [
    {
      id: 'quality',
      name: 'quality',
      label: '输出质量',
      type: 'select',
      defaultValue: 'high',
      value: 'high',
      options: [
        { label: '低质量（快速）', value: 'low' },
        { label: '中等质量', value: 'medium' },
        { label: '高质量（推荐）', value: 'high' },
        { label: '超高质量（慢）', value: 'ultra' }
      ],
      description: '选择输出质量，高质量需要更长处理时间',
      required: true
    },
    {
      id: 'removeBackground',
      name: 'removeBackground',
      label: '移除背景',
      type: 'boolean',
      defaultValue: false,
      value: false,
      description: '自动移除图片背景，生成透明背景'
    },
    {
      id: 'brightness',
      name: 'brightness',
      label: '亮度调节',
      type: 'range',
      defaultValue: 0,
      value: 0,
      min: -100,
      max: 100,
      step: 1,
      description: '调整图片亮度，负值变暗，正值变亮'
    },
    {
      id: 'contrast',
      name: 'contrast',
      label: '对比度',
      type: 'range',
      defaultValue: 0,
      value: 0,
      min: -100,
      max: 100,
      step: 1,
      description: '调整图片对比度'
    },
    {
      id: 'outputFormat',
      name: 'outputFormat',
      label: '输出格式',
      type: 'select',
      defaultValue: 'png',
      value: 'png',
      options: [
        { label: 'PNG', value: 'png' },
        { label: 'JPEG', value: 'jpeg' },
        { label: 'WebP', value: 'webp' }
      ],
      description: '选择输出图片格式'
    },
    {
      id: 'compressionLevel',
      name: 'compressionLevel',
      label: '压缩级别',
      type: 'range',
      defaultValue: 80,
      value: 80,
      min: 10,
      max: 100,
      step: 5,
      description: '压缩级别，数值越高质量越好但文件越大'
    }
  ]

  // 初始化参数
  React.useEffect(() => {
    const defaultParams: Record<string, any> = {}
    toolParameters.forEach(param => {
      defaultParams[param.id] = param.defaultValue
    })
    setParameters(defaultParams)
  }, [])

  // 模拟处理过程
  const simulateProcessing = async (file: File) => {
    const result: ProcessResult = {
      id: Math.random().toString(36).substr(2, 9),
      toolId: 'demo-tool',
      input: {
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type
      },
      output: null,
      status: 'processing',
      createdAt: new Date()
    }

    // 添加到结果列表
    setResults(prev => [result, ...prev])

    // 模拟处理进度
    for (let i = 0; i <= 100; i += 10) {
      setProgress(i)
      await new Promise(resolve => setTimeout(resolve, 200))
      
      if (!isProcessing) break // 允许取消
    }

    // 完成处理
    const completedResult: ProcessResult = {
      ...result,
      status: 'completed',
      output: {
        fileName: `processed_${file.name}`,
        url: URL.createObjectURL(file), // 演示用
        size: Math.round(file.size * 0.8), // 模拟压缩
        format: parameters.outputFormat || 'png',
        quality: parameters.quality || 'high',
        parameters: parameters
      },
      completedAt: new Date(),
      processingTime: 2000 + Math.random() * 3000
    }

    setResults(prev => 
      prev.map(r => r.id === result.id ? completedResult : r)
    )
  }

  // 开始处理
  const handleProcess = async () => {
    if (files.length === 0) {
      alert('请先上传文件')
      return
    }

    setIsProcessing(true)
    setProgress(0)

    for (const file of files) {
      if (!isProcessing) break
      await simulateProcessing(file)
    }

    setIsProcessing(false)
    setProgress(0)
  }

  // 停止处理
  const handleStop = () => {
    setIsProcessing(false)
    setProgress(0)
  }

  // 重置所有
  const handleReset = () => {
    setFiles([])
    setResults([])
    setProgress(0)
    setIsProcessing(false)
    
    // 重置参数
    const defaultParams: Record<string, any> = {}
    toolParameters.forEach(param => {
      defaultParams[param.id] = param.defaultValue
    })
    setParameters(defaultParams)
  }

  return (
    <div className="space-y-8">
      {/* 工具状态栏 */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Badge variant={isProcessing ? 'warning' : 'secondary'}>
                {isProcessing ? '处理中' : '就绪'}
              </Badge>
              {files.length > 0 && (
                <span className="text-sm text-muted-foreground">
                  已选择 {files.length} 个文件
                </span>
              )}
              {results.length > 0 && (
                <span className="text-sm text-muted-foreground">
                  已处理 {results.filter(r => r.status === 'completed').length} 个文件
                </span>
              )}
            </div>

            <div className="flex items-center space-x-2">
              {!isProcessing ? (
                <>
                  <Button
                    onClick={handleProcess}
                    disabled={files.length === 0}
                    className="flex items-center space-x-2"
                  >
                    <Play className="h-4 w-4" />
                    <span>开始处理</span>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleReset}
                    disabled={files.length === 0 && results.length === 0}
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <Button
                  variant="destructive"
                  onClick={handleStop}
                  className="flex items-center space-x-2"
                >
                  <Square className="h-4 w-4" />
                  <span>停止处理</span>
                </Button>
              )}
            </div>
          </div>

          {/* 处理进度 */}
          {isProcessing && (
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>处理进度</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} />
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* 左侧：文件上传和参数面板 */}
        <div className="lg:col-span-1 space-y-6">
          {/* 文件上传 */}
          <Card>
            <CardHeader>
              <CardTitle>文件上传</CardTitle>
            </CardHeader>
            <CardContent>
              <FileUpload
                accept="image/*"
                maxSize={10 * 1024 * 1024} // 10MB
                maxFiles={5}
                onFilesChange={setFiles}
                disabled={isProcessing}
              />
            </CardContent>
          </Card>

          {/* 参数控制面板 */}
          <ParameterPanel
            parameters={toolParameters}
            values={parameters}
            onChange={setParameters}
            onReset={() => {
              const defaultParams: Record<string, any> = {}
              toolParameters.forEach(param => {
                defaultParams[param.id] = param.defaultValue
              })
              setParameters(defaultParams)
            }}
          />
        </div>

        {/* 右侧：结果展示 */}
        <div className="lg:col-span-2">
          <ResultDisplay
            results={results}
            viewMode="grid"
            onDownload={(result) => {
              console.log('下载结果:', result)
              // 实际实现中可以触发文件下载
            }}
            onShare={(result) => {
              console.log('分享结果:', result)
              // 实际实现中可以生成分享链接
            }}
          />
        </div>
      </div>

      {/* 工具说明 */}
      <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
            🎯 工具演示说明
          </h3>
          <div className="text-blue-800 dark:text-blue-200 space-y-2 text-sm">
            <p>• 这是一个完整的AI工具界面演示，展示了文件上传、参数调节和结果展示的完整流程</p>
            <p>• 支持拖拽上传、实时参数调节、进度显示和结果管理等功能</p>
            <p>• 实际部署时只需要替换处理逻辑，界面和交互无需修改</p>
            <p>• 所有组件都支持深色模式和响应式设计</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}