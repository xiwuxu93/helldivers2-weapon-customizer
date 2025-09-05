import { Metadata } from 'next'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Upload, 
  Eye, 
  Download, 
  Palette, 
  Sliders,
  CheckCircle,
  ArrowRight,
  Lightbulb,
  Camera
} from 'lucide-react'
import Link from 'next/link'
import { ContentAd } from '@/components/ads/ad-placements'

export const metadata: Metadata = {
  title: 'How to Use Black and White Image Converter - Complete Guide',
  description: 'Learn how to convert your images to stunning black and white photos with our comprehensive step-by-step guide. Master professional techniques and achieve perfect results.',
  keywords: ['how to convert to black and white', 'black and white photo tutorial', 'image converter guide'],
}

export default function HowToUsePage() {
  const steps = [
    {
      icon: Upload,
      title: "Upload Your Image",
      description: "Select or drag and drop your color image into the converter",
      details: [
        "Support for JPG, PNG, GIF, and WebP formats",
        "Maximum file size: 10MB", 
        "Images are processed locally in your browser",
        "Your privacy is completely protected"
      ],
      tips: [
        "Higher resolution images produce better results",
        "Well-lit photos convert better than dark images",
        "Images with good contrast work best"
      ]
    },
    {
      icon: Palette,
      title: "Choose Your Style",
      description: "Select from professional black and white presets or customize manually",
      details: [
        "Classic: Traditional balanced black and white",
        "Dramatic: High contrast with deep blacks", 
        "Vintage: Film-inspired with slight sepia tones",
        "Soft: Gentle conversion with smooth gradients",
        "High Contrast: Bold blacks and bright whites",
        "Film Noir: Cinematic dark atmosphere"
      ],
      tips: [
        "Portrait photos work well with Soft or Classic styles",
        "Landscapes benefit from Dramatic or High Contrast", 
        "Architecture looks great with Film Noir"
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <Badge className="mb-4" variant="secondary">
            📖 Complete Guide
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            How to Use Our Black And White Converter
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Master the art of black and white photography with our comprehensive guide.
          </p>
        </div>

        <ContentAd />

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Step-by-Step Tutorial  
          </h2>
          <div className="space-y-8">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <Card key={index} className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {step.description}
                      </p>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white mb-2">Details</h4>
                          <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                            {step.details.map((detail, idx) => (
                              <li key={idx}>• {detail}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white mb-2">Tips</h4>
                          <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                            {step.tips.map((tip, idx) => (
                              <li key={idx}>💡 {tip}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </section>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Create Amazing Black And White Images?
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/">
              <Button size="lg">
                Start Converting Images
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/batch">
              <Button variant="outline" size="lg">
                Try Batch Converter  
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}