import { Metadata } from 'next'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { getBlogPosts, getFeaturedBlogPosts } from '@/lib/blog'
import { 
  Calendar, 
  Clock, 
  ArrowRight, 
  Camera, 
  Palette,
  Lightbulb,
  Users,
  BookOpen,
  Brain
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Black And White Photography Blog - Tips, Techniques & Tutorials',
  description: 'Expert tips, techniques, and insights for creating stunning black and white images. From beginner guides to professional workflows.',
  keywords: [
    'black and white photography',
    'monochrome photography',
    'photography tips',
    'B&W techniques',
    'photo editing',
    'photography blog',
    'image conversion tips'
  ],
  openGraph: {
    title: 'Black And White Photography Blog - BWConverter',
    description: 'Expert tips, techniques, and insights for creating stunning black and white images. From beginner guides to professional workflows.',
    url: 'https://bwconverter.com/blog',
  },
  alternates: {
    canonical: 'https://bwconverter.com/blog'
  }
}

// Get blog posts from JSON data
const blogPosts = getBlogPosts().sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())

// Calculate category counts dynamically
const categoryCount = blogPosts.reduce((acc, post) => {
  acc[post.category] = (acc[post.category] || 0) + 1
  return acc
}, {} as Record<string, number>)

const categories = [
  { name: 'All Posts', count: blogPosts.length, icon: Users },
  { name: 'Tools & Reviews', count: categoryCount['Tools & Reviews'] || 0, icon: Palette },
  { name: 'Art & Techniques', count: categoryCount['Art & Techniques'] || 0, icon: Camera },
  { name: 'Photography Theory', count: categoryCount['Photography Theory'] || 0, icon: Brain },
  { name: 'Photography Basics', count: categoryCount['Photography Basics'] || 0, icon: BookOpen },
]

export default function BlogPage() {
  const featuredPost = blogPosts.find(post => post.featured)
  const regularPosts = blogPosts.filter(post => !post.featured)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4" variant="secondary">
            📝 Photography Blog
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Black And White Photography
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Tips, techniques, and insights for creating stunning black and white images. 
            From beginner guides to professional workflows.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-8">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                Categories
              </h3>
              <div className="space-y-2">
                {categories.map((category) => {
                  const Icon = category.icon
                  return (
                    <Button
                      key={category.name}
                      variant={category.name === 'All Posts' ? 'default' : 'ghost'}
                      className="w-full justify-start"
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {category.name}
                      <Badge variant="outline" className="ml-auto text-xs">
                        {category.count}
                      </Badge>
                    </Button>
                  )
                })}
              </div>
            </Card>
          </div>

          <div className="lg:col-span-3 space-y-8">
            {/* Featured Post */}
            {featuredPost && (
              <Card className="overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-2/3 p-8">
                    <div className="flex items-center space-x-2 mb-3">
                      <Badge className="bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200">
                        ⭐ Featured
                      </Badge>
                      <Badge variant="outline">{featuredPost.category}</Badge>
                    </div>
                    
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                      {featuredPost.title}
                    </h2>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      {featuredPost.excerpt}
                    </p>
                    
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-6">
                      <div className="flex items-center mr-6">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(featuredPost.publishDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center mr-6">
                        <Clock className="w-4 h-4 mr-1" />
                        {featuredPost.readTime}
                      </div>
                      <div className="text-gray-600 dark:text-gray-300">
                        By {featuredPost.author}
                      </div>
                    </div>
                    
                    <Link href={`/blog/${featuredPost.id}`}>
                      <Button size="lg">
                        Read Article
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                  
                  <div className="md:w-1/3 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center p-8">
                    <Camera className="w-24 h-24 text-gray-400 dark:text-gray-500" />
                  </div>
                </div>
              </Card>
            )}

            {/* Regular Posts Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {regularPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 h-48 flex items-center justify-center">
                    <Camera className="w-16 h-16 text-gray-400 dark:text-gray-500" />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <Badge variant="outline">{post.category}</Badge>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                      <div className="flex items-center mr-4">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(post.publishDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {post.readTime}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        By {post.author}
                      </div>
                      
                      <Link href={`/blog/${post.id}`}>
                        <Button variant="outline" size="sm">
                          Read More
                          <ArrowRight className="w-3 h-3 ml-1" />
                        </Button>
                      </Link>
                    </div>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Load More Button */}
            <div className="text-center pt-8">
              <Button variant="outline" size="lg">
                Load More Articles
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}