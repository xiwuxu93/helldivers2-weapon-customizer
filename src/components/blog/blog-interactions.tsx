'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Heart, MessageCircle, Bookmark, Share2 } from 'lucide-react'

interface BlogInteractionsProps {
  postId: string
  initialLikes?: number
  initialComments?: number
}

export function BlogInteractions({ postId, initialLikes = 0, initialComments = 0 }: BlogInteractionsProps) {
  const [likes, setLikes] = useState(initialLikes)
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1)
      setIsLiked(false)
    } else {
      setLikes(likes + 1)
      setIsLiked(true)
    }
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          url: window.location.href
        })
      } catch (err) {
        // Fallback to copying URL
        navigator.clipboard.writeText(window.location.href)
        alert('URL copied to clipboard!')
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href)
      alert('URL copied to clipboard!')
    }
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Button 
          variant={isLiked ? "default" : "outline"}
          onClick={handleLike}
          className="transition-all duration-200"
        >
          <Heart className={`w-4 h-4 mr-2 ${isLiked ? 'fill-current' : ''}`} />
          {likes} Likes
        </Button>
        <Button variant="outline">
          <MessageCircle className="w-4 h-4 mr-2" />
          {initialComments} Comments
        </Button>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button 
          variant={isBookmarked ? "default" : "outline"}
          size="sm"
          onClick={handleBookmark}
        >
          <Bookmark className={`w-4 h-4 mr-1 ${isBookmarked ? 'fill-current' : ''}`} />
          {isBookmarked ? 'Saved' : 'Save'}
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleShare}
        >
          <Share2 className="w-4 h-4 mr-1" />
          Share
        </Button>
      </div>
    </div>
  )
}