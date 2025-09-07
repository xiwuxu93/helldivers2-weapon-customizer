'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { WeaponData, getWeaponTier } from '@/lib/helldivers-data'
import { Zap, Target, Shield, Clock, Settings } from 'lucide-react'

interface WeaponCardProps {
  weapon: WeaponData
  onCustomize?: (weapon: WeaponData) => void
  onCompare?: (weapon: WeaponData) => void
  compact?: boolean
}

const tierColors = {
  S: 'bg-red-500 text-white',
  A: 'bg-orange-500 text-white', 
  B: 'bg-blue-500 text-white',
  C: 'bg-gray-500 text-white'
}

const penetrationColors = {
  'Anti-Tank': 'bg-red-600 text-white',
  'Heavy': 'bg-orange-600 text-white',
  'Medium': 'bg-yellow-600 text-white',
  'Light': 'bg-green-600 text-white'
}

export function WeaponCard({ weapon, onCustomize, onCompare, compact = false }: WeaponCardProps) {
  const tier = getWeaponTier(weapon)
  const maxDamage = 1200 // Max damage for progress bar scaling
  
  const StatBar = ({ icon: Icon, label, value, max, unit = '', color = 'bg-blue-500' }: {
    icon: any
    label: string
    value: number | string
    max?: number
    unit?: string
    color?: string
  }) => (
    <div className="flex items-center gap-2 text-sm">
      <Icon className="w-4 h-4 text-muted-foreground" />
      <span className="min-w-[80px] text-muted-foreground">{label}:</span>
      <div className="flex-1 flex items-center gap-2">
        {max && typeof value === 'number' ? (
          <>
            <Progress value={(value / max) * 100} className="flex-1 h-2" />
            <span className="min-w-[40px] font-mono text-sm">{value}{unit}</span>
          </>
        ) : (
          <span className="font-mono text-sm">{value}{unit}</span>
        )}
      </div>
    </div>
  )

  return (
    <Card className="w-full card-hover command-panel">
      <CardHeader className={compact ? 'pb-3' : 'pb-4'}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <CardTitle className={`${compact ? 'text-lg' : 'text-xl'} font-military font-bold text-helldiver-steel-800 dark:text-helldiver-steel-200 uppercase tracking-wide`}>
                {weapon.name}
              </CardTitle>
              <Badge className={`${tierColors[tier]} font-military uppercase font-bold`} variant="secondary">
                {tier}-TIER
              </Badge>
            </div>
            <div className="flex flex-wrap gap-2 mb-2">
              <Badge variant="outline" className="font-military uppercase text-xs border-helldiver-steel-400 text-helldiver-steel-600 dark:text-helldiver-steel-300">
                {weapon.category}
              </Badge>
              {weapon.warbond && (
                <Badge variant="outline" className="font-military uppercase text-xs border-helldiver-yellow-400 text-helldiver-yellow-600 bg-helldiver-yellow-50 dark:bg-helldiver-yellow-900/20">
                  {weapon.warbond}
                </Badge>
              )}
              <Badge 
                className={`${penetrationColors[weapon.stats.armor_penetration as keyof typeof penetrationColors] || 'bg-gray-500 text-white'} font-military uppercase text-xs font-bold`}
                variant="secondary"
              >
                {weapon.stats.armor_penetration}
              </Badge>
            </div>
            {weapon.visual_data?.description && (
              <CardDescription className={compact ? 'text-sm line-clamp-2' : 'text-sm'}>
                {weapon.visual_data.description}
              </CardDescription>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Primary Stats */}
        <div className="space-y-3">
          <StatBar 
            icon={Zap} 
            label="Damage" 
            value={weapon.stats.damage} 
            max={maxDamage}
            color="bg-red-500"
          />
          <StatBar 
            icon={Target} 
            label="Capacity" 
            value={weapon.stats.capacity}
            max={100}
            color="bg-blue-500"
          />
          <StatBar 
            icon={Clock} 
            label="Fire Rate" 
            value={weapon.stats.fire_rate}
            max={1000}
            unit=" RPM"
            color="bg-green-500"
          />
          <StatBar 
            icon={Clock} 
            label="Reload" 
            value={weapon.stats.reload_time}
            unit="s"
            color="bg-yellow-500"
          />
          {weapon.stats.recoil && (
            <StatBar 
              icon={Target} 
              label="Recoil" 
              value={weapon.stats.recoil}
              max={50}
              color="bg-orange-500"
            />
          )}
        </div>

        {/* Enhanced Data from JSON */}
        {weapon.json_data && (
          <>
            <Separator />
            <div className="text-sm space-y-2">
              <div className="font-medium text-muted-foreground">Enhanced Data:</div>
              {weapon.json_data.accurate_damage && weapon.json_data.accurate_damage !== weapon.stats.damage && (
                <div className="flex justify-between">
                  <span>Accurate Damage:</span>
                  <span className="font-mono text-green-600">{weapon.json_data.accurate_damage}</span>
                </div>
              )}
              {weapon.json_data.fire_modes && (
                <div className="flex justify-between">
                  <span>Fire Modes:</span>
                  <span className="font-mono">{weapon.json_data.fire_modes.length} modes</span>
                </div>
              )}
              {weapon.json_data.traits && weapon.json_data.traits.length > 0 && (
                <div className="flex justify-between">
                  <span>Special Traits:</span>
                  <span className="font-mono">{weapon.json_data.traits.length}</span>
                </div>
              )}
            </div>
          </>
        )}

        {/* Visual Features */}
        {weapon.visual_data?.distinctive_features && weapon.visual_data.distinctive_features.length > 0 && (
          <>
            <Separator />
            <div className="space-y-2">
              <div className="font-medium text-muted-foreground text-sm">Key Features:</div>
              <div className="flex flex-wrap gap-1">
                {weapon.visual_data.distinctive_features.slice(0, 3).map((feature, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Customization Info */}
        {weapon.customization && (
          <>
            <Separator />
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Attachments:</span>
              <span className="font-mono">{weapon.customization.available_attachments?.length || 0}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Max Level:</span>
              <span className="font-mono">{weapon.customization.upgrade_levels}</span>
            </div>
          </>
        )}

        {/* Tactical Action Buttons */}
        <div className="flex gap-3 pt-4">
          {onCustomize && (
            <Button 
              onClick={() => onCustomize(weapon)}
              className="flex-1 btn-primary"
              size={compact ? 'sm' : 'default'}
            >
              <Settings className="w-4 h-4 mr-2" />
              CONFIGURE
            </Button>
          )}
          {onCompare && (
            <Button 
              onClick={() => onCompare(weapon)}
              className="btn-outline"
              size={compact ? 'sm' : 'default'}
            >
              ANALYZE
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}