import type { Metadata } from 'next'
import { FrontendToolsHub } from '@/components/frontend-tools-hub'

export const metadata: Metadata = {
  title: 'Online Tools',
  description: 'Fast and powerful frontend tools for text processing, image editing, data conversion and more',
  keywords: ['online tools', 'frontend tools', 'text processing', 'image editing', 'utilities'],
}

export default function ToolsPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container max-w-7xl">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Online Tools
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Powerful frontend tools that work entirely in your browser. 
            Fast, secure, and privacy-focused utilities for everyday tasks.
          </p>
        </div>

        {/* Tools Hub */}
        <FrontendToolsHub />
      </div>
    </div>
  )
}