import type { Metadata } from 'next'
import { ExamplesGrid } from '@/components/pages/examples-grid'
import { Breadcrumb } from '@/components/seo/breadcrumb'

export const metadata: Metadata = {
  title: 'Black and White Image Examples - Before & After Gallery',
  description: 'See stunning black and white image conversions with our free online converter. Browse before and after examples of portraits, landscapes, and more.',
  keywords: ['black and white examples', 'image conversion examples', 'before after black white', 'monochrome examples', 'photo conversion gallery'],
}

export default function ExamplesPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container max-w-7xl">
        <Breadcrumb items={[{ name: 'Examples' }]} />
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Black and White Image Examples
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            See stunning before and after examples of our black and white image converter in action
          </p>
        </div>

        {/* 示例网格 */}
        <ExamplesGrid />
      </div>
    </div>
  )
}