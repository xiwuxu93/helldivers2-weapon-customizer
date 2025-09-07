'use client'

import React, { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { WeaponData, WeaponAttachment, getCompatibleAttachments, calculateWeaponStatsWithAttachments, HelldiversData } from '@/lib/helldivers-data'
import { Settings, Zap, Target, Clock, Check, X } from 'lucide-react'

interface WeaponCustomizerProps {
  weapon: WeaponData | null
  data: HelldiversData
  isOpen: boolean
  onClose: () => void
}

export function WeaponCustomizer({ weapon, data, isOpen, onClose }: WeaponCustomizerProps) {
  const [selectedAttachments, setSelectedAttachments] = useState<WeaponAttachment[]>([])
  const [compatibleAttachments, setCompatibleAttachments] = useState<WeaponAttachment[]>([])

  useEffect(() => {
    if (weapon) {
      const compatible = getCompatibleAttachments(data, weapon.id)
      setCompatibleAttachments(compatible)
      setSelectedAttachments([])
    }
  }, [weapon, data])

  if (!weapon) return null

  const modifiedStats = calculateWeaponStatsWithAttachments(weapon, selectedAttachments)

  const toggleAttachment = (attachment: WeaponAttachment) => {
    setSelectedAttachments(prev => {
      const exists = prev.find(a => a.id === attachment.id)
      if (exists) {
        return prev.filter(a => a.id !== attachment.id)
      } else {
        return [...prev, attachment]
      }
    })
  }

  const StatComparison = ({ label, original, modified, unit = '', icon: Icon }: {
    label: string
    original: number | string
    modified: number | string
    unit?: string
    icon: any
  }) => {
    const hasChanged = original !== modified
    return (
      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-muted-foreground" />
          <span className="font-medium">{label}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {original}{unit}
          </span>
          {hasChanged && (
            <>
              <span className="text-muted-foreground">→</span>
              <span className={`font-bold ${
                typeof original === 'number' && typeof modified === 'number'
                  ? modified > original ? 'text-green-600' : 'text-red-600'
                  : 'text-blue-600'
              }`}>
                {modified}{unit}
              </span>
            </>
          )}
        </div>
      </div>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Customize {weapon.name}
          </DialogTitle>
          <DialogDescription>
            Select attachments to optimize your weapon for different playstyles and missions.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Panel - Attachments Selection */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Available Attachments</CardTitle>
                <CardDescription>
                  Compatible with {weapon.name} • {compatibleAttachments.length} options
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {compatibleAttachments.length > 0 ? (
                  compatibleAttachments.map(attachment => {
                    const isSelected = selectedAttachments.find(a => a.id === attachment.id)
                    return (
                      <div
                        key={attachment.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          isSelected 
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20' 
                            : 'border-border hover:border-blue-300'
                        }`}
                        onClick={() => toggleAttachment(attachment)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-medium">{attachment.name}</span>
                              <Badge variant="outline">{attachment.category}</Badge>
                              {isSelected && <Check className="w-4 h-4 text-green-600" />}
                            </div>
                            
                            {attachment.visual_data?.description && (
                              <p className="text-sm text-muted-foreground mb-2">
                                {attachment.visual_data.description}
                              </p>
                            )}
                            
                            {/* Attachment Effects */}
                            <div className="space-y-1">
                              {Object.entries(attachment.effects).map(([stat, effect]) => (
                                <div key={stat} className="flex justify-between text-sm">
                                  <span className="capitalize text-muted-foreground">{stat}:</span>
                                  <span className={`font-mono ${
                                    effect.startsWith('+') ? 'text-green-600' : 
                                    effect.startsWith('-') ? 'text-red-600' : 'text-blue-600'
                                  }`}>
                                    {effect}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Settings className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>No attachments available for this weapon</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Stats Preview */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Modified Stats</CardTitle>
                <CardDescription>
                  Preview of your customized weapon performance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <StatComparison
                  icon={Zap}
                  label="Damage"
                  original={weapon.stats.damage}
                  modified={modifiedStats.damage}
                />
                <StatComparison
                  icon={Target}
                  label="Capacity"
                  original={weapon.stats.capacity}
                  modified={modifiedStats.capacity}
                />
                <StatComparison
                  icon={Clock}
                  label="Fire Rate"
                  original={weapon.stats.fire_rate}
                  modified={modifiedStats.fire_rate}
                  unit=" RPM"
                />
                <StatComparison
                  icon={Clock}
                  label="Reload Time"
                  original={weapon.stats.reload_time}
                  modified={modifiedStats.reload_time}
                  unit="s"
                />
                {weapon.stats.recoil && (
                  <StatComparison
                    icon={Target}
                    label="Recoil"
                    original={weapon.stats.recoil || 0}
                    modified={modifiedStats.recoil || 0}
                  />
                )}
              </CardContent>
            </Card>

            {/* Selected Attachments Summary */}
            {selectedAttachments.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center justify-between">
                    Active Attachments
                    <Badge variant="outline">{selectedAttachments.length} selected</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {selectedAttachments.map(attachment => (
                      <div key={attachment.id} className="flex items-center justify-between p-2 bg-muted rounded">
                        <div>
                          <span className="font-medium">{attachment.name}</span>
                          <Badge variant="outline" className="ml-2 text-xs">
                            {attachment.category}
                          </Badge>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleAttachment(attachment)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button className="flex-1" onClick={() => {
                // TODO: Save loadout functionality
                console.log('Saving loadout with attachments:', selectedAttachments.map(a => a.name))
              }}>
                Save Loadout
              </Button>
              <Button variant="outline" onClick={() => setSelectedAttachments([])}>
                Clear All
              </Button>
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}