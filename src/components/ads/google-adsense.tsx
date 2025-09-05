'use client'

import Script from 'next/script'

const ADSENSE_ID = 'ca-pub-4855228928819714'

export default function GoogleAdsense() {
  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  )
}

interface AdBannerProps {
  adSlot: string
  adFormat?: string
  responsive?: boolean
  className?: string
}

export function AdBanner({ 
  adSlot, 
  adFormat = 'auto', 
  responsive = true,
  className = ''
}: AdBannerProps) {
  return (
    <div className={`ad-banner min-h-[100px] flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ 
          display: 'block',
          minWidth: '300px',
          minHeight: '100px',
          width: '100%',
          height: 'auto'
        }}
        data-ad-client={ADSENSE_ID}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={responsive.toString()}
      ></ins>
    </div>
  )
}