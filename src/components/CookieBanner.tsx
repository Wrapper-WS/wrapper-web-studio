import { useState, useEffect } from 'react'
import { X, Cookie } from 'lucide-react'
import { Link } from 'react-router-dom'

type Preferences = {
  analytics: boolean
  marketing: boolean
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const [showPrefs, setShowPrefs] = useState(false)
  const [prefs, setPrefs] = useState<Preferences>({ analytics: false, marketing: false })

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent')
    if (!consent) {
      setTimeout(() => setVisible(true), 1000)
    }
  }, [])

  const accept = () => {
    localStorage.setItem('cookie_consent', 'accepted')
    setVisible(false)
  }

  const reject = () => {
    localStorage.setItem('cookie_consent', 'rejected')
    setVisible(false)
  }

  const savePrefs = () => {
    localStorage.setItem('cookie_consent', `custom:${prefs.analytics}:${prefs.marketing}`)
    setVisible(false)
    setShowPrefs(false)
  }

  if (!visible) return null

  return (
    <>
      {/* Main banner */}
      {!showPrefs && (
        <div
          style={{
            position: 'fixed',
            bottom: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 200,
            width: 'calc(100% - 32px)',
            maxWidth: 480,
            background: 'rgba(15,18,28,0.96)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid var(--border-strong)',
            borderRadius: 20,
            padding: '20px 20px 16px',
            boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 16 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: 'var(--teal-dim)',
                border: '1px solid var(--teal)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Cookie size={18} color="var(--teal)" />
            </div>
            <div>
              <p
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: 'var(--text)',
                  fontFamily: 'Space Grotesk, sans-serif',
                  marginBottom: 4,
                }}
              >
                We use cookies
              </p>
              <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.5 }}>
                To improve your experience on our site.{' '}
                <Link to="/cookies" style={{ color: 'var(--teal)', textDecoration: 'none' }}>
                  Read our Cookie Policy
                </Link>
                .
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <button
              onClick={accept}
              className="btn-teal"
              style={{ flex: 1, minWidth: 100, fontSize: 13, padding: '10px 16px' }}
            >
              Accept All
            </button>
            <button
              onClick={reject}
              className="btn-ghost"
              style={{ flex: 1, minWidth: 80, fontSize: 13, padding: '10px 16px' }}
            >
              Reject
            </button>
            <button
              onClick={() => setShowPrefs(true)}
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                color: 'var(--muted)',
                fontSize: 12,
                cursor: 'pointer',
                padding: '6px 0 0',
                fontFamily: 'Inter, sans-serif',
                textDecoration: 'underline',
              }}
            >
              Manage Preferences
            </button>
          </div>
        </div>
      )}

      {/* Preferences modal */}
      {showPrefs && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 200,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            padding: '0 16px 20px',
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(4px)',
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: 480,
              background: 'rgba(15,18,28,0.98)',
              border: '1px solid var(--border-strong)',
              borderRadius: 24,
              padding: 24,
              boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 18, color: 'var(--text)' }}>
                Cookie Preferences
              </h3>
              <button
                onClick={() => setShowPrefs(false)}
                style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Essential */}
            <div style={{ marginBottom: 16, padding: 16, background: 'var(--surface)', borderRadius: 12, border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontWeight: 600, fontSize: 14, color: 'var(--text)', fontFamily: 'Space Grotesk, sans-serif' }}>Essential</p>
                  <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>Required for the site to work</p>
                </div>
                <span style={{ fontSize: 11, color: 'var(--teal)', fontWeight: 600, fontFamily: 'Space Grotesk, sans-serif' }}>Always on</span>
              </div>
            </div>

            {/* Analytics */}
            <div style={{ marginBottom: 16, padding: 16, background: 'var(--surface)', borderRadius: 12, border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontWeight: 600, fontSize: 14, color: 'var(--text)', fontFamily: 'Space Grotesk, sans-serif' }}>Analytics</p>
                  <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>Help us understand how visitors use the site</p>
                </div>
                <button
                  onClick={() => setPrefs((p) => ({ ...p, analytics: !p.analytics }))}
                  style={{
                    width: 44,
                    height: 24,
                    borderRadius: 999,
                    border: 'none',
                    background: prefs.analytics ? 'var(--teal)' : 'rgba(255,255,255,0.1)',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'background 0.2s ease',
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      top: 2,
                      left: prefs.analytics ? 22 : 2,
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      background: '#fff',
                      transition: 'left 0.2s ease',
                    }}
                  />
                </button>
              </div>
            </div>

            {/* Marketing */}
            <div style={{ marginBottom: 24, padding: 16, background: 'var(--surface)', borderRadius: 12, border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontWeight: 600, fontSize: 14, color: 'var(--text)', fontFamily: 'Space Grotesk, sans-serif' }}>Marketing</p>
                  <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>Used for targeted advertising</p>
                </div>
                <button
                  onClick={() => setPrefs((p) => ({ ...p, marketing: !p.marketing }))}
                  style={{
                    width: 44,
                    height: 24,
                    borderRadius: 999,
                    border: 'none',
                    background: prefs.marketing ? 'var(--teal)' : 'rgba(255,255,255,0.1)',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'background 0.2s ease',
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      top: 2,
                      left: prefs.marketing ? 22 : 2,
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      background: '#fff',
                      transition: 'left 0.2s ease',
                    }}
                  />
                </button>
              </div>
            </div>

            <button onClick={savePrefs} className="btn-teal" style={{ width: '100%' }}>
              Save Preferences
            </button>
          </div>
        </div>
      )}
    </>
  )
}