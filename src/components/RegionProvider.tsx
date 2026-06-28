import { useState, useEffect } from 'react'
import { RegionContext, detectRegion } from '../lib/useRegion'
import type { Region } from '../lib/region'
import { DEFAULT_REGION } from '../lib/region'

export function RegionProvider({ children }: { children: React.ReactNode }) {
  const [region, setRegionState] = useState<Region>(DEFAULT_REGION)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    detectRegion().then((r) => {
      setRegionState(r)
      setLoading(false)
    })
  }, [])

  const setRegion = (r: Region) => {
    setRegionState(r)
    localStorage.setItem('wws_region', JSON.stringify(r))
  }

  return (
    <RegionContext.Provider value={{ region, loading, setRegion }}>
      {children}
    </RegionContext.Provider>
  )
}