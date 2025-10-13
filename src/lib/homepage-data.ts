import type { WeaponAttachment, WeaponData } from '@/lib/helldivers-data'

export type StratagemGroup = Record<string, unknown>

export interface HomePageData {
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

export const defaultHomePageData: HomePageData = {
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

export function normalizeHomePageData(rawData: any): HomePageData {
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

export function combineWeapons(data: HomePageData): WeaponData[] {
  return [
    ...(data.weapons.primary ?? []),
    ...(data.weapons.secondary ?? []),
    ...(data.weapons.support ?? [])
  ]
}
