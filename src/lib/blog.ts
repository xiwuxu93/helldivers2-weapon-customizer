import blogData from '@/data/blog-posts.json'

export interface BlogPost {
  id: string
  title: string
  content: string
  excerpt: string
  publishDate: string
  readTime: string
  category: string
  author: string
  tags: string[]
  featured: boolean
}

export function getBlogPosts(): BlogPost[] {
  return Object.values(blogData) as BlogPost[]
}

export function getBlogPost(id: string): BlogPost | null {
  return (blogData as Record<string, BlogPost>)[id] || null
}

export function getFeaturedBlogPosts(): BlogPost[] {
  return getBlogPosts().filter(post => post.featured)
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  return getBlogPosts().filter(post => post.category === category)
}

export function getBlogPostsByTag(tag: string): BlogPost[] {
  return getBlogPosts().filter(post => post.tags.includes(tag))
}

export function getLatestBlogPosts(limit: number = 5): BlogPost[] {
  return getBlogPosts()
    .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
    .slice(0, limit)
}