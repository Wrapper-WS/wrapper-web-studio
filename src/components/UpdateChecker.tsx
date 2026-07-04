import { useEffect, useState, useRef } from 'react'
import { RefreshCw } from 'lucide-react'

// Grabs the current script bundle reference from the page that's actually
// loaded right now, so we have something to compare future fetches against.
function getCurrentBundleSignature(): string {
  const scripts = Array.from(document.querySelectorAll('script[src]'))
    .map((s) => (s as HTMLScriptElement).src)
    .filter((src) => src.includes('/assets/'))
  return scripts.join('|')
}

export function UpdateChecker() {
  const [updateAvailable, setUpdateAvailable] = useState(false)
  const initialSignature = useRef<string>(getCurrentBundleSignature())

  useEffect(() => {
    const checkForUpdate = async () => {
      try {
        const res = await fetch('/', { cache: 'no-store' })
        const html = await res.text()
        const matches = html.match(/\/assets\/[^"']+\.js/g) ?? []
        const freshSignature = matches.join('|')
        if (initialSignature.current && freshSignature && freshSignature !== initialSignature.current) {
          setUpdateAvailable(true)
        }
      } catch {
        // Network hiccup — ignore, we'll try again later.
      }
    }

    // Check when the tab regains focus (most common moment a stale tab is used again)
    const onVisibility = () => { if (document.visibilityState === 'visible') checkForUpdate() }
    document.addEventListener('visibilitychange', onVisibility)

    // Also poll occasionally for long-lived open tabs
    const interval = setInterval(checkForUpdate, 5 * 60 * 1000)

    return () => {
      document.removeEventListener('visibilitychange', onVisibility)
      clearInterval(interval)
    }
  }, [])

  if (!updateAvailable) return null

  return (
    <div
      style={{
        position: 'fixed', bottom: 20, left: '50%', transform: 'translateX(-50%)',
        zIndex: 300, display: 'flex', alignItems: 'center', gap: 12,
        background: 'rgba(16,20,31,0.97)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid var(--border-strong)', borderRadius: 999,
        padding: '10px 10px 10px 18px', boxShadow: '0 16px 40px rgba(0,0,0,0.5)',
        animation: 'fadeDown 250ms var(--ease-out)',
      }}
    >
      <span style={{ fontSize: 13, color: 'var(--text)', fontFamily: 'Inter, sans-serif', whiteSpace: 'nowrap' }}>
        A newer version of this page is available
      </span>
      <button
        onClick={() => window.location.reload()}
        className="btn-teal"
        style={{ fontSize: 13, padding: '8px 16px', whiteSpace: 'nowrap' }}
      >
        <RefreshCw size={13} /> Refresh
      </button>
    </div>
  )
}