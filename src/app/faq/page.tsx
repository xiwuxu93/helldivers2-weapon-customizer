import { Metadata } from 'next'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ChevronDown, HelpCircle, CheckCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { ContentAd } from '@/components/ads/ad-placements'

export const metadata: Metadata = {
  title: 'FAQ - Black and White Image Converter | Common Questions Answered',
  description: 'Get answers to frequently asked questions about our black and white image converter. Learn about supported formats, processing quality, privacy, and more.',
  keywords: ['black and white converter FAQ', 'image converter questions', 'black and white photo help'],
}

export default function FAQPage() {
  const faqs = [
    {
      category: "General Usage",
      questions: [
        {
          question: "What is a black and white image converter?",
          answer: "A black and white image converter is a digital tool that transforms color photographs into monochrome (black and white) images. Our converter uses advanced algorithms to analyze the colors in your original image and convert them to grayscale values, preserving important details, contrast, and tonal relationships for professional-quality results."
        },
        {
          question: "Is this black and white image converter really free?",
          answer: "Yes! Our black and white image converter is completely free to use. There are no hidden costs, subscription fees, or registration requirements. You can convert unlimited images to black and white without any charges. We don't add watermarks to your converted images either."
        },
        {
          question: "Do I need to create an account to use the converter?",
          answer: "No account creation is required. You can start converting your images to black and white immediately without signing up, providing email addresses, or any registration process. Simply upload your image and start converting right away."
        },
        {
          question: "How many images can I convert?",
          answer: "There's no limit to the number of images you can convert. Whether you need to convert one photo or hundreds of images, our tool can handle your needs. For multiple images, try our batch converter for efficient processing."
        }
      ]
    },
    {
      category: "Technical Specifications",
      questions: [
        {
          question: "What image formats are supported?",
          answer: "Our black and white converter supports all major image formats including JPG/JPEG, PNG, GIF, and WebP. The converter automatically detects your file format and processes it accordingly, maintaining the highest quality output."
        },
        {
          question: "What's the maximum file size I can upload?",
          answer: "You can upload images up to 10MB in size. This limit accommodates most high-resolution photos while ensuring fast processing times. If your image is larger, consider resizing it first or compressing it slightly before conversion."
        },
        {
          question: "What resolution will my converted image have?",
          answer: "Your converted black and white image will maintain the exact same resolution and dimensions as your original image. We don't compress or resize your photos during the conversion process, ensuring you get the highest quality results."
        },
        {
          question: "How long does the conversion process take?",
          answer: "Most images convert to black and white in just a few seconds. The exact time depends on your image size and complexity, but typically ranges from 1-5 seconds. Large, high-resolution images may take slightly longer to process."
        }
      ]
    },
    {
      category: "Privacy & Security",
      questions: [
        {
          question: "Are my images stored on your servers?",
          answer: "No, your images are never stored on our servers. All processing happens locally in your browser using advanced web technologies. Your original and converted images remain completely private and are only stored temporarily in your browser's memory during processing."
        },
        {
          question: "Is it safe to upload personal photos?",
          answer: "Yes, it's completely safe. Since all processing happens in your browser and nothing is uploaded to external servers, your personal photos remain 100% private. We have no access to your images, and they never leave your device."
        },
        {
          question: "Do you collect any data about my images?",
          answer: "We don't collect, store, or analyze any data about your images. We don't track what images you convert, how many you process, or any metadata from your files. Your privacy is our top priority."
        }
      ]
    },
    {
      category: "Quality & Results",
      questions: [
        {
          question: "How is this different from simple grayscale conversion?",
          answer: "Our black and white converter goes far beyond simple grayscale conversion. We use professional techniques including luminance mapping, contrast enhancement, selective tone adjustment, and advanced algorithms that consider the artistic and visual impact of the conversion, resulting in more dramatic and visually appealing black and white images."
        },
        {
          question: "Can I adjust the black and white conversion settings?",
          answer: "Yes! While we offer instant one-click conversion with our presets (Classic, Dramatic, Vintage, Soft, High Contrast, Film Noir), you can also fine-tune individual settings including contrast, brightness, shadows, highlights, grain, and sepia tones for complete creative control."
        },
        {
          question: "Which preset should I use for different types of photos?",
          answer: "• Portraits: Use 'Soft' or 'Classic' for flattering skin tones\n• Landscapes: Try 'Dramatic' or 'High Contrast' for impact\n• Architecture: 'Film Noir' emphasizes lines and structure\n• Street Photography: 'Vintage' or 'Film Noir' for artistic flair\n• General Photos: 'Classic' provides balanced, professional results"
        },
        {
          question: "Why do some photos look better in black and white than others?",
          answer: "Photos with strong contrast, interesting textures, clear subject definition, and good lighting typically convert better to black and white. Images that rely heavily on color for their impact (like colorful flowers or sunsets) may be more challenging, but our advanced algorithms help preserve the essential visual elements."
        }
      ]
    },
    {
      category: "Troubleshooting",
      questions: [
        {
          question: "My image won't upload. What should I do?",
          answer: "First, check that your image is in a supported format (JPG, PNG, GIF, WebP) and under 10MB. If it still won't upload, try refreshing the page, using a different browser, or checking your internet connection. Images with special characters in filenames might also cause issues."
        },
        {
          question: "The conversion is taking too long. Is something wrong?",
          answer: "Large, high-resolution images naturally take longer to process. If it's taking more than 30 seconds, try refreshing the page and uploading again. Ensure you have a stable internet connection and that your browser supports modern web technologies."
        },
        {
          question: "The converted image looks too dark or too light. How can I fix this?",
          answer: "Try different presets first - 'Soft' for lighter results, 'Dramatic' for darker, moodier images. You can also use the advanced controls to adjust brightness, contrast, shadows, and highlights until you achieve the perfect look for your image."
        },
        {
          question: "Can I undo changes or start over?",
          answer: "Yes! You can always upload the same original image again to start fresh, or use our preset buttons to quickly switch between different styles. Your original image is never modified, so you can experiment freely."
        }
      ]
    },
    {
      category: "Advanced Features",
      questions: [
        {
          question: "What is batch processing and how does it work?",
          answer: "Batch processing allows you to convert multiple images to black and white at once. Simply upload multiple images, and our system will process them all using the same settings. This is perfect for photographers, designers, or anyone who needs to convert many images quickly and consistently."
        },
        {
          question: "Can I download all converted images at once?",
          answer: "Yes! In batch mode, you can download all converted images individually or as a ZIP file for convenience. This makes it easy to process and organize large collections of photos."
        },
        {
          question: "Are there any mobile or desktop apps available?",
          answer: "Currently, our converter works entirely through your web browser, making it compatible with all devices including smartphones, tablets, and computers. No app installation is required - just visit our website from any device with an internet connection."
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4" variant="secondary">
            <HelpCircle className="w-4 h-4 mr-2" />
            FAQ
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Get instant answers to common questions about our black and white image converter. 
            Can't find what you're looking for? Feel free to reach out!
          </p>
        </div>

        {/* Content Ad */}
        <ContentAd />

        {/* FAQ Categories */}
        <div className="space-y-8">
          {faqs.map((category, categoryIndex) => (
            <Card key={categoryIndex} className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
                {category.category}
              </h2>
              
              <div className="space-y-4">
                {category.questions.map((faq, index) => (
                  <details key={index} className="group border border-gray-200 dark:border-gray-700 rounded-lg">
                    <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-4">
                        {faq.question}
                      </h3>
                      <ChevronDown className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform flex-shrink-0" />
                    </summary>
                    
                    <div className="px-4 pb-4 pt-2 border-t border-gray-200 dark:border-gray-700">
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">
                        {faq.answer}
                      </p>
                    </div>
                  </details>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Still Have Questions */}
        <Card className="p-8 mt-12 text-center bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
          <HelpCircle className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Still Have Questions?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
            If you couldn't find the answer you were looking for, don't hesitate to try our converter 
            or explore our detailed guides.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/">
              <Button size="lg">
                Try the Converter
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/how-to-use">
              <Button variant="outline" size="lg">
                Read the Guide
              </Button>
            </Link>
          </div>
        </Card>

        {/* Quick Tips */}
        <Card className="p-6 mt-8 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
            <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
            Quick Tips for Best Results
          </h3>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li>• Use high-resolution images for the best quality conversion</li>
            <li>• Photos with good contrast and lighting convert better</li>
            <li>• Try different presets to find the perfect style for your image</li>
            <li>• Use batch processing for multiple images with consistent settings</li>
            <li>• Your images are processed locally - no privacy concerns</li>
          </ul>
        </Card>
      </div>
    </div>
  )
}