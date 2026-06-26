import { Link } from 'react-router-dom'
import { Check, Sparkles } from 'lucide-react'
import { plans, formatPrice } from '../lib/plans'

const services = [
  {
    name: 'Product Uploads',
    desc: 'We professionally upload your products.',
    features: ['Clean product layouts', 'Consistent formatting', 'Ready-to-sell catalog'],
    price: 30000,
  },
  {
    name: 'Product Updates (Monthly Pack)',
    desc: 'A full month of product updates handled for you.',
    features: ['Add new products', 'Update prices & info', 'Refresh images'],
    price: 40000,
  },
  {
    name: 'Monthly Management',
    desc: 'We manage your store for a full month.',
    features: ['Site upkeep', 'Small fixes & tweaks', 'Owner support'],
    price: 100000,
  },
  {
    name: 'Maintenance',
    desc: "We'll fix any problem that might come up.",
    features: ['Bug fixes', 'Quick troubleshooting', 'Peace of mind'],
    price: 30000,
  },
  {
    name: 'Store Redesign / Upgrade',
    desc: 'Refresh and elevate your existing store.',
    features: ['Modern visuals', 'Better UX', 'Improved conversions'],
    price: 80000,
  },
  {
    name: 'Consultation',
    desc: '1-on-1 strategy session for your business.',
    features: ['Tailored advice', 'Roadmap clarity', 'Actionable next steps'],
    price: 15000,
  },
  {
    name: 'Instagram / WhatsApp Automation Setup',
    desc: 'Automate replies and customer flows.',
    features: ['Auto-replies', 'Order routing', 'Faster customer response'],
    price: 50000,
  },
  {
    name: 'Sales Page / Landing Page',
    desc: 'High-converting single page for offers & campaigns.',
    features: ['Conversion-focused copy', 'Premium design', 'Quick turnaround'],
    price: 30000,
  },
]

export default function Pricing() {
  return (
    <main style={{ paddingTop: 100 }}>
      {/* Hero */}
      <section style={{ textAlign: 'center', padding: '40px 16px 60px', maxWidth: 700, margin: '0 auto' }}>
        <div style={{ marginBottom: 20 }}>
          <span className="tag">
            <Sparkles size={12} />
            Transparent pricing
          </span>
        </div>
        <h1
          style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 'clamp(30px, 6vw, 52px)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            marginBottom: 16,
          }}
        >
          Plans built to{' '}
          <span className="gradient-text">scale with you</span>
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: 16, lineHeight: 1.6 }}>
          One-time builds. No hidden fees. Pick a tier and we'll ship your store.
        </p>
      </section>

      {/* Plan cards */}
      <section style={{ padding: '0 16px 80px', maxWidth: 800, margin: '0 auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {plans.map((plan) => (
            <div
              key={plan.id}
              style={{
                background: plan.highlight
                  ? 'linear-gradient(135deg, rgba(0,212,184,0.06), rgba(155,93,229,0.06))'
                  : 'var(--surface)',
                border: `1px solid ${plan.highlight ? 'rgba(0,212,184,0.25)' : 'var(--border)'}`,
                borderRadius: 20,
                padding: '28px 24px',
                position: 'relative',
              }}
            >
              {plan.badge && (
                <div style={{ marginBottom: 16 }}>
                  <span
                    style={{
                      background: 'linear-gradient(135deg, var(--teal), var(--purple))',
                      color: '#0a0d14',
                      fontSize: 11,
                      fontWeight: 700,
                      fontFamily: 'Space Grotesk, sans-serif',
                      padding: '3px 10px',
                      borderRadius: 999,
                      letterSpacing: '0.05em',
                    }}
                  >
                    {plan.badge}
                  </span>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
                <div style={{ flex: 1 }}>
                  <h2
                    style={{
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontSize: 22,
                      fontWeight: 700,
                      marginBottom: 4,
                    }}
                  >
                    {plan.name}
                  </h2>
                  <p style={{ color: 'var(--muted)', fontSize: 14 }}>{plan.tagline}</p>

                  <div style={{ margin: '18px 0 20px' }}>
                    <span
                      style={{
                        fontFamily: 'Space Grotesk, sans-serif',
                        fontSize: 36,
                        fontWeight: 700,
                        color: plan.highlight ? 'var(--teal)' : 'var(--text)',
                      }}
                    >
                      {formatPrice(plan.price)}
                    </span>
                    <span style={{ color: 'var(--muted)', fontSize: 14, marginLeft: 4 }}>
                      / one-time
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
                    {plan.features.map((f) => (
                      <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div
                          style={{
                            width: 20,
                            height: 20,
                            borderRadius: '50%',
                            background: plan.highlight ? 'var(--teal-dim)' : 'var(--surface-hover)',
                            border: `1px solid ${plan.highlight ? 'var(--teal)' : 'var(--border-strong)'}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                          }}
                        >
                          <Check size={11} color={plan.highlight ? 'var(--teal)' : 'var(--muted)'} strokeWidth={2.5} />
                        </div>
                        <span style={{ fontSize: 14, color: plan.highlight ? 'var(--text)' : 'var(--muted)' }}>
                          {f}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <Link
                to={`/plans/${plan.id}`}
                className={plan.highlight ? 'btn-teal' : 'btn-ghost'}
                style={{ width: '100%', justifyContent: 'center', fontSize: 15 }}
              >
                Select Plan
              </Link>
            </div>
          ))}
        </div>

        <p style={{ textAlign: 'center', color: 'var(--muted)', fontSize: 13, marginTop: 24, lineHeight: 1.5 }}>
          All plans include responsive mobile-first design — built for businesses, online vendors, and service providers.
        </p>
      </section>

      {/* Growth services */}
      <section style={{ padding: '0 16px 100px', maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ marginBottom: 16 }}>
            <span className="tag">
              <Sparkles size={12} />
              Growth & Support Services
            </span>
          </div>
          <h2
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(24px, 4vw, 36px)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              marginBottom: 12,
            }}
          >
            Keep growing{' '}
            <span className="gradient-text">after launch</span>
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: 15, maxWidth: 480, margin: '0 auto', lineHeight: 1.6 }}>
            Optional one-time services that help your business move faster, sell more, and stay healthy long after your store goes live.
          </p>
        </div>

        <p style={{ color: 'var(--muted)', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 20, fontFamily: 'Space Grotesk, sans-serif' }}>
          OUR SERVICES · All one-time purchases
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {services.map((s) => (
            <div key={s.name} className="glass-card" style={{ padding: '22px 20px' }}>
              <div style={{ marginBottom: 8 }}>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                    fontFamily: 'Space Grotesk, sans-serif',
                    letterSpacing: '0.08em',
                    color: 'var(--muted)',
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    padding: '3px 8px',
                    borderRadius: 6,
                  }}
                >
                  ONE-TIME
                </span>
              </div>
              <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 17, fontWeight: 700, marginBottom: 6 }}>
                {s.name}
              </h3>
              <p style={{ color: 'var(--muted)', fontSize: 13, marginBottom: 14, lineHeight: 1.5 }}>{s.desc}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
                {s.features.map((f) => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Check size={13} color="var(--teal)" strokeWidth={2.5} />
                    <span style={{ fontSize: 13, color: 'var(--muted)' }}>{f}</span>
                  </div>
                ))}
              </div>
              <p style={{ color: 'var(--teal)', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 18 }}>
                {formatPrice(s.price)}{' '}
                <span style={{ color: 'var(--muted)', fontWeight: 400, fontSize: 13 }}>/ one-time</span>
              </p>
            </div>
          ))}
        </div>

        <p style={{ textAlign: 'center', color: 'var(--muted)', fontSize: 13, marginTop: 24 }}>
          Add any of these services to your order — final total updates automatically.
        </p>
      </section>
    </main>
  )
}