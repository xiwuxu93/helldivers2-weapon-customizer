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
    default: 'Helldivers 2 Weapon Customizer | Galactic War Guide',
    template: '%s | Helldivers 2 Weapon Customization'
  },
  description: 'Helldivers 2 weapon customizer with live stats, faction weaknesses, stratagem synergies, mission tactics, and Warbond unlock paths to win the Galactic War.',
  keywords: [
    'helldivers 2 weapon customization',
    'helldivers 2 weapon stats',
    'helldivers 2 stratagems',
    'helldivers 2 enemy weaknesses',
    'helldivers 2 mission guide',
    'helldivers 2 warbond unlocks'
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
    title: 'Helldivers 2 Weapon Customizer | Galactic War Guide',
    description: 'Optimize Helldivers 2 loadouts with live weapon stats, Terminid and Automaton weaknesses, stratagem combos, and Warbond unlocks.',
    siteName: 'Helldivers 2 Weapon Customization - Galactic War Loadout Builder',
    images: [
      {
        url: 'https://helldivers2-weapon-customization.com/logo.png',
        width: 1200,
        height: 630,
        alt: 'Helldivers 2 Weapon Customizer Tool',
        type: 'image/png'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Helldivers 2 Weapon Customizer | Loadout Guide',
    description: 'Helldivers 2 weapon customization: live stats, faction weaknesses, stratagem synergies, and mission tactics for every Helldiver squad. 🎯🔫',
    images: ['https://helldivers2-weapon-customization.com/logo.png'],
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
              question: "How do I counter Terminid swarms in Helldivers 2?",
              answer: "Equip area-of-effect flames or explosives, keep a railgun or recoilless rifle for Chargers, and drop napalm or static field stratagems before the bugs surround the squad."
            },
            {
              question: "What stratagem combo works best against Automaton armor?",
              answer: "Pair recoilless rifles or railguns with Eagle 500kg bombs or Orbital Railcannon strikes, and use smoke or shield relays to cross the Automaton firing lines safely."
            },
            {
              question: "How often does the Helldivers 2 Galactic War map change?",
              answer: "Major Orders usually rotate every few days, shifting sector priorities, reward modifiers, and the enemies you will encounter on your next deployment."
            },
            {
              question: "How do I unlock new weapon mods and attachments?",
              answer: "Level up your account for base attachments, spend medals on seasonal Warbonds for premium gear, and complete Major Order or event missions for exclusive cosmetics."
            },
            {
              question: "How can I stop Helldivers 2 customization crashes?",
              answer: "Verify game files, install the latest GPU drivers, disable overlays or overclocks, and resync Steam Cloud or PSN saves after editing loadouts."
            },
            {
              question: "Which boosters help during high-intensity alerts?",
              answer: "Common picks include Hellfire for Terminid burn damage, Vitality Serum for survivability, and Flexible Reinforcement to refresh reinforcements when dropships are limited."
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
