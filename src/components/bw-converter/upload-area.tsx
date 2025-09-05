'use client'

import React, { useCallback, useState } from 'react'
import { Upload, Image as ImageIcon, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface UploadAreaProps {
  onFileSelect: (file: File) => void
  onReset?: () => void
  isProcessing?: boolean
  className?: string
}

export function UploadArea({ onFileSelect, onReset, isProcessing = false, className = '' }: UploadAreaProps) {
  const [dragActive, setDragActive] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    setError(null)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      validateAndProcessFile(file)
    }
  }, [])

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null)
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      validateAndProcessFile(file)
    }
  }, [])

  const validateAndProcessFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file.')
      return
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      setError('File size must be less than 10MB.')
      return
    }

    onFileSelect(file)
  }

  return (
    <div className={`w-full ${className}`}>
      <Card 
        className={`
          relative border-2 border-dashed transition-all duration-200 ease-in-out
          ${dragActive 
            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' 
            : 'border-gray-300 dark:border-gray-600 hover:border-primary-400 dark:hover:border-primary-500'
          }
          ${isProcessing ? 'pointer-events-none opacity-60' : 'cursor-pointer'}
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => !isProcessing && document.getElementById('file-input')?.click()}
      >
        <div className="p-12 text-center">
          <input
            id="file-input"
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
            disabled={isProcessing}
          />
          
          <div className="mb-4">
            {isProcessing ? (
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/30 mb-4">
                <div className="animate-spin w-8 h-8 border-3 border-primary-500 border-t-transparent rounded-full"></div>
              </div>
            ) : (
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/30 mb-4">
                {dragActive ? (
                  <ImageIcon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                ) : (
                  <Upload className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                )}
              </div>
            )}
          </div>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            {isProcessing ? 'Processing...' : dragActive ? 'Drop your image here' : 'Upload Image'}
          </h3>
          
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {isProcessing ? 
              'Please wait while we process your image' :
              'Drag and drop your image here, or click to browse'
            }
          </p>

          <div className="text-sm text-gray-500 dark:text-gray-500 mb-6">
            Supports: PNG, JPG, WebP • Max size: 10MB
          </div>

          {!isProcessing && (
            <Button 
              variant="outline" 
              size="lg"
              className="pointer-events-none"
            >
              <Upload className="w-4 h-4 mr-2" />
              Choose File
            </Button>
          )}

          {onReset && !isProcessing && (
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                onReset()
              }}
              className="absolute top-4 right-4"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>

        {error && (
          <div className="absolute bottom-4 left-4 right-4 p-3 bg-error-50 dark:bg-error-900/20 border border-error-200 dark:border-error-800 rounded-lg">
            <p className="text-sm text-error-600 dark:text-error-400 text-center">{error}</p>
          </div>
        )}
      </Card>
    </div>
  )
}