import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { RegionBadge } from './RegionBadge'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/contact', label: 'Contact' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const isActive = (to: string) => {
    if (to === '/') return location.pathname === '/'
    return location.pathname.startsWith(to)
  }

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '12px 16px',
      }}
    >
      <div
        className="glass-nav"
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 16px',
          transition: 'box-shadow 0.3s ease',
          boxShadow: scrolled ? '0 8px 32px rgba(0,0,0,0.4)' : 'none',
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            textDecoration: 'none',
          }}
        >
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.12)',
              flexShrink: 0,
              background: '#000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              src="/logo.png"
              alt="Wrapper Web Studio"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => {
                const t = e.currentTarget
                t.style.display = 'none'
                const parent = t.parentElement
                if (parent) parent.innerHTML = '<span style="color:#fff;font-family:Space Grotesk,sans-serif;font-weight:700;font-size:16px">W</span>'
              }}
            />
          </div>
          <span
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 600,
              fontSize: 16,
              color: 'var(--text)',
              letterSpacing: '-0.01em',
            }}
          >
            Wrapper Web Studio
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden-mobile" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              style={{
                padding: '7px 14px',
                borderRadius: 999,
                fontSize: 14,
                fontWeight: 500,
                textDecoration: 'none',
                color: isActive(link.to) ? 'var(--text)' : 'var(--muted)',
                background: isActive(link.to) ? 'rgba(255,255,255,0.06)' : 'transparent',
                transition: 'all 0.2s ease',
                fontFamily: 'Inter, sans-serif',
              }}
              onMouseEnter={(e) => {
                if (!isActive(link.to)) {
                  e.currentTarget.style.color = 'var(--text)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive(link.to)) {
                  e.currentTarget.style.color = 'var(--muted)'
                  e.currentTarget.style.background = 'transparent'
                }
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Region badge + mobile hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <RegionBadge />
        <button
          onClick={() => setOpen((o) => !o)}
          className="show-mobile"
          aria-label={open ? 'Close menu' : 'Open menu'}
          style={{
            width: 38,
            height: 38,
            borderRadius: 999,
            border: '1px solid var(--border-strong)',
            background: 'rgba(255,255,255,0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--text)',
            transition: 'all 0.2s ease',
          }}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div
          style={{
            maxWidth: 1100,
            margin: '8px auto 0',
            background: 'rgba(15,18,28,0.97)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid var(--border-strong)',
            borderRadius: 20,
            padding: '8px',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            animation: 'fadeDown 0.2s ease',
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              style={{
                padding: '14px 16px',
                borderRadius: 12,
                fontSize: 15,
                fontWeight: 500,
                textDecoration: 'none',
                color: isActive(link.to) ? 'var(--text)' : 'var(--muted)',
                background: isActive(link.to) ? 'rgba(255,255,255,0.06)' : 'transparent',
                transition: 'all 0.2s ease',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media (min-width: 768px) {
          .hidden-mobile { display: flex !important; }
          .show-mobile { display: none !important; }
        }
        @media (max-width: 767px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </header>
  )
}