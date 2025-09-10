'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { WeaponListClient } from '@/components/weapons/weapon-list-client'
import { WeaponData } from '@/lib/helldivers-data'
import { Zap, Target, Shield, Settings, TrendingUp } from 'lucide-react'

export default function HomePage() {
  const [data, setData] = useState({ weapons: { primary: [], secondary: [], support: [] }, attachments: [] })
  const [allWeapons, setAllWeapons] = useState<WeaponData[]>([])

  useEffect(() => {
    // Load data on client side
    fetch('/helldivers2/data/helldivers2_comprehensive_database.json')
      .then(response => response.json())
      .then(data => {
        setData(data)
        const weapons = [
          ...data.weapons.primary,
          ...data.weapons.secondary,
          ...data.weapons.support
        ]
        setAllWeapons(weapons)
      })
      .catch(error => {
        console.error('Error loading data:', error)
      })
  }, [])

  const scrollToWeaponCustomizer = () => {
    const element = document.getElementById('weapon-customizer-section')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-helldiver-steel-50 to-helldiver-blue-50 dark:from-helldiver-steel-950 dark:to-helldiver-blue-950">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <Shield className="w-16 h-16 text-helldiver-blue-500 mr-4" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-helldiver-yellow-400 rounded-full animate-pulse flex items-center justify-center">
                <span className="text-xs font-bold text-helldiver-steel-900">HD2</span>
              </div>
            </div>
            <div>
              <h1 className="text-4xl md:text-6xl font-display font-black text-super-earth mb-2">
                HELLDIVERS 2
              </h1>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-helldiver-blue-600 dark:text-helldiver-blue-400">
                WEAPON CUSTOMIZATION PLATFORM
              </h2>
            </div>
          </div>
          
          <p className="text-lg text-helldiver-steel-600 dark:text-helldiver-steel-400 max-w-3xl mx-auto mb-8 font-military">
            Master the art of warfare with our comprehensive weapon customization tool. 
            Build optimal loadouts, compare weapon statistics, and dominate the battlefield for Super Earth.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge variant="outline" className="bg-helldiver-yellow-100 dark:bg-helldiver-yellow-900/20 border-helldiver-yellow-400 text-helldiver-yellow-700 dark:text-helldiver-yellow-300">
              <Zap className="w-4 h-4 mr-1" />
              Real-time Stats
            </Badge>
            <Badge variant="outline" className="bg-helldiver-green-100 dark:bg-helldiver-green-900/20 border-helldiver-green-400 text-helldiver-green-700 dark:text-helldiver-green-300">
              <Target className="w-4 h-4 mr-1" />
              Attachment Optimization
            </Badge>
            <Badge variant="outline" className="bg-helldiver-blue-100 dark:bg-helldiver-blue-900/20 border-helldiver-blue-400 text-helldiver-blue-700 dark:text-helldiver-blue-300">
              <Settings className="w-4 h-4 mr-1" />
              Loadout Builder
            </Badge>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-helldiver-blue-500 to-helldiver-blue-600 text-white border-0 rounded-lg">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-helldiver-blue-100 text-sm font-medium">Total Weapons</p>
                  <p className="text-3xl font-display font-black">{allWeapons.length}</p>
                </div>
                <Target className="w-8 h-8 text-helldiver-blue-200" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-helldiver-green-500 to-helldiver-green-600 text-white border-0 rounded-lg">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-helldiver-green-100 text-sm font-medium">S-Tier Weapons</p>
                  <p className="text-3xl font-display font-black">
                    {allWeapons.filter(weapon => weapon.stats.damage >= 300).length}
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-helldiver-green-200" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-helldiver-yellow-500 to-helldiver-yellow-600 text-white border-0 rounded-lg">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-helldiver-yellow-100 text-sm font-medium">Free Weapons</p>
                  <p className="text-3xl font-display font-black">
                    {allWeapons.filter(weapon => weapon.warbond === 'Free').length}
                  </p>
                </div>
                <Shield className="w-8 h-8 text-helldiver-yellow-200" />
              </div>
            </div>
          </div>
        </div>

        {/* Client-side weapon list */}
        <div id="weapon-customizer-section">
          <WeaponListClient data={data} initialWeapons={allWeapons} />
        </div>

        {/* SEO Content Sections for Popular Searches */}
        <div className="mt-16 space-y-12">
          {/* Weapon Stats Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-display">Helldivers 2 Weapon Customization Stats</CardTitle>
              <CardDescription>
                Comprehensive weapon statistics and performance metrics for optimal loadout building
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-helldiver-blue-50 dark:bg-helldiver-blue-950/20 p-4 rounded-lg">
                  <h3 className="font-semibold text-helldiver-blue-700 dark:text-helldiver-blue-300">Damage Stats</h3>
                  <p className="text-sm text-muted-foreground mt-1">Real-time damage calculations, DPS analysis, and armor penetration data for all weapons</p>
                </div>
                <div className="bg-helldiver-green-50 dark:bg-helldiver-green-950/20 p-4 rounded-lg">
                  <h3 className="font-semibold text-helldiver-green-700 dark:text-helldiver-green-300">Ergonomics</h3>
                  <p className="text-sm text-muted-foreground mt-1">Weapon handling, recoil patterns, and ergonomic ratings for enhanced battlefield performance</p>
                </div>
                <div className="bg-helldiver-yellow-50 dark:bg-helldiver-yellow-950/20 p-4 rounded-lg">
                  <h3 className="font-semibold text-helldiver-yellow-700 dark:text-helldiver-yellow-300">Fire Rate</h3>
                  <p className="text-sm text-muted-foreground mt-1">RPM statistics, burst fire modes, and sustained fire capabilities</p>
                </div>
                <div className="bg-helldiver-red-50 dark:bg-helldiver-red-950/20 p-4 rounded-lg">
                  <h3 className="font-semibold text-helldiver-red-700 dark:text-helldiver-red-300">Capacity</h3>
                  <p className="text-sm text-muted-foreground mt-1">Magazine sizes, reload times, and ammunition efficiency metrics</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tier List Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-display">Helldivers 2 Weapon Customization Tier List</CardTitle>
              <CardDescription>
                Official weapon rankings based on performance, versatility, and community feedback
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 dark:from-yellow-500/20 dark:to-yellow-600/20 rounded-lg border border-yellow-500/20 dark:border-yellow-500/30">
                  <Badge className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-3 py-1">S TIER</Badge>
                  <div>
                    <h3 className="font-semibold text-foreground">Elite Performance Weapons</h3>
                    <p className="text-sm text-muted-foreground">Top-tier weapons with exceptional damage, versatility, and customization options</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-500/10 to-green-600/10 dark:from-green-500/20 dark:to-green-600/20 rounded-lg border border-green-500/20 dark:border-green-500/30">
                  <Badge className="bg-green-500 hover:bg-green-600 text-white font-bold px-3 py-1">A TIER</Badge>
                  <div>
                    <h3 className="font-semibold text-foreground">High Performance Weapons</h3>
                    <p className="text-sm text-muted-foreground">Excellent weapons suitable for most mission types and playstyles</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-500/10 to-blue-600/10 dark:from-blue-500/20 dark:to-blue-600/20 rounded-lg border border-blue-500/20 dark:border-blue-500/30">
                  <Badge className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-3 py-1">B TIER</Badge>
                  <div>
                    <h3 className="font-semibold text-foreground">Balanced Weapons</h3>
                    <p className="text-sm text-muted-foreground">Solid choices with specific strengths and use cases</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Troubleshooting Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-display">Troubleshooting Guide</CardTitle>
              <CardDescription>
                Common issues and solutions for Helldivers 2 weapon customization
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3 text-red-600 dark:text-red-400">Common Issues</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800/30">
                      <h4 className="font-medium text-red-800 dark:text-red-200">Customization Not Showing Up</h4>
                      <p className="text-sm text-red-600 dark:text-red-300 mt-1">Weapon customization menu missing or not loading properly</p>
                    </div>
                    <div className="p-3 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800/30">
                      <h4 className="font-medium text-red-800 dark:text-red-200">Game Crashes During Customization</h4>
                      <p className="text-sm text-red-600 dark:text-red-300 mt-1">Application crashes when accessing weapon modification screen</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-3 text-green-600 dark:text-green-400">Solutions</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800/30">
                      <h4 className="font-medium text-green-800 dark:text-green-200">Verify Game Files</h4>
                      <p className="text-sm text-green-600 dark:text-green-300 mt-1">Use Steam/platform verification to fix corrupted files</p>
                    </div>
                    <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800/30">
                      <h4 className="font-medium text-green-800 dark:text-green-200">Update Graphics Drivers</h4>
                      <p className="text-sm text-green-600 dark:text-green-300 mt-1">Ensure latest GPU drivers for optimal performance</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Unlock Guide Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-display">Weapon Customization Unlock Guide</CardTitle>
              <CardDescription>
                Complete guide to unlocking all weapon customization options and levels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-gradient-to-br from-helldiver-blue-500/10 to-helldiver-blue-600/10 dark:from-helldiver-blue-500/20 dark:to-helldiver-blue-600/20 rounded-lg border border-helldiver-blue-200 dark:border-helldiver-blue-800/30">
                  <h3 className="font-semibold mb-2 text-helldiver-blue-800 dark:text-helldiver-blue-200">Level Requirements</h3>
                  <p className="text-sm text-helldiver-blue-600 dark:text-helldiver-blue-300">Weapon customization unlocks at specific player and weapon levels</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-helldiver-green-500/10 to-helldiver-green-600/10 dark:from-helldiver-green-500/20 dark:to-helldiver-green-600/20 rounded-lg border border-helldiver-green-200 dark:border-helldiver-green-800/30">
                  <h3 className="font-semibold mb-2 text-helldiver-green-800 dark:text-helldiver-green-200">Warbond Progression</h3>
                  <p className="text-sm text-helldiver-green-600 dark:text-helldiver-green-300">Premium attachments available through Warbond advancement</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-helldiver-yellow-500/10 to-helldiver-yellow-600/10 dark:from-helldiver-yellow-500/20 dark:to-helldiver-yellow-600/20 rounded-lg border border-helldiver-yellow-200 dark:border-helldiver-yellow-800/30">
                  <h3 className="font-semibold mb-2 text-helldiver-yellow-800 dark:text-helldiver-yellow-200">Mission Rewards</h3>
                  <p className="text-sm text-helldiver-yellow-600 dark:text-helldiver-yellow-300">Special customizations earned through mission completion</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="mt-12 bg-gradient-to-r from-helldiver-blue-500 to-helldiver-green-500 text-white border-0 rounded-lg">
          <div className="p-8 text-center">
            <h3 className="text-2xl font-display font-bold mb-4">
              Ready to Serve Super Earth?
            </h3>
            <p className="text-helldiver-blue-100 mb-6 max-w-2xl mx-auto">
              Join millions of Helldivers in the fight for democracy. Customize your arsenal, 
              optimize your loadouts, and show the galaxy what managed democracy can achieve.
            </p>
            <Button 
              size="lg" 
              onClick={scrollToWeaponCustomizer}
              className="bg-helldiver-yellow-400 hover:bg-helldiver-yellow-500 text-helldiver-steel-900 font-bold"
            >
              Start Building Your Loadout
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}