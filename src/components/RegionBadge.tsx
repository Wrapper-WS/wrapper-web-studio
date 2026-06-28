import { useState } from 'react'
import { Globe, ChevronDown, Check } from 'lucide-react'
import { useRegion } from '../lib/useRegion'
import { getRegionByCode } from '../lib/region'

const MANUAL_OPTIONS = [
  { code: 'NG', label: 'Nigeria (₦)' },
  { code: 'GH', label: 'Ghana (GH₵)' },
  { code: 'KE', label: 'Kenya (KSh)' },
  { code: 'ZA', label: 'South Africa (R)' },
  { code: 'UG', label: 'Uganda ($)' },
  { code: 'TZ', label: 'Tanzania ($)' },
  { code: 'CM', label: 'Cameroon ($)' },
  { code: 'US', label: 'United States ($)' },
  { code: 'GB', label: 'United Kingdom ($)' },
  { code: 'FR', label: 'France ($)' },
  { code: 'DE', label: 'Germany ($)' },
  { code: 'XX', label: 'Other ($)' },
]

export function RegionBadge() {
  const { region, loading, setRegion } = useRegion()
  const [open, setOpen] = useState(false)

  if (loading) return null

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 5,
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid var(--border)',
          borderRadius: 999, padding: '5px 10px',
          color: 'var(--muted)', fontSize: 12,
          fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600,
          cursor: 'pointer', transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--border-strong)'; e.currentTarget.style.color = 'var(--text)' }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--muted)' }}
      >
        <Globe size={11} />
        {region.countryCode === 'XX' ? 'Intl' : region.countryCode}
        <span style={{ color: 'var(--teal)', fontWeight: 700 }}>{region.symbol}</span>
        <ChevronDown size={10} />
      </button>

      {open && (
        <div
          style={{
            position: 'absolute', top: 'calc(100% + 8px)', right: 0,
            background: 'rgba(15,18,28,0.98)',
            backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid var(--border-strong)',
            borderRadius: 14, padding: '6px',
            minWidth: 200, zIndex: 200,
            boxShadow: '0 16px 40px rgba(0,0,0,0.5)',
            animation: 'fadeDown 0.15s ease',
          }}
        >
          <p style={{ fontSize: 10, color: 'var(--muted)', fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '0.08em', textTransform: 'uppercase', padding: '6px 10px 4px', fontWeight: 600 }}>
            Select region
          </p>
          {MANUAL_OPTIONS.map((opt) => {
            const selected = region.countryCode === opt.code
            return (
              <button
                key={opt.code}
                onClick={() => { setRegion(getRegionByCode(opt.code)); setOpen(false) }}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  gap: 8, padding: '9px 10px', borderRadius: 8, border: 'none',
                  background: selected ? 'rgba(0,212,184,0.08)' : 'transparent',
                  color: selected ? 'var(--teal)' : 'var(--text)',
                  fontSize: 13, fontFamily: 'Inter, sans-serif',
                  cursor: 'pointer', textAlign: 'left',
                  transition: 'background 0.15s ease',
                }}
                onMouseEnter={(e) => { if (!selected) e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}
                onMouseLeave={(e) => { if (!selected) e.currentTarget.style.background = 'transparent' }}
              >
                {opt.label}
                {selected && <Check size={12} color="var(--teal)" />}
              </button>
            )
          })}
        </div>
      )}

      {/* Backdrop to close */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{ position: 'fixed', inset: 0, zIndex: 199 }}
        />
      )}
    </div>
  )
}