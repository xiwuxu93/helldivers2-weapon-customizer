import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowRight,
  Camera,
  Zap,
  Shield,
  Star,
  Users,
  Download,
  Palette
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Black and White Image Converter - Transform Color Photos Online Free',
  description: 'Create stunning black and white images from your color photos. Professional black and white image converter with advanced filters, instant preview, and high-quality results.',
  keywords: [
    'black and white image',
    'black and white image converter',
    'convert image to black and white',
    'black and white photo',
    'monochrome image',
    'grayscale image converter'
  ],
  openGraph: {
    title: 'Black and White Image Converter - Transform Color Photos Online Free',
    description: 'Create stunning black and white images from your color photos. Professional black and white image converter with advanced filters.',
    images: [
      {
        url: '/black-and-white-image.png',
        width: 1200,
        height: 630,
        alt: 'Black and White Image Converter Example'
      }
    ]
  },
  alternates: {
    canonical: 'https://bwconverter.com/black-and-white-image'
  }
}

export default function BlackAndWhiteImagePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge className="mb-6" variant="secondary">
              ✨ Professional Black and White Image Tool
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Transform Your Photos to{' '}
              <span className="text-primary-600 dark:text-primary-400">
                Black and White Images
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
              Create professional black and white images from any color photo. Our advanced black and white image converter 
              offers premium filters, real-time preview, and stunning results - completely free.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link href="/">
                <Button size="lg" className="px-8">
                  <Camera className="w-5 h-5 mr-2" />
                  Convert Black and White Image Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              
              <Link href="/blog">
                <Button variant="outline" size="lg">
                  Black and White Photography Tips
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              <Badge variant="secondary">Free Black and White Converter</Badge>
              <Badge variant="secondary">No Watermarks</Badge>
              <Badge variant="secondary">Instant Preview</Badge>
              <Badge variant="secondary">All Image Formats</Badge>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-20">
            <img 
              src="/black-and-white-image.jpg" 
              alt="Professional black and white image conversion example"
              className="w-full h-64 md:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <p className="text-lg font-semibold mb-2">Professional Black and White Image Results</p>
              <p className="text-sm opacity-90">Transform any color photo to stunning monochrome art</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Our Black and White Image Converter */}
      <section className="py-20 px-4 bg-white dark:bg-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Why Our Black and White Image Converter is the Best Choice
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Experience the difference with our advanced black and white image processing technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <Card className="p-8 text-center hover:shadow-lg transition-all">
              <Zap className="w-12 h-12 text-primary-600 mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Instant Black and White Conversion
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Convert your images to black and white instantly with our optimized processing engine. 
                See your black and white image results in real-time.
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-lg transition-all">
              <Palette className="w-12 h-12 text-primary-600 mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Professional Black and White Filters
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Choose from 6 professional black and white presets: Vintage, Dramatic, Film Noir, 
                High Contrast, Soft, and Classic styles.
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-lg transition-all">
              <Shield className="w-12 h-12 text-primary-600 mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Secure Black and White Processing
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Your images are processed locally in your browser. No uploads required for 
                black and white image conversion - 100% private and secure.
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-lg transition-all">
              <Download className="w-12 h-12 text-primary-600 mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                High-Quality Black and White Images
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Download your black and white images in full resolution. Support for PNG, JPEG, 
                and WebP formats with no quality loss.
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-lg transition-all">
              <Users className="w-12 h-12 text-primary-600 mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Trusted by Thousands
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Over 10,000+ users trust our black and white image converter for their 
                professional and personal photography projects.
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-lg transition-all">
              <Star className="w-12 h-12 text-primary-600 mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                100% Free Black and White Converter
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Create unlimited black and white images for free. No registration, no watermarks, 
                no hidden costs - just beautiful results.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Black and White Image Types */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Perfect for All Types of Black and White Images
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Our black and white image converter works perfectly with any type of photo
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 dark:bg-primary-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Camera className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Portrait Photos</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Create dramatic black and white portrait images with enhanced contrast and emotion
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-100 dark:bg-primary-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌆</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Landscape Images</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Transform landscape photos into stunning black and white images with enhanced depth
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-100 dark:bg-primary-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏢</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Architecture Photos</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Convert architectural photos to black and white images that emphasize lines and structure
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-100 dark:bg-primary-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Artistic Images</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Create artistic black and white images with professional filters and vintage effects
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary-600 dark:bg-primary-700 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Create Beautiful Black and White Images?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Start converting your color photos to stunning black and white images now - completely free!
          </p>
          <Link href="/">
            <Button size="lg" variant="secondary" className="px-8">
              <Camera className="w-5 h-5 mr-2" />
              Convert to Black and White Image
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}