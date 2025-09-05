import { Metadata } from 'next'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Upload, Zap, Shield, Download, Settings, Star, CheckCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Image Black and White Converter - Best Free Online Tool 2025',
  description: 'Convert any image to black and white with our powerful online converter. Fast, free, and professional results. Supports JPG, PNG, WebP, and more formats.',
  keywords: ['image black and white converter', 'convert image to black and white', 'black and white photo converter', 'online image converter', 'free black white converter'],
  openGraph: {
    title: 'Image Black and White Converter - Best Free Online Tool',
    description: 'Transform any image into stunning black and white with our professional online converter. Fast, secure, and completely free.',
    images: ['/black-and-white-image.png']
  }
}

export default function ImageBlackAndWhiteConverterPage() {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Convert images to black and white instantly with our optimized processing engine"
    },
    {
      icon: Shield,
      title: "100% Private",
      description: "Your images are processed locally in your browser - never uploaded to our servers"
    },
    {
      icon: Upload,
      title: "All Formats",
      description: "Support for JPG, PNG, WebP, GIF, BMP, and many other image formats"
    },
    {
      icon: Settings,
      title: "Professional Controls",
      description: "Fine-tune contrast, brightness, shadows, and highlights for perfect results"
    }
  ]

  const comparisons = [
    {
      feature: "Processing Speed",
      us: "Instant",
      others: "15-30 seconds",
      highlight: true
    },
    {
      feature: "Privacy Protection",
      us: "Local Processing",
      others: "Server Upload Required",
      highlight: true
    },
    {
      feature: "File Size Limit",
      us: "No Limit",
      others: "2-10MB Max",
      highlight: false
    },
    {
      feature: "Watermarks",
      us: "None",
      others: "Watermark Added",
      highlight: true
    },
    {
      feature: "Registration",
      us: "Not Required",
      others: "Account Required",
      highlight: false
    },
    {
      feature: "Cost",
      us: "Always Free",
      others: "Paid Plans",
      highlight: true
    }
  ]

  const steps = [
    {
      number: "1",
      title: "Upload Your Image",
      description: "Click 'Choose Image' or drag and drop your photo. All common formats are supported including JPG, PNG, WebP, and HEIC."
    },
    {
      number: "2", 
      title: "Choose Conversion Style",
      description: "Select from our professional presets: Classic, Dramatic, Soft, Vintage, or High Contrast. Each optimized for different image types."
    },
    {
      number: "3",
      title: "Fine-tune Settings",
      description: "Adjust contrast, brightness, shadows, and highlights using our intuitive controls. See changes in real-time preview."
    },
    {
      number: "4",
      title: "Download Result",
      description: "Save your converted black and white image in your preferred format and quality. Original resolution maintained."
    }
  ]

  const useCases = [
    {
      title: "Portrait Photography",
      description: "Create stunning black and white portraits that emphasize emotion and character",
      image: "portrait-placeholder"
    },
    {
      title: "Landscape Photos", 
      description: "Transform scenic images into dramatic monochrome masterpieces",
      image: "landscape-placeholder"
    },
    {
      title: "Street Photography",
      description: "Convert urban scenes to timeless black and white artistic images",
      image: "street-placeholder"
    },
    {
      title: "Product Images",
      description: "Create professional black and white product photos for marketing",
      image: "product-placeholder"
    },
    {
      title: "Wedding Photos",
      description: "Transform wedding memories into elegant monochrome keepsakes",
      image: "wedding-placeholder"
    },
    {
      title: "Social Media",
      description: "Stand out on Instagram and other platforms with striking B&W posts",
      image: "social-placeholder"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge className="mb-4" variant="secondary">
            <Star className="w-4 h-4 mr-2" />
            #1 Online Converter
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Image Black and White Converter
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
            The most powerful and easy-to-use online image black and white converter. 
            Transform any photo into stunning monochrome with professional results in seconds.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/">
              <Button size="lg" className="bg-slate-800 hover:bg-slate-900 text-white px-8">
                <Upload className="w-5 h-5 mr-2" />
                Start Converting Free
              </Button>
            </Link>
            <Link href="/batch">
              <Button variant="outline" size="lg" className="px-8">
                <Settings className="w-5 h-5 mr-2" />
                Batch Convert Images
              </Button>
            </Link>
          </div>
        </div>

        {/* Key Features */}
        <section className="mb-16">
          <Card className="p-8 bg-gradient-to-r from-slate-100 to-gray-100 dark:from-slate-800/50 dark:to-gray-800/50">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
              Why Our Image Black and White Converter is the Best
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-slate-600 dark:text-slate-300" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {feature.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </Card>
        </section>

        {/* Comparison Table */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
            How We Compare to Other Converters
          </h2>
          <Card className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Feature</th>
                    <th className="text-center py-3 px-4 font-semibold text-slate-600 dark:text-slate-300">Our Converter</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-500 dark:text-gray-400">Other Tools</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisons.map((comparison, index) => (
                    <tr key={index} className="border-b border-gray-100 dark:border-gray-800">
                      <td className="py-3 px-4 text-gray-900 dark:text-white">{comparison.feature}</td>
                      <td className={`py-3 px-4 text-center font-medium ${comparison.highlight ? 'text-green-600 dark:text-green-400' : 'text-slate-600 dark:text-slate-300'}`}>
                        {comparison.highlight && <CheckCircle className="w-4 h-4 inline mr-1" />}
                        {comparison.us}
                      </td>
                      <td className="py-3 px-4 text-center text-gray-500 dark:text-gray-400">{comparison.others}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </section>

        {/* How It Works */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            How to Use Our Image Black and White Converter
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <Card className="p-6 h-full">
                  <div className="w-12 h-12 bg-slate-800 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-white">{step.number}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 text-center">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm text-center">
                    {step.description}
                  </p>
                </Card>
                {index < steps.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 w-6 h-6 text-gray-300" />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Use Cases */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Perfect for Every Type of Photography
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((useCase, index) => (
              <Card key={index} className="p-6">
                <div className="grid grid-cols-2 gap-1 mb-4">
                  <div className="text-center">
                    <img src={[
                      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80',
                      'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=300&q=80',
                      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&q=80',
                      'https://images.unsplash.com/photo-1519741497674-611481863552?w=300&q=80',
                      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=300&q=80',
                      'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=300&q=80'
                    ][index]} alt="Before" className="w-full h-16 object-cover rounded-lg mb-1" />
                    <span className="text-xs text-gray-500">Original</span>
                  </div>
                  <div className="text-center">
                    <img src={[
                      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80&sat=-100',
                      'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=300&q=80&sat=-100',
                      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&q=80&sat=-100',
                      'https://images.unsplash.com/photo-1519741497674-611481863552?w=300&q=80&sat=-100',
                      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=300&q=80&sat=-100',
                      'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=300&q=80&sat=-100'
                    ][index]} alt="Black and white result" className="w-full h-16 object-cover rounded-lg mb-1" />
                    <span className="text-xs text-gray-500">Converted</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {useCase.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {useCase.description}
                </p>
              </Card>
            ))}
          </div>
        </section>

        {/* Technical Specifications */}
        <section className="mb-16">
          <Card className="p-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
              Technical Specifications & Features
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Supported Formats</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />JPEG (.jpg, .jpeg)</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />PNG (.png)</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />WebP (.webp)</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />GIF (.gif)</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />BMP (.bmp)</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />HEIC (.heic)</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Advanced Features</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Real-time preview</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Contrast adjustment</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Brightness control</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Shadow/highlight tuning</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Multiple artistic presets</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Batch processing</li>
                </ul>
              </div>
            </div>
          </Card>
        </section>

        {/* Final CTA */}
        <div className="text-center">
          <Card className="p-8 bg-gradient-to-r from-slate-800 to-gray-800 text-white">
            <h2 className="text-3xl font-bold mb-4">
              Start Converting Your Images Now
            </h2>
            <p className="text-xl text-slate-200 mb-6 max-w-2xl mx-auto">
              Join thousands of photographers, designers, and creators who trust our image black and white converter 
              for professional results every time.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/">
                <Button size="lg" className="bg-white text-slate-800 hover:bg-gray-100">
                  <Upload className="w-4 h-4 mr-2" />
                  Convert Images Free
                </Button>
              </Link>
              <Link href="/examples">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-slate-800">
                  <Star className="w-4 h-4 mr-2" />
                  See Examples
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}