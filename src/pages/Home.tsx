import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Zap, Smartphone, Globe, ArrowRight } from 'lucide-react'

function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.style.opacity = '1'; el.style.transform = 'translateY(0)' } },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

function RevealCard({ children, delay = 0, style = {} }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  const ref = useReveal()
  return (
    <div
      ref={ref}
      style={{
        opacity: 0,
        transform: 'translateY(28px)',
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

export default function Home() {
  return (
    <main style={{ paddingTop: 80 }}>
      {/* Hero */}
      <section
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 16px 48px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background glow */}
        <div style={{
          position: 'absolute', top: '15%', left: '50%', transform: 'translateX(-50%)',
          width: 700, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,212,184,0.07) 0%, rgba(155,93,229,0.05) 50%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', maxWidth: 680, margin: '0 auto' }}>
          {/* Badge */}
          <div className="fade-up" style={{ marginBottom: 20 }}>
            <span className="tag">
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--teal)', display: 'inline-block', boxShadow: '0 0 8px var(--teal)' }} />
              Now booking July launches
            </span>
          </div>

          {/* Hero card */}
          <div
            className="fade-up delay-100"
            style={{
              background: 'rgba(15,18,28,0.65)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid var(--border-strong)',
              borderRadius: 24,
              padding: '36px 24px 32px',
              marginBottom: 20,
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,212,184,0.08)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <h1 style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(34px, 8vw, 62px)',
              fontWeight: 700,
              lineHeight: 1.1,
              marginBottom: 18,
              letterSpacing: '-0.02em',
            }}>
              Stores that sell{' '}
              <span className="gradient-text">while you sleep.</span>
            </h1>

            <p style={{
              fontSize: 'clamp(14px, 2.5vw, 17px)',
              color: 'var(--muted)',
              lineHeight: 1.7,
              maxWidth: 500,
              margin: '0 auto 28px',
            }}>
              We design and ship premium websites for businesses and online vendors —
              physical stores, online shops, and service providers. Fast, mobile-first,
              built to convert.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 320, margin: '0 auto' }}>
              <Link to="/pricing" className="btn-primary" style={{ fontSize: 16, padding: '13px 28px' }}>
                View Plans <ArrowRight size={16} />
              </Link>
              <Link to="/how-it-works" className="btn-ghost" style={{ fontSize: 15, padding: '12px 28px' }}>
                How it works
              </Link>
            </div>

            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: 20, marginTop: 20, fontSize: 13, color: 'var(--muted)',
            }}>
              <span>From ₦150,000</span>
              <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--border-strong)', display: 'inline-block' }} />
              <span>5-day delivery</span>
            </div>
          </div>

          {/* URL bar */}
          <div
            className="fade-up delay-300"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 10, padding: '8px 16px',
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
      <section style={{ padding: '48px 16px', maxWidth: 1100, margin: '0 auto' }}>
        <RevealCard style={{ textAlign: 'center', marginBottom: 40 }}>
          <h2 style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 'clamp(26px, 5vw, 40px)',
            fontWeight: 700, marginBottom: 14, letterSpacing: '-0.02em',
          }}>
            Why sellers choose{' '}
            <span className="gradient-text">Wrapper Web Studio</span>
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: 15, maxWidth: 440, margin: '0 auto' }}>
            Every store we ship is engineered around three obsessions.
          </p>
        </RevealCard>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14 }}>
          {[
            { icon: <Zap size={22} color="var(--teal)" />, title: 'Ship in 5 days', desc: 'From kickoff to live store. No drawn-out timelines, no excuses.', accent: 'teal' },
            { icon: <Smartphone size={22} color="var(--purple)" />, title: 'Mobile-first, always', desc: '98% of your buyers shop on phones. Every pixel is tuned for thumbs.', accent: 'purple' },
            { icon: <Globe size={22} color="var(--teal)" />, title: 'Built for every business', desc: 'Physical stores, online vendors, and service providers — tailored to how you sell.', accent: 'teal' },
          ].map((item, i) => (
            <RevealCard key={i} delay={i * 100}>
              <div
                className="glass-card"
                style={{
                  padding: '26px 22px',
                  cursor: 'default',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = item.accent === 'teal'
                    ? '0 16px 40px rgba(0,212,184,0.1)'
                    : '0 16px 40px rgba(155,93,229,0.1)'
                  e.currentTarget.style.borderColor = item.accent === 'teal'
                    ? 'rgba(0,212,184,0.2)' : 'rgba(155,93,229,0.2)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                  e.currentTarget.style.borderColor = 'var(--border)'
                }}
              >
                <div style={{
                  width: 46, height: 46, borderRadius: 13,
                  background: item.accent === 'teal' ? 'var(--teal-dim)' : 'var(--purple-dim)',
                  border: `1px solid ${item.accent === 'teal' ? 'rgba(0,212,184,0.3)' : 'rgba(155,93,229,0.3)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16,
                }}>
                  {item.icon}
                </div>
                <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 17, fontWeight: 700, marginBottom: 8 }}>
                  {item.title}
                </h3>
                <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            </RevealCard>
          ))}
        </div>
      </section>

      {/* CTA section */}
      <section style={{ padding: '24px 16px 80px', maxWidth: 1100, margin: '0 auto' }}>
        <RevealCard>
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(0,212,184,0.08), rgba(155,93,229,0.08))',
              border: '1px solid var(--border-strong)',
              borderRadius: 24,
              padding: 'clamp(36px, 6vw, 60px) clamp(20px, 4vw, 48px)',
              textAlign: 'center',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 24px 64px rgba(0,212,184,0.08)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <h2 style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(24px, 5vw, 38px)',
              fontWeight: 700, marginBottom: 14, letterSpacing: '-0.02em',
            }}>
              Your store,{' '}
              <span className="gradient-text">live this week.</span>
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: 15, maxWidth: 380, margin: '0 auto 28px', lineHeight: 1.6 }}>
              Pick a plan, send your products, and we'll handle the rest. Premium pricing in ₦.
            </p>
            <Link to="/pricing" className="btn-primary" style={{ fontSize: 15, padding: '13px 30px' }}>
              Choose Your Plan <ArrowRight size={16} />
            </Link>
          </div>
        </RevealCard>
      </section>
    </main>
  )
}