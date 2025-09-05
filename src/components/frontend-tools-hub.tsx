"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TextTools } from "@/components/tools/text-tools"
import { ImageTools } from "@/components/tools/image-tools"
import { DataTools } from "@/components/tools/data-tools"
import { EncodingTools } from "@/components/tools/encoding-tools"
import { ColorTools } from "@/components/tools/color-tools"
import { 
  Type, 
  Image, 
  Database, 
  Code, 
  Palette,
  Hash,
  Globe,
  Zap,
  Shield,
  Clock
} from "lucide-react"

const toolCategories = [
  {
    id: 'text',
    name: 'Text Tools',
    description: 'Process and analyze text content',
    icon: Type,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100 dark:bg-blue-900',
    component: TextTools,
    features: ['Word Count', 'Case Conversion', 'Text Cleaning', 'URL/Email Extraction']
  },
  {
    id: 'image',
    name: 'Image Tools',
    description: 'Edit and convert images',
    icon: Image,
    color: 'text-green-600', 
    bgColor: 'bg-green-100 dark:bg-green-900',
    component: ImageTools,
    features: ['Resize Images', 'Format Conversion', 'Apply Filters', 'Batch Processing']
  },
  {
    id: 'data',
    name: 'Data Tools',
    description: 'Convert and validate data formats',
    icon: Database,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100 dark:bg-purple-900',
    component: DataTools,
    features: ['CSV ↔ JSON', 'JSON Formatter', 'Data Validation', 'File Conversion']
  },
  {
    id: 'encoding',
    name: 'Encoding Tools',
    description: 'Encode, decode, and hash data',
    icon: Code,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100 dark:bg-orange-900',
    component: EncodingTools,
    features: ['URL Encoding', 'Base64 Conversion', 'HTML Entities', 'Hash Generation']
  },
  {
    id: 'color',
    name: 'Color Tools',
    description: 'Work with colors and palettes',
    icon: Palette,
    color: 'text-pink-600',
    bgColor: 'bg-pink-100 dark:bg-pink-900',
    component: ColorTools,
    features: ['Color Conversion', 'Palette Generation', 'Color Picker', 'Format Support']
  }
]

export function FrontendToolsHub() {
  const [selectedCategory, setSelectedCategory] = React.useState<string>('text')
  
  const currentCategory = toolCategories.find(cat => cat.id === selectedCategory)
  const CurrentComponent = currentCategory?.component

  return (
    <div className="space-y-8">
      {/* Features Overview */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Zap className="h-6 w-6 text-primary-600" />
            </div>
            <h3 className="font-semibold mb-2">Lightning Fast</h3>
            <p className="text-sm text-muted-foreground">
              All processing happens locally in your browser for instant results
            </p>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Shield className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold mb-2">Privacy First</h3>
            <p className="text-sm text-muted-foreground">
              Your data never leaves your device - completely secure and private
            </p>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Globe className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2">No Installation</h3>
            <p className="text-sm text-muted-foreground">
              Works directly in your browser - no downloads or installations required
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tool Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Hash className="h-5 w-5 text-primary-600" />
            <span>Tool Categories</span>
          </CardTitle>
          <p className="text-muted-foreground">
            Choose a category to get started with our powerful frontend tools
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {toolCategories.map((category) => {
              const Icon = category.icon
              const isSelected = selectedCategory === category.id
              
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    isSelected
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${category.bgColor}`}>
                      <Icon className={`h-5 w-5 ${category.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {category.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {category.description}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-3">
                        {category.features.slice(0, 2).map((feature) => (
                          <Badge key={feature} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                        {category.features.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{category.features.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Selected Tool */}
      {CurrentComponent && (
        <div className="mt-8">
          <CurrentComponent />
        </div>
      )}

      {/* Coming Soon - AI Tools */}
      <Card className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 border-primary-200 dark:border-primary-800">
        <CardContent className="p-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
              <Zap className="h-8 w-8 text-primary-600" />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            AI-Powered Tools Coming Soon
          </h3>
          <p className="text-muted-foreground mb-4 max-w-2xl mx-auto">
            We're working on integrating advanced AI capabilities including image enhancement, 
            text generation, language translation, and more. Stay tuned for exciting updates!
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Badge variant="outline">🤖 AI Image Enhancement</Badge>
            <Badge variant="outline">📝 Smart Text Generation</Badge>
            <Badge variant="outline">🌐 Language Translation</Badge>
            <Badge variant="outline">🎨 Creative Tools</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}