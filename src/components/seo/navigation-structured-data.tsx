'use client'

import { WithContext, WebSite, SiteNavigationElement } from 'schema-dts'

export function NavigationStructuredData() {
  const websiteData: WithContext<WebSite> = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'BWConverter - Free Black and White Image Converter',
    alternateName: 'Black and White Image Converter Online',
    url: 'https://bwconverter.com',
    description: 'Convert images to black and white online for free. Professional quality black and white photo converter with multiple artistic styles.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://bwconverter.com/?q={search_term_string}'
      }
    } as any,
    // 网站主要导航结构
    hasPart: [
      {
        '@type': 'WebPage',
        '@id': 'https://bwconverter.com/',
        url: 'https://bwconverter.com/',
        name: 'Free Black and White Image Converter',
        description: 'Convert any image to black and white instantly with professional quality results',
        isPartOf: {
          '@type': 'WebSite',
          '@id': 'https://bwconverter.com'
        }
      },
      {
        '@type': 'WebPage',
        '@id': 'https://bwconverter.com/batch',
        url: 'https://bwconverter.com/batch',
        name: 'Batch Black and White Image Converter',
        description: 'Convert multiple images to black and white at once - bulk processing tool',
        isPartOf: {
          '@type': 'WebSite',
          '@id': 'https://bwconverter.com'
        }
      },
      {
        '@type': 'WebPage',
        '@id': 'https://bwconverter.com/examples',
        url: 'https://bwconverter.com/examples',
        name: 'Black and White Image Examples',
        description: 'See stunning before and after examples of black and white image conversions',
        isPartOf: {
          '@type': 'WebSite',
          '@id': 'https://bwconverter.com'
        }
      },
      {
        '@type': 'WebPage',
        '@id': 'https://bwconverter.com/newborn-black-and-white-images',
        url: 'https://bwconverter.com/newborn-black-and-white-images',
        name: 'Newborn Black and White Images',
        description: 'Create beautiful black and white newborn photos with professional quality',
        isPartOf: {
          '@type': 'WebSite',
          '@id': 'https://bwconverter.com'
        }
      },
      {
        '@type': 'WebPage',
        '@id': 'https://bwconverter.com/black-and-white-newborn-images',
        url: 'https://bwconverter.com/black-and-white-newborn-images',
        name: 'Black and White Newborn Images - Professional Converter',
        description: 'Transform newborn photos into elegant black and white with specialized styles',
        isPartOf: {
          '@type': 'WebSite',
          '@id': 'https://bwconverter.com'
        }
      },
      {
        '@type': 'WebPage',
        '@id': 'https://bwconverter.com/image-black-and-white-converter',
        url: 'https://bwconverter.com/image-black-and-white-converter',
        name: 'Image Black and White Converter - Best Free Tool 2025',
        description: 'The most powerful free online image to black and white converter with professional results',
        isPartOf: {
          '@type': 'WebSite',
          '@id': 'https://bwconverter.com'
        }
      },
      {
        '@type': 'WebPage',
        '@id': 'https://bwconverter.com/how-to-use',
        url: 'https://bwconverter.com/how-to-use',
        name: 'How to Use Black and White Image Converter',
        description: 'Step-by-step guide on how to convert images to black and white professionally',
        isPartOf: {
          '@type': 'WebSite',
          '@id': 'https://bwconverter.com'
        }
      },
      {
        '@type': 'WebPage',
        '@id': 'https://bwconverter.com/blog',
        url: 'https://bwconverter.com/blog',
        name: 'Black and White Photography Blog',
        description: 'Tips, techniques, and inspiration for black and white photography',
        isPartOf: {
          '@type': 'WebSite',
          '@id': 'https://bwconverter.com'
        }
      },
      {
        '@type': 'WebPage',
        '@id': 'https://bwconverter.com/faq',
        url: 'https://bwconverter.com/faq',
        name: 'Frequently Asked Questions',
        description: 'Common questions about black and white image conversion',
        isPartOf: {
          '@type': 'WebSite',
          '@id': 'https://bwconverter.com'
        }
      }
    ]
  }

  const navigationData: WithContext<SiteNavigationElement> = {
    '@context': 'https://schema.org',
    '@type': 'SiteNavigationElement',
    name: 'Main Navigation',
    url: 'https://bwconverter.com',
    hasPart: [
      {
        '@type': 'WebPage',
        name: 'Home - Free Black and White Converter',
        url: 'https://bwconverter.com/'
      },
      {
        '@type': 'WebPage', 
        name: 'Batch Converter',
        url: 'https://bwconverter.com/batch'
      },
      {
        '@type': 'WebPage',
        name: 'Examples Gallery',
        url: 'https://bwconverter.com/examples'
      },
      {
        '@type': 'WebPage',
        name: 'Newborn Photography',
        url: 'https://bwconverter.com/newborn-black-and-white-images'
      },
      {
        '@type': 'WebPage',
        name: 'Professional Converter',
        url: 'https://bwconverter.com/image-black-and-white-converter'
      },
      {
        '@type': 'WebPage',
        name: 'How to Use Guide',
        url: 'https://bwconverter.com/how-to-use'
      },
      {
        '@type': 'WebPage',
        name: 'Blog & Tips',
        url: 'https://bwconverter.com/blog'
      },
      {
        '@type': 'WebPage',
        name: 'FAQ & Support',
        url: 'https://bwconverter.com/faq'
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteData, null, 2)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(navigationData, null, 2)
        }}
      />
    </>
  )
}