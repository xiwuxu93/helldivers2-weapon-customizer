import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { StructuredData } from '@/components/seo/structured-data'
import { NavigationStructuredData } from '@/components/seo/navigation-structured-data'
import { GoogleAnalytics } from '@/components/analytics/google-analytics'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Helldivers 2 Weapon Customization | Stats & Tools',
    template: '%s | Helldivers 2 Weapon Customization'
  },
  description: 'Helldivers 2 weapon customization tool: stats, tier lists, unlock guide. Fix crashes & build optimal loadouts for Super Earth democracy.',
  keywords: [
    'helldivers 2 weapon customization',
    'helldivers 2 weapons stats',
    'helldivers 2 tier list',
    'weapon unlock guide'
  ],
  authors: [{ name: 'helldivers2-weapon-customization.com' }],
  creator: 'helldivers2-weapon-customization.com',
  publisher: 'helldivers2-weapon-customization.com',
  metadataBase: new URL('https://helldivers2-weapon-customization.com'),
  category: 'Games',
  classification: 'Gaming Tool',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://helldivers2-weapon-customization.com',
    title: 'Helldivers 2 Weapon Customization | Stats & Tools',
    description: 'Helldivers 2 weapon customization tool: stats, tier lists, unlock guide. Fix crashes & build optimal loadouts for Super Earth democracy.',
    siteName: 'Helldivers 2 Weapon Customization - Ultimate Loadout Builder',
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
    title: 'Helldivers 2 Weapon Customization | Stats',
    description: 'Helldivers 2 weapon customization: stats, tier lists, unlock guides & crash fixes. Build optimal loadouts! 🎯🔫',
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
    canonical: 'https://helldivers2-weapon-customization.com',
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
        <GoogleAnalytics />
        <NavigationStructuredData />
        <StructuredData type="website" data={{}} />
        <StructuredData type="application" data={{}} />
        <StructuredData type="faq" data={{
          questions: [
            {
              question: "Why is Helldivers 2 weapon customization not showing up?",
              answer: "If weapon customization isn't showing up, try verifying your game files through Steam, updating graphics drivers, or restarting the game. Make sure you've reached the required level to unlock weapon customization features."
            },
            {
              question: "How do I fix Helldivers 2 weapon customization crashes?",
              answer: "To fix crashes during weapon customization: 1) Verify game files integrity, 2) Update graphics drivers, 3) Lower graphics settings, 4) Close unnecessary background applications, 5) Run the game as administrator."
            },
            {
              question: "What are the best Helldivers 2 weapon customization stats to focus on?",
              answer: "Focus on damage per second (DPS), armor penetration, recoil control, and ergonomics. High-tier weapons typically excel in damage (300+) and have good ergonomic ratings for better handling during combat."
            },
            {
              question: "How do I unlock all Helldivers 2 weapon customization levels?",
              answer: "Weapon customization unlocks through player progression, Warbond advancement, and mission completion. Reach higher player levels, purchase Warbond tiers, and complete specific missions to unlock advanced customization options."
            },
            {
              question: "What is the Helldivers 2 weapon customization tier list ranking?",
              answer: "S-Tier weapons (300+ damage) include top performers for maximum effectiveness. A-Tier weapons (200-299 damage) offer excellent versatility. B-Tier weapons (100-199 damage) are solid choices for specific situations."
            },
            {
              question: "Does Helldivers 2 weapon customization work on PC?",
              answer: "Yes, Helldivers 2 weapon customization is fully supported on PC. Our web-based tool works on all platforms and provides the same comprehensive customization features regardless of your gaming platform."
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