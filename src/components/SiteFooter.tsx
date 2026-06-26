import { Link } from 'react-router-dom'

export function SiteFooter() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--border)',
        padding: '32px 16px',
        textAlign: 'center',
        marginTop: 'auto',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <p
          style={{
            color: 'var(--muted)',
            fontSize: 13,
            marginBottom: 16,
            fontFamily: 'Inter, sans-serif',
          }}
        >
          © 2026 Wrapper Web Studio. Crafted for sellers.
        </p>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px 20px',
          }}
        >
          {[
            { to: '/pricing', label: 'Pricing' },
            { to: '/how-it-works', label: 'How It Works' },
            { to: '/contact', label: 'Contact' },
            { to: '/privacy', label: 'Privacy' },
            { to: '/cookies', label: 'Cookies' },
            { to: '/terms', label: 'Terms' },
          ].map((link) => (
            <Link
              key={link.to}
              to={link.to}
              style={{
                color: 'var(--muted)',
                fontSize: 13,
                textDecoration: 'none',
                transition: 'color 0.2s ease',
                fontFamily: 'Inter, sans-serif',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}