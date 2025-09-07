'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { WeaponCard } from '@/components/weapons/weapon-card'
import { WeaponCustomizer } from '@/components/weapons/weapon-customizer'
import { loadHelldiversData, HelldiversData, WeaponData, filterWeapons, WeaponFilters, getCompatibleAttachments } from '@/lib/helldivers-data'
import { Search, Filter, Zap, Target, Shield, Settings, TrendingUp } from 'lucide-react'

export default function HomePage() {
  const [data, setData] = useState<HelldiversData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filteredWeapons, setFilteredWeapons] = useState<WeaponData[]>([])
  const [selectedWeapon, setSelectedWeapon] = useState<WeaponData | null>(null)
  
  // Filter states
  const [filters, setFilters] = useState<WeaponFilters>({
    category: 'all',
    warbond: 'all',
    tier: 'all',
    searchQuery: ''
  })

  // Load data on component mount
  useEffect(() => {
    async function fetchData() {
      try {
        const helldiversData = await loadHelldiversData()
        setData(helldiversData)
        
        console.log('Data loaded successfully:', {
          primaryWeapons: helldiversData.weapons.primary.length,
          secondaryWeapons: helldiversData.weapons.secondary.length,
          supportWeapons: helldiversData.weapons.support.length,
          attachments: helldiversData.attachments.length
        })
        
        // Initialize with all weapons
        const allWeapons = [
          ...helldiversData.weapons.primary,
          ...helldiversData.weapons.secondary,
          ...helldiversData.weapons.support
        ]
        setFilteredWeapons(allWeapons)
      } catch (err) {
        setError('Failed to load Helldivers 2 data. Please try again later.')
        console.error('Data loading error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Update filtered weapons when filters change
  useEffect(() => {
    if (!data) return
    
    const filtered = filterWeapons(data, filters)
    setFilteredWeapons(filtered)
  }, [data, filters])

  const handleFilterChange = (key: keyof WeaponFilters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value === 'all' ? undefined : value
    }))
  }

  const handleCustomizeWeapon = (weapon: WeaponData) => {
    setSelectedWeapon(weapon)
    console.log('Customize weapon:', weapon.name)
  }

  const handleCompareWeapon = (weapon: WeaponData) => {
    console.log('Compare weapon:', weapon.name)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <div className="h-12 bg-gray-200 animate-pulse rounded w-3/4 mx-auto"></div>
              <div className="h-6 bg-gray-200 animate-pulse rounded w-2/3 mx-auto"></div>
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="h-10 w-64 bg-gray-200 animate-pulse rounded"></div>
              <div className="h-10 w-40 bg-gray-200 animate-pulse rounded"></div>
              <div className="h-10 w-40 bg-gray-200 animate-pulse rounded"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-96 bg-gray-200 animate-pulse rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-red-600">Error Loading Data</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => window.location.reload()} className="w-full">
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const uniqueWarbonds = data ? Array.from(new Set([
    ...data.weapons.primary.map(w => w.warbond),
    ...data.weapons.secondary.map(w => w.warbond),
    ...data.weapons.support.map(w => w.warbond)
  ].filter(Boolean))) : []

  return (
    <div className="min-h-screen bg-background scan-lines">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section - Military Command Style */}
        <div className="text-center space-y-6 mb-12 command-panel p-8 rounded-lg">
          <div className="space-y-4">
            <div className="inline-block">
              <h1 className="text-4xl md:text-6xl font-display font-black text-super-earth">
                HELLDIVERS 2
              </h1>
              <h2 className="text-2xl md:text-4xl font-military font-bold text-helldiver-blue-600 dark:text-helldiver-blue-400 mt-2">
                WEAPON ARSENAL COMMAND
              </h2>
            </div>
            <div className="flex justify-center items-center gap-4 my-4">
              <div className="h-1 w-16 bg-helldiver-yellow-400"></div>
              <Shield className="w-8 h-8 text-helldiver-blue-500" />
              <div className="h-1 w-16 bg-helldiver-yellow-400"></div>
            </div>
            <p className="text-lg text-military max-w-4xl mx-auto leading-relaxed">
              DEPLOY WITH SUPERIOR FIREPOWER - CONFIGURE YOUR LOADOUT FOR MAXIMUM TACTICAL ADVANTAGE
              <br />
              <span className="text-helldiver-yellow-600 dark:text-helldiver-yellow-400 font-semibold">
                FOR SUPER EARTH! FOR MANAGED DEMOCRACY!
              </span>
            </p>
          </div>
          
          {/* Arsenal Statistics - Military HUD Style */}
          {data && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
              <div className="hud-border bg-helldiver-blue-50/50 dark:bg-helldiver-steel-800/50 p-4 rounded text-center">
                <div className="text-3xl font-display font-black text-helldiver-blue-600">{data.weapons.primary.length}</div>
                <div className="text-sm font-military text-helldiver-steel-600 dark:text-helldiver-steel-300 uppercase tracking-wider">PRIMARY</div>
              </div>
              <div className="hud-border bg-helldiver-yellow-50/50 dark:bg-helldiver-steel-800/50 p-4 rounded text-center">
                <div className="text-3xl font-display font-black text-helldiver-yellow-600">{data.weapons.secondary.length}</div>
                <div className="text-sm font-military text-helldiver-steel-600 dark:text-helldiver-steel-300 uppercase tracking-wider">SECONDARY</div>
              </div>
              <div className="hud-border bg-helldiver-red-50/50 dark:bg-helldiver-steel-800/50 p-4 rounded text-center">
                <div className="text-3xl font-display font-black text-helldiver-red-500">{data.weapons.support.length}</div>
                <div className="text-sm font-military text-helldiver-steel-600 dark:text-helldiver-steel-300 uppercase tracking-wider">SUPPORT</div>
              </div>
              <div className="hud-border bg-helldiver-steel-50/50 dark:bg-helldiver-steel-800/50 p-4 rounded text-center">
                <div className="text-3xl font-display font-black text-helldiver-steel-600">{data.attachments.length}</div>
                <div className="text-sm font-military text-helldiver-steel-600 dark:text-helldiver-steel-300 uppercase tracking-wider">ATTACHMENTS</div>
              </div>
            </div>
          )}
        </div>

        {/* Tactical Filter Command Panel */}
        <Card className="mb-8 command-panel">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 font-military text-xl uppercase tracking-wide text-helldiver-blue-700 dark:text-helldiver-blue-300">
              <Filter className="w-6 h-6 text-helldiver-yellow-500" />
              TACTICAL WEAPON FILTER
            </CardTitle>
            <CardDescription className="font-military text-helldiver-steel-600 dark:text-helldiver-steel-300">
              SELECT OPTIMAL ARMAMENTS FOR MISSION PARAMETERS
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              {/* Search */}
              <div className="flex-1 min-w-64">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search weapons..."
                    value={filters.searchQuery || ''}
                    onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              {/* Category Filter */}
              <Select value={filters.category || 'all'} onValueChange={(value) => handleFilterChange('category', value)}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="primary">Primary</SelectItem>
                  <SelectItem value="secondary">Secondary</SelectItem>
                  <SelectItem value="support">Support</SelectItem>
                </SelectContent>
              </Select>
              
              {/* Warbond Filter */}
              <Select value={filters.warbond || 'all'} onValueChange={(value) => handleFilterChange('warbond', value)}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Warbond" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Warbonds</SelectItem>
                  {uniqueWarbonds.map(warbond => (
                    <SelectItem key={warbond} value={warbond!}>{warbond}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {/* Tier Filter */}
              <Select value={filters.tier || 'all'} onValueChange={(value) => handleFilterChange('tier', value)}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Tier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tiers</SelectItem>
                  <SelectItem value="S">S Tier</SelectItem>
                  <SelectItem value="A">A Tier</SelectItem>
                  <SelectItem value="B">B Tier</SelectItem>
                  <SelectItem value="C">C Tier</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Tactical Status Display */}
            <div className="mt-6 flex items-center justify-between bg-helldiver-steel-50 dark:bg-helldiver-steel-800/50 p-4 rounded border border-helldiver-blue-200 dark:border-helldiver-blue-600/30">
              <div className="font-military text-sm text-helldiver-steel-700 dark:text-helldiver-steel-300 uppercase tracking-wide">
                <span className="text-helldiver-blue-600 dark:text-helldiver-blue-400 font-bold">{filteredWeapons.length}</span> WEAPONS AVAILABLE FOR DEPLOYMENT
              </div>
              
              {/* Quick Action Commands */}
              <div className="flex gap-3">
                <Badge 
                  variant={filters.tier === 'S' ? 'default' : 'outline'} 
                  className="cursor-pointer font-military uppercase bg-helldiver-red-500 hover:bg-helldiver-red-600 text-white border-helldiver-red-600"
                  onClick={() => handleFilterChange('tier', filters.tier === 'S' ? 'all' : 'S')}
                >
                  ELITE TIER
                </Badge>
                <Badge 
                  variant={filters.category === 'primary' ? 'default' : 'outline'} 
                  className="cursor-pointer font-military uppercase bg-helldiver-blue-500 hover:bg-helldiver-blue-600 text-white border-helldiver-blue-600"
                  onClick={() => handleFilterChange('category', filters.category === 'primary' ? 'all' : 'primary')}
                >
                  PRIMARY ONLY
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weapons Grid */}
        {filteredWeapons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWeapons.map((weapon) => (
              <WeaponCard
                key={weapon.id}
                weapon={weapon}
                onCustomize={handleCustomizeWeapon}
                onCompare={handleCompareWeapon}
              />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="text-center py-12">
              <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Weapons Found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your filters or search criteria
              </p>
              <Button 
                onClick={() => setFilters({ category: 'all', warbond: 'all', tier: 'all', searchQuery: '' })}
                variant="outline"
              >
                Clear All Filters
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Featured Weapons Section */}
        {data && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-center mb-8">Featured Weapons</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* S-Tier Weapons */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-red-500" />
                    S-Tier Meta
                  </CardTitle>
                  <CardDescription>The most powerful weapons in the game</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {[...data.weapons.primary, ...data.weapons.support]
                      .filter(weapon => weapon.stats.damage >= 300)
                      .slice(0, 3)
                      .map(weapon => (
                        <div key={weapon.id} className="flex items-center justify-between p-2 rounded bg-muted">
                          <span className="font-medium">{weapon.name}</span>
                          <Badge className="bg-red-500 text-white">S</Badge>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              {/* Most Customizable */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5 text-blue-500" />
                    Most Customizable
                  </CardTitle>
                  <CardDescription>Weapons with the most attachment options</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {data.weapons.primary
                      .sort((a, b) => (b.customization?.available_attachments?.length || 0) - (a.customization?.available_attachments?.length || 0))
                      .slice(0, 3)
                      .map(weapon => (
                        <div key={weapon.id} className="flex items-center justify-between p-2 rounded bg-muted">
                          <span className="font-medium">{weapon.name}</span>
                          <Badge variant="outline">{weapon.customization?.available_attachments?.length || 0} slots</Badge>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              {/* Beginner Friendly */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-500" />
                    Beginner Friendly
                  </CardTitle>
                  <CardDescription>Easy to use weapons for new Helldivers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {data.weapons.primary
                      .filter(weapon => weapon.warbond === 'Free')
                      .slice(0, 3)
                      .map(weapon => (
                        <div key={weapon.id} className="flex items-center justify-between p-2 rounded bg-muted">
                          <span className="font-medium">{weapon.name}</span>
                          <Badge variant="outline" className="text-green-600">Free</Badge>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Weapon Customizer Dialog */}
        {selectedWeapon && data && (
          <WeaponCustomizer
            weapon={selectedWeapon}
            data={data}
            isOpen={selectedWeapon !== null}
            onClose={() => setSelectedWeapon(null)}
          />
        )}
      </div>
    </div>
  )
}