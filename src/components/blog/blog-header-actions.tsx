'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Heart, Bookmark, Share2 } from 'lucide-react'

interface BlogHeaderActionsProps {
  postId: string
}

export function BlogHeaderActions({ postId }: BlogHeaderActionsProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)

  const handleLike = () => {
    setIsLiked(!isLiked)
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
    <div className="flex items-center space-x-2">
      <Button 
        variant={isLiked ? "default" : "outline"} 
        size="sm"
        onClick={handleLike}
      >
        <Heart className={`w-4 h-4 mr-1 ${isLiked ? 'fill-current' : ''}`} />
        Like
      </Button>
      <Button 
        variant={isBookmarked ? "default" : "outline"} 
        size="sm"
        onClick={handleBookmark}
      >
        <Bookmark className={`w-4 h-4 mr-1 ${isBookmarked ? 'fill-current' : ''}`} />
        Save
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
  )
}