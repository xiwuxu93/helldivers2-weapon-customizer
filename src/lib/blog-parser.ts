import fs from 'fs'
import path from 'path'

// Define the blog post structure
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

// Function to parse HTML content and extract blog data
export function parseBlogHtml(htmlContent: string): BlogPost | null {
  try {
    // Extract title from <title> tag
    const titleMatch = htmlContent.match(/<title>([\s\S]*?)<\/title>/)
    const title = titleMatch ? titleMatch[1].replace(' - BWConverter', '').trim() : ''

    // Extract meta description
    const descMatch = htmlContent.match(/<meta\s+name="description"\s+content="([^"]*)"/)
    const excerpt = descMatch ? descMatch[1] : ''

    // Extract publish date from meta tag or article
    const dateMatch = htmlContent.match(/<meta\s+property="article:published_time"\s+content="([^"]*)"/) ||
                     htmlContent.match(/<time\s+datetime="([^"]*)"/)
    const publishDate = dateMatch ? dateMatch[1].split('T')[0] : '2024-12-01'

    // Extract main content from the article
    const contentMatch = htmlContent.match(/<div class="(?:blog-content|post-full-content)">([\s\S]*?)<\/div>/)
    let content = ''
    
    if (contentMatch) {
      content = contentMatch[1]
        .replace(/<[^>]*>/g, '') // Remove all HTML tags
        .replace(/&quot;/g, '"')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/\s+/g, ' ')
        .trim()
    }

    // Extract h1 for main title if not found in title tag
    if (!title) {
      const h1Match = htmlContent.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)
      if (h1Match) {
        const h1Title = h1Match[1].replace(/<[^>]*>/g, '').trim()
        const result = parseBlogHtml(htmlContent.replace(/<title>.*?<\/title>/, `<title>${h1Title} - BWConverter</title>`))
        return result || null
      }
    }

    return {
      id: '',
      title,
      content,
      excerpt,
      publishDate,
      readTime: estimateReadTime(content),
      category: 'Photography',
      author: 'BWConverter Team',
      tags: extractTags(title, content),
      featured: title.includes('Best') || title.includes('2025')
    }
  } catch (error) {
    console.error('Error parsing blog HTML:', error)
    return null
  }
}

// Estimate reading time based on word count
function estimateReadTime(content: string): string {
  const words = content.split(/\s+/).length
  const minutes = Math.ceil(words / 200) // Average reading speed
  return `${minutes} min read`
}

// Extract relevant tags from title and content
function extractTags(title: string, content: string): string[] {
  const tags = []
  const text = (title + ' ' + content).toLowerCase()
  
  if (text.includes('converter') || text.includes('convert')) tags.push('converter')
  if (text.includes('photography') || text.includes('photo')) tags.push('photography')
  if (text.includes('art') || text.includes('artistic')) tags.push('art')
  if (text.includes('technique') || text.includes('tips')) tags.push('techniques')
  if (text.includes('tool') || text.includes('2025')) tags.push('tools')
  if (text.includes('guide') || text.includes('tutorial')) tags.push('guide')
  if (text.includes('revolutionary') || text.includes('history')) tags.push('history')
  
  return tags.slice(0, 3) // Limit to 3 tags
}

// Load blog posts from HTML files
export async function loadBlogPosts(): Promise<Record<string, BlogPost>> {
  const blogDir = path.join(process.cwd(), '..', 'blackAndWhite', 'blog')
  const posts: Record<string, BlogPost> = {}
  
  try {
    const files = fs.readdirSync(blogDir).filter(file => file.endsWith('.html') && file !== 'index.html')
    
    for (const file of files) {
      const slug = file.replace('.html', '')
      const filePath = path.join(blogDir, file)
      const htmlContent = fs.readFileSync(filePath, 'utf-8')
      
      const post = parseBlogHtml(htmlContent)
      if (post) {
        post.id = slug
        posts[slug] = post
      }
    }
  } catch (error) {
    console.error('Error loading blog posts:', error)
    // Fallback to empty posts object
  }
  
  return posts
}