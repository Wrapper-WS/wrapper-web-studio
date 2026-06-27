import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Zap, Smartphone, Globe, ArrowRight } from 'lucide-react'

function RevealCard({ children, delay = 0, style = {} }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    // Start visible, animate in smoothly
    el.style.opacity = '0'
    el.style.transform = 'translateY(20px)'
    const timer = setTimeout(() => {
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.style.opacity = '1'
            el.style.transform = 'translateY(0)'
            obs.disconnect()
          }
        },
        { threshold: 0.05, rootMargin: '0px 0px -20px 0px' }
      )
      obs.observe(el)
      return () => obs.disconnect()
    }, 50)
    return () => clearTimeout(timer)
  }, [])
  return (
    <div
      ref={ref}
      style={{
        transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

export default function Home() {
  return (
    <main style={{ paddingTop: 72 }}>

      {/* Hero — no minHeight, just natural flow */}
      <section
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '32px 16px 40px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background glow */}
        <div style={{
          position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)',
          width: 600, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,212,184,0.07) 0%, rgba(155,93,229,0.05) 50%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', maxWidth: 640, margin: '0 auto', width: '100%' }}>
          {/* Badge */}
          <div style={{ marginBottom: 16 }}>
            <span className="tag">
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--teal)', display: 'inline-block', boxShadow: '0 0 8px var(--teal)' }} />
              Now booking July launches
            </span>
          </div>

          {/* Hero card */}
          <div
            style={{
              background: 'rgba(15,18,28,0.65)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid var(--border-strong)',
              borderRadius: 24,
              padding: 'clamp(28px, 5vw, 44px) clamp(18px, 4vw, 36px)',
              marginBottom: 16,
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
              fontSize: 'clamp(30px, 8vw, 58px)',
              fontWeight: 700,
              lineHeight: 1.1,
              marginBottom: 16,
              letterSpacing: '-0.02em',
            }}>
              Stores that sell{' '}
              <span className="gradient-text">while you sleep.</span>
            </h1>

            <p style={{
              fontSize: 'clamp(14px, 2.5vw, 17px)',
              color: 'var(--muted)',
              lineHeight: 1.65,
              maxWidth: 480,
              margin: '0 auto 24px',
            }}>
              We design and ship premium websites for businesses and online vendors —
              physical stores, online shops, and service providers. Fast, mobile-first,
              built to convert.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 300, margin: '0 auto' }}>
              <Link to="/pricing" className="btn-primary" style={{ fontSize: 15, padding: '13px 24px' }}>
                View Plans <ArrowRight size={15} />
              </Link>
              <Link to="/how-it-works" className="btn-ghost" style={{ fontSize: 14, padding: '12px 24px' }}>
                How it works
              </Link>
            </div>

            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: 16, marginTop: 18, fontSize: 13, color: 'var(--muted)',
            }}>
              <span>From ₦150,000</span>
              <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--border-strong)', display: 'inline-block' }} />
              <span>5-day delivery</span>
            </div>
          </div>

          {/* URL bar */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 10, padding: '7px 14px',
          }}>
            <div style={{ display: 'flex', gap: 5 }}>
              {['#ff5f57', '#febc2e', '#28c840'].map((c) => (
                <span key={c} style={{ width: 9, height: 9, borderRadius: '50%', background: c, display: 'inline-block' }} />
              ))}
            </div>
            <span style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'Inter, sans-serif' }}>
              yourstore.wrapperwebstudio.com
            </span>
          </div>
        </div>
      </section>

      {/* Why section — tight gap from hero */}
      <section style={{ padding: '32px 16px 40px', maxWidth: 1100, margin: '0 auto' }}>
        <RevealCard style={{ textAlign: 'center', marginBottom: 28 }}>
          <h2 style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 'clamp(22px, 5vw, 38px)',
            fontWeight: 700, marginBottom: 12, letterSpacing: '-0.02em',
          }}>
            Why sellers choose{' '}
            <span className="gradient-text">Wrapper Web Studio</span>
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: 14, maxWidth: 400, margin: '0 auto' }}>
            Every store we ship is engineered around three obsessions.
          </p>
        </RevealCard>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12 }}>
          {[
            { icon: <Zap size={20} color="var(--teal)" />, title: 'Ship in 5 days', desc: 'From kickoff to live store. No drawn-out timelines, no excuses.', accent: 'teal' },
            { icon: <Smartphone size={20} color="var(--purple)" />, title: 'Mobile-first, always', desc: '98% of your buyers shop on phones. Every pixel is tuned for thumbs.', accent: 'purple' },
            { icon: <Globe size={20} color="var(--teal)" />, title: 'Built for every business', desc: 'Physical stores, online vendors, and service providers — tailored to how you sell.', accent: 'teal' },
          ].map((item, i) => (
            <RevealCard key={i} delay={i * 80}>
              <div
                className="glass-card"
                style={{
                  padding: '22px 18px',
                  cursor: 'default',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = item.accent === 'teal'
                    ? '0 16px 40px rgba(0,212,184,0.1)' : '0 16px 40px rgba(155,93,229,0.1)'
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
                  width: 42, height: 42, borderRadius: 12,
                  background: item.accent === 'teal' ? 'var(--teal-dim)' : 'var(--purple-dim)',
                  border: `1px solid ${item.accent === 'teal' ? 'rgba(0,212,184,0.3)' : 'rgba(155,93,229,0.3)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14,
                }}>
                  {item.icon}
                </div>
                <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 16, fontWeight: 700, marginBottom: 7 }}>
                  {item.title}
                </h3>
                <p style={{ color: 'var(--muted)', fontSize: 13, lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            </RevealCard>
          ))}
        </div>
      </section>

      {/* CTA section */}
      <section style={{ padding: '0 16px 64px', maxWidth: 1100, margin: '0 auto' }}>
        <RevealCard>
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(0,212,184,0.08), rgba(155,93,229,0.08))',
              border: '1px solid var(--border-strong)',
              borderRadius: 24,
              padding: 'clamp(32px, 5vw, 56px) clamp(18px, 4vw, 48px)',
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
              fontSize: 'clamp(22px, 5vw, 36px)',
              fontWeight: 700, marginBottom: 12, letterSpacing: '-0.02em',
            }}>
              Your store,{' '}
              <span className="gradient-text">live this week.</span>
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: 14, maxWidth: 360, margin: '0 auto 24px', lineHeight: 1.6 }}>
              Pick a plan, send your products, and we'll handle the rest. Premium pricing in ₦.
            </p>
            <Link to="/pricing" className="btn-primary" style={{ fontSize: 15, padding: '13px 28px' }}>
              Choose Your Plan <ArrowRight size={15} />
            </Link>
          </div>
        </RevealCard>
      </section>

    </main>
  )
}