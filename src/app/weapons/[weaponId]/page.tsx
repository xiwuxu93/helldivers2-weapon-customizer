import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import helldiversDatabase from '@/../public/helldivers2/data/helldivers2_comprehensive_database.json'
import type { WeaponData, WeaponAttachment } from '@/lib/helldivers-data'

type WeaponRouteParams = {
  weaponId: string
}

const data = helldiversDatabase as unknown as {
  weapons?: {
    primary?: WeaponData[]
    secondary?: WeaponData[]
    support?: WeaponData[]
  }
  attachments?: WeaponAttachment[]
}

const allWeapons: WeaponData[] = [
  ...(data.weapons?.primary ?? []),
  ...(data.weapons?.secondary ?? []),
  ...(data.weapons?.support ?? [])
]

function getWeaponById(weaponId: string) {
  return allWeapons.find((weapon) => weapon.id === weaponId)
}

function getCompatibleAttachments(weapon: WeaponData | undefined) {
  if (!weapon) return []

  const attachments = data.attachments ?? []
  const availableByName = weapon.customization?.available_attachments ?? []

  return attachments.filter((attachment) => {
    if (availableByName.includes(attachment.name)) {
      return true
    }
    return attachment.compatible_weapons?.includes(weapon.id)
  })
}

export function generateStaticParams() {
  return allWeapons.map((weapon) => ({ weaponId: weapon.id }))
}

export function generateMetadata({ params }: { params: WeaponRouteParams }): Metadata {
  const weapon = getWeaponById(params.weaponId)

  if (!weapon) {
    return {
      title: 'Weapon Not Found | Helldivers 2 Arsenal'
    }
  }

  return {
    title: `${weapon.name} Loadout Guide | Helldivers 2 Weapon Customizer`,
    description: `Helldivers 2 build guide for ${weapon.name}. Review stats, attachments, stratagem pairings, and tactics before deploying.`,
    alternates: {
      canonical: `https://helldivers2-weapon-customization.com/weapons/${weapon.id}`
    }
  }
}

export default function WeaponDetailPage({ params }: { params: WeaponRouteParams }) {
  const weapon = getWeaponById(params.weaponId)

  if (!weapon) {
    notFound()
  }

  const attachments = getCompatibleAttachments(weapon)
  const tierDamage = weapon.stats.damage

  type StatTone = 'blue' | 'green' | 'yellow' | 'red' | 'primary'

  const toneStyles: Record<StatTone, { container: string; label: string; value: string }> = {
    blue: {
      container: 'border-helldiver-blue-400/50 bg-helldiver-blue-500/10 dark:bg-helldiver-blue-900/40',
      label: 'text-helldiver-blue-600 dark:text-helldiver-blue-200',
      value: 'text-helldiver-blue-900 dark:text-white'
    },
    green: {
      container: 'border-helldiver-green-400/50 bg-helldiver-green-500/10 dark:bg-helldiver-green-900/40',
      label: 'text-helldiver-green-700 dark:text-helldiver-green-200',
      value: 'text-helldiver-green-900 dark:text-white'
    },
    yellow: {
      container: 'border-warning-400/50 bg-warning-400/10 dark:bg-warning-900/40',
      label: 'text-warning-600 dark:text-warning-300',
      value: 'text-warning-700 dark:text-warning-200'
    },
    red: {
      container: 'border-error-400/50 bg-error-500/10 dark:bg-error-900/40',
      label: 'text-error-600 dark:text-error-300',
      value: 'text-error-700 dark:text-error-200'
    },
    primary: {
      container: 'border-primary-400/50 bg-primary-500/10 dark:bg-primary-900/40',
      label: 'text-primary-600 dark:text-primary-300',
      value: 'text-primary-700 dark:text-white'
    }
  }

  const statPanels: Array<{ label: string; value: string; tone: StatTone }> = [
    { label: 'Damage', value: `${weapon.stats.damage}`, tone: 'blue' },
    { label: 'Capacity', value: `${weapon.stats.capacity}`, tone: 'green' },
    { label: 'Fire Rate', value: `${weapon.stats.fire_rate} RPM`, tone: 'yellow' },
    { label: 'Reload', value: `${weapon.stats.reload_time}s`, tone: 'red' },
  ]

  if (weapon.stats.recoil !== undefined) {
    statPanels.push({ label: 'Recoil', value: `${weapon.stats.recoil}`, tone: 'primary' })
  }

  if (weapon.json_data?.accurate_damage) {
    statPanels.push({ label: 'Accurate Damage', value: `${weapon.json_data.accurate_damage}`, tone: 'blue' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-helldiver-steel-50 to-helldiver-blue-50 dark:from-helldiver-steel-950 dark:to-helldiver-blue-950 py-10">
      <div className="container mx-auto px-4 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-display font-black text-super-earth uppercase">
              {weapon.name}
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Battle report curated from Super Earth field data. Review performance metrics, recommended stratagems, and optimal attachments for upcoming deployments.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="font-military uppercase text-xs border-helldiver-steel-400 text-helldiver-steel-600 dark:text-helldiver-steel-300">
                {weapon.category}
              </Badge>
              {weapon.warbond && (
                <Badge variant="outline" className="font-military uppercase text-xs border-helldiver-yellow-400 text-helldiver-yellow-600 bg-helldiver-yellow-50 dark:bg-helldiver-yellow-900/20">
                  {weapon.warbond}
                </Badge>
              )}
              <Badge variant="secondary" className="font-military uppercase text-xs font-bold">
                {weapon.stats.armor_penetration}
              </Badge>
            </div>
          </div>
          <Button asChild variant="outline" className="self-start md:self-auto">
            <Link href="/">
              ← Back to Arsenal
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-2xl font-display">Combat Profile</CardTitle>
              <CardDescription>Primary performance stats captured from the Helldivers 2 arsenal database</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                {statPanels.map((panel) => (
                  <div
                    key={`${weapon.id}-${panel.label}`}
                    className={`rounded-lg border p-4 shadow-sm backdrop-blur-xs transition-colors ${toneStyles[panel.tone].container}`}
                  >
                    <p className={`text-xs font-semibold uppercase tracking-wide ${toneStyles[panel.tone].label}`}>
                      {panel.label}
                    </p>
                    <p className={`text-2xl font-display font-black ${toneStyles[panel.tone].value}`}>
                      {panel.value}
                    </p>
                  </div>
                ))}
              </div>

              {weapon.visual_data?.description && (
                <div className="text-sm text-muted-foreground leading-relaxed">
                  {weapon.visual_data.description}
                </div>
              )}

              {weapon.visual_data?.distinctive_features && weapon.visual_data.distinctive_features.length > 0 && (
                <div className="space-y-2">
                  <Separator />
                  <p className="text-sm font-medium text-muted-foreground">Distinctive Features</p>
                  <div className="flex flex-wrap gap-2">
                    {weapon.visual_data.distinctive_features.map((feature, index) => (
                      <Badge key={`${weapon.id}-feature-${index}`} variant="outline" className="text-xs uppercase">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-display">Role & Tier</CardTitle>
              <CardDescription>Suggested squad role and threat response planning</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="p-4 bg-helldiver-blue-50 dark:bg-helldiver-blue-950/20 rounded-lg">
                <p className="text-muted-foreground">Operational Tier</p>
                <p className="text-2xl font-display font-black">{tierDamage >= 300 ? 'S' : tierDamage >= 200 ? 'A' : tierDamage >= 100 ? 'B' : 'C'}-Tier</p>
              </div>
              {weapon.customization?.unlock_condition && (
                <div>
                  <p className="text-muted-foreground uppercase text-xs">Unlock Condition</p>
                  <p className="font-medium">{weapon.customization.unlock_condition}</p>
                </div>
              )}
              {weapon.warbond && weapon.warbond !== 'Free' && (
                <div>
                  <p className="text-muted-foreground uppercase text-xs">Warbond</p>
                  <p className="font-medium">{weapon.warbond}</p>
                </div>
              )}
              <div>
                <p className="text-muted-foreground uppercase text-xs">Recommended Stratagem Pairings</p>
                <ul className="mt-2 space-y-1 list-disc list-inside">
                  <li>Eagle support or orbital strikes to complement its damage profile.</li>
                  <li>Defensive stratagems like Shield Generator Relay for prolonged engagements.</li>
                  <li>Utility call-ins (Resupply, Guard Dog) to cover magazine and support gaps.</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-display">Compatible Attachments</CardTitle>
              <CardDescription>Mix and match components to optimize for your mission parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {attachments.length > 0 ? (
                attachments.map((attachment) => (
                  <div key={attachment.id} className="p-4 border border-border rounded-lg bg-background/60">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="space-y-1">
                        <p className="font-semibold">{attachment.name}</p>
                        <p className="text-xs uppercase text-muted-foreground">{attachment.category}</p>
                      </div>
                      {attachment.unlock_level && (
                        <Badge variant="outline" className="text-xs">
                          Unlocks at Level {attachment.unlock_level}
                        </Badge>
                      )}
                    </div>
                    {attachment.visual_data?.description && (
                      <p className="text-sm text-muted-foreground mt-2">
                        {attachment.visual_data.description}
                      </p>
                    )}
                    <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-muted-foreground">
                      {Object.entries(attachment.effects).map(([effectKey, effectValue]) => (
                        <div key={`${attachment.id}-${effectKey}`} className="flex justify-between">
                          <span className="uppercase">{effectKey}</span>
                          <span className="font-mono text-helldiver-blue-600 dark:text-helldiver-blue-300">{effectValue}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  No attachments listed for this weapon in the current database.
                </p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-display">Field Notes</CardTitle>
              <CardDescription>Situational tactics to maximize efficiency</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h3 className="font-semibold text-foreground">Target Priorities</h3>
                <p>Focus on enemies vulnerable to {weapon.stats.armor_penetration.toLowerCase()} penetration. Rotate secondary stratagems to cover its blind spots.</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Squad Synergy</h3>
                <p>Pair with Helldivers carrying heavy anti-armor or crowd-control tools to maintain balance across mission objectives.</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Extraction Tips</h3>
                <p>Coordinate resupply drops before calling extraction. Use defensive stratagems to protect the LZ while the weapon reloads.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
