import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { StructuredData } from '@/components/seo/structured-data'
import { NavigationStructuredData } from '@/components/seo/navigation-structured-data'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Helldivers 2 Weapon Customizer | Ultimate Loadout Builder',
    template: '%s | HD2 Weapon Customizer'
  },
  description: 'Build the perfect Helldivers 2 loadout with our comprehensive weapon customization tool. Compare stats, optimize attachments, and dominate the battlefield with data-driven weapon builds.',
  keywords: [
    'helldivers 2 weapon customization',
    'helldivers 2 loadout builder',
    'helldivers 2 weapon stats',
    'helldivers 2 best weapons',
    'helldivers 2 attachments'
  ],
  authors: [{ name: 'HD2WeaponCustomizer.com' }],
  creator: 'HD2WeaponCustomizer.com',
  publisher: 'HD2WeaponCustomizer.com',
  metadataBase: new URL('https://helldivers2-weapon-customizer.com'),
  category: 'Technology',
  classification: 'Image Processing Tool',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://helldivers2-weapon-customizer.com',
    title: 'Helldivers 2 Weapon Customizer | Ultimate Loadout Builder',
    description: 'Build the perfect Helldivers 2 loadout with our comprehensive weapon customization tool. Compare stats, optimize attachments, and dominate the battlefield.',
    siteName: 'HD2 Weapon Customizer - Helldivers 2 Loadout Builder',
    images: [
      {
        url: '/helldivers2-weapon-customizer.png',
        width: 1200,
        height: 630,
        alt: 'Helldivers 2 Weapon Customizer Tool',
        type: 'image/png'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Helldivers 2 Weapon Customizer | Ultimate Loadout Builder',
    description: 'Build the perfect Helldivers 2 loadout with our comprehensive weapon customization tool. Compare stats, optimize attachments, and dominate the battlefield.',
    images: ['/helldivers2-weapon-customizer.png'],
    creator: '@HD2WeaponTool'
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://helldivers2-weapon-customizer.com',
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '16x16 32x32', type: 'image/x-icon' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ]
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <NavigationStructuredData />
        <StructuredData type="website" data={{}} />
        <StructuredData type="application" data={{}} />
        <StructuredData type="faq" data={{
          questions: [
            {
              question: "How does Helldivers 2 weapon customization work?",
              answer: "Helldivers 2 weapon customization allows players to modify their primary weapons with attachments like sights, grips, and magazines. Our tool helps you compare different configurations and optimize your loadout for specific missions and playstyles."
            },
            {
              question: "Is this Helldivers 2 weapon customizer free to use?",
              answer: "Yes! Our Helldivers 2 weapon customizer is completely free to use. There are no hidden costs or registration requirements. Build and compare unlimited weapon loadouts."
            },
            {
              question: "What weapons does the customizer support?",
              answer: "Our customizer supports all primary, secondary, and support weapons in Helldivers 2, including weapons from all Warbonds. We regularly update the database with new weapons and balance changes."
            },
            {
              question: "Can I save and share my weapon builds?",
              answer: "Yes! You can save your favorite weapon configurations and share them with other Helldivers. Our tool generates shareable links for your custom loadouts, making it easy to collaborate with your squad."
            }
          ]
        }} />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen bg-background text-foreground">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}