import { Metadata } from 'next'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Calendar, 
  Clock, 
  ArrowLeft,
  Camera,
  User
} from 'lucide-react'
import { notFound } from 'next/navigation'
import { BlogInteractions } from '@/components/blog/blog-interactions'
import { BlogHeaderActions } from '@/components/blog/blog-header-actions'
import blogPosts from '@/data/blog-posts.json'

// Load blog posts from JSON file
const getBlogPost = (slug: string) => {
  return blogPosts[slug as keyof typeof blogPosts] || null
}

// Get all available blog post slugs for static generation
export function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({
    slug
  }))
}

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getBlogPost(params.slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.'
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://bwconverter.com/blog/${post.id}`,
      type: 'article',
      publishedTime: post.publishDate,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      title: post.title,
      description: post.excerpt,
    },
    alternates: {
      canonical: `https://bwconverter.com/blog/${post.id}`
    }
  }
}

export default function BlogPostPage({ params }: Props) {
  const post = getBlogPost(params.slug)
  
  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Navigation */}
        <div className="mb-8">
          <Link href="/blog">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center space-x-2 mb-4">
            <Badge variant="outline">{post.category}</Badge>
            {post.featured && (
              <Badge className="bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200">
                ⭐ Featured
              </Badge>
            )}
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {post.title}
          </h1>
          
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-6 text-gray-600 dark:text-gray-400">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{new Date(post.publishDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
            </div>
            
            <BlogHeaderActions postId={post.id} />
          </div>

          {/* Featured Image */}
          <div className="relative rounded-lg overflow-hidden mb-8 shadow-lg">
            <img 
              src="/black-and-white-image.jpg" 
              alt="Black and White Image Conversion Example"
              className="w-full h-64 md:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <p className="text-sm opacity-80">Example of black and white image conversion</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="prose prose-lg max-w-none prose-gray dark:prose-invert">
              <article className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-6">
                {(() => {
                  const lines = post.content.split('\n')
                  const elements: JSX.Element[] = []
                  let currentList: string[] = []
                  
                  const flushList = () => {
                    if (currentList.length > 0) {
                      elements.push(
                        <ul key={`list-${elements.length}`} className="mb-6 ml-6 space-y-2">
                          {currentList.map((item, idx) => (
                            <li 
                              key={idx} 
                              className="list-disc text-gray-700 dark:text-gray-300"
                              dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
                            />
                          ))}
                        </ul>
                      )
                      currentList = []
                    }
                  }
                  
                  lines.forEach((line, index) => {
                    const trimmedLine = line.trim()
                    
                    if (trimmedLine.startsWith('# ')) {
                      flushList()
                      elements.push(
                        <h1 key={`h1-${index}`} className="text-3xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                          {trimmedLine.slice(2)}
                        </h1>
                      )
                    }
                    else if (trimmedLine.startsWith('## ')) {
                      flushList()
                      elements.push(
                        <h2 key={`h2-${index}`} className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                          {trimmedLine.slice(3)}
                        </h2>
                      )
                    }
                    else if (trimmedLine.startsWith('### ')) {
                      flushList()
                      elements.push(
                        <h3 key={`h3-${index}`} className="text-xl font-medium text-gray-900 dark:text-white mt-6 mb-3">
                          {trimmedLine.slice(4)}
                        </h3>
                      )
                    }
                    else if (trimmedLine.startsWith('- ')) {
                      currentList.push(trimmedLine.slice(2))
                    }
                    else if (trimmedLine === '') {
                      flushList()
                      elements.push(<div key={`space-${index}`} className="h-4"></div>)
                    }
                    else if (trimmedLine.startsWith('✅') || trimmedLine.startsWith('❌')) {
                      flushList()
                      elements.push(
                        <div key={`highlight-${index}`} className="mb-3 font-medium text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border-l-4 border-blue-500">
                          {trimmedLine}
                        </div>
                      )
                    }
                    else if (/^\d+\./.test(trimmedLine)) {
                      flushList()
                      elements.push(
                        <p key={`numbered-${index}`} className="mb-2 font-medium text-gray-800 dark:text-gray-200">
                          {trimmedLine}
                        </p>
                      )
                    }
                    else if (trimmedLine) {
                      flushList()
                      const formattedText = trimmedLine.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      elements.push(
                        <p 
                          key={`p-${index}`} 
                          className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed text-lg"
                          dangerouslySetInnerHTML={{ __html: formattedText }}
                        />
                      )
                    }
                  })
                  
                  flushList() // Flush any remaining list items
                  return elements
                })()}
              </article>
            </div>

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Engagement */}
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
              <BlogInteractions 
                postId={post.id} 
                initialLikes={32} 
                initialComments={5} 
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-8">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                Related Articles
              </h3>
              <div className="space-y-4">
                <Link href="/blog/art-of-black-and-white-photography" className="block space-y-2 hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded transition-colors">
                  <h4 className="font-medium text-sm text-gray-900 dark:text-white line-clamp-2">
                    The Art of the Black and White Image: A Deep Dive
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    6 min read • Art & Techniques
                  </p>
                </Link>
                
                <Link href="/blog/revolutionary-art-of-black-and-white" className="block space-y-2 hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded transition-colors">
                  <h4 className="font-medium text-sm text-gray-900 dark:text-white line-clamp-2">
                    The Revolutionary Art of Black and White
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    7 min read • Art & Techniques
                  </p>
                </Link>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Link href="/">
                  <Button className="w-full">
                    Try BW Converter
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}