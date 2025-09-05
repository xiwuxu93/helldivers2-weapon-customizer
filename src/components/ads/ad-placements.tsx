'use client'

import { useEffect, useState } from 'react'
import { AdBanner } from './google-adsense'

// Header banner ad
export function HeaderAd() {
  const [adLoaded, setAdLoaded] = useState(false)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({})
        setAdLoaded(true)
      } catch (err) {
        console.log('AdSense error:', err)
      }
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [])

  if (!adLoaded) {
    return null
  }

  return (
    <div className="w-full py-4 bg-gray-50 dark:bg-gray-800 border-b border-border">
      <div className="container mx-auto flex justify-center">
        <AdBanner 
          adSlot="1234567890"
          adFormat="auto"
          className="max-w-screen-md w-full"
        />
      </div>
    </div>
  )
}

// Sidebar ad
export function SidebarAd() {
  const [adLoaded, setAdLoaded] = useState(false)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({})
        setAdLoaded(true)
      } catch (err) {
        console.log('AdSense error:', err)
      }
    }, 1500)
    
    return () => clearTimeout(timer)
  }, [])

  if (!adLoaded) {
    return null
  }

  return (
    <div className="sticky top-20">
      <AdBanner 
        adSlot="2345678901"
        adFormat="auto"
        responsive={false}
        className="w-full max-w-xs"
      />
    </div>
  )
}

// Content ad (in-article)
export function ContentAd() {
  const [adLoaded, setAdLoaded] = useState(false)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({})
        setAdLoaded(true)
      } catch (err) {
        console.log('AdSense error:', err)
      }
    }, 2000)
    
    return () => clearTimeout(timer)
  }, [])

  if (!adLoaded) {
    return null
  }

  return (
    <div className="my-8 flex justify-center">
      <AdBanner 
        adSlot="3456789012"
        adFormat="auto"
        className="w-full max-w-lg"
      />
    </div>
  )
}

// Footer ad
export function FooterAd() {
  const [adLoaded, setAdLoaded] = useState(false)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({})
        setAdLoaded(true)
      } catch (err) {
        console.log('AdSense error:', err)
      }
    }, 3000)
    
    return () => clearTimeout(timer)
  }, [])

  if (!adLoaded) {
    return null
  }

  return (
    <div className="w-full py-4 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto flex justify-center">
        <AdBanner 
          adSlot="4567890123"
          adFormat="auto"
          className="max-w-screen-lg w-full"
        />
      </div>
    </div>
  )
}