'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { DEFAULT_PRESETS, PresetConfig } from '@/types/image-processing'
import { Palette, Zap, Heart, Camera, Sun, Film } from 'lucide-react'

interface PresetSelectorProps {
  selectedPreset: string
  onPresetSelect: (presetName: string) => void
  disabled?: boolean
  className?: string
}

const presetIcons = {
  default: Sun,
  dramatic: Zap,
  soft: Heart,
  vintage: Camera,
  'high-contrast': Palette,
  'film-noir': Film,
}

const presetDescriptions = {
  default: 'Natural black and white conversion',
  dramatic: 'High contrast with enhanced shadows',
  soft: 'Gentle, smooth tones',
  vintage: 'Classic film look with sepia touch',
  'high-contrast': 'Bold, striking contrast',
  'film-noir': 'Dark, moody atmosphere',
}

export function PresetSelector({ selectedPreset, onPresetSelect, disabled = false, className = '' }: PresetSelectorProps) {
  const presetEntries = Object.entries(DEFAULT_PRESETS) as [string, PresetConfig][]

  return (
    <Card className={`p-6 ${className}`}>
      <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Style Presets
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Choose a preset style or customize your own
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {presetEntries.map(([key, preset]) => {
          const Icon = presetIcons[key as keyof typeof presetIcons] || Sun
          const isSelected = selectedPreset === key
          
          return (
            <Button
              key={key}
              variant={isSelected ? 'default' : 'outline'}
              className={`
                h-auto p-4 flex flex-col items-start text-left space-y-2 relative
                ${isSelected 
                  ? 'bg-primary-500 hover:bg-primary-600 text-white border-primary-500' 
                  : 'hover:border-primary-300 dark:hover:border-primary-600'
                }
              `}
              onClick={() => onPresetSelect(key)}
              disabled={disabled}
            >
              {isSelected && (
                <Badge className="absolute top-2 right-2 text-xs bg-white text-primary-600">
                  Active
                </Badge>
              )}
              
              <div className="flex items-center space-x-2 mb-1">
                <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-primary-600 dark:text-primary-400'}`} />
                <span className="font-medium text-sm">{preset.displayName}</span>
              </div>
              
              <p className={`text-xs ${isSelected ? 'text-primary-100' : 'text-gray-500 dark:text-gray-400'}`}>
                {presetDescriptions[key as keyof typeof presetDescriptions]}
              </p>
              
              {/* Preset parameter indicators */}
              <div className="flex flex-wrap gap-1 mt-2">
                {preset.contrast !== 100 && (
                  <Badge 
                    variant="secondary" 
                    className={`text-xs py-0 px-1 ${isSelected ? 'bg-white/20 text-white' : ''}`}
                  >
                    C: {preset.contrast}%
                  </Badge>
                )}
                {preset.brightness !== 100 && (
                  <Badge 
                    variant="secondary" 
                    className={`text-xs py-0 px-1 ${isSelected ? 'bg-white/20 text-white' : ''}`}
                  >
                    B: {preset.brightness}%
                  </Badge>
                )}
                {preset.sepia > 0 && (
                  <Badge 
                    variant="secondary" 
                    className={`text-xs py-0 px-1 ${isSelected ? 'bg-white/20 text-white' : ''}`}
                  >
                    S: {preset.sepia}%
                  </Badge>
                )}
                {preset.grain > 0 && (
                  <Badge 
                    variant="secondary" 
                    className={`text-xs py-0 px-1 ${isSelected ? 'bg-white/20 text-white' : ''}`}
                  >
                    G: {preset.grain}
                  </Badge>
                )}
              </div>
            </Button>
          )
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <span>Selected: <strong className="text-gray-700 dark:text-gray-300">{DEFAULT_PRESETS[selectedPreset]?.displayName || 'Custom'}</strong></span>
          {disabled && (
            <Badge variant="outline" className="text-xs">
              Processing...
            </Badge>
          )}
        </div>
      </div>
    </Card>
  )
}