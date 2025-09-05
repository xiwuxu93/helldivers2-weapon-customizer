'use client'

import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { WithContext, BreadcrumbList } from 'schema-dts'

interface BreadcrumbItem {
  name: string
  url?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  // 始终包含首页作为第一项
  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    ...items
  ]

  // 生成结构化数据
  const breadcrumbStructuredData: WithContext<BreadcrumbList> = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.url && {
        item: {
          '@type': 'WebPage',
          '@id': `https://bwconverter.com${item.url}`
        }
      })
    }))
  }

  return (
    <>
      {/* 结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData, null, 2)
        }}
      />
      
      {/* 可视化面包屑导航 */}
      <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
        {breadcrumbItems.map((item, index) => (
          <div key={index} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
            )}
            {index === 0 && (
              <Home className="h-4 w-4 mr-2 text-gray-500" />
            )}
            {item.url ? (
              <Link 
                href={item.url}
                className="hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
              >
                {item.name}
              </Link>
            ) : (
              <span className="text-gray-900 dark:text-gray-100 font-medium">
                {item.name}
              </span>
            )}
          </div>
        ))}
      </nav>
    </>
  )
}

// 预定义的面包屑路径
export const breadcrumbPaths = {
  '/batch': [
    { name: 'Batch Converter' }
  ],
  '/examples': [
    { name: 'Examples' }
  ],
  '/newborn-black-and-white-images': [
    { name: 'Photography', url: '/examples' },
    { name: 'Newborn Black and White Images' }
  ],
  '/black-and-white-newborn-images': [
    { name: 'Photography', url: '/examples' },
    { name: 'Black and White Newborn Images' }
  ],
  '/image-black-and-white-converter': [
    { name: 'Tools', url: '/tools' },
    { name: 'Image Black and White Converter' }
  ],
  '/how-to-use': [
    { name: 'How to Use' }
  ],
  '/blog': [
    { name: 'Blog' }
  ],
  '/faq': [
    { name: 'Support', url: '/about' },
    { name: 'FAQ' }
  ],
  '/about': [
    { name: 'About Us' }
  ],
  '/privacy': [
    { name: 'Legal' },
    { name: 'Privacy Policy' }
  ],
  '/terms': [
    { name: 'Legal' },
    { name: 'Terms of Service' }
  ]
} as const