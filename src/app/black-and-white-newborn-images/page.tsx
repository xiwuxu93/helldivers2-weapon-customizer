import { Metadata } from 'next'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Heart, Camera, Baby, Star, Download, Sparkles, Shield, Clock } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Black and White Newborn Images - Professional Baby Photo Converter | Free Online',
  description: 'Convert newborn photos to stunning black and white images instantly. Professional quality black and white newborn photography with our free online converter.',
  keywords: ['black and white newborn images', 'newborn black and white photography', 'baby black and white photos', 'convert newborn photos', 'monochrome baby pictures'],
  openGraph: {
    title: 'Black and White Newborn Images - Professional Baby Photo Converter',
    description: 'Transform your newborn photos into beautiful black and white masterpieces with our professional online converter.',
    images: ['/black-and-white-image.png']
  }
}

export default function BlackAndWhiteNewbornImagesPage() {
  const benefits = [
    {
      icon: Star,
      title: "Professional Quality",
      description: "Get studio-quality black and white conversions that highlight every precious detail"
    },
    {
      icon: Shield,
      title: "Safe & Private",
      description: "Your baby photos are processed locally in your browser - never uploaded to servers"
    },
    {
      icon: Clock,
      title: "Instant Results",
      description: "Convert your newborn photos to black and white in seconds with real-time preview"
    },
    {
      icon: Sparkles,
      title: "Artistic Enhancement",
      description: "Multiple preset styles from soft and gentle to dramatic and artistic"
    }
  ]

  const styles = [
    {
      title: "Soft & Gentle",
      description: "Perfect for capturing the peaceful innocence of sleeping newborns",
      features: ["Low contrast", "Warm tones", "Gentle shadows"]
    },
    {
      title: "Classic Portrait",
      description: "Traditional black and white style ideal for formal newborn portraits",
      features: ["Balanced contrast", "Clear details", "Professional look"]
    },
    {
      title: "High Contrast",
      description: "Dramatic style that emphasizes textures and creates striking artistic images",
      features: ["Deep blacks", "Bright whites", "Bold shadows"]
    },
    {
      title: "Vintage Film",
      description: "Nostalgic film-inspired look with subtle grain and timeless appeal",
      features: ["Film grain", "Vintage tones", "Classic appeal"]
    }
  ]

  const photographyTips = [
    {
      title: "Best Age for Black and White Newborn Photos",
      content: "The ideal time for newborn photography is within the first 5-14 days after birth. During this period, babies sleep more deeply and are more flexible for gentle posing. Black and white conversion works exceptionally well with newborns as it removes color distractions and focuses on their pure, innocent features."
    },
    {
      title: "Lighting for Black and White Success",
      content: "Natural window light is your best friend for black and white newborn photography. Position your baby near a large window with soft, diffused light. Avoid direct sunlight which can create harsh shadows. The gentle gradation of light and shadow will translate beautifully to monochrome."
    },
    {
      title: "Composition Elements That Shine",
      content: "Focus on close-up details that work exceptionally well in black and white: tiny fingers and toes, peaceful sleeping expressions, the curve of their back, or the texture of their hair. These intimate details become even more powerful without the distraction of color."
    },
    {
      title: "Creating Emotional Connection",
      content: "Include meaningful elements like parents' hands gently cradling the baby, or capture the baby with a special blanket or toy. Black and white photography excels at conveying deep emotion and the precious bond between parent and child."
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4" variant="secondary">
            <Baby className="w-4 h-4 mr-2" />
            Professional Baby Photography
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Black and White Newborn Images
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
            Transform your precious newborn photos into stunning black and white masterpieces. 
            Create professional-quality monochrome images that capture the pure beauty and innocence of your baby.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Camera className="w-4 h-4 mr-2" />
                Convert Your Photos Now
              </Button>
            </Link>
            <Link href="/batch">
              <Button variant="outline" size="lg">
                <Download className="w-4 h-4 mr-2" />
                Batch Convert Multiple Photos
              </Button>
            </Link>
          </div>
        </div>

        {/* Benefits Section */}
        <section className="mb-16">
          <Card className="p-8 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
              Why Choose Our Black and White Newborn Converter
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon
                return (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {benefit.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </Card>
        </section>

        {/* Conversion Styles */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Professional Black and White Styles for Newborns
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {styles.map((style, index) => (
              <Card key={index} className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {style.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {style.description}
                </p>
                <ul className="space-y-2">
                  {style.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Star className="w-4 h-4 text-blue-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <div className="text-center">
                    <img src="https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=300&q=80" alt="Before" className="w-full h-16 object-cover rounded-lg mb-1" />
                    <span className="text-xs text-gray-500">Original</span>
                  </div>
                  <div className="text-center">
                    <img src="https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=300&q=80&sat=-100" alt={`${style.title} style`} className="w-full h-16 object-cover rounded-lg mb-1" />
                    <span className="text-xs text-gray-500">{style.title}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Photography Tips */}
        <section className="mb-16">
          <Card className="p-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
              Expert Tips for Black and White Newborn Photography
            </h2>
            <div className="space-y-8">
              {photographyTips.map((tip, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {tip.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {tip.content}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* How It Works */}
        <section className="mb-16">
          <Card className="p-8 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border-indigo-200 dark:border-indigo-800">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
              How to Create Beautiful Black and White Newborn Images
            </h2>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">1</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Upload Photo</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Select your newborn photo from your device. All formats supported: JPG, PNG, HEIC.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">2</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Choose Style</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Pick from our professional presets designed specifically for newborn photography.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">3</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Fine-tune</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Adjust contrast, brightness, and other settings to perfect your image.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">4</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Download</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Save your beautiful black and white newborn image in high quality.
                </p>
              </div>
            </div>
          </Card>
        </section>

        {/* Final CTA */}
        <div className="text-center">
          <Card className="p-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <h2 className="text-3xl font-bold mb-4">
              Create Timeless Black and White Newborn Images
            </h2>
            <p className="text-xl text-blue-100 mb-6 max-w-2xl mx-auto">
              Transform your precious newborn photos into stunning monochrome masterpieces that will be treasured forever. 
              Perfect for birth announcements, nursery décor, and family keepsakes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  <Camera className="w-4 h-4 mr-2" />
                  Start Converting Now
                </Button>
              </Link>
              <Link href="/examples">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                  <Heart className="w-4 h-4 mr-2" />
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