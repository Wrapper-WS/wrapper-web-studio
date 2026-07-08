import { Link } from 'react-router-dom'
import { Zap, Smartphone, Globe, ArrowRight } from 'lucide-react'
import { usePageMeta } from '../lib/usePageMeta'
import { RevealCard } from '../components/Reveal'

const features = [
  {
    icon: <Zap size={18} color="var(--teal)" />,
    title: 'Ship in 5 days',
    desc: 'From kickoff to live store. No drawn-out timelines, no excuses.',
  },
  {
    icon: <Smartphone size={18} color="var(--teal)" />,
    title: 'Mobile-first, always',
    desc: '98% of your buyers shop on phones. Every pixel is tuned for thumbs.',
  },
  {
    icon: <Globe size={18} color="var(--teal)" />,
    title: 'Built for every business',
    desc: 'Physical stores, online vendors, and service providers — tailored to how you sell.',
  },
]

export default function Home() {
  usePageMeta(
    'Premium Websites for African Businesses',
    'We design and ship premium websites for African businesses, brands, and institutions — physical stores, online shops, service providers, and beyond. Fast, mobile-first, built to compete globally.'
  )

  return (
    <main style={{ paddingTop: 72 }}>

      {/* Hero */}
      <section
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '44px 16px 56px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Single restrained glow — one accent, not a dual-tone blob */}
        <div style={{
          position: 'absolute', top: '8%', left: '50%', transform: 'translateX(-50%)',
          width: 560, height: 380, borderRadius: '50%',
          background: 'radial-gradient(circle, oklch(78% 0.14 78 / 7%) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', maxWidth: 640, margin: '0 auto', width: '100%' }}>
          <RevealCard>
            <div style={{ marginBottom: 22 }}>
              <span className="tag">
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--teal)', display: 'inline-block' }} />
                Now booking new projects
              </span>
            </div>
          </RevealCard>

          <RevealCard delay={80}>
            <div
              className="glass-card"
              style={{
                padding: 'clamp(32px, 5vw, 48px) clamp(20px, 4vw, 40px)',
                marginBottom: 22,
                boxShadow: '0 24px 60px -20px rgba(0,0,0,0.5)',
              }}
            >
              <h1 style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: 'clamp(30px, 8vw, 56px)',
                fontWeight: 700,
                lineHeight: 1.12,
                marginBottom: 18,
                letterSpacing: '-0.02em',
              }}>
                Stores that sell <span className="gradient-text">while you sleep.</span>
              </h1>

              <p style={{
                fontSize: 'clamp(14px, 2.5vw, 17px)',
                color: 'var(--muted)',
                lineHeight: 1.7,
                maxWidth: 480,
                margin: '0 auto 28px',
              }}>
                Premium websites for African businesses, brands, and institutions —
                online stores, business sites, and custom builds. Fast, mobile-first,
                built to compete globally.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 300, margin: '0 auto' }}>
                <Link to="/pricing" className="btn-primary" style={{ fontSize: 15, padding: '13px 24px' }}>
                  View Plans <ArrowRight size={15} />
                </Link>
                <Link to="/how-it-works" className="btn-ghost" style={{ fontSize: 14, padding: '12px 24px' }}>
                  How it works
                </Link>
              </div>

              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                gap: 16, marginTop: 22, fontSize: 13, color: 'var(--muted)',
              }}>
                <span>From ₦50,000</span>
                <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--border-strong)', display: 'inline-block' }} />
                <span>3-day delivery</span>
              </div>
            </div>
          </RevealCard>

          <RevealCard delay={140}>
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
          </RevealCard>
        </div>
      </section>

      {/* Why us — a plain divided list, not three identical cards */}
      <section style={{ padding: '56px 16px 64px', maxWidth: 720, margin: '0 auto' }}>
        <RevealCard style={{ marginBottom: 36 }}>
          <h2 style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 'clamp(24px, 5vw, 36px)',
            fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 12,
          }}>
            Why sellers choose Wrapper Web Studio
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: 14, maxWidth: 480 }}>
            Every store we ship is engineered around three obsessions.
          </p>
        </RevealCard>

        <div>
          {features.map((item, i) => (
            <RevealCard key={item.title} delay={i * 80}>
              <div
                style={{
                  display: 'flex', gap: 18, alignItems: 'flex-start',
                  padding: '20px 0',
                  borderTop: i === 0 ? 'none' : '1px solid var(--border)',
                }}
              >
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: 'var(--teal-dim)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, marginTop: 2,
                }}>
                  {item.icon}
                </div>
                <div>
                  <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 16, fontWeight: 700, marginBottom: 6 }}>
                    {item.title}
                  </h3>
                  <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.65, maxWidth: 480 }}>{item.desc}</p>
                </div>
              </div>
            </RevealCard>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '0 16px 80px', maxWidth: 1100, margin: '0 auto' }}>
        <RevealCard>
          <div style={{
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border-strong)',
            borderRadius: 24,
            padding: 'clamp(36px, 5vw, 60px) clamp(20px, 4vw, 48px)',
            textAlign: 'center',
          }}>
            <h2 style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(22px, 5vw, 36px)',
              fontWeight: 700, marginBottom: 14, letterSpacing: '-0.02em',
            }}>
              Your store, <span className="gradient-text">live this week.</span>
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: 14, maxWidth: 360, margin: '0 auto 28px', lineHeight: 1.6 }}>
              Pick a plan, send your products, and we'll handle the rest. Premium pricing in your local currency.
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