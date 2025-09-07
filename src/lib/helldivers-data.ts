/**
 * Helldivers 2 Data Loading and Management
 * Handles loading and parsing of weapon data, attachments, and stratagems
 */

export interface WeaponStats {
  damage: number
  capacity: number
  fire_rate: number
  reload_time: number
  armor_penetration: string
  recoil?: number
}

export interface WeaponAttachment {
  id: string
  name: string
  category: string
  effects: Record<string, string>
  compatible_weapons?: string[]
  unlock_level?: number
  visual_data?: {
    attachment_image?: string
    icon_image?: string
    description?: string
  }
}

export interface WeaponData {
  id: string
  name: string
  category: string
  stats: WeaponStats
  customization?: {
    available_attachments: string[]
    upgrade_levels: number
    unlock_condition: string
  }
  unlock_condition?: string
  warbond?: string
  visual_data?: {
    weapon_image?: string
    icon_image?: string
    description?: string
    color_scheme?: string
    distinctive_features?: string[]
  }
  json_data?: {
    internal_id?: string
    accurate_damage?: number
    accurate_capacity?: number
    recoil?: number
    fire_modes?: number[]
    traits?: number[]
    description?: string
  }
}

export interface HelldiversData {
  meta: {
    last_updated: string
    version: string
    description: string
    data_sources: string[]
  }
  weapons: {
    primary: WeaponData[]
    secondary: WeaponData[]
    support: WeaponData[]
  }
  stratagems: {
    general: any[]
    orbital: any[]
    eagle: any[]
    bridge: any[]
  }
  attachments: WeaponAttachment[]
  customization: any
  game_info: {
    name: string
    developer: string
    publisher: string
    release_date: string
    platforms: string[]
    genre: string
  }
}

let cachedData: HelldiversData | null = null

/**
 * Load Helldivers 2 data from the JSON file
 */
export async function loadHelldiversData(): Promise<HelldiversData> {
  if (cachedData) {
    return cachedData
  }

  try {
    const response = await fetch('/helldivers2/data/helldivers2_comprehensive_database.json')
    
    if (!response.ok) {
      throw new Error(`Failed to load data: ${response.status}`)
    }
    
    const data = await response.json()
    cachedData = data
    return data
  } catch (error) {
    console.error('Error loading Helldivers 2 data:', error)
    throw error
  }
}

/**
 * Get all weapons by category
 */
export function getWeaponsByCategory(data: HelldiversData, category: keyof HelldiversData['weapons']): WeaponData[] {
  if (!data || !data.weapons) {
    return []
  }
  return data.weapons[category] || []
}

/**
 * Find a weapon by ID
 */
export function findWeaponById(data: HelldiversData, weaponId: string): WeaponData | undefined {
  if (!data || !data.weapons) {
    return undefined
  }
  
  const allWeapons = [
    ...(data.weapons.primary || []),
    ...(data.weapons.secondary || []),
    ...(data.weapons.support || [])
  ]
  
  return allWeapons.find(weapon => weapon.id === weaponId)
}

/**
 * Get compatible attachments for a weapon
 */
export function getCompatibleAttachments(data: HelldiversData, weaponId: string): WeaponAttachment[] {
  if (!data || !data.attachments) {
    return []
  }
  
  const weapon = findWeaponById(data, weaponId)
  
  if (!weapon?.customization?.available_attachments) {
    return []
  }
  
  return data.attachments.filter(attachment => 
    weapon.customization!.available_attachments.includes(attachment.name) ||
    attachment.compatible_weapons?.includes(weaponId)
  )
}

/**
 * Calculate weapon stats with attachments
 */
export function calculateWeaponStatsWithAttachments(
  weapon: WeaponData, 
  attachments: WeaponAttachment[]
): WeaponStats {
  let modifiedStats = { ...weapon.stats }
  
  attachments.forEach(attachment => {
    Object.entries(attachment.effects).forEach(([stat, effect]) => {
      const statKey = stat.toLowerCase() as keyof WeaponStats
      
      if (statKey in modifiedStats) {
        const currentValue = modifiedStats[statKey]
        
        if (typeof currentValue === 'number') {
          if (effect.includes('%')) {
            // Percentage modification
            const percentage = parseFloat(effect.replace(/[^-\d.]/g, '')) / 100
            if (effect.startsWith('+')) {
              (modifiedStats as any)[statKey] = Math.round(currentValue * (1 + percentage))
            } else if (effect.startsWith('-')) {
              (modifiedStats as any)[statKey] = Math.round(currentValue * (1 - Math.abs(percentage)))
            }
          } else if (effect.includes('s')) {
            // Time modification (seconds)
            const seconds = parseFloat(effect.replace(/[^-\d.]/g, ''))
            if (effect.startsWith('+')) {
              (modifiedStats as any)[statKey] = currentValue + seconds
            } else if (effect.startsWith('-')) {
              (modifiedStats as any)[statKey] = Math.max(0.1, currentValue - seconds)
            }
          }
        }
      }
    })
  })
  
  return modifiedStats
}

/**
 * Get weapon tier based on stats (damage, utility, etc.)
 */
export function getWeaponTier(weapon: WeaponData): 'S' | 'A' | 'B' | 'C' {
  const damage = weapon.stats.damage
  const penetration = weapon.stats.armor_penetration.toLowerCase()
  
  // Simple tier calculation based on damage and armor penetration
  if (damage >= 300 || penetration === 'anti-tank') return 'S'
  if (damage >= 200 || penetration === 'heavy' || penetration === 'medium') return 'A'
  if (damage >= 100 || penetration === 'light') return 'B'
  return 'C'
}

/**
 * Filter weapons by various criteria
 */
export interface WeaponFilters {
  category?: string
  warbond?: string
  tier?: string
  damageMin?: number
  damageMax?: number
  searchQuery?: string
}

export function filterWeapons(data: HelldiversData, filters: WeaponFilters): WeaponData[] {
  if (!data || !data.weapons) {
    return []
  }
  
  let allWeapons = [
    ...(data.weapons.primary || []),
    ...(data.weapons.secondary || []),
    ...(data.weapons.support || [])
  ]
  
  if (filters.category && filters.category !== 'all') {
    allWeapons = getWeaponsByCategory(data, filters.category as keyof HelldiversData['weapons'])
  }
  
  if (filters.warbond && filters.warbond !== 'all') {
    allWeapons = allWeapons.filter(weapon => weapon.warbond === filters.warbond)
  }
  
  if (filters.tier && filters.tier !== 'all') {
    allWeapons = allWeapons.filter(weapon => getWeaponTier(weapon) === filters.tier)
  }
  
  if (filters.damageMin !== undefined) {
    allWeapons = allWeapons.filter(weapon => weapon.stats.damage >= filters.damageMin!)
  }
  
  if (filters.damageMax !== undefined) {
    allWeapons = allWeapons.filter(weapon => weapon.stats.damage <= filters.damageMax!)
  }
  
  if (filters.searchQuery) {
    const query = filters.searchQuery.toLowerCase()
    allWeapons = allWeapons.filter(weapon => 
      weapon.name.toLowerCase().includes(query) ||
      weapon.category.toLowerCase().includes(query) ||
      weapon.visual_data?.description?.toLowerCase().includes(query)
    )
  }
  
  return allWeapons
}