'use client'

import React from 'react'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { ImageFilter } from '@/types/image-processing'

interface ParameterPanelProps {
  filters: ImageFilter
  onFiltersChange: (filters: ImageFilter) => void
  disabled?: boolean
  className?: string
  compact?: boolean
}

interface SliderControlProps {
  label: string
  value: number
  onChange: (value: number) => void
  min: number
  max: number
  step?: number
  disabled?: boolean
  unit?: string
  description?: string
}

function SliderControl({ 
  label, 
  value, 
  onChange, 
  min, 
  max, 
  step = 1, 
  disabled = false, 
  unit = '', 
  description 
}: SliderControlProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label htmlFor={label} className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </Label>
        <span className="text-sm font-semibold text-primary-600 dark:text-primary-400 min-w-[3rem] text-right">
          {value}{unit}
        </span>
      </div>
      
      <Slider
        id={label}
        min={min}
        max={max}
        step={step}
        value={[value]}
        onValueChange={(values) => onChange(values[0])}
        disabled={disabled}
        className="w-full"
      />
      
      {description && (
        <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
      )}
    </div>
  )
}

export function ParameterPanel({ filters, onFiltersChange, disabled = false, className = '', compact = false }: ParameterPanelProps) {
  const handleFilterChange = (key: keyof ImageFilter, value: number) => {
    onFiltersChange({
      ...filters,
      [key]: value
    })
  }

  return (
    <Card className={`${compact ? 'p-4 space-y-4' : 'p-6 space-y-6'} ${className}`}>
      {!compact && (
        <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Adjustment Controls
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Fine-tune your black and white conversion
          </p>
        </div>
      )}

      <div className={compact ? 'space-y-4' : 'space-y-6'}>
        <SliderControl
          label="Contrast"
          value={filters.contrast}
          onChange={(value) => handleFilterChange('contrast', value)}
          min={0}
          max={200}
          disabled={disabled}
          unit="%"
          description="Adjust the difference between light and dark areas"
        />

        <SliderControl
          label="Brightness"
          value={filters.brightness}
          onChange={(value) => handleFilterChange('brightness', value)}
          min={0}
          max={200}
          disabled={disabled}
          unit="%"
          description="Make the image lighter or darker overall"
        />

        <SliderControl
          label="Sepia"
          value={filters.sepia}
          onChange={(value) => handleFilterChange('sepia', value)}
          min={0}
          max={100}
          disabled={disabled}
          unit="%"
          description="Add a warm, vintage sepia tone"
        />

        <SliderControl
          label="Film Grain"
          value={filters.grain}
          onChange={(value) => handleFilterChange('grain', value)}
          min={0}
          max={50}
          disabled={disabled}
          description="Add film-like texture and noise"
        />

        <SliderControl
          label="Shadows"
          value={filters.shadows}
          onChange={(value) => handleFilterChange('shadows', value)}
          min={-50}
          max={50}
          disabled={disabled}
          description="Lighten or darken shadow areas"
        />

        <SliderControl
          label="Highlights"
          value={filters.highlights}
          onChange={(value) => handleFilterChange('highlights', value)}
          min={-50}
          max={50}
          disabled={disabled}
          description="Lighten or darken highlight areas"
        />
      </div>

      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <span>Real-time preview</span>
          <div className={`w-2 h-2 rounded-full ${disabled ? 'bg-gray-400' : 'bg-green-400 animate-pulse'}`} />
        </div>
      </div>
    </Card>
  )
}