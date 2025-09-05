import { Metadata } from 'next'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { FileText, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service - Black and White Image Converter | Usage Agreement',
  description: 'Read our terms of service for using the black and white image converter. Understand your rights and responsibilities when using our free online tool.',
  keywords: ['terms of service', 'usage agreement', 'legal terms', 'user agreement'],
}

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4" variant="secondary">
            <FileText className="w-4 h-4 mr-2" />
            Terms of Service
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Terms of Service
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Please read these terms carefully before using our black and white image converter service.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            Last updated: December 2024
          </p>
        </div>

        <div className="space-y-8">
          {/* Acceptance of Terms */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              1. Acceptance of Terms
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              By accessing and using our Black and White Image Converter service ("the Service"), you accept and agree to be bound by the terms and provision of this agreement.
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              If you do not agree to abide by the above, please do not use this service. Your continued use of the Service constitutes acceptance of these terms.
            </p>
          </Card>

          {/* Description of Service */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              2. Description of Service
            </h2>
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400">
                Our service provides a free online tool for converting color images to black and white (monochrome) images. Key features include:
              </p>
              <ul className="list-disc ml-6 text-gray-600 dark:text-gray-400 space-y-2">
                <li>Local image processing in your web browser</li>
                <li>Multiple professional black and white presets</li>
                <li>Advanced manual adjustment controls</li>
                <li>Batch processing capabilities</li>
                <li>High-quality image output</li>
                <li>Complete privacy protection</li>
              </ul>
              <p className="text-gray-600 dark:text-gray-400">
                The Service is provided free of charge and processes images entirely within your web browser without uploading them to our servers.
              </p>
            </div>
          </Card>

          {/* User Responsibilities */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              3. User Responsibilities
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Acceptable Use
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">You agree to use the Service only for lawful purposes and in ways that do not:</p>
                <ul className="list-disc ml-6 text-gray-600 dark:text-gray-400 space-y-1">
                  <li>Violate any applicable local, state, national, or international law</li>
                  <li>Process images that contain illegal, harmful, or offensive content</li>
                  <li>Attempt to harm, disrupt, or interfere with the Service</li>
                  <li>Use automated tools to access the Service excessively</li>
                  <li>Reverse engineer or attempt to extract the Service's source code</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Content Responsibility
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  You are solely responsible for the images you process using our Service. You must have the legal right to process any images you upload, including:
                </p>
                <ul className="list-disc ml-6 text-gray-600 dark:text-gray-400 space-y-1 mt-2">
                  <li>Ownership of the images or proper licensing</li>
                  <li>Permission to modify and convert the images</li>
                  <li>Compliance with any copyright or intellectual property rights</li>
                  <li>Ensuring images do not contain illegal or harmful content</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Intellectual Property */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              4. Intellectual Property Rights
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Your Content
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  You retain all rights to your original images and the processed black and white versions. We do not claim any ownership rights to your content. Since processing occurs locally in your browser, we never have access to your images.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Our Service
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  The Service, including its algorithms, user interface, design, and functionality, is protected by copyright and other intellectual property laws. You may not copy, modify, distribute, or create derivative works based on our Service without permission.
                </p>
              </div>
            </div>
          </Card>

          {/* Privacy and Data */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              5. Privacy and Data Processing
            </h2>
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-4">
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Local Processing Guarantee
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    All image processing occurs entirely within your web browser. Your images are never uploaded to our servers, stored, or transmitted over the internet. This ensures complete privacy and security of your content.
                  </p>
                </div>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              For detailed information about how we handle data and protect your privacy, please review our <Link href="/privacy" className="text-blue-600 hover:text-blue-800 underline">Privacy Policy</Link>.
            </p>
          </Card>

          {/* Service Availability */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              6. Service Availability
            </h2>
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400">
                We strive to provide reliable access to the Service, but we cannot guarantee:
              </p>
              <ul className="list-disc ml-6 text-gray-600 dark:text-gray-400 space-y-1">
                <li>Uninterrupted service availability (99.9% uptime goal)</li>
                <li>Compatibility with all devices or browsers</li>
                <li>Error-free operation in all circumstances</li>
                <li>Continued availability of specific features</li>
              </ul>
              <p className="text-gray-600 dark:text-gray-400">
                We may temporarily suspend the Service for maintenance, updates, or technical issues. We will attempt to provide advance notice when possible.
              </p>
            </div>
          </Card>

          {/* Disclaimers */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              7. Disclaimers
            </h2>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4">
              <div className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-yellow-500 mr-2 mt-0.5" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Service Provided "As Is"
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    The Service is provided on an "as is" and "as available" basis without warranties of any kind, either express or implied.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400">We specifically disclaim warranties regarding:</p>
              <ul className="list-disc ml-6 text-gray-600 dark:text-gray-400 space-y-1">
                <li>Merchantability or fitness for a particular purpose</li>
                <li>Non-infringement of third-party rights</li>
                <li>Accuracy or reliability of conversion results</li>
                <li>Compatibility with your specific use case</li>
                <li>Uninterrupted or error-free operation</li>
              </ul>
            </div>
          </Card>

          {/* Limitation of Liability */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              8. Limitation of Liability
            </h2>
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400">
                To the fullest extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including:
              </p>
              <ul className="list-disc ml-6 text-gray-600 dark:text-gray-400 space-y-1">
                <li>Loss of data, images, or work product</li>
                <li>Business interruption or lost profits</li>
                <li>Emotional distress or reputational harm</li>
                <li>Technical issues with your device or browser</li>
                <li>Third-party claims related to your use of the Service</li>
              </ul>
              <p className="text-gray-600 dark:text-gray-400">
                Our total liability, if any, shall not exceed the amount you paid for the Service (which is $0 as it's free).
              </p>
            </div>
          </Card>

          {/* Modifications */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              9. Modifications to Terms
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              We reserve the right to modify these terms at any time. Changes will be effective when posted on this page with an updated "Last modified" date.
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Your continued use of the Service after any changes indicates your acceptance of the new terms. We encourage you to review these terms periodically.
            </p>
          </Card>

          {/* Governing Law */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              10. Governing Law
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              These terms shall be interpreted and governed by the laws of the jurisdiction where our service is operated, without regard to conflict of law principles. Any disputes arising from these terms or your use of the Service shall be subject to the exclusive jurisdiction of the courts in that jurisdiction.
            </p>
          </Card>

          {/* Severability */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              11. Severability
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              If any provision of these terms is found to be unenforceable or invalid, the remaining provisions will continue in full force and effect. The unenforceable provision will be replaced with a valid provision that most closely matches the intent of the original.
            </p>
          </Card>

          {/* Contact Information */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              12. Contact Information
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              If you have questions about these Terms of Service, please consult our FAQ section or contact us through the information provided on our About page.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/faq">
                <Button variant="outline">
                  Visit FAQ
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline">
                  Contact Information
                </Button>
              </Link>
            </div>
          </Card>
        </div>

        {/* Summary */}
        <Card className="p-6 mt-8 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Terms Summary
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            <strong>In simple terms:</strong> Use our service responsibly and legally. Your images stay private and on your device. We're not liable for issues beyond our control. These terms may change, so check back occasionally.
          </p>
          <Link href="/">
            <Button>
              Start Using the Service
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  )
}