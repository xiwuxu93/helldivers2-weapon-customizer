'use client'

import React, { useState, useCallback, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Upload, 
  Download, 
  Archive, 
  Image as ImageIcon, 
  Trash2, 
  RefreshCw,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react'
import { 
  ProcessedImage, 
  DEFAULT_PRESETS, 
  BatchWorkerMessage, 
  BatchWorkerResponse
} from '@/types/image-processing'
import { ContentAd } from '@/components/ads/ad-placements'

export default function BatchPage() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [processedImages, setProcessedImages] = useState<ProcessedImage[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingProgress, setProcessingProgress] = useState(0)
  
  const workerRef = useRef<Worker | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Initialize batch worker
  React.useEffect(() => {
    if (typeof window !== 'undefined' && window.Worker) {
      workerRef.current = new Worker('/batch-worker.js')
      workerRef.current.onmessage = handleWorkerMessage
      workerRef.current.onerror = handleWorkerError
    }

    return () => {
      if (workerRef.current) {
        workerRef.current.terminate()
      }
    }
  }, [])

  const handleWorkerMessage = (e: MessageEvent<BatchWorkerResponse>) => {
    const { processedImageData, fileIdentifier } = e.data
    
    setProcessedImages(prev => prev.map(img => {
      if (img.id === fileIdentifier) {
        // Create blob from processed image data
        const canvas = document.createElement('canvas')
        canvas.width = processedImageData.width
        canvas.height = processedImageData.height
        const ctx = canvas.getContext('2d')
        if (ctx) {
          ctx.putImageData(processedImageData, 0, 0)
          
          // Create preview URL immediately
          const previewUrl = canvas.toDataURL('image/png')
          
          canvas.toBlob(blob => {
            if (blob) {
              setProcessedImages(current => current.map(item => 
                item.id === fileIdentifier 
                  ? { ...item, processedBlob: blob, processedPreviewUrl: previewUrl, processingStatus: 'completed' }
                  : item
              ))
            }
          }, 'image/png')
        }
        return { ...img, processingStatus: 'completed' as const }
      }
      return img
    }))

    // Update progress
    setProcessingProgress(prev => {
      const newProgress = prev + (100 / selectedFiles.length)
      if (newProgress >= 100) {
        setIsProcessing(false)
        return 100
      }
      return newProgress
    })
  }

  const handleWorkerError = (error: ErrorEvent) => {
    console.error('Batch Worker error:', error)
    setIsProcessing(false)
  }

  const handleFilesSelect = useCallback((files: FileList | File[]) => {
    const fileArray = Array.from(files).filter(file => file.type.startsWith('image/'))
    setSelectedFiles(fileArray)
    
    const processedImagesList: ProcessedImage[] = fileArray.map((file, index) => ({
      id: `${Date.now()}_${index}`,
      originalFile: file,
      processingStatus: 'pending',
      originalPreviewUrl: URL.createObjectURL(file)
    }))
    
    setProcessedImages(processedImagesList)
    setProcessingProgress(0)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (e.dataTransfer.files) {
      handleFilesSelect(e.dataTransfer.files)
    }
  }, [handleFilesSelect])

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFilesSelect(e.target.files)
    }
  }, [handleFilesSelect])

  const processAllImages = useCallback(async () => {
    if (!workerRef.current || selectedFiles.length === 0) return

    setIsProcessing(true)
    setProcessingProgress(0)
    
    // Use default black and white conversion
    const defaultFilters = DEFAULT_PRESETS.default
    
    // Update all images to processing status
    setProcessedImages(prev => prev.map(img => ({ ...img, processingStatus: 'processing' })))

    // Process each image
    for (const image of processedImages) {
      try {
        const bitmap = await createImageBitmap(image.originalFile)
        
        // Create canvas to get ImageData
        const canvas = document.createElement('canvas')
        canvas.width = bitmap.width
        canvas.height = bitmap.height
        const ctx = canvas.getContext('2d')
        if (ctx) {
          ctx.drawImage(bitmap, 0, 0)
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
          
          const message: BatchWorkerMessage = {
            imageData,
            preset: defaultFilters,
            fileIdentifier: image.id
          }
          
          workerRef.current.postMessage(message, [imageData.data.buffer])
        }
      } catch (error) {
        console.error('Error processing image:', error)
        setProcessedImages(prev => prev.map(img => 
          img.id === image.id 
            ? { ...img, processingStatus: 'error', error: 'Failed to process image' }
            : img
        ))
      }
    }
  }, [selectedFiles, processedImages])

  // Auto-process images when they are uploaded
  React.useEffect(() => {
    if (processedImages.length > 0 && !isProcessing && processedImages.every(img => img.processingStatus === 'pending')) {
      const timer = setTimeout(() => {
        processAllImages()
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [processedImages, isProcessing, processAllImages])

  const downloadAll = useCallback(() => {
    processedImages.forEach(image => {
      if (image.processedBlob && image.processingStatus === 'completed') {
        const url = URL.createObjectURL(image.processedBlob)
        const link = document.createElement('a')
        link.href = url
        link.download = `bw_${image.originalFile.name.replace(/\.[^/.]+$/, '')}.png`
        link.click()
        URL.revokeObjectURL(url)
      }
    })
  }, [processedImages])

  const downloadAsZip = useCallback(async () => {
    // This would require a library like JSZip in a real implementation
    // For now, we'll just download individually
    downloadAll()
  }, [downloadAll])

  const clearAll = useCallback(() => {
    setSelectedFiles([])
    setProcessedImages([])
    setProcessingProgress(0)
    setIsProcessing(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }, [])

  const completedCount = processedImages.filter(img => img.processingStatus === 'completed').length
  const errorCount = processedImages.filter(img => img.processingStatus === 'error').length

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4" variant="secondary">
            ⚡ Batch Processing
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Batch Black And White Converter
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Convert multiple images to black and white at once. Simply upload your images 
            and download the processed results instantly.
          </p>
        </div>
        
        {/* Content Ad */}
        <ContentAd />

        <div className="space-y-8">
            {/* Upload Area */}
            {selectedFiles.length === 0 && (
              <Card
                className="border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-primary-400 dark:hover:border-primary-500 transition-colors cursor-pointer"
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="p-12 text-center">
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileInput}
                    className="hidden"
                  />
                  
                  <Upload className="w-12 h-12 text-primary-600 dark:text-primary-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Upload Multiple Images
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Drag and drop your images here, or click to browse
                  </p>
                  <Button size="lg">
                    <Upload className="w-4 h-4 mr-2" />
                    Choose Files
                  </Button>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mt-4">
                    Supports: PNG, JPG, WebP • No file size limit
                  </p>
                </div>
              </Card>
            )}

            {/* Simple Progress and Controls */}
            {selectedFiles.length > 0 && (
              <Card className="p-4">
                {isProcessing ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-center text-sm text-gray-600 dark:text-gray-400">
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Processing {completedCount} of {selectedFiles.length} images...
                    </div>
                    <Progress value={processingProgress} className="w-full" />
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {completedCount > 0 && (
                        <>
                          <Button onClick={downloadAll}>
                            <Download className="w-4 h-4 mr-2" />
                            Download All ({completedCount})
                          </Button>
                          <Button variant="outline" onClick={downloadAsZip}>
                            <Archive className="w-4 h-4 mr-2" />
                            Download ZIP
                          </Button>
                        </>
                      )}
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {completedCount} of {selectedFiles.length} ready
                      </span>
                    </div>
                    
                    <Button variant="outline" size="sm" onClick={clearAll}>
                      <Trash2 className="w-4 h-4 mr-2" />
                      Clear
                    </Button>
                  </div>
                )}
              </Card>
            )}

            {/* Image Grid */}
            {processedImages.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {processedImages.map((image) => (
                  <Card key={image.id} className="p-3 relative">
                    <div className="space-y-3">
                      {/* Image Display */}
                      <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden relative">
                        {image.processedPreviewUrl ? (
                          <img
                            src={image.processedPreviewUrl}
                            alt="Black & White"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center">
                            {image.processingStatus === 'processing' && (
                              <RefreshCw className="w-6 h-6 animate-spin text-primary-600" />
                            )}
                            {image.processingStatus === 'pending' && (
                              <Clock className="w-6 h-6 text-gray-400" />
                            )}
                            {image.processingStatus === 'error' && (
                              <AlertCircle className="w-6 h-6 text-red-500" />
                            )}
                          </div>
                        )}
                        
                        {/* Status indicator */}
                        {image.processingStatus === 'completed' && (
                          <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1">
                            <CheckCircle className="w-3 h-3" />
                          </div>
                        )}
                      </div>
                      
                      {/* File name */}
                      <p className="text-xs font-medium text-gray-900 dark:text-white truncate">
                        {image.originalFile.name}
                      </p>
                      
                      {/* Download button */}
                      {image.processingStatus === 'completed' && image.processedBlob && (
                        <Button
                          size="sm"
                          className="w-full text-xs h-7"
                          onClick={() => {
                            const url = URL.createObjectURL(image.processedBlob!)
                            const link = document.createElement('a')
                            link.href = url
                            link.download = `bw_${image.originalFile.name.replace(/\.[^/.]+$/, '')}.png`
                            link.click()
                            URL.revokeObjectURL(url)
                          }}
                        >
                          <Download className="w-3 h-3 mr-1" />
                          Download
                        </Button>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            )}
        </div>
      </div>
    </div>
  )
}