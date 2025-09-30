import { MetadataRoute } from 'next'
import fs from 'node:fs'
import path from 'node:path'
import helldiversDatabase from '@/../public/helldivers2/data/helldivers2_comprehensive_database.json'
import type { WeaponData } from '@/lib/helldivers-data'

type HelldiversDataset = {
  meta?: {
    last_updated?: string
  }
  weapons?: {
    primary?: WeaponData[]
    secondary?: WeaponData[]
    support?: WeaponData[]
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://helldivers2-weapon-customization.com'
  const currentDate = new Date().toISOString()
  const dataset = helldiversDatabase as unknown as HelldiversDataset
  const fallbackDataTimestamp = dataset.meta?.last_updated ?? currentDate

  const resolveLastModified = (relativePath: string): string => {
    try {
      const fileStats = fs.statSync(path.join(process.cwd(), relativePath))
      return fileStats.mtime.toISOString()
    } catch (error) {
      return fallbackDataTimestamp
    }
  }

  const rootPageModified = resolveLastModified('src/app/page.tsx')
  const changelogPageModified = resolveLastModified('src/app/changelog/page.tsx')
  const contactPageModified = resolveLastModified('src/app/contact/page.tsx')
  const weaponPageModified = resolveLastModified('src/app/weapons/[weaponId]/page.tsx')

  const allWeapons: WeaponData[] = [
    ...(dataset.weapons?.primary ?? []),
    ...(dataset.weapons?.secondary ?? []),
    ...(dataset.weapons?.support ?? [])
  ]

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: rootPageModified,
      changeFrequency: 'weekly',
      priority: 1.0
    },
    {
      url: `${baseUrl}/changelog`,
      lastModified: changelogPageModified,
      changeFrequency: 'monthly',
      priority: 0.5
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: contactPageModified,
      changeFrequency: 'monthly',
      priority: 0.4
    }
  ]

  const weaponRoutes: MetadataRoute.Sitemap = allWeapons.map((weapon) => ({
    url: `${baseUrl}/weapons/${weapon.id}`,
    lastModified: weaponPageModified,
    changeFrequency: 'weekly',
    priority: 0.7
  }))

  return [...staticRoutes, ...weaponRoutes]
}
