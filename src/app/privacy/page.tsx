import { Metadata } from 'next'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Shield, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy - Black and White Image Converter | Your Data Protection',
  description: 'Our comprehensive privacy policy explains how we protect your data and images. Learn about our local processing approach and commitment to user privacy.',
  keywords: ['privacy policy', 'data protection', 'image privacy', 'local processing'],
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4" variant="secondary">
            <Shield className="w-4 h-4 mr-2" />
            Privacy Policy
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Your privacy is our priority. Learn how we protect your data and images with our local processing approach.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            Last updated: December 2024
          </p>
        </div>

        {/* Key Points */}
        <Card className="p-6 mb-8 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
            Key Privacy Highlights
          </h2>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400">
            <li> <strong>No Image Upload:</strong> All processing happens locally in your browser</li>
            <li> <strong>Zero Data Collection:</strong> We don't collect, store, or analyze your images</li>
            <li> <strong>No Tracking:</strong> We don't track your usage or create user profiles</li>
            <li> <strong>Local Processing Only:</strong> Your images never leave your device</li>
          </ul>
        </Card>

        <div className="space-y-8">
          {/* Information We Collect */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              1. Information We Collect
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Images and Files
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  <strong>We do NOT collect your images.</strong> All image processing occurs entirely within your web browser using client-side JavaScript. Your images are:
                </p>
                <ul className="list-disc ml-6 text-gray-600 dark:text-gray-400 space-y-1">
                  <li>Processed locally on your device</li>
                  <li>Never uploaded to our servers</li>
                  <li>Never stored permanently anywhere</li>
                  <li>Only temporarily loaded into your browser's memory during processing</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Technical Data
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  We may collect minimal technical information for website functionality:
                </p>
                <ul className="list-disc ml-6 text-gray-600 dark:text-gray-400 space-y-1">
                  <li>Browser type and version (for compatibility)</li>
                  <li>Device type (mobile, tablet, desktop) for responsive design</li>
                  <li>General location (country level) for content localization</li>
                  <li>Website performance metrics (page load times)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Analytics Data
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We use Google Analytics to understand how visitors use our website. This includes anonymous data about page views, user interactions, and traffic sources. No personally identifiable information is collected.
                </p>
              </div>
            </div>
          </Card>

          {/* How We Use Information */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              2. How We Use Information
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Service Provision
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  The minimal technical data we collect is used solely to:
                </p>
                <ul className="list-disc ml-6 text-gray-600 dark:text-gray-400 space-y-1 mt-2">
                  <li>Ensure the website works properly on your device</li>
                  <li>Optimize performance and loading speeds</li>
                  <li>Fix technical issues and improve functionality</li>
                  <li>Provide responsive design for different screen sizes</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Website Improvement
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Anonymous analytics help us understand:
                </p>
                <ul className="list-disc ml-6 text-gray-600 dark:text-gray-400 space-y-1 mt-2">
                  <li>Which features are most popular</li>
                  <li>How users navigate the website</li>
                  <li>What improvements would be most valuable</li>
                  <li>Technical issues that need addressing</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Data Sharing */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              3. Information Sharing
            </h2>
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
              <div className="flex items-start">
                <AlertCircle className="w-5 h-5 text-red-500 mr-2 mt-0.5" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    We Never Share Your Images
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Since your images are processed entirely in your browser and never reach our servers, there is nothing to share. Your images remain completely private.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Third-Party Services
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  We use the following third-party services that may collect anonymous data:
                </p>
                <ul className="list-disc ml-6 text-gray-600 dark:text-gray-400 space-y-1">
                  <li><strong>Google Analytics:</strong> Website usage statistics (anonymous)</li>
                  <li><strong>Google AdSense:</strong> Advertising services (if applicable)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Legal Requirements
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We may disclose information if required by law, court order, or government regulation. However, since we don't collect personal images or detailed user data, there would be very little to disclose.
                </p>
              </div>
            </div>
          </Card>

          {/* Data Security */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              4. Data Security
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Local Processing Security
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Our security approach is built on the principle of local processing:
                </p>
                <ul className="list-disc ml-6 text-gray-600 dark:text-gray-400 space-y-1 mt-2">
                  <li>Images are processed using client-side JavaScript</li>
                  <li>No image data transmission over the internet</li>
                  <li>No server-side storage of user content</li>
                  <li>Processing happens entirely within your browser's secure environment</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Website Security
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We implement standard web security practices:
                </p>
                <ul className="list-disc ml-6 text-gray-600 dark:text-gray-400 space-y-1 mt-2">
                  <li>HTTPS encryption for all website traffic</li>
                  <li>Regular security updates and monitoring</li>
                  <li>Secure hosting infrastructure</li>
                  <li>Protection against common web vulnerabilities</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Your Rights */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              5. Your Privacy Rights
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Complete Control
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Since we don't collect your images or personal data, you have complete control over your privacy:
                </p>
                <ul className="list-disc ml-6 text-gray-600 dark:text-gray-400 space-y-1 mt-2">
                  <li>Your images never leave your device</li>
                  <li>No account creation or personal information required</li>
                  <li>You can use the service completely anonymously</li>
                  <li>No data to delete, correct, or export</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Analytics Opt-Out
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  You can opt out of analytics tracking by:
                </p>
                <ul className="list-disc ml-6 text-gray-600 dark:text-gray-400 space-y-1 mt-2">
                  <li>Using browser privacy modes or ad blockers</li>
                  <li>Disabling cookies in your browser settings</li>
                  <li>Installing Google Analytics opt-out extensions</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Cookies */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              6. Cookies and Local Storage
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Essential Cookies
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We use minimal cookies and local storage for basic functionality:
                </p>
                <ul className="list-disc ml-6 text-gray-600 dark:text-gray-400 space-y-1 mt-2">
                  <li>Theme preference (dark/light mode)</li>
                  <li>Website functionality and performance</li>
                  <li>Temporary image processing data (cleared automatically)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Analytics Cookies
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Google Analytics may set cookies to track anonymous usage statistics. These do not contain personal information and can be disabled in your browser.
                </p>
              </div>
            </div>
          </Card>

          {/* Children's Privacy */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              7. Children's Privacy
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Our service is suitable for all ages since we don't collect personal information. However, we recommend parental supervision for children under 13 when using any online service. Parents can be confident that their children's images are processed securely on their own device.
            </p>
          </Card>

          {/* Changes to Policy */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              8. Changes to This Policy
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              We may update this privacy policy to reflect changes in our practices or legal requirements. Any changes will be posted on this page with an updated "Last modified" date.
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              We encourage you to review this policy periodically. Your continued use of the service after any changes indicates your acceptance of the updated policy.
            </p>
          </Card>

          {/* Contact */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              9. Contact Information
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              If you have questions about this privacy policy or our practices, please review our FAQ section for common questions, or contact us through the information provided on our About page.
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
            Privacy Summary
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            <strong>Bottom line:</strong> Your images are processed entirely on your device. We can't see them, store them, or share them because they never reach our servers. Your privacy is protected by design.
          </p>
          <Link href="/">
            <Button>
              Start Converting Images Privately
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  )
}