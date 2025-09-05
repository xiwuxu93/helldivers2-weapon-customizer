import { Metadata } from 'next'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Heart, Camera, Baby, Palette, Download, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { Breadcrumb } from '@/components/seo/breadcrumb'

export const metadata: Metadata = {
  title: 'Newborn Black and White Images - Beautiful Baby Photography | Free Converter',
  description: 'Create stunning newborn black and white images with our free online converter. Transform your baby photos into timeless monochrome masterpieces with professional quality.',
  keywords: ['newborn black and white images', 'baby black and white photos', 'newborn photography', 'black and white baby pictures', 'monochrome baby photos'],
  openGraph: {
    title: 'Newborn Black and White Images - Beautiful Baby Photography',
    description: 'Transform your precious newborn photos into stunning black and white images with our professional-grade converter.',
    images: ['/black-and-white-image.png']
  }
}

export default function NewbornBlackAndWhiteImagesPage() {
  const tips = [
    {
      icon: Camera,
      title: "Perfect Lighting",
      description: "Use soft, natural light from a window for the most beautiful newborn portraits"
    },
    {
      icon: Heart,
      title: "Emotional Focus",
      description: "Black and white images emphasize the pure emotion and innocence of newborns"
    },
    {
      icon: Sparkles,
      title: "Timeless Appeal",
      description: "Monochrome baby photos never go out of style and become treasured family heirlooms"
    },
    {
      icon: Palette,
      title: "Artistic Touch",
      description: "Remove color distractions to focus on textures, expressions, and precious details"
    }
  ]

  const examples = [
    {
      title: "Sleeping Angel",
      description: "Peaceful newborn sleeping poses highlight serenity and innocence"
    },
    {
      title: "Tiny Details",
      description: "Close-ups of little fingers, toes, and delicate features"
    },
    {
      title: "Family Bonding",
      description: "Parent-child moments become even more emotional in black and white"
    },
    {
      title: "Studio Portraits",
      description: "Professional-style newborn portraits with dramatic lighting"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <Breadcrumb items={[
          { name: 'Photography', url: '/examples' },
          { name: 'Newborn Black and White Images' }
        ]} />
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4" variant="secondary">
            <Baby className="w-4 h-4 mr-2" />
            Newborn Photography
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Newborn Black and White Images
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
            Transform your precious newborn photos into timeless black and white masterpieces. 
            Create stunning monochrome baby images that capture pure emotion and innocence.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/">
              <Button size="lg" className="bg-pink-600 hover:bg-pink-700">
                <Camera className="w-4 h-4 mr-2" />
                Convert Your Baby Photos
              </Button>
            </Link>
            <Link href="/batch">
              <Button variant="outline" size="lg">
                <Download className="w-4 h-4 mr-2" />
                Batch Convert Photos
              </Button>
            </Link>
          </div>
        </div>

        {/* Why Choose Black and White for Newborns */}
        <section className="mb-16">
          <Card className="p-8 bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/20 dark:to-purple-900/20 border-pink-200 dark:border-pink-800">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
              Why Black and White is Perfect for Newborn Photography
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tips.map((tip, index) => {
                const Icon = tip.icon
                return (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-pink-600 dark:text-pink-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      {tip.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {tip.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </Card>
        </section>

        {/* Popular Newborn Photography Styles */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Popular Newborn Black and White Photography Styles
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {examples.map((example, index) => (
              <Card key={index} className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {example.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {example.description}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-center">
                    <img src="https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&q=80" alt="Before newborn photo" className="w-full h-24 object-cover rounded-lg mb-1" />
                    <span className="text-xs text-gray-500">Original</span>
                  </div>
                  <div className="text-center">
                    <img src="https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&q=80&sat=-100" alt="Black and white newborn" className="w-full h-24 object-cover rounded-lg mb-1" />
                    <span className="text-xs text-gray-500">Black & White</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Tips for Perfect Newborn B&W Photos */}
        <section className="mb-16">
          <Card className="p-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
              Expert Tips for Perfect Newborn Black and White Images
            </h2>
            <div className="space-y-6">
              <div className="border-l-4 border-pink-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  1. Capture During the Golden Hours
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  The first 14 days after birth are ideal for newborn photography. Babies are typically sleepier and more flexible, making posing easier.
                </p>
              </div>
              
              <div className="border-l-4 border-pink-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  2. Focus on Natural Light
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Use soft, diffused natural light from a large window. Avoid harsh direct sunlight or artificial lighting that can create unflattering shadows.
                </p>
              </div>
              
              <div className="border-l-4 border-pink-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  3. Emphasize Tiny Details
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Black and white photography is perfect for highlighting delicate features like tiny fingers, toes, eyelashes, and the soft texture of baby skin.
                </p>
              </div>
              
              <div className="border-l-4 border-pink-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  4. Create Emotional Connections
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Include parents and siblings in shots. The emotional connection and love become even more powerful in monochrome images.
                </p>
              </div>
            </div>
          </Card>
        </section>

        {/* How to Convert Guide */}
        <section className="mb-16">
          <Card className="p-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
              How to Convert Your Newborn Photos to Black and White
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">1</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Upload Your Photo</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Upload your newborn photo in any format (JPG, PNG, WebP). Our converter handles all common image formats.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">2</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Choose a Style</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Select from our professional presets: Soft (perfect for newborns), Vintage, or Dramatic for artistic effects.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">3</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Download & Share</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Download your beautiful black and white newborn image and share with family or print for your baby book.
                </p>
              </div>
            </div>
          </Card>
        </section>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="p-8 bg-gradient-to-r from-pink-600 to-purple-600 text-white">
            <h2 className="text-3xl font-bold mb-4">
              Transform Your Newborn Photos Today
            </h2>
            <p className="text-xl text-pink-100 mb-6 max-w-2xl mx-auto">
              Create beautiful, timeless black and white images of your precious newborn. 
              Perfect for announcements, nursery wall art, or family keepsakes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/">
                <Button size="lg" className="bg-white text-pink-600 hover:bg-gray-100">
                  <Camera className="w-4 h-4 mr-2" />
                  Start Converting Now
                </Button>
              </Link>
              <Link href="/how-to-use">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-pink-600">
                  Learn More
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}