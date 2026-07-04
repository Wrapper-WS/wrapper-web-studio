import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, Sparkles, ArrowRight } from 'lucide-react'
import { plans } from '../lib/plans'
import { useRegion } from '../lib/useRegion'
import { formatRegionPrice, getUpsellPrice } from '../lib/region'
import { supabase } from '../lib/supabase'
import type { Upsell } from '../lib/supabase'

function RevealCard({ children, delay = 0, style = {} }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.style.opacity = '1'; el.style.transform = 'translateY(0)' } },
      { threshold: 0.08 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return (
    <div ref={ref} style={{ opacity: 0, transform: 'translateY(24px)', transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`, ...style }}>
      {children}
    </div>
  )
}

const planAccents: Record<string, { border: string; glow: string; priceColor: string; bg: string }> = {
  starter: {
    bg: 'linear-gradient(135deg, rgba(0,212,184,0.04), rgba(255,255,255,0.02))',
    border: 'rgba(0,212,184,0.12)', glow: 'rgba(0,212,184,0.06)', priceColor: 'var(--text)',
  },
  'starter-plus': {
    bg: 'linear-gradient(135deg, rgba(155,93,229,0.05), rgba(255,255,255,0.02))',
    border: 'rgba(155,93,229,0.15)', glow: 'rgba(155,93,229,0.08)', priceColor: 'var(--purple)',
  },
  business: {
    bg: 'linear-gradient(135deg, rgba(0,212,184,0.08), rgba(155,93,229,0.06))',
    border: 'rgba(0,212,184,0.28)', glow: 'rgba(0,212,184,0.12)', priceColor: 'var(--teal)',
  },
  pro: {
    bg: 'linear-gradient(135deg, rgba(155,93,229,0.08), rgba(0,212,184,0.05))',
    border: 'rgba(155,93,229,0.22)', glow: 'rgba(155,93,229,0.1)', priceColor: 'var(--purple)',
  },
  custom: {
    bg: 'linear-gradient(135deg, rgba(255,200,80,0.05), rgba(255,255,255,0.02))',
    border: 'rgba(255,200,80,0.15)', glow: 'rgba(255,200,80,0.06)', priceColor: '#f5c842',
  },
}

const checkColors: Record<string, string> = {
  starter: 'var(--teal)', 'starter-plus': 'var(--purple)', business: 'var(--teal)',
  pro: 'var(--purple)', custom: '#f5c842',
}

export default function Pricing() {
  const { region } = useRegion()
  const [upsells, setUpsells] = useState<Upsell[]>([])

  useEffect(() => {
    supabase.from('upsells').select('*').eq('active', true).order('created_at', { ascending: true }).then(({ data }) => {
      if (data) setUpsells(data)
    })
  }, [])

  const fmt = (planId: string) => {
    const price = region.prices[planId as keyof typeof region.prices]
    return formatRegionPrice(price, region)
  }

  return (
    <main style={{ paddingTop: 100 }}>
      {/* Hero */}
      <section style={{ textAlign: 'center', padding: '36px 16px 48px', maxWidth: 680, margin: '0 auto' }}>
        <div style={{ marginBottom: 18 }}>
          <span className="tag"><Sparkles size={12} />Transparent pricing</span>
        </div>
        <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(28px, 6vw, 50px)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 14 }}>
          Plans built to <span className="gradient-text">scale with you</span>
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: 15, lineHeight: 1.6 }}>
          One-time builds. No hidden fees. Pick a tier and we'll ship your store.
        </p>
      </section>

      {/* Plan cards */}
      <section style={{ padding: '0 16px 60px', maxWidth: 800, margin: '0 auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {plans.map((plan, i) => {
            const accent = planAccents[plan.id] ?? planAccents.starter
            const checkColor = checkColors[plan.id] ?? 'var(--teal)'
            const isCustom = plan.id === 'custom'
            return (
              <RevealCard key={plan.id} delay={i * 80}>
                <div
                  style={{
                    background: accent.bg, border: `1px solid ${accent.border}`, borderRadius: 20,
                    padding: '26px 22px', position: 'relative',
                    transition: 'transform 0.25s ease, box-shadow 0.25s ease', cursor: 'default',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 20px 50px ${accent.glow}` }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
                >
                  {plan.badge && (
                    <div style={{ marginBottom: 14 }}>
                      <span style={{
                        background: 'linear-gradient(135deg, var(--teal), var(--purple))',
                        color: '#0a0d14', fontSize: 11, fontWeight: 700,
                        fontFamily: 'Space Grotesk, sans-serif',
                        padding: '3px 10px', borderRadius: 999, letterSpacing: '0.05em',
                      }}>
                        {plan.badge}
                      </span>
                    </div>
                  )}
                  {isCustom && (
                    <div style={{ marginBottom: 14 }}>
                      <span style={{
                        background: 'rgba(255,200,80,0.12)', color: '#f5c842',
                        fontSize: 11, fontWeight: 700, fontFamily: 'Space Grotesk, sans-serif',
                        padding: '3px 10px', borderRadius: 999, letterSpacing: '0.05em',
                        border: '1px solid rgba(255,200,80,0.25)',
                      }}>
                        FOR SCHOOLS, HOSPITALS & ENTERPRISES
                      </span>
                    </div>
                  )}

                  <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 22, fontWeight: 700, marginBottom: 3 }}>
                    {plan.name}
                  </h2>
                  <p style={{ color: 'var(--muted)', fontSize: 13, marginBottom: 16 }}>{plan.tagline}</p>

                  <div style={{ marginBottom: 18 }}>
                    {isCustom ? (
                      <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 22, fontWeight: 700, color: accent.priceColor }}>
                        Let's discuss your price
                      </span>
                    ) : (
                      <>
                        <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 34, fontWeight: 700, color: accent.priceColor }}>
                          {fmt(plan.id)}
                        </span>
                        <span style={{ color: 'var(--muted)', fontSize: 13, marginLeft: 4 }}>/ one-time</span>
                      </>
                    )}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginBottom: 22 }}>
                    {plan.features.map((f) => (
                      <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{
                          width: 20, height: 20, borderRadius: '50%',
                          background: `${checkColor}18`, border: `1px solid ${checkColor}50`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                        }}>
                          <Check size={11} color={checkColor} strokeWidth={2.5} />
                        </div>
                        <span style={{ fontSize: 14, color: plan.highlight ? 'var(--text)' : 'rgba(240,240,245,0.8)' }}>{f}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    to={`/plans/${plan.id}`}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      width: '100%', padding: '12px', borderRadius: 999,
                      border: `1px solid ${accent.border}`,
                      background: plan.highlight ? 'var(--teal)' : 'rgba(255,255,255,0.05)',
                      color: plan.highlight ? '#0a0d14' : 'var(--text)',
                      fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: 14,
                      textDecoration: 'none', transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = plan.highlight ? 'var(--teal)' : `${checkColor}18`
                      e.currentTarget.style.borderColor = checkColor
                      e.currentTarget.style.color = plan.highlight ? '#0a0d14' : checkColor
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = plan.highlight ? 'var(--teal)' : 'rgba(255,255,255,0.05)'
                      e.currentTarget.style.borderColor = accent.border
                      e.currentTarget.style.color = plan.highlight ? '#0a0d14' : 'var(--text)'
                    }}
                  >
                    {isCustom ? 'Explore Custom' : 'Select Plan'}
                  </Link>
                </div>
              </RevealCard>
            )
          })}
        </div>

        <p style={{ textAlign: 'center', color: 'var(--muted)', fontSize: 13, marginTop: 22, lineHeight: 1.5 }}>
          All plans include responsive mobile-first design — built for businesses, online vendors, and service providers.
        </p>
      </section>

      {/* Other services — click through to a quick inquiry, no website purchase required */}
      <section style={{ padding: '0 16px 100px', maxWidth: 800, margin: '0 auto' }}>
        <RevealCard style={{ textAlign: 'center', marginBottom: 36 }}>
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(22px, 4vw, 34px)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 10 }}>
            Other Services
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: 14, maxWidth: 460, margin: '0 auto', lineHeight: 1.6 }}>
            Already have a website with us, or don't need a new one? Tap a service below and leave your details — no purchase required to get started.
          </p>
        </RevealCard>

        {upsells.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {upsells.map((s, i) => (
              <RevealCard key={s.id} delay={i * 60}>
                <Link
                  to={`/service-inquiry/${s.id}`}
                  className="glass-card"
                  style={{
                    display: 'block', padding: '20px 18px', textDecoration: 'none', color: 'inherit',
                    transition: 'transform 220ms var(--ease-out), box-shadow 220ms var(--ease-out), border-color 220ms var(--ease-out)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,217,188,0.09)'
                    e.currentTarget.style.borderColor = 'rgba(0,217,188,0.25)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                    e.currentTarget.style.borderColor = 'var(--border)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 16, fontWeight: 700, marginBottom: 5 }}>{s.name}</h3>
                      <p style={{ color: 'var(--muted)', fontSize: 13, marginBottom: 12, lineHeight: 1.5 }}>{s.description}</p>
                      {s.features.length > 0 && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 12 }}>
                          {s.features.map((f) => (
                            <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                              <Check size={12} color="var(--teal)" strokeWidth={2.5} />
                              <span style={{ fontSize: 13, color: 'var(--muted)' }}>{f}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      <p style={{ color: 'var(--teal)', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 17 }}>
                        {formatRegionPrice(getUpsellPrice(s.price, region), region)}{' '}
                        <span style={{ color: 'var(--muted)', fontWeight: 400, fontSize: 12 }}>estimate</span>
                      </p>
                    </div>
                    <ArrowRight size={16} color="var(--muted)" style={{ flexShrink: 0, marginTop: 4 }} />
                  </div>
                </Link>
              </RevealCard>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}