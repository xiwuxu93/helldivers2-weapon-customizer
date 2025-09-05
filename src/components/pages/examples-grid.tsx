"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { 
  Play, 
  Search, 
  Filter,
  Star,
  Clock,
  Users,
  Eye
} from "lucide-react"

interface Example {
  id: string
  title: string
  description: string
  category: string
  style: 'Classic' | 'Dramatic' | 'Soft' | 'Vintage' | 'High Contrast'
  tags: string[]
  featured: boolean
  beforeImage: string
  afterImage: string
  tips: string[]
}

export function ExamplesGrid() {
  const [searchTerm, setSearchTerm] = React.useState('')
  const [selectedCategory, setSelectedCategory] = React.useState('all')
  const [selectedStyle, setSelectedStyle] = React.useState('all')

  const examples: Example[] = [
    {
      id: '1',
      title: 'Professional Portrait',
      description: 'A stunning professional headshot transformed into elegant black and white, emphasizing facial features and expression',
      category: 'Portrait Photography',
      style: 'Classic',
      tags: ['portrait', 'professional', 'headshot', 'business'],
      featured: true,
      beforeImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
      afterImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80&sat=-100',
      tips: [
        'Perfect for LinkedIn profiles and professional portfolios',
        'Classic style enhances facial features naturally',
        'Ideal for business cards and corporate materials'
      ]
    },
    {
      id: '2',
      title: 'Newborn Baby Photo',
      description: 'Precious newborn moment converted to timeless black and white, capturing pure innocence and beauty',
      category: 'Newborn Photography',
      style: 'Soft',
      tags: ['newborn', 'baby', 'family', 'memories'],
      featured: true,
      beforeImage: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&q=80',
      afterImage: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&q=80&sat=-100',
      tips: [
        'Soft style perfect for delicate newborn skin',
        'Creates timeless family keepsakes',
        'Removes color distractions to focus on emotions'
      ]
    },
    {
      id: '3',
      title: 'Urban Street Scene',
      description: 'Dynamic city street converted to dramatic black and white, showcasing architectural details and urban life',
      category: 'Street Photography',
      style: 'High Contrast',
      tags: ['street', 'urban', 'architecture', 'city'],
      featured: true,
      beforeImage: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80',
      afterImage: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80&sat=-100',
      tips: [
        'High contrast brings out architectural details',
        'Perfect for modern art prints',
        'Emphasizes patterns and textures in urban environments'
      ]
    },
    {
      id: '4',
      title: 'Wedding Moment',
      description: 'Romantic wedding photo transformed into elegant monochrome, highlighting emotion and intimacy',
      category: 'Wedding Photography',
      style: 'Classic',
      tags: ['wedding', 'romance', 'couple', 'love'],
      featured: false,
      beforeImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
      afterImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80&sat=-100',
      tips: [
        'Classic style perfect for wedding albums',
        'Timeless look that never goes out of style',
        'Focuses attention on emotions and expressions'
      ]
    },
    {
      id: '5',
      title: 'Nature Landscape',
      description: 'Breathtaking landscape photo converted to artistic black and white, emphasizing natural textures and forms',
      category: 'Landscape Photography',
      style: 'Dramatic',
      tags: ['landscape', 'nature', 'mountains', 'scenic'],
      featured: false,
      beforeImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
      afterImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80&sat=-100',
      tips: [
        'Dramatic style enhances natural contrast',
        'Perfect for fine art photography prints',
        'Brings out textures in clouds and terrain'
      ]
    },
    {
      id: '6',
      title: 'Fashion Portrait',
      description: 'High-fashion portrait converted to vintage black and white, creating a classic editorial look',
      category: 'Fashion Photography',
      style: 'Vintage',
      tags: ['fashion', 'model', 'vintage', 'editorial'],
      featured: false,
      beforeImage: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&q=80',
      afterImage: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&q=80&sat=-100',
      tips: [
        'Vintage style adds film-like character',
        'Perfect for fashion magazines and portfolios',
        'Creates sophisticated, editorial-quality results'
      ]
    }
  ]

  const categories = ['all', ...Array.from(new Set(examples.map(ex => ex.category)))]
  const styles = ['all', 'Classic', 'Dramatic', 'Soft', 'Vintage', 'High Contrast']

  const filteredExamples = React.useMemo(() => {
    return examples.filter(example => {
      const matchesSearch = searchTerm === '' ||
        example.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        example.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        example.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      
      const matchesCategory = selectedCategory === 'all' || example.category === selectedCategory
      const matchesStyle = selectedStyle === 'all' || example.style === selectedStyle
      
      return matchesSearch && matchesCategory && matchesStyle
    })
  }, [examples, searchTerm, selectedCategory, selectedStyle])

  const getStyleColor = (style: string) => {
    switch (style) {
      case 'Classic': return 'secondary'
      case 'Dramatic': return 'destructive'
      case 'Soft': return 'success'
      case 'Vintage': return 'warning'
      case 'High Contrast': return 'default'
      default: return 'secondary'
    }
  }

  const tryExample = (example: Example) => {
    // Navigate to main converter page
    window.location.href = '/'
  }

  return (
    <div className="space-y-8">
      {/* 搜索和筛选 */}
      <div className="space-y-4">
        {/* 搜索框 */}
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search examples..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* 筛选器 */}
        <div className="flex flex-wrap justify-center gap-4">
          {/* 分类筛选 */}
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border rounded-lg text-sm"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>

          {/* Style Filter */}
          <select
            value={selectedStyle}
            onChange={(e) => setSelectedStyle(e.target.value)}
            className="px-3 py-2 border rounded-lg text-sm"
          >
            {styles.map(style => (
              <option key={style} value={style}>
                {style === 'all' ? 'All Styles' : style}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Featured Examples */}
      {selectedCategory === 'all' && selectedStyle === 'all' && searchTerm === '' && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <Star className="h-6 w-6 text-yellow-500 mr-2" />
            Featured Examples
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {examples.filter(ex => ex.featured).map((example) => (
              <Card key={example.id} hover className="relative overflow-hidden">
                <div className="absolute top-4 right-4 z-10">
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                    <Star className="h-3 w-3 mr-1" />
                    Featured
                  </Badge>
                </div>
                
                <CardHeader className="pb-4">
                  <div className="space-y-2">
                    <CardTitle className="text-lg">{example.title}</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{example.category}</Badge>
                      <Badge variant={getStyleColor(example.style) as any}>
                        {example.style}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {example.description}
                  </p>

                  {/* Before/After Images */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-center">
                      <img src={example.beforeImage} alt="Before" className="w-full h-32 object-cover rounded-lg mb-2" />
                      <span className="text-xs text-gray-500">Before</span>
                    </div>
                    <div className="text-center">
                      <img src={example.afterImage} alt="After" className="w-full h-32 object-cover rounded-lg mb-2 filter grayscale" />
                      <span className="text-xs text-gray-500">After</span>
                    </div>
                  </div>

                  {/* Tips */}
                  <div className="space-y-1">
                    <h4 className="text-xs font-medium text-gray-900 dark:text-white">Pro Tips:</h4>
                    <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                      {example.tips.slice(0, 2).map((tip, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="w-1 h-1 rounded-full bg-gray-400 mt-2 mr-2 flex-shrink-0"></span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button 
                    onClick={() => tryExample(example)}
                    className="w-full"
                    size="sm"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Try This Style
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* 所有示例 */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          All Examples ({filteredExamples.length})
        </h2>
        
        {filteredExamples.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Search className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No examples found
              </h3>
              <p className="text-muted-foreground text-center">
                Try changing your search terms or filters
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExamples.map((example) => (
              <Card key={example.id} hover>
                <CardHeader className="pb-4">
                  <div className="space-y-2">
                    <CardTitle className="text-lg flex items-center justify-between">
                      {example.title}
                      {example.featured && (
                        <Star className="h-4 w-4 text-yellow-500" />
                      )}
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{example.category}</Badge>
                      <Badge variant={getStyleColor(example.style) as any}>
                        {example.style}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {example.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {example.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Before/After Images */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-center">
                      <img src={example.beforeImage} alt="Before" className="w-full h-24 object-cover rounded-lg mb-1" />
                      <span className="text-xs text-gray-500">Original</span>
                    </div>
                    <div className="text-center">
                      <img src={example.afterImage} alt="After" className="w-full h-24 object-cover rounded-lg mb-1 filter grayscale" />
                      <span className="text-xs text-gray-500">Black & White</span>
                    </div>
                  </div>

                  {/* Tips */}
                  <div className="space-y-1">
                    <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                      {example.tips.slice(0, 3).map((tip, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="w-1 h-1 rounded-full bg-gray-400 mt-2 mr-2 flex-shrink-0"></span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button 
                    onClick={() => tryExample(example)}
                    className="w-full"
                    size="sm"
                    variant="outline"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Try This Example
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}