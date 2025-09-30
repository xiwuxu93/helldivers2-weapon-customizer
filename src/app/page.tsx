'use client'

import { useEffect, useMemo, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { WeaponListClient } from '@/components/weapons/weapon-list-client'
import { WeaponData, WeaponAttachment } from '@/lib/helldivers-data'
import fallbackHelldiversData from '@/../public/helldivers2/data/helldivers2_comprehensive_database.json'
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

type StratagemGroup = Record<string, unknown>

interface HomePageData {
  weapons: {
    primary: WeaponData[]
    secondary: WeaponData[]
    support: WeaponData[]
  }
  attachments: WeaponAttachment[]
  stratagems: {
    general: StratagemGroup[]
    orbital: StratagemGroup[]
    eagle: StratagemGroup[]
    bridge: StratagemGroup[]
  }
  meta?: {
    last_updated?: string
    version?: string
  }
  game_info?: {
    release_date?: string
    platforms?: string[]
    genre?: string
  }
}

const defaultData: HomePageData = {
  weapons: {
    primary: [],
    secondary: [],
    support: []
  },
  attachments: [],
  stratagems: {
    general: [],
    orbital: [],
    eagle: [],
    bridge: []
  }
}

function normalizeData(rawData: any): HomePageData {
  const safeStratagems = rawData?.stratagems ?? {}

  return {
    weapons: {
      primary: Array.isArray(rawData?.weapons?.primary) ? rawData.weapons.primary : [],
      secondary: Array.isArray(rawData?.weapons?.secondary) ? rawData.weapons.secondary : [],
      support: Array.isArray(rawData?.weapons?.support) ? rawData.weapons.support : []
    },
    attachments: Array.isArray(rawData?.attachments) ? rawData.attachments : [],
    stratagems: {
      general: Array.isArray(safeStratagems?.general) ? safeStratagems.general : [],
      orbital: Array.isArray(safeStratagems?.orbital) ? safeStratagems.orbital : [],
      eagle: Array.isArray(safeStratagems?.eagle) ? safeStratagems.eagle : [],
      bridge: Array.isArray(safeStratagems?.bridge) ? safeStratagems.bridge : []
    },
    meta: rawData?.meta,
    game_info: rawData?.game_info
  }
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

export default function HomePage() {
  const [data, setData] = useState<HomePageData>(defaultData)
  const [allWeapons, setAllWeapons] = useState<WeaponData[]>([])

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/helldivers2/data/helldivers2_comprehensive_database.json')

        if (!response.ok) {
          throw new Error(`Failed to load data: ${response.status}`)
        }

        const incomingData = await response.json()
        const normalized = normalizeData(incomingData)

        if (normalized.weapons.primary.length === 0 &&
            normalized.weapons.secondary.length === 0 &&
            normalized.weapons.support.length === 0) {
          throw new Error('Weapon payload empty, using fallback dataset')
        }

        setData(normalized)
        setAllWeapons([
          ...normalized.weapons.primary,
          ...normalized.weapons.secondary,
          ...normalized.weapons.support
        ])
      } catch (error) {
        console.error('Error loading data, using fallback dataset:', error)
        const normalizedFallback = normalizeData(fallbackHelldiversData)
        setData(normalizedFallback)
        setAllWeapons([
          ...normalizedFallback.weapons.primary,
          ...normalizedFallback.weapons.secondary,
          ...normalizedFallback.weapons.support
        ])
      }
    }

    loadData()
  }, [])

  const scrollToWeaponCustomizer = () => {
    const element = document.getElementById('weapon-customizer-section')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const statistics = useMemo(() => {
    const weaponsWithArmorPiercing = allWeapons.filter(weapon => ['Medium', 'Heavy'].includes(weapon.stats.armor_penetration))
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
                Helldivers 2 is a third-person cooperative shooter where up to four Helldivers deploy to spread Managed Democracy across contested systems. Every operation influences the persistent Galactic War map, with major orders rotating regularly to target Terminid hives or Automaton factories.
              </p>
              <p className="text-sm text-muted-foreground">
                This command console tracks {statistics.freeWeapons} requisition-free arsenal options and {statistics.attachmentsTracked} attachments, helping you plan upgrades before spending precious medals or Warbond requisition.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-helldiver-blue-50 dark:bg-helldiver-blue-950/20">
                  <h3 className="font-semibold text-helldiver-blue-800 dark:text-helldiver-blue-200">Core Directives</h3>
                  <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                    <li>• Friendly fire is always active—coordinate fields of fire.</li>
                    <li>• Reinforce teammates via stratagem codes under pressure.</li>
                    <li>• Protect objectives to increase liberation percentage.</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-helldiver-green-50 dark:bg-helldiver-green-950/20">
                  <h3 className="font-semibold text-helldiver-green-800 dark:text-helldiver-green-200">War Resources</h3>
                  <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                    <li>• Earn requisition for stratagem unlocks and upgrades.</li>
                    <li>• Advance seasonal Warbonds for premium equipment.</li>
                    <li>• Collect samples and medals to accelerate research.</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-helldiver-yellow-50 dark:bg-helldiver-yellow-950/20">
                  <h3 className="font-semibold text-helldiver-yellow-800 dark:text-helldiver-yellow-200">Environmental Hazards</h3>
                  <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                    <li>• Fight through blizzards, meteor showers, and acid rain.</li>
                    <li>• Adjust loadouts for low visibility or heat management.</li>
                    <li>• Use map intel to avoid patrols and alarm towers.</li>
                  </ul>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-lg bg-helldiver-steel-50 dark:bg-helldiver-steel-900/40">
                  <h3 className="font-semibold text-lg text-helldiver-blue-700 dark:text-helldiver-blue-200">Extermination & Hive Hunts</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Clear bug breaches, destroy spore spewers, and collapse nests before patrols respawn.
                  </p>
                  <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                    <li>• Bring flamethrowers, grenade launchers, and airburst ordnance.</li>
                    <li>• Equip stimulants or boosters that increase stamina for constant kiting.</li>
                    <li>• Chain stratagems: Quasar Cannon for Chargers, Orbital Gas for swarm denial.</li>
                  </ul>
                </div>
                <div className="p-5 rounded-lg bg-helldiver-steel-50 dark:bg-helldiver-steel-900/40">
                  <h3 className="font-semibold text-lg text-helldiver-green-700 dark:text-helldiver-green-200">Strategic Objectives & Retrieval</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Upload data, escort civilians, or salvage SSSD packages while enemies escalate.
                  </p>
                  <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                    <li>• Pack precise primaries, suppressed secondaries, and guard dog drones.</li>
                    <li>• Use Eagle smoke strikes and shield relays to move heavy objectives.</li>
                    <li>• Share stratagem timings to rotate objectives without downtime.</li>
                  </ul>
                </div>
                <div className="p-5 rounded-lg bg-helldiver-steel-50 dark:bg-helldiver-steel-900/40">
                  <h3 className="font-semibold text-lg text-helldiver-yellow-700 dark:text-helldiver-yellow-200">Defend & Extraction Operations</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Survive multi-wave assaults at launch pads, artillery sites, or drill platforms.
                  </p>
                  <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                    <li>• Deploy autoturrets, mines, mortars, and arc throwers for perimeter control.</li>
                    <li>• Stagger ammo drops and resupplies to avoid stratagem cooldown overlap.</li>
                    <li>• Finish with Eagle strafes or 500kg bombs as extraction shuttle lands.</li>
                  </ul>
                </div>
                <div className="p-5 rounded-lg bg-helldiver-steel-50 dark:bg-helldiver-steel-900/40">
                  <h3 className="font-semibold text-lg text-helldiver-red-700 dark:text-helldiver-red-200">High-Intensity Alerts</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Expect dense patrols, extreme weather modifiers, and limited reinforcement windows.
                  </p>
                  <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                    <li>• Carry emergency anti-armor (EAT-17, Recoilless, Railgun) for random spawns.</li>
                    <li>• Stack morale boosters like Flex Armor or Hellpod Engineer for quick redeploys.</li>
                    <li>• Prioritize sample extraction before extraction to maximize rewards.</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section id="stratagem-playbook" className="mt-16 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl font-display">
                <RadioTower className="w-6 h-6 text-helldiver-blue-500" />
                Stratagem Playbook
              </CardTitle>
              <CardDescription>
                Recommended stratagem combinations sourced from Helldivers 2 community tactics and field reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-lg bg-helldiver-blue-50 dark:bg-helldiver-blue-950/20 border border-helldiver-blue-200/40">
                  <h3 className="font-semibold text-lg text-helldiver-blue-700 dark:text-helldiver-blue-200">Crowd Control Stack</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Layer area denial to keep patrols from overwhelming objectives.
                  </p>
                  <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                    <li>• Static Field Conductors to slow charging enemies.</li>
                    <li>• Orbital Gas or Incendiary Barrage to damage everything inside the field.</li>
                    <li>• Autocannon or Arc Thrower to execute high-priority targets while they are trapped.</li>
                  </ul>
                </div>
                <div className="p-5 rounded-lg bg-helldiver-red-50 dark:bg-helldiver-red-950/20 border border-helldiver-red-200/40">
                  <h3 className="font-semibold text-lg text-helldiver-red-700 dark:text-helldiver-red-200">Armor Breaker Lance</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Delete heavy armor before it reaches your squad.
                  </p>
                  <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                    <li>• Recoilless Rifle with backpack loader for repeat shots.</li>
                    <li>• Railgun in unsafe mode for Chargers, Hulks, and Tanks.</li>
                    <li>• Eagle 500kg or Orbital Railcannon to finish large clusters instantly.</li>
                  </ul>
                </div>
                <div className="p-5 rounded-lg bg-helldiver-green-50 dark:bg-helldiver-green-950/20 border border-helldiver-green-200/40">
                  <h3 className="font-semibold text-lg text-helldiver-green-700 dark:text-helldiver-green-200">Support & Sustain</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Keep squads supplied through long operations.
                  </p>
                  <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                    <li>• Supply Pack plus Guard Dog Rover for automatic covering fire.</li>
                    <li>• Shield Generator Relay to hold defensive points without attrition.</li>
                    <li>• Orbital Precision Strike to remove Mortar Towers or Fabricators safely.</li>
                  </ul>
                </div>
                <div className="p-5 rounded-lg bg-helldiver-yellow-50 dark:bg-helldiver-yellow-950/20 border border-helldiver-yellow-200/40">
                  <h3 className="font-semibold text-lg text-helldiver-yellow-700 dark:text-helldiver-yellow-200">Extraction Protocol</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Stabilize the LZ and secure samples before the shuttle arrives.
                  </p>
                  <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                    <li>• Eagle Cluster Bomb to wipe the landing zone on call-in.</li>
                    <li>• Heavy Machine Gun or Mortar Sentry for overlapping suppression.</li>
                    <li>• Upload Booster or Hellpod Space Optimization for faster reinforcement cycles.</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mt-16 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl font-display">
                <Swords className="w-6 h-6 text-helldiver-yellow-500" />
                Loadout Roles & Synergy
              </CardTitle>
              <CardDescription>
                Assign battlefield roles so every Helldiver slot complements the rest of the squad
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-lg bg-helldiver-blue-50 dark:bg-helldiver-blue-950/20">
                  <h3 className="font-semibold text-helldiver-blue-800 dark:text-helldiver-blue-200">Vanguard</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Heavy armor, crowd control primaries, stun grenades, and shield boosters to anchor fights.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-helldiver-green-50 dark:bg-helldiver-green-950/20">
                  <h3 className="font-semibold text-helldiver-green-800 dark:text-helldiver-green-200">Demolition</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Carries recoilless rifles, railguns, and high-impact stratagems for armor cracking.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-helldiver-yellow-50 dark:bg-helldiver-yellow-950/20">
                  <h3 className="font-semibold text-helldiver-yellow-800 dark:text-helldiver-yellow-200">Support Specialist</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Runs supply packs, medic stimulants, and defensive stratagems to keep the team alive.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-helldiver-red-50 dark:bg-helldiver-red-950/20">
                  <h3 className="font-semibold text-helldiver-red-800 dark:text-helldiver-red-200">Recon & Intel</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Scouts patrol routes with UAVs, marks objectives, and handles silencers for stealth approaches.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section id="faq" className="mt-16 space-y-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl font-display">
                <Flame className="w-6 h-6 text-helldiver-red-500" />
                Troubleshooting & Stability
              </CardTitle>
              <CardDescription>
                Resolve common Helldivers 2 weapon customization and performance problems
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3 text-red-600 dark:text-red-400">Critical Issues</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800/30">
                      <h4 className="font-medium text-red-800 dark:text-red-200">Missing Customization Menu</h4>
                      <p className="text-sm text-red-600 dark:text-red-300 mt-1">Occurs after patches or corrupted local files; also check server status.</p>
                    </div>
                    <div className="p-3 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800/30">
                      <h4 className="font-medium text-red-800 dark:text-red-200">Crashes During Loadout Changes</h4>
                      <p className="text-sm text-red-600 dark:text-red-300 mt-1">Triggered by outdated GPU drivers, overclocking, or incompatible overlays.</p>
                    </div>
                    <div className="p-3 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800/30">
                      <h4 className="font-medium text-red-800 dark:text-red-200">Cloud Sync Conflicts</h4>
                      <p className="text-sm text-red-600 dark:text-red-300 mt-1">Loadouts revert if Steam Cloud or PSN cross-save pushes older profiles.</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-3 text-green-600 dark:text-green-400">Recommended Fixes</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800/30">
                      <h4 className="font-medium text-green-800 dark:text-green-200">Verify & Repair Files</h4>
                      <p className="text-sm text-green-600 dark:text-green-300 mt-1">Use Steam/PS5 integrity checks, then relaunch to rebuild the customization cache.</p>
                    </div>
                    <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800/30">
                      <h4 className="font-medium text-green-800 dark:text-green-200">Update Drivers & Disable Overlays</h4>
                      <p className="text-sm text-green-600 dark:text-green-300 mt-1">Install the latest GPU driver, close third-party overlays, and lower ray-tracing settings.</p>
                    </div>
                    <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800/30">
                      <h4 className="font-medium text-green-800 dark:text-green-200">Resync Accounts</h4>
                      <p className="text-sm text-green-600 dark:text-green-300 mt-1">Force a new cloud save after adjusting loadouts to prevent old presets from returning.</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl font-display">
                <TrendingUp className="w-6 h-6 text-helldiver-blue-500" />
                Weapon Upgrade & Unlock Guide
              </CardTitle>
              <CardDescription>
                Track how each Helldivers 2 weapon mod unlocks through progression, Warbonds, and mission rewards
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-helldiver-blue-50 dark:bg-helldiver-blue-950/20 border border-helldiver-blue-200/40">
                  <h3 className="font-semibold text-helldiver-blue-800 dark:text-helldiver-blue-200">Level Requirements</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Base attachments unlock as your account level rises. Prioritize requisition farming to hit checkpoints quickly.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-helldiver-green-50 dark:bg-helldiver-green-950/20 border border-helldiver-green-200/40">
                  <h3 className="font-semibold text-helldiver-green-800 dark:text-helldiver-green-200">Warbond Progression</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Seasonal Warbonds rotate elite primaries, boosters, and armor sets. Spend medals efficiently to reach your priority pages.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-helldiver-yellow-50 dark:bg-helldiver-yellow-950/20 border border-helldiver-yellow-200/40">
                  <h3 className="font-semibold text-helldiver-yellow-800 dark:text-helldiver-yellow-200">Mission Rewards</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Major Orders, defense campaigns, and deep terminid dives reward unique cosmetics and boosters tied to community goals.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl font-display">
                <Timer className="w-6 h-6 text-helldiver-yellow-500" />
                Frequently Briefed Questions
              </CardTitle>
              <CardDescription>
                Quick answers sourced from Helldivers 2 operations, patch notes, and community intel
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h3 className="font-semibold text-foreground">How often does the Galactic War map change?</h3>
                  <p>Major Orders typically rotate every few days, shifting primary targets and reward modifiers. Check the in-game War Table before deploying.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">What difficulty should new squads start on?</h3>
                  <p>Begin on Trivial or Easy to learn stratagem codes and friendly fire spacing. Increase to Medium once your team has armor-piercing answers unlocked.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Which boosters stack well for high-intensity missions?</h3>
                  <p>Popular combinations include Hellfire for bug burning squads, Vitality Serum for survivability, and Flexible Reinforcement for faster respawns.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">How do I maximize sample farming?</h3>
                  <p>Run operations on higher difficulties, equip Terrain Navigator or Pathfinders, and call extraction only after clearing nearby points of interest.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mt-16 bg-gradient-to-r from-helldiver-blue-500 to-helldiver-green-500 text-white rounded-lg">
          <div className="p-8 text-center space-y-4">
            <h3 className="text-2xl font-display font-bold">
              Ready to Spread Managed Democracy?
            </h3>
            <p className="text-helldiver-blue-100 max-w-2xl mx-auto">
              Rally your squad, synchronize stratagem timers, and deploy with the best Helldivers 2 builds for every faction threat. The next Major Order won’t complete itself.
            </p>
            <Button
              size="lg"
              onClick={scrollToWeaponCustomizer}
              className="bg-helldiver-yellow-400 hover:bg-helldiver-yellow-500 text-helldiver-steel-900 font-bold"
            >
              Build the Perfect Loadout
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}
