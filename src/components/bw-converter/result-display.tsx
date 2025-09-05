'use client'

import React, { useRef, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Download, Eye, EyeOff, RotateCcw, Loader2 } from 'lucide-react'
import { DOWNLOAD_FORMATS, DownloadFormat } from '@/types/image-processing'

interface ResultDisplayProps {
  originalImageBitmap: ImageBitmap | null
  processedImageData: ImageData | null
  isProcessing: boolean
  onDownload: (format: DownloadFormat) => void
  onReset: () => void
  className?: string
  simplified?: boolean
}

export function ResultDisplay({ 
  originalImageBitmap, 
  processedImageData, 
  isProcessing, 
  onDownload, 
  onReset,
  className = '',
  simplified = false
}: ResultDisplayProps) {
  const originalCanvasRef = useRef<HTMLCanvasElement>(null)
  const processedCanvasRef = useRef<HTMLCanvasElement>(null)
  const [showComparison, setShowComparison] = useState(!simplified)
  const [selectedFormat, setSelectedFormat] = useState<DownloadFormat>(DOWNLOAD_FORMATS[0])
  const [isDownloading, setIsDownloading] = useState(false)

  // Draw original image
  useEffect(() => {
    if (originalImageBitmap && originalCanvasRef.current) {
      const canvas = originalCanvasRef.current
      const ctx = canvas.getContext('2d')
      if (ctx) {
        // Calculate display dimensions
        const maxWidth = 400
        const maxHeight = 300
        const aspectRatio = originalImageBitmap.width / originalImageBitmap.height
        
        let displayWidth, displayHeight
        if (aspectRatio > maxWidth / maxHeight) {
          displayWidth = maxWidth
          displayHeight = maxWidth / aspectRatio
        } else {
          displayHeight = maxHeight
          displayWidth = maxHeight * aspectRatio
        }

        canvas.width = displayWidth
        canvas.height = displayHeight
        ctx.drawImage(originalImageBitmap, 0, 0, displayWidth, displayHeight)
      }
    }
  }, [originalImageBitmap])

  // Draw processed image
  useEffect(() => {
    if (processedImageData && processedCanvasRef.current) {
      const canvas = processedCanvasRef.current
      const ctx = canvas.getContext('2d')
      if (ctx) {
        canvas.width = processedImageData.width
        canvas.height = processedImageData.height
        ctx.putImageData(processedImageData, 0, 0)
      }
    }
  }, [processedImageData])

  const handleDownload = async () => {
    setIsDownloading(true)
    try {
      await onDownload(selectedFormat)
    } finally {
      setIsDownloading(false)
    }
  }

  if (!originalImageBitmap) {
    return null
  }

  return (
    <Card className={`${simplified ? 'p-4' : 'p-6'} ${className}`}>
      {!simplified && (
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Preview & Download
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Compare original and processed images
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowComparison(!showComparison)}
            >
              {showComparison ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
              {showComparison ? 'Hide' : 'Show'} Original
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={onReset}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              New Image
            </Button>
          </div>
        </div>
      )}

      <div className={`grid gap-6 ${showComparison && !simplified ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
        {/* Original Image */}
        {showComparison && !simplified && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-gray-900 dark:text-gray-100">Original</h4>
              <Badge variant="secondary">Color</Badge>
            </div>
            <div className="relative bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden">
              <canvas
                ref={originalCanvasRef}
                className="max-w-full h-auto"
                style={{ display: 'block', margin: '0 auto' }}
              />
            </div>
          </div>
        )}

        {/* Processed Image */}
        <div className="space-y-3">
          {!simplified && (
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-gray-900 dark:text-gray-100">
                Black & White
              </h4>
              <div className="flex items-center space-x-2">
                {isProcessing ? (
                  <Badge variant="secondary" className="animate-pulse">
                    <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                    Processing...
                  </Badge>
                ) : processedImageData ? (
                  <Badge variant="default">Ready</Badge>
                ) : (
                  <Badge variant="outline">Waiting</Badge>
                )}
              </div>
            </div>
          )}
          
          <div className={`relative bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden ${simplified ? 'min-h-[300px]' : 'min-h-[200px]'} flex items-center justify-center`}>
            {isProcessing && (
              <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 flex items-center justify-center z-10">
                <div className="text-center">
                  <Loader2 className="w-8 h-8 animate-spin text-primary-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">Processing image...</p>
                </div>
              </div>
            )}
            
            <canvas
              ref={processedCanvasRef}
              className={`max-w-full h-auto ${isProcessing ? 'opacity-50' : ''} ${simplified ? 'max-h-[400px]' : ''}`}
              style={{ display: processedImageData ? 'block' : 'none', margin: '0 auto' }}
            />
            
            {!processedImageData && !isProcessing && (
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {simplified ? 'Upload an image to convert to black and white' : 'Adjust settings to see preview'}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Download Section */}
      {processedImageData && !isProcessing && (
        <div className={`${simplified ? 'mt-4' : 'mt-6 pt-6 border-t border-gray-200 dark:border-gray-700'}`}>
          {simplified ? (
            // Simplified download for basic users
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
              <Button 
                onClick={handleDownload}
                disabled={isDownloading}
                size="lg"
                className="w-full sm:w-auto"
              >
                {isDownloading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Preparing Download...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    Download Black And White Image
                  </>
                )}
              </Button>
              
              <Button
                variant="outline"
                onClick={onReset}
                className="w-full sm:w-auto"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Convert Another Image
              </Button>
            </div>
          ) : (
            // Full download options for advanced users
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                  Download Options
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Choose format and download your converted image
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Select
                  value={selectedFormat.value}
                  onValueChange={(value) => {
                    const format = DOWNLOAD_FORMATS.find(f => f.value === value)
                    if (format) setSelectedFormat(format)
                  }}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {DOWNLOAD_FORMATS.map((format) => (
                      <SelectItem key={format.value} value={format.value}>
                        {format.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Button 
                  onClick={handleDownload}
                  disabled={isDownloading}
                  size="lg"
                >
                  {isDownloading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Preparing...
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </Card>
  )
}