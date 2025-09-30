'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { WeaponCard } from '@/components/weapons/weapon-card'
import { WeaponCustomizer } from '@/components/weapons/weapon-customizer'
import { WeaponData, WeaponFilters } from '@/lib/helldivers-data'
import { trackFilterUsage, trackWeaponView } from '@/components/analytics/google-analytics'
import { Search, Filter, Zap, Target, Shield, Settings, TrendingUp } from 'lucide-react'
import { useRouter } from 'next/navigation'

// Client-side filtering function
function filterWeaponsClient(weapons: WeaponData[], filters: WeaponFilters): WeaponData[] {
  return weapons.filter(weapon => {
    // Category filter
    if (filters.category && filters.category !== 'all' && weapon.category !== filters.category) {
      return false
    }
    
    // Warbond filter
    if (filters.warbond && filters.warbond !== 'all' && weapon.warbond !== filters.warbond) {
      return false
    }
    
    // Tier filter (simplified - based on damage)
    if (filters.tier && filters.tier !== 'all') {
      const damage = weapon.stats.damage
      switch (filters.tier) {
        case 'S':
          if (damage < 300) return false
          break
        case 'A':
          if (damage < 200 || damage >= 300) return false
          break
        case 'B':
          if (damage < 100 || damage >= 200) return false
          break
        case 'C':
          if (damage >= 100) return false
          break
      }
    }
    
    // Search query filter
    if (filters.searchQuery && filters.searchQuery.trim() !== '') {
      const query = filters.searchQuery.toLowerCase()
      const searchableText = [
        weapon.name,
        weapon.category,
        weapon.warbond || '',
        weapon.visual_data?.description || ''
      ].join(' ').toLowerCase()
      
      if (!searchableText.includes(query)) {
        return false
      }
    }
    
    return true
  })
}

interface WeaponListClientProps {
  data: any
  initialWeapons: WeaponData[]
}

export function WeaponListClient({ data, initialWeapons }: WeaponListClientProps) {
  const [filteredWeapons, setFilteredWeapons] = useState<WeaponData[]>(initialWeapons)
  const [selectedWeapon, setSelectedWeapon] = useState<WeaponData | null>(null)
  const router = useRouter()
  
  // Filter states
  const [filters, setFilters] = useState<WeaponFilters>({
    category: 'all',
    warbond: 'all',
    tier: 'all',
    searchQuery: ''
  })

  // Update filtered weapons when initialWeapons changes
  useEffect(() => {
    if (initialWeapons.length > 0) {
      const filtered = filterWeaponsClient(initialWeapons, filters)
      setFilteredWeapons(filtered)
    }
  }, [initialWeapons, filters])

  const handleFilterChange = (key: keyof WeaponFilters, value: string) => {
    const newFilters = {
      ...filters,
      [key]: value === 'all' ? 'all' : value
    }
    setFilters(newFilters)
    
    // Track filter usage
    trackFilterUsage(key, value)
  }

  const handleCustomizeWeapon = (weapon: WeaponData) => {
    setSelectedWeapon(weapon)
    trackWeaponView(weapon.name, weapon.category)
  }

  const handleCompareWeapon = (weapon: WeaponData) => {
    trackWeaponView(weapon.name, weapon.category)
    router.push(`/weapons/${weapon.id}`)
  }

  // Extract unique values for filters
  const allWeapons = [
    ...data.weapons.primary,
    ...data.weapons.secondary,
    ...data.weapons.support
  ]

  const uniqueWarbonds = Array.from(new Set(allWeapons.map(w => w.warbond).filter(Boolean)))

  return (
    <>
      {/* Filter Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Filter className="w-6 h-6 text-helldiver-blue-500" />
            Mission Parameters
          </CardTitle>
          <CardDescription>
            Configure your search parameters to find the perfect weapons for your mission
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {/* Search */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Search Weapons</label>
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
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Select value={filters.category || 'all'} onValueChange={(value) => handleFilterChange('category', value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="primary">Primary</SelectItem>
                  <SelectItem value="secondary">Secondary</SelectItem>
                  <SelectItem value="support">Support</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Warbond Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Warbond</label>
              <Select value={filters.warbond || 'all'} onValueChange={(value) => handleFilterChange('warbond', value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Warbond" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Warbonds</SelectItem>
                  {uniqueWarbonds.map(warbond => (
                    <SelectItem key={warbond} value={warbond!}>{warbond}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Tier Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Tier</label>
              <Select value={filters.tier || 'all'} onValueChange={(value) => handleFilterChange('tier', value)}>
                <SelectTrigger className="w-full">
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
          </div>

          {/* Quick Filter Buttons */}
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-medium text-helldiver-steel-700 dark:text-helldiver-steel-300">
              <span className="text-helldiver-blue-600 dark:text-helldiver-blue-400 font-bold">{filteredWeapons.length}</span> WEAPONS AVAILABLE FOR DEPLOYMENT
            </div>
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant={filters.tier === 'S' ? 'default' : 'outline'} 
                className="h-8"
                onClick={() => handleFilterChange('tier', filters.tier === 'S' ? 'all' : 'S')}
              >
                S-Tier Only
              </Button>
              <Button 
                size="sm" 
                variant={filters.category === 'primary' ? 'default' : 'outline'} 
                className="h-8"
                onClick={() => handleFilterChange('category', filters.category === 'primary' ? 'all' : 'primary')}
              >
                Primary Weapons
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weapons Grid */}
      <div className="space-y-8">
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
            <CardContent className="py-12 text-center">
              <Settings className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">No weapons found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your filters or search criteria
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setFilters({ category: 'all', warbond: 'all', tier: 'all', searchQuery: '' })
                  setFilteredWeapons(allWeapons)
                }}
              >
                Clear All Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Weapon Customizer Dialog */}
      <WeaponCustomizer
        weapon={selectedWeapon}
        data={data}
        isOpen={selectedWeapon !== null}
        onClose={() => setSelectedWeapon(null)}
      />
    </>
  )
}
