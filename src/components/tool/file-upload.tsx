"use client"

import * as React from "react"
import { cn, formatFileSize } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { 
  Upload, 
  File, 
  X, 
  CheckCircle, 
  AlertCircle,
  Image,
  FileText,
  FileVideo,
  FileAudio
} from "lucide-react"

export interface FileUploadProps {
  accept?: string
  maxSize?: number // bytes
  maxFiles?: number
  onFilesChange?: (files: File[]) => void
  onUploadProgress?: (progress: number) => void
  disabled?: boolean
  className?: string
}

interface UploadedFile {
  file: File
  id: string
  status: 'uploading' | 'completed' | 'error'
  progress: number
  error?: string
}

export function FileUpload({
  accept = "*/*",
  maxSize = 10 * 1024 * 1024, // 10MB
  maxFiles = 5,
  onFilesChange,
  onUploadProgress,
  disabled = false,
  className
}: FileUploadProps) {
  const [files, setFiles] = React.useState<UploadedFile[]>([])
  const [isDragOver, setIsDragOver] = React.useState(false)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  // Get file type icon
  const getFileIcon = (file: File) => {
    const type = file.type
    if (type.startsWith('image/')) return Image
    if (type.startsWith('video/')) return FileVideo
    if (type.startsWith('audio/')) return FileAudio
    if (type.includes('text') || type.includes('json')) return FileText
    return File
  }

  // Get file type color
  const getFileTypeColor = (file: File) => {
    const type = file.type
    if (type.startsWith('image/')) return 'text-blue-600'
    if (type.startsWith('video/')) return 'text-purple-600'
    if (type.startsWith('audio/')) return 'text-green-600'
    if (type.includes('text') || type.includes('json')) return 'text-orange-600'
    return 'text-gray-600'
  }

  // Validate file
  const validateFile = (file: File): string | null => {
    if (file.size > maxSize) {
      return `File size exceeds limit (${formatFileSize(maxSize)})`
    }
    
    if (accept !== "*/*") {
      const acceptedTypes = accept.split(',').map(type => type.trim())
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase()
      const mimeType = file.type
      
      const isAccepted = acceptedTypes.some(type => {
        if (type.startsWith('.')) {
          return fileExtension === type
        }
        if (type.includes('*')) {
          const baseType = type.split('/')[0]
          return mimeType.startsWith(baseType)
        }
        return mimeType === type
      })
      
      if (!isAccepted) {
        return `Unsupported file type (supported: ${accept})`
      }
    }
    
    return null
  }

  // Handle file selection
  const handleFiles = (fileList: FileList) => {
    const newFiles = Array.from(fileList)
    
    if (files.length + newFiles.length > maxFiles) {
      alert(`Maximum ${maxFiles} files allowed`)
      return
    }
    
    const uploadedFiles: UploadedFile[] = []
    
    newFiles.forEach(file => {
      const error = validateFile(file)
      const uploadedFile: UploadedFile = {
        file,
        id: Math.random().toString(36).substr(2, 9),
        status: error ? 'error' : 'uploading',
        progress: error ? 0 : 0,
        error: error || undefined
      }
      uploadedFiles.push(uploadedFile)
    })
    
    setFiles(prev => [...prev, ...uploadedFiles])
    
    // Simulate upload progress
    uploadedFiles.forEach(uploadedFile => {
      if (uploadedFile.status === 'uploading') {
        simulateUpload(uploadedFile.id)
      }
    })
    
    // Notify parent component
    const validFiles = uploadedFiles
      .filter(f => !f.error)
      .map(f => f.file)
    
    if (validFiles.length > 0) {
      onFilesChange?.(validFiles)
    }
  }

  // Simulate upload progress
  const simulateUpload = (fileId: string) => {
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 20
      
      setFiles(prev => 
        prev.map(file => 
          file.id === fileId 
            ? { ...file, progress: Math.min(progress, 100) }
            : file
        )
      )
      
      onUploadProgress?.(Math.min(progress, 100))
      
      if (progress >= 100) {
        clearInterval(interval)
        setFiles(prev => 
          prev.map(file => 
            file.id === fileId 
              ? { ...file, status: 'completed', progress: 100 }
              : file
          )
        )
      }
    }, 100)
  }

  // Remove file
  const removeFile = (fileId: string) => {
    setFiles(prev => prev.filter(file => file.id !== fileId))
  }

  // Drag and drop handling
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    if (!disabled) {
      setIsDragOver(true)
    }
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    if (disabled) return
    
    const fileList = e.dataTransfer.files
    if (fileList.length > 0) {
      handleFiles(fileList)
    }
  }

  // Click to upload
  const handleClick = () => {
    if (!disabled) {
      fileInputRef.current?.click()
    }
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Upload area */}
      <Card
        className={cn(
          "border-2 border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 cursor-pointer",
          isDragOver && "border-primary-500 bg-primary-50 dark:bg-primary-900/20",
          disabled && "opacity-50 cursor-not-allowed"
        )}
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="p-8 text-center">
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            multiple={maxFiles > 1}
            onChange={(e) => e.target.files && handleFiles(e.target.files)}
            className="hidden"
            disabled={disabled}
          />
          
          <div className="flex flex-col items-center space-y-4">
            <div className={cn(
              "w-16 h-16 rounded-full flex items-center justify-center",
              isDragOver 
                ? "bg-primary-100 dark:bg-primary-900" 
                : "bg-gray-200 dark:bg-gray-700"
            )}>
              <Upload className={cn(
                "h-8 w-8",
                isDragOver 
                  ? "text-primary-600" 
                  : "text-gray-400"
              )} />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                {isDragOver ? "Drop files to upload" : "Drag files here"}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                or <span className="text-primary-600 font-medium">click to browse</span> files
              </p>
              <p className="text-xs text-gray-500">
                Supported formats: {accept} · Max {formatFileSize(maxSize)} · Up to {maxFiles} files
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* File list */}
      {files.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white">
            Selected files ({files.length})
          </h4>
          
          <div className="space-y-2">
            {files.map((uploadedFile) => {
              const FileIcon = getFileIcon(uploadedFile.file)
              const iconColor = getFileTypeColor(uploadedFile.file)
              
              return (
                <Card key={uploadedFile.id} className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className={cn("flex-shrink-0", iconColor)}>
                      <FileIcon className="h-8 w-8" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {uploadedFile.file.name}
                        </p>
                        <div className="flex items-center space-x-2">
                          {uploadedFile.status === 'completed' && (
                            <CheckCircle className="h-5 w-5 text-success-600" />
                          )}
                          {uploadedFile.status === 'error' && (
                            <AlertCircle className="h-5 w-5 text-error-600" />
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation()
                              removeFile(uploadedFile.id)
                            }}
                            className="h-8 w-8"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-xs text-gray-500">
                          {formatFileSize(uploadedFile.file.size)}
                        </p>
                        {uploadedFile.status === 'uploading' && (
                          <p className="text-xs text-gray-500">
                            {Math.round(uploadedFile.progress)}%
                          </p>
                        )}
                      </div>
                      
                      {uploadedFile.status === 'uploading' && (
                        <Progress 
                          value={uploadedFile.progress} 
                          className="mt-2 h-1" 
                        />
                      )}
                      
                      {uploadedFile.error && (
                        <p className="text-xs text-error-600 mt-1">
                          {uploadedFile.error}
                        </p>
                      )}
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}