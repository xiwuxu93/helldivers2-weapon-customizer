'use client'

import Script from 'next/script'

const GA_MEASUREMENT_ID = 'G-4EGVZJ5DZN'

export function GoogleAnalytics() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_title: document.title,
            page_location: window.location.href,
          });
        `}
      </Script>
    </>
  )
}

// Utility function to track custom events
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters)
  }
}

// Track specific Helldivers 2 events
export const trackWeaponCustomization = (weaponName: string, attachments: string[]) => {
  trackEvent('weapon_customized', {
    weapon_name: weaponName,
    attachments_count: attachments.length,
    attachments: attachments.join(',')
  })
}

export const trackWeaponView = (weaponName: string, category: string) => {
  trackEvent('weapon_viewed', {
    weapon_name: weaponName,
    weapon_category: category
  })
}

export const trackFilterUsage = (filterType: string, filterValue: string) => {
  trackEvent('filter_used', {
    filter_type: filterType,
    filter_value: filterValue
  })
}