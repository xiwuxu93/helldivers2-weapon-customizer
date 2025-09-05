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

  const uniqueWarbonds = data ? [...new Set([
    ...data.weapons.primary.map(w => w.warbond),
    ...data.weapons.secondary.map(w => w.warbond),
    ...data.weapons.support.map(w => w.warbond)
  ].filter(Boolean))] : []

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center space-y-6 mb-12">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 bg-clip-text text-transparent">
              Helldivers 2 Weapon Customizer
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Build the perfect loadout with our comprehensive weapon customization tool. 
              Compare stats, optimize attachments, and dominate the battlefield with data-driven builds.
            </p>
          </div>
          
          {/* Quick Stats */}
          {data && (
            <div className="flex justify-center gap-8 flex-wrap">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{data.weapons.primary.length}</div>
                <div className="text-sm text-muted-foreground">Primary Weapons</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{data.weapons.secondary.length}</div>
                <div className="text-sm text-muted-foreground">Secondary Weapons</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{data.weapons.support.length}</div>
                <div className="text-sm text-muted-foreground">Support Weapons</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{data.attachments.length}</div>
                <div className="text-sm text-muted-foreground">Attachments</div>
              </div>
            </div>
          )}
        </div>

        {/* Filters Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filter Weapons
            </CardTitle>
            <CardDescription>
              Find the perfect weapon for your playstyle and mission requirements
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
            
            {/* Results Count */}
            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                {filteredWeapons.length} weapon{filteredWeapons.length !== 1 ? 's' : ''} found
              </div>
              
              {/* Quick Filter Badges */}
              <div className="flex gap-2">
                <Badge 
                  variant={filters.tier === 'S' ? 'default' : 'outline'} 
                  className="cursor-pointer"
                  onClick={() => handleFilterChange('tier', filters.tier === 'S' ? 'all' : 'S')}
                >
                  S Tier Only
                </Badge>
                <Badge 
                  variant={filters.category === 'primary' ? 'default' : 'outline'} 
                  className="cursor-pointer"
                  onClick={() => handleFilterChange('category', filters.category === 'primary' ? 'all' : 'primary')}
                >
                  Primary Only
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