"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn, downloadFile, copyToClipboard } from "@/lib/utils"
import { 
  Download, 
  Copy, 
  Share2, 
  Eye, 
  Grid3X3, 
  List,
  Search,
  Filter,
  CheckCircle,
  Clock,
  AlertCircle
} from "lucide-react"
import type { ProcessResult } from "@/types"

export interface ResultDisplayProps {
  results: ProcessResult[]
  viewMode?: 'grid' | 'list'
  onViewModeChange?: (mode: 'grid' | 'list') => void
  onDownload?: (result: ProcessResult) => void
  onShare?: (result: ProcessResult) => void
  className?: string
}

export function ResultDisplay({
  results,
  viewMode = 'grid',
  onViewModeChange,
  onDownload,
  onShare,
  className
}: ResultDisplayProps) {
  const [searchTerm, setSearchTerm] = React.useState('')
  const [filterStatus, setFilterStatus] = React.useState<string>('all')
  const [selectedResults, setSelectedResults] = React.useState<string[]>([])

  // 过滤结果
  const filteredResults = React.useMemo(() => {
    return results.filter(result => {
      const matchesSearch = searchTerm === '' || 
        result.id.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesFilter = filterStatus === 'all' || result.status === filterStatus
      
      return matchesSearch && matchesFilter
    })
  }, [results, searchTerm, filterStatus])

  // 获取状态图标
  const getStatusIcon = (status: ProcessResult['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-success-600" />
      case 'processing':
        return <Clock className="h-4 w-4 text-warning-600 animate-spin" />
      case 'error':
        return <AlertCircle className="h-4 w-4 text-error-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  // 获取状态标签
  const getStatusBadge = (status: ProcessResult['status']) => {
    const variants = {
      pending: 'default',
      processing: 'warning',
      completed: 'success',
      error: 'destructive'
    } as const

    const labels = {
      pending: '等待中',
      processing: '处理中',
      completed: '已完成',
      error: '失败'
    }

    return (
      <Badge variant={variants[status]}>
        {labels[status]}
      </Badge>
    )
  }

  // 处理复制
  const handleCopy = async (result: ProcessResult) => {
    const success = await copyToClipboard(JSON.stringify(result.output, null, 2))
    if (success) {
      // 可以添加成功提示
      console.log('复制成功')
    }
  }

  // 处理下载
  const handleDownload = (result: ProcessResult) => {
    if (onDownload) {
      onDownload(result)
    } else {
      // 默认下载行为
      const content = JSON.stringify(result.output, null, 2)
      downloadFile(content, `result-${result.id}.json`, 'application/json')
    }
  }

  // 批量操作
  const handleBatchDownload = () => {
    const selected = results.filter(r => selectedResults.includes(r.id))
    selected.forEach(result => handleDownload(result))
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* 工具栏 */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-semibold">
            处理结果 ({filteredResults.length})
          </h3>
          
          {selectedResults.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">
                已选择 {selectedResults.length} 项
              </span>
              <Button size="sm" onClick={handleBatchDownload}>
                批量下载
              </Button>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-4">
          {/* 搜索 */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="搜索结果..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg text-sm w-64"
            />
          </div>

          {/* 状态过滤 */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border rounded-lg text-sm"
          >
            <option value="all">全部状态</option>
            <option value="completed">已完成</option>
            <option value="processing">处理中</option>
            <option value="error">失败</option>
          </select>

          {/* 视图切换 */}
          <div className="flex border rounded-lg">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange?.('grid')}
              className="rounded-r-none"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange?.('list')}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* 结果展示 */}
      {filteredResults.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="text-center space-y-2">
              <div className="text-muted-foreground">暂无结果</div>
              <div className="text-sm text-muted-foreground">
                {results.length === 0 ? '开始处理文件来查看结果' : '没有符合条件的结果'}
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className={cn(
          viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            : "space-y-4"
        )}>
          {filteredResults.map((result) => (
            <Card key={result.id} hover className="group">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <CardTitle className="text-base">
                        结果 #{result.id.slice(0, 8)}
                      </CardTitle>
                      {getStatusIcon(result.status)}
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(result.status)}
                      {result.processingTime && (
                        <Badge variant="outline">
                          {result.processingTime}ms
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <input
                    type="checkbox"
                    checked={selectedResults.includes(result.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedResults(prev => [...prev, result.id])
                      } else {
                        setSelectedResults(prev => prev.filter(id => id !== result.id))
                      }
                    }}
                    className="h-4 w-4 text-primary-600 rounded border-gray-300"
                  />
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* 结果预览 */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                  <div className="text-xs text-muted-foreground mb-2">输出预览</div>
                  <pre className="text-xs overflow-hidden text-ellipsis">
                    {JSON.stringify(result.output, null, 2).slice(0, 200)}
                    {JSON.stringify(result.output).length > 200 && '...'}
                  </pre>
                </div>

                {/* 操作按钮 */}
                <div className="flex items-center justify-between">
                  <div className="text-xs text-muted-foreground">
                    {result.createdAt.toLocaleString()}
                  </div>
                  
                  <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopy(result)}
                      disabled={result.status !== 'completed'}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDownload(result)}
                      disabled={result.status !== 'completed'}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    
                    {onShare && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onShare(result)}
                        disabled={result.status !== 'completed'}
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}