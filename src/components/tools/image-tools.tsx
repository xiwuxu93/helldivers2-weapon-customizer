"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileUpload } from "@/components/tool/file-upload"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { downloadFile } from "@/lib/utils"
import { imageTools } from "@/lib/frontend-tools"
import { 
  Image as ImageIcon, 
  Download, 
  RotateCcw, 
  Palette,
  Crop,
  Maximize2,
  Filter
} from "lucide-react"

interface ProcessedImage {
  id: string
  name: string
  blob: Blob
  url: string
  size: number
  originalSize?: number
}

export function ImageTools() {
  const [originalFiles, setOriginalFiles] = React.useState<File[]>([])
  const [selectedTool, setSelectedTool] = React.useState<string>('resize')
  const [processedImages, setProcessedImages] = React.useState<ProcessedImage[]>([])
  const [isProcessing, setIsProcessing] = React.useState(false)
  const [progress, setProgress] = React.useState(0)

  // Tool parameters
  const [maxWidth, setMaxWidth] = React.useState(800)
  const [maxHeight, setMaxHeight] = React.useState(600)
  const [quality, setQuality] = React.useState(90)
  const [outputFormat, setOutputFormat] = React.useState<'image/jpeg' | 'image/png' | 'image/webp'>('image/jpeg')
  const [filterType, setFilterType] = React.useState<'grayscale' | 'sepia' | 'blur' | 'brightness' | 'contrast'>('grayscale')
  const [filterIntensity, setFilterIntensity] = React.useState(1)

  const tools = [
    { id: 'resize', name: 'Resize Images', icon: Maximize2, description: 'Resize images while maintaining aspect ratio' },
    { id: 'convert', name: 'Convert Format', icon: Crop, description: 'Convert between JPEG, PNG, and WebP formats' },
    { id: 'filter', name: 'Apply Filters', icon: Filter, description: 'Apply visual filters like grayscale, sepia, blur' },
  ]

  const formats = [
    { value: 'image/jpeg', label: 'JPEG', extension: '.jpg' },
    { value: 'image/png', label: 'PNG', extension: '.png' },
    { value: 'image/webp', label: 'WebP', extension: '.webp' },
  ]

  const filters = [
    { value: 'grayscale', label: 'Grayscale' },
    { value: 'sepia', label: 'Sepia' },
    { value: 'blur', label: 'Blur' },
    { value: 'brightness', label: 'Brightness' },
    { value: 'contrast', label: 'Contrast' },
  ]

  const processImages = async () => {
    if (originalFiles.length === 0) return

    setIsProcessing(true)
    setProgress(0)
    setProcessedImages([])

    const results: ProcessedImage[] = []

    for (let i = 0; i < originalFiles.length; i++) {
      const file = originalFiles[i]
      
      try {
        let processedBlob: Blob

        switch (selectedTool) {
          case 'resize':
            processedBlob = await imageTools.resizeImage(file, maxWidth, maxHeight, quality / 100)
            break
          case 'convert':
            processedBlob = await imageTools.convertFormat(file, outputFormat, quality / 100)
            break
          case 'filter':
            processedBlob = await imageTools.applyFilter(file, filterType, filterIntensity)
            break
          default:
            continue
        }

        const url = URL.createObjectURL(processedBlob)
        const extension = formats.find(f => f.value === outputFormat)?.extension || 
                          (selectedTool === 'resize' ? '.jpg' : '.jpg')
        const baseName = file.name.replace(/\.[^/.]+$/, '')
        
        results.push({
          id: Math.random().toString(36).substr(2, 9),
          name: selectedTool === 'convert' ? `${baseName}${extension}` : `${baseName}_${selectedTool}${extension}`,
          blob: processedBlob,
          url,
          size: processedBlob.size,
          originalSize: file.size
        })
      } catch (error) {
        console.error('Error processing image:', error)
      }

      setProgress(((i + 1) / originalFiles.length) * 100)
    }

    setProcessedImages(results)
    setIsProcessing(false)
  }

  const downloadImage = (image: ProcessedImage) => {
    downloadFile(image.blob, image.name)
  }

  const downloadAll = () => {
    processedImages.forEach(image => {
      downloadImage(image)
    })
  }

  const reset = () => {
    setOriginalFiles([])
    setProcessedImages([])
    setProgress(0)
    processedImages.forEach(img => URL.revokeObjectURL(img.url))
  }

  const getCurrentTool = () => tools.find(t => t.id === selectedTool)
  const ToolIcon = getCurrentTool()?.icon || ImageIcon

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  // Cleanup URLs on unmount
  React.useEffect(() => {
    return () => {
      processedImages.forEach(img => URL.revokeObjectURL(img.url))
    }
  }, [])

  return (
    <div className="space-y-6">
      {/* Tool Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <ImageIcon className="h-5 w-5 text-primary-600" />
            <span>Image Processing Tools</span>
          </CardTitle>
          <p className="text-muted-foreground">
            Resize, convert, and filter images directly in your browser - no uploads required
          </p>
        </CardHeader>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Upload Images</CardTitle>
            </CardHeader>
            <CardContent>
              <FileUpload
                accept="image/*"
                maxSize={10 * 1024 * 1024} // 10MB
                maxFiles={10}
                onFilesChange={setOriginalFiles}
                disabled={isProcessing}
              />
              {originalFiles.length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="text-sm font-medium">
                    Selected Files ({originalFiles.length}):
                  </p>
                  <div className="space-y-1">
                    {originalFiles.map((file, index) => (
                      <div key={index} className="text-xs text-muted-foreground flex justify-between">
                        <span>{file.name}</span>
                        <span>{formatFileSize(file.size)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tool Selection */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Select Tool</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {tools.map((tool) => {
                  const Icon = tool.icon
                  return (
                    <button
                      key={tool.id}
                      onClick={() => setSelectedTool(tool.id)}
                      className={`flex items-start space-x-3 p-3 rounded-lg border transition-colors text-left w-full ${
                        selectedTool === tool.id
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                    >
                      <Icon className="h-4 w-4 text-primary-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium">{tool.name}</div>
                        <div className="text-xs text-muted-foreground">{tool.description}</div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Parameters Section */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Parameters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {selectedTool === 'resize' && (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Max Width: {maxWidth}px</label>
                    <Slider
                      value={[maxWidth]}
                      onValueChange={([value]) => setMaxWidth(value)}
                      min={100}
                      max={2000}
                      step={50}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Max Height: {maxHeight}px</label>
                    <Slider
                      value={[maxHeight]}
                      onValueChange={([value]) => setMaxHeight(value)}
                      min={100}
                      max={2000}
                      step={50}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Quality: {quality}%</label>
                    <Slider
                      value={[quality]}
                      onValueChange={([value]) => setQuality(value)}
                      min={10}
                      max={100}
                      step={5}
                    />
                  </div>
                </>
              )}

              {selectedTool === 'convert' && (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Output Format:</label>
                    <Select value={outputFormat} onValueChange={(value: any) => setOutputFormat(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {formats.map((format) => (
                          <SelectItem key={format.value} value={format.value}>
                            {format.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Quality: {quality}%</label>
                    <Slider
                      value={[quality]}
                      onValueChange={([value]) => setQuality(value)}
                      min={10}
                      max={100}
                      step={5}
                    />
                  </div>
                </>
              )}

              {selectedTool === 'filter' && (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Filter Type:</label>
                    <Select value={filterType} onValueChange={(value: any) => setFilterType(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {filters.map((filter) => (
                          <SelectItem key={filter.value} value={filter.value}>
                            {filter.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Intensity: {filterType === 'blur' ? `${filterIntensity}px` : filterIntensity}
                    </label>
                    <Slider
                      value={[filterIntensity]}
                      onValueChange={([value]) => setFilterIntensity(value)}
                      min={filterType === 'blur' ? 0 : 0}
                      max={filterType === 'blur' ? 10 : 2}
                      step={filterType === 'blur' ? 0.5 : 0.1}
                    />
                  </div>
                </>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <Button
                  onClick={processImages}
                  disabled={originalFiles.length === 0 || isProcessing}
                  className="flex-1"
                >
                  {isProcessing ? 'Processing...' : 'Process Images'}
                </Button>
                <Button
                  variant="outline"
                  onClick={reset}
                  disabled={originalFiles.length === 0 && processedImages.length === 0}
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>

              {/* Progress */}
              {isProcessing && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Processing images...</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} />
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Results</CardTitle>
                {processedImages.length > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={downloadAll}
                    className="flex items-center space-x-2"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download All</span>
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {processedImages.length > 0 ? (
                <div className="space-y-4">
                  {processedImages.map((image) => (
                    <div key={image.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="font-medium text-sm">{image.name}</p>
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                            <span>{formatFileSize(image.size)}</span>
                            {image.originalSize && (
                              <span>
                                ({Math.round((1 - image.size / image.originalSize) * 100)}% smaller)
                              </span>
                            )}
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => downloadImage(image)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                      <img
                        src={image.url}
                        alt={image.name}
                        className="w-full h-32 object-cover rounded border"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <ToolIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Upload images and click process to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}