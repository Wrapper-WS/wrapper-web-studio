import { Link } from 'react-router-dom'
import { Zap, Smartphone, Globe, ArrowRight } from 'lucide-react'

export default function Home() {
  return (
    <main style={{ paddingTop: 90 }}>
      {/* Hero */}
      <section
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 16px 80px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: 'absolute',
            top: '20%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 600,
            height: 600,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,212,184,0.06) 0%, rgba(155,93,229,0.04) 50%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ position: 'relative', maxWidth: 680, margin: '0 auto' }}>
          {/* Badge */}
          <div className="fade-up" style={{ marginBottom: 28 }}>
            <span className="tag">
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: 'var(--teal)',
                  display: 'inline-block',
                  boxShadow: '0 0 8px var(--teal)',
                }}
              />
              Now booking July launches
            </span>
          </div>

          {/* Hero card */}
          <div
            className="fade-up delay-100"
            style={{
              background: 'rgba(15,18,28,0.6)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid var(--border-strong)',
              borderRadius: 24,
              padding: '40px 28px 36px',
              marginBottom: 32,
            }}
          >
            <h1
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: 'clamp(36px, 8vw, 64px)',
                fontWeight: 700,
                lineHeight: 1.1,
                marginBottom: 20,
                letterSpacing: '-0.02em',
              }}
            >
              Stores that sell{' '}
              <span className="gradient-text">while you sleep.</span>
            </h1>

            <p
              style={{
                fontSize: 'clamp(15px, 2.5vw, 18px)',
                color: 'var(--muted)',
                lineHeight: 1.7,
                maxWidth: 520,
                margin: '0 auto 32px',
              }}
            >
              We design and ship premium websites for businesses and online vendors —
              physical stores, online shops, and service providers. Fast, mobile-first,
              built to convert.
            </p>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                maxWidth: 340,
                margin: '0 auto',
              }}
            >
              <Link to="/pricing" className="btn-primary" style={{ fontSize: 16, padding: '14px 28px' }}>
                View Plans <ArrowRight size={16} />
              </Link>
              <Link to="/how-it-works" className="btn-ghost" style={{ fontSize: 15, padding: '13px 28px' }}>
                How it works
              </Link>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 20,
                marginTop: 24,
                fontSize: 13,
                color: 'var(--muted)',
              }}
            >
              <span>From ₦150,000</span>
              <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--border-strong)', display: 'inline-block' }} />
              <span>5-day delivery</span>
            </div>
          </div>

          {/* URL bar decoration */}
          <div
            className="fade-up delay-300"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 10,
              padding: '8px 16px',
            }}
          >
            <div style={{ display: 'flex', gap: 5 }}>
              {['#ff5f57', '#febc2e', '#28c840'].map((c) => (
                <span key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c, display: 'inline-block' }} />
              ))}
            </div>
            <span style={{ fontSize: 13, color: 'var(--muted)', fontFamily: 'Inter, sans-serif' }}>
              yourstore.wrapperwebstudio.com
            </span>
          </div>
        </div>
      </section>

      {/* Why section */}
      <section style={{ padding: '80px 16px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(28px, 5vw, 42px)',
              fontWeight: 700,
              marginBottom: 16,
              letterSpacing: '-0.02em',
            }}
          >
            Why sellers choose{' '}
            <span className="gradient-text">Wrapper Web Studio</span>
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: 16, maxWidth: 460, margin: '0 auto' }}>
            Every store we ship is engineered around three obsessions.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 16,
          }}
        >
          {[
            {
              icon: <Zap size={22} color="var(--teal)" />,
              title: 'Ship in 5 days',
              desc: 'From kickoff to live store. No drawn-out timelines, no excuses.',
            },
            {
              icon: <Smartphone size={22} color="var(--purple)" />,
              title: 'Mobile-first, always',
              desc: '98% of your buyers shop on phones. Every pixel is tuned for thumbs.',
            },
            {
              icon: <Globe size={22} color="var(--teal)" />,
              title: 'Built for every business',
              desc: 'Physical stores, online vendors, and service providers — tailored to how you sell.',
            },
          ].map((item, i) => (
            <div
              key={i}
              className="glass-card"
              style={{ padding: '28px 24px' }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  background: i === 1 ? 'var(--purple-dim)' : 'var(--teal-dim)',
                  border: `1px solid ${i === 1 ? 'rgba(155,93,229,0.3)' : 'rgba(0,212,184,0.3)'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 18,
                }}
              >
                {item.icon}
              </div>
              <h3
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: 18,
                  fontWeight: 700,
                  marginBottom: 10,
                }}
              >
                {item.title}
              </h3>
              <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.6 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA section */}
      <section style={{ padding: '40px 16px 100px', maxWidth: 1100, margin: '0 auto' }}>
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(0,212,184,0.08), rgba(155,93,229,0.08))',
            border: '1px solid var(--border-strong)',
            borderRadius: 24,
            padding: 'clamp(40px, 6vw, 64px) clamp(24px, 4vw, 48px)',
            textAlign: 'center',
          }}
        >
          <h2
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(26px, 5vw, 40px)',
              fontWeight: 700,
              marginBottom: 16,
              letterSpacing: '-0.02em',
            }}
          >
            Your store,{' '}
            <span className="gradient-text">live this week.</span>
          </h2>
          <p
            style={{
              color: 'var(--muted)',
              fontSize: 16,
              maxWidth: 400,
              margin: '0 auto 32px',
              lineHeight: 1.6,
            }}
          >
            Pick a plan, send your products, and we'll handle the rest. Premium pricing in ₦.
          </p>
          <Link to="/pricing" className="btn-primary" style={{ fontSize: 16, padding: '14px 32px' }}>
            Choose Your Plan <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  )
}