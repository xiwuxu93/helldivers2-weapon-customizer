'use client'

import { useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { WeaponListClient } from '@/components/weapons/weapon-list-client'
import {
  Zap,
  Target,
  Shield,
  Settings,
  TrendingUp,
  Globe2,
  Bug,
  Bot,
  Map,
  Flame,
  RadioTower,
  Swords,
  Users,
  Timer
} from 'lucide-react'
import type { HomePageData } from '@/lib/homepage-data'
import { combineWeapons } from '@/lib/homepage-data'

interface HomePageClientProps {
  data: HomePageData
}

function formatDateLabel(dateString?: string) {
  if (!dateString) {
    return 'Unknown'
  }

  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) {
    return dateString
  }

  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

export function HomePageClient({ data }: HomePageClientProps) {
  const allWeapons = useMemo(() => combineWeapons(data), [data])

  const statistics = useMemo(() => {
    const weaponsWithArmorPiercing = allWeapons.filter(weapon => ['Medium', 'Heavy', 'Anti-Tank'].includes(weapon.stats.armor_penetration))
    const freeWarbondWeapons = allWeapons.filter(weapon => !weapon.warbond || weapon.warbond === 'Free')
    const warbondSet = new Set(allWeapons.map(weapon => weapon.warbond).filter(Boolean))
    const stratagemCount = Object.values(data.stratagems).reduce((sum, group) => sum + group.length, 0)

    return {
      totalWeapons: allWeapons.length,
      armorPiercingWeapons: weaponsWithArmorPiercing.length,
      freeWeapons: freeWarbondWeapons.length,
      uniqueWarbonds: warbondSet.size,
      stratagemsTracked: stratagemCount,
      attachmentsTracked: data.attachments.length
    }
  }, [allWeapons, data.attachments.length, data.stratagems])

  const releaseDate = data.game_info?.release_date ?? '2025-09-30'
  const platforms = data.game_info?.platforms ?? ['PlayStation 5', 'PC (Steam)']
  const lastUpdatedLabel = formatDateLabel(data.meta?.last_updated)

  const scrollToWeaponCustomizer = () => {
    const element = document.getElementById('weapon-customizer-section')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-helldiver-steel-50 to-helldiver-blue-50 dark:from-helldiver-steel-950 dark:to-helldiver-blue-950">
      <div className="container mx-auto px-4 py-8">
        <section className="text-center mb-16">
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-6">
              <div className="relative">
                <Shield className="w-16 h-16 text-helldiver-blue-500" />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-helldiver-yellow-400 rounded-full animate-pulse flex items-center justify-center">
                  <span className="text-xs font-bold text-helldiver-steel-900">HD2</span>
                </div>
              </div>
              <div className="text-left">
                <h1 className="text-4xl md:text-6xl font-display font-black text-super-earth">
                  Helldivers 2 Tactical Command
                </h1>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-helldiver-blue-600 dark:text-helldiver-blue-400">
                  Weapon Customizer & Galactic War Briefing
                </h2>
              </div>
            </div>

            <p className="text-lg text-helldiver-steel-600 dark:text-helldiver-steel-300 max-w-3xl font-military">
              Drop from orbit with a plan. Build optimized Helldivers 2 loadouts, counter every faction, and synchronize stratagems before your squad hits the battlefield.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="outline" className="bg-helldiver-yellow-100 dark:bg-helldiver-yellow-900/20 border-helldiver-yellow-400 text-helldiver-yellow-700 dark:text-helldiver-yellow-300">
                <Globe2 className="w-4 h-4 mr-1" />
                Galactic War Intel
              </Badge>
              <Badge variant="outline" className="bg-helldiver-green-100 dark:bg-helldiver-green-900/20 border-helldiver-green-400 text-helldiver-green-700 dark:text-helldiver-green-300">
                <Swords className="w-4 h-4 mr-1" />
                Squad Doctrine
              </Badge>
              <Badge variant="outline" className="bg-helldiver-blue-100 dark:bg-helldiver-blue-900/20 border-helldiver-blue-400 text-helldiver-blue-700 dark:text-helldiver-blue-300">
                <Users className="w-4 h-4 mr-1" />
                Co-op Ready
              </Badge>
            </div>

            <div className="text-sm text-muted-foreground flex flex-col md:flex-row items-center gap-2">
              <span>Official launch: {releaseDate}</span>
              <span className="hidden md:inline">•</span>
              <span>Supported platforms: {platforms.join(', ')}</span>
              <span className="hidden md:inline">•</span>
              <span>Database updated: {lastUpdatedLabel}</span>
            </div>

            <Button
              size="lg"
              onClick={scrollToWeaponCustomizer}
              className="bg-helldiver-yellow-400 hover:bg-helldiver-yellow-500 text-helldiver-steel-900 font-bold"
            >
              Launch Weapon Customizer
            </Button>
          </div>
        </section>

        <section aria-labelledby="operational-stats" className="mb-16">
          <h2 id="operational-stats" className="sr-only">Operational statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-helldiver-blue-500 to-helldiver-blue-600 text-white rounded-lg">
              <div className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-helldiver-blue-100 text-sm font-medium">Weapons Catalogued</p>
                  <p className="text-3xl font-display font-black">{statistics.totalWeapons}</p>
                </div>
                <Target className="w-10 h-10 text-helldiver-blue-100" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-helldiver-green-500 to-helldiver-green-600 text-white rounded-lg">
              <div className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-helldiver-green-100 text-sm font-medium">Armor-Piercing Loadouts</p>
                  <p className="text-3xl font-display font-black">{statistics.armorPiercingWeapons}</p>
                </div>
                <Shield className="w-10 h-10 text-helldiver-green-100" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-helldiver-yellow-500 to-helldiver-yellow-600 text-white rounded-lg">
              <div className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-helldiver-yellow-100 text-sm font-medium">Warbonds Tracked</p>
                  <p className="text-3xl font-display font-black">{statistics.uniqueWarbonds}</p>
                </div>
                <Settings className="w-10 h-10 text-helldiver-yellow-100" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-helldiver-red-500 to-helldiver-red-600 text-white rounded-lg">
              <div className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-helldiver-red-100 text-sm font-medium">Stratagems Indexed</p>
                  <p className="text-3xl font-display font-black">{statistics.stratagemsTracked}</p>
                </div>
                <RadioTower className="w-10 h-10 text-helldiver-red-100" />
              </div>
            </div>
          </div>
        </section>

        <section id="overview" className="space-y-8 mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl font-display">
                <Globe2 className="w-6 h-6 text-helldiver-blue-500" />
                Galactic War Overview
              </CardTitle>
              <CardDescription>
                Key Helldivers 2 systems taken directly from the Super Earth field manual and operations log
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground">
                Helldivers 2 is a third-person cooperative shooter where up to four Helldivers deploy to spread Managed Democracy across contested systems. Every operation influences the persistent Galactic War map, with major orders rotating regularly to target Terminid hives or Automaton war factories.
              </p>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="p-5 border border-helldiver-blue-400/30 rounded-lg bg-helldiver-blue-50 dark:bg-helldiver-blue-950/20">
                  <div className="flex items-center gap-3 mb-3">
                    <TrendingUp className="w-6 h-6 text-helldiver-blue-500" />
                    <h3 className="font-semibold text-lg">Dynamic Warfront</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Major Orders shift the galactic battle line every few days, introducing new bonuses, hazards, and mission modifiers that squads must adapt to on the fly.
                  </p>
                </div>
                <div className="p-5 border border-helldiver-yellow-400/30 rounded-lg bg-helldiver-yellow-50 dark:bg-helldiver-yellow-950/20">
                  <div className="flex items-center gap-3 mb-3">
                    <Timer className="w-6 h-6 text-helldiver-yellow-500" />
                    <h3 className="font-semibold text-lg">Coordinated Drops</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Missions scale in intensity with enemy alerts—coordinate stratagems, boosters, and weapon roles before hitting the ground to keep the liberation rate climbing.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <div id="weapon-customizer-section">
          <WeaponListClient data={data} initialWeapons={allWeapons} />
        </div>

        <section id="enemy-factions" className="mt-16 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl font-display">
                <Target className="w-6 h-6 text-helldiver-red-500" />
                Enemy Faction Countermeasures
              </CardTitle>
              <CardDescription>
                Adapt each weapon build to neutralize the active Helldivers 2 threats
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                <div className="p-5 rounded-lg border border-helldiver-yellow-400/40 bg-helldiver-yellow-50 dark:bg-helldiver-yellow-950/20">
                  <div className="flex items-center gap-3 mb-3">
                    <Bug className="w-6 h-6 text-helldiver-yellow-500" />
                    <h3 className="font-semibold text-lg">Terminid Swarms</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Carapace-armored insects overwhelm with numbers, bile, and charging elites like Chargers and Bile Titans.
                  </p>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Prioritize area-of-effect, fire, and stun weaponry.</li>
                    <li>• Break Charger armor with railguns, recoilless rifles, or spear strikes.</li>
                    <li>• Drop napalm, gas strikes, or EM field stratagems to thin patrols before objectives.</li>
                  </ul>
                </div>
                <div className="p-5 rounded-lg border border-helldiver-blue-400/40 bg-helldiver-blue-50 dark:bg-helldiver-blue-950/20">
                  <div className="flex items-center gap-3 mb-3">
                    <Bot className="w-6 h-6 text-helldiver-blue-500" />
                    <h3 className="font-semibold text-lg">Automaton Collective</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Heavily armored machines deploy turrets, walkers, and gunships that punish static teams.
                  </p>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Equip armor-piercing rifles, railguns, and explosives.</li>
                    <li>• Use smoke or shield relays to cross open fire lanes.</li>
                    <li>• Combine Eagle 500kg bombs with recoilless rifles to delete fabricators fast.</li>
                  </ul>
                </div>
                <div className="p-5 rounded-lg border border-helldiver-purple-400/40 bg-helldiver-purple-50 dark:bg-helldiver-purple-950/20">
                  <div className="flex items-center gap-3 mb-3">
                    <Zap className="w-6 h-6 text-helldiver-purple-500" />
                    <h3 className="font-semibold text-lg">Illuminate Sightings</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Recon reports hint at returning Illuminate technology with energy shields and teleporting units.
                  </p>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Prepare laser, arc, or plasma weapons to bypass shields.</li>
                    <li>• Carry stun grenades to interrupt teleporting squads.</li>
                    <li>• Stack detection stratagems like UAV, Motion Sensors, and Patriot Exosuits.</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section id="mission-planning" className="mt-16 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl font-display">
                <Map className="w-6 h-6 text-helldiver-green-500" />
                Mission Planning & Hazards
              </CardTitle>
              <CardDescription>
                Tailor stratagems and weapons to each Helldivers 2 operation type and planetary condition
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 rounded-lg border border-helldiver-green-400/40 bg-helldiver-green-50 dark:bg-helldiver-green-950/20">
                  <div className="flex items-center gap-3 mb-3">
                    <Flame className="w-6 h-6 text-helldiver-green-500" />
                    <h3 className="font-semibold text-lg">Hazard Zones</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Heatwaves, blizzards, and orbital bombardment modifiers change how weapons perform—pack backups for adverse climates.
                  </p>
                </div>
                <div className="p-5 rounded-lg border border-helldiver-blue-400/40 bg-helldiver-blue-50 dark:bg-helldiver-blue-950/20">
                  <div className="flex items-center gap-3 mb-3">
                    <RadioTower className="w-6 h-6 text-helldiver-blue-500" />
                    <h3 className="font-semibold text-lg">Stratagem Windows</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Coordinate stratagem order and cooldowns before calling drops; jamming towers and fire tornados can interrupt resupply timing.
                  </p>
                </div>
                <div className="p-5 rounded-lg border border-helldiver-yellow-400/40 bg-helldiver-yellow-50 dark:bg-helldiver-yellow-950/20">
                  <div className="flex items-center gap-3 mb-3">
                    <Settings className="w-6 h-6 text-helldiver-yellow-500" />
                    <h3 className="font-semibold text-lg">Squad Roles</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Balance heavy ordnance, crowd control, and support stratagems so every Helldiver has a defined objective on the ground.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
