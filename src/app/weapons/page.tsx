import type { Metadata } from 'next'
import helldiversDatabase from '@/../public/helldivers2/data/helldivers2_comprehensive_database.json'
import { normalizeHomePageData, combineWeapons } from '@/lib/homepage-data'
import { WeaponListClient } from '@/components/weapons/weapon-list-client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Breadcrumb } from '@/components/seo/breadcrumb'

export const metadata: Metadata = {
  title: 'Helldivers 2 Weapons Library',
  description: 'Browse every Helldivers 2 weapon with stats, attachments, warbond unlocks, and recommended stratagem pairings.',
  alternates: {
    canonical: 'https://helldivers2-weapon-customization.com/weapons'
  }
}

export default function WeaponsPage() {
  const data = normalizeHomePageData(helldiversDatabase)
  const allWeapons = combineWeapons(data)

  return (
    <div className="min-h-screen bg-gradient-to-br from-helldiver-steel-50 to-helldiver-blue-50 dark:from-helldiver-steel-950 dark:to-helldiver-blue-950 py-10">
      <div className="container mx-auto px-4 space-y-8">
        <Breadcrumb items={[{ name: 'Weapons Library' }]} />

        <Card className="command-panel">
          <CardHeader>
            <CardTitle className="text-3xl font-display font-black text-super-earth uppercase">
              Helldivers 2 Weapons Library
            </CardTitle>
            <CardDescription>
              Filter and compare the entire Helldivers 2 arsenal, then jump into detailed loadout guides for every weapon.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Use the mission parameters below to focus on weapon categories, warbonds, and tier rankings. Open a weapon to customize attachments or dive into the full deployment briefing.
            </p>
          </CardContent>
        </Card>

        <WeaponListClient data={data} initialWeapons={allWeapons} />
      </div>
    </div>
  )
}
