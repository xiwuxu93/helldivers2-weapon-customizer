"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Zap } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      {/* 浮动元素装饰 */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary-400 rounded-full opacity-10 animate-pulse" />
      <div className="absolute top-40 right-20 w-32 h-32 bg-secondary-400 rounded-full opacity-10 animate-bounce" />
      <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-warning-400 rounded-full opacity-10 animate-pulse delay-1000" />

      <div className="container relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* 徽章 */}
          <div className="inline-flex items-center space-x-2 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-full px-4 py-2 text-sm font-medium mb-8">
            <Sparkles className="h-4 w-4" />
            <span>Powerful frontend tools collection</span>
          </div>

          {/* 主标题 */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            <span className="block">Modern</span>
            <span className="block text-gradient bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Online Tools Hub
            </span>
          </h1>

          {/* 副标题 */}
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Fast, reliable, and user-friendly online utilities. 
            Built with modern web technologies for optimal performance and user experience.
          </p>

          {/* CTA按钮组 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button size="lg" className="group" asChild>
              <Link href="/tools">
                <Zap className="h-5 w-5 mr-2" />
                Start Using Tools
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            
            <Button size="lg" variant="outline" asChild>
              <Link href="/examples">
                View Examples
              </Link>
            </Button>
          </div>

          {/* 特性亮点 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Lightning Fast
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Pure frontend tools with instant processing and no server delays
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-secondary-100 dark:bg-secondary-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-6 w-6 text-secondary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Privacy First
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                All processing happens locally in your browser - no data leaves your device
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-success-100 dark:bg-success-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <ArrowRight className="h-6 w-6 text-success-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Easy to Use
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Intuitive interface designed for both beginners and professionals
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}