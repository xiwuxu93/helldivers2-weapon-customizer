import { Metadata } from 'next'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Heart, 
  Shield, 
  Zap, 
  Users, 
  Award, 
  Target,
  CheckCircle,
  ArrowRight,
  Camera,
  Palette
} from 'lucide-react'
import Link from 'next/link'
import { ContentAd } from '@/components/ads/ad-placements'

export const metadata: Metadata = {
  title: 'About Us - Black and White Image Converter | Our Story & Mission',
  description: 'Learn about our mission to provide the best free black and white image converter. Discover our commitment to quality, privacy, and helping photographers create stunning monochrome art.',
  keywords: ['about black and white converter', 'our mission', 'image processing team', 'photography tools'],
}

export default function AboutPage() {
  const features = [
    {
      icon: Shield,
      title: "Privacy First",
      description: "All image processing happens in your browser. Your photos never leave your device, ensuring complete privacy and security."
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Advanced algorithms process your images in seconds, not minutes. Get professional results without the wait."
    },
    {
      icon: Heart,
      title: "Always Free",
      description: "No hidden costs, subscriptions, or watermarks. Quality black and white conversion should be accessible to everyone."
    },
    {
      icon: Award,
      title: "Professional Quality",
      description: "Our advanced processing techniques rival expensive desktop software, delivering studio-quality results."
    }
  ]

  const stats = [
    {
      number: "1M+",
      label: "Images Converted",
      description: "Photographers worldwide trust our converter"
    },
    {
      number: "99.9%",
      label: "Uptime",
      description: "Reliable service you can count on"
    },
    {
      number: "6",
      label: "Professional Presets",
      description: "Carefully crafted for different photography styles"
    },
    {
      number: "0",
      label: "Ads or Watermarks",
      description: "Clean, professional results every time"
    }
  ]

  const team = [
    {
      role: "Photography Expert",
      bio: "Professional photographer with 15+ years experience in black and white photography and digital image processing.",
      emoji: "📸"
    },
    {
      role: "Algorithm Engineer", 
      bio: "Specialized in computer vision and image processing algorithms, ensuring the highest quality conversions.",
      emoji: "🔬"
    },
    {
      role: "UX Designer",
      bio: "Focused on creating intuitive interfaces that make professional tools accessible to everyone.",
      emoji: "🎨"
    },
    {
      role: "Privacy Advocate",
      bio: "Ensures all our tools respect user privacy and process images locally without data collection.",
      emoji: "🔒"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4" variant="secondary">
            <Heart className="w-4 h-4 mr-2" />
            Our Story
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            About Black And White Converter
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            We believe that creating beautiful black and white photography should be simple, fast, and accessible to everyone. 
            That's why we built the world's most advanced free online black and white image converter.
          </p>
        </div>

        {/* Mission Statement */}
        <Card className="p-8 mb-12 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
          <div className="text-center">
            <Target className="w-12 h-12 text-white mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              "To democratize professional black and white photography by providing powerful, 
              privacy-respecting tools that help artists, photographers, and creative enthusiasts 
              transform their images into timeless monochrome art."
            </p>
          </div>
        </Card>

        {/* Content Ad */}
        <ContentAd />

        {/* Features */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Why Choose Our Converter?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Stats */}
        <section className="mb-16">
          <Card className="p-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
              Trusted by Photographers Worldwide
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    {stat.label}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.description}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* Our Story */}
        <section className="mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                The Story Behind Our Converter
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-400">
                <p>
                  It all started when our founder, a professional photographer, was frustrated with 
                  expensive desktop software that took forever to process images and complicated online 
                  tools that compromised image quality and privacy.
                </p>
                <p>
                  We realized that black and white photography is an art form that deserves better tools - 
                  tools that are fast, powerful, and respect the artist's privacy. So we built exactly that.
                </p>
                <p>
                  Our team combines decades of photography experience with cutting-edge web technology 
                  to deliver professional results instantly, all while keeping your images completely private.
                </p>
              </div>
            </div>
            <Card className="p-8 bg-gradient-to-br from-gray-800 to-gray-900 text-white">
              <Camera className="w-12 h-12 text-white mb-6" />
              <blockquote className="text-lg italic mb-4">
                "Black and white photography is not just about removing color - it's about revealing 
                the soul of an image, its emotion, texture, and story."
              </blockquote>
              <cite className="text-sm text-gray-300">— Our Photography Expert</cite>
            </Card>
          </div>
        </section>

        {/* Team */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Meet Our Team
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <Card key={index} className="p-6 text-center">
                <div className="text-4xl mb-4">{member.emoji}</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {member.role}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {member.bio}
                </p>
              </Card>
            ))}
          </div>
        </section>

        {/* Values */}
        <section className="mb-16">
          <Card className="p-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
              Our Core Values
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Palette className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Quality First</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  We never compromise on the quality of our algorithms or the results they produce.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">User-Centric</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Every feature is designed with our users' needs, workflow, and creative process in mind.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Privacy by Design</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Your images and data are yours alone. We build privacy into everything we create.
                </p>
              </div>
            </div>
          </Card>
        </section>

        {/* Future Vision */}
        <Card className="p-8 mb-12 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Looking Forward
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
              We're constantly improving our algorithms, adding new features, and finding better ways 
              to help photographers create stunning black and white images. Your feedback drives our innovation.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/">
                <Button size="lg">
                  Try Our Converter
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/how-to-use">
                <Button variant="outline" size="lg">
                  Learn How to Use
                </Button>
              </Link>
            </div>
          </div>
        </Card>

        {/* Contact */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Questions or Feedback?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            We'd love to hear from you. Check our FAQ for quick answers or reach out directly.
          </p>
          <Link href="/faq">
            <Button variant="outline">
              Visit FAQ
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}