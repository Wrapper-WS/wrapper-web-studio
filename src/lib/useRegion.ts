import { useState, useEffect, createContext, useContext } from 'react'
import type { Region } from './region'
import { getRegionByCode, DEFAULT_REGION } from './region'

type RegionContextType = {
  region: Region
  loading: boolean
  setRegion: (r: Region) => void
}

export const RegionContext = createContext<RegionContextType>({
  region: DEFAULT_REGION,
  loading: true,
  setRegion: () => {},
})

export function useRegion() {
  return useContext(RegionContext)
}

export async function detectRegion(): Promise<Region> {
  // Check if user previously manually selected a region
  const stored = localStorage.getItem('wws_region')
  if (stored) {
    try {
      return JSON.parse(stored) as Region
    } catch { /* ignore */ }
  }

  try {
    const res = await fetch('https://ipapi.co/json/', { signal: AbortSignal.timeout(4000) })
    if (!res.ok) throw new Error('geo failed')
    const data = await res.json()
    const code: string = data.country_code ?? ''
    return getRegionByCode(code)
  } catch {
    // Fallback: try alternative API
    try {
      const res = await fetch('https://api.country.is/', { signal: AbortSignal.timeout(3000) })
      const data = await res.json()
      return getRegionByCode(data.country ?? '')
    } catch {
      return DEFAULT_REGION
    }
  }
}