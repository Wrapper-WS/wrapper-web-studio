import { useState, useEffect, useRef } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Check, Star, AlertCircle, Tag, X } from 'lucide-react'
import { getPlan } from '../lib/plans'
import { useRegion } from '../lib/useRegion'
import { formatRegionPrice, getUpsellPrice } from '../lib/region'
import { supabase } from '../lib/supabase'
import type { Upsell } from '../lib/supabase'

// Plans that support promo codes (custom has no fixed price, so no promo)
const PROMO_ELIGIBLE = ['business', 'pro']


function RevealCard({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.style.opacity = '1'; el.style.transform = 'translateY(0)' } },
      { threshold: 0.05 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return (
    <div ref={ref} style={{ opacity: 0, transform: 'translateY(20px)', transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms` }}>
      {children}
    </div>
  )
}

export default function PlanDetail() {
  const { planId } = useParams<{ planId: string }>()
  const navigate = useNavigate()
  const plan = getPlan(planId ?? '')

  const { region } = useRegion()
  const planPrice = region.prices[plan?.id as keyof typeof region.prices] ?? plan?.price ?? 0

  const [promoCode, setPromoCode] = useState('')
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number } | null>(null)
  const [promoError, setPromoError] = useState('')
  const [promoLoading, setPromoLoading] = useState(false)
  const [upsells, setUpsells] = useState<Upsell[]>([])
  const [selectedAddOns, setSelectedAddOns] = useState<Upsell[]>([])

  useEffect(() => {
    supabase.from('upsells').select('*').eq('active', true).then(({ data }) => {
      if (data) setUpsells(data)
    })
  }, [])

  if (!plan) {
    return (
      <main style={{ paddingTop: 120, textAlign: 'center', padding: '120px 16px' }}>
        <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', marginBottom: 16 }}>Plan not found</h1>
        <Link to="/pricing" className="btn-primary">Back to Pricing</Link>
      </main>
    )
  }

  const isCustom = plan.id === 'custom'
  const promoEligible = PROMO_ELIGIBLE.includes(plan.id)
  const discountAmount = appliedPromo ? Math.round((planPrice * appliedPromo.discount) / 100) : 0
  const discountedPrice = planPrice - discountAmount
  const addOnsTotal = selectedAddOns.reduce((sum, a) => sum + getUpsellPrice(a.price, region), 0)
  const total = discountedPrice + addOnsTotal

  const applyPromo = async () => {
    if (!promoCode.trim()) return
    setPromoLoading(true)
    setPromoError('')
    try {
      const { data, error } = await supabase
        .from('promo_codes').select('*')
        .eq('code', promoCode.trim().toLowerCase())
        .eq('active', true).single()

      if (error || !data) { setPromoError('Invalid or expired promo code.'); setPromoLoading(false); return }

      const appliesTo: string[] = data.applies_to ?? []
      if (!appliesTo.includes(plan.id)) {
        setPromoError(`This code only applies to: ${appliesTo.join(', ')} plans.`)
        setPromoLoading(false); return
      }

      if (data.expires_at && new Date(data.expires_at) < new Date()) {
        setPromoError('This promo code has expired.')
        setPromoLoading(false); return
      }

      setAppliedPromo({ code: data.code, discount: data.discount_percent })
    } catch { setPromoError('Something went wrong. Try again.') }
    setPromoLoading(false)
  }

  const removePromo = () => { setAppliedPromo(null); setPromoCode(''); setPromoError('') }

  const toggleAddOn = (upsell: Upsell) => {
    setSelectedAddOns((prev) =>
      prev.find((a) => a.id === upsell.id) ? prev.filter((a) => a.id !== upsell.id) : [...prev, upsell]
    )
  }

  const handleOrder = () => {
    if (isCustom) { navigate('/custom-inquiry'); return }
    sessionStorage.setItem('order_plan', JSON.stringify({
      planId: plan.id, promoCode: appliedPromo?.code ?? null,
      planPrice, discountAmount, discountedPrice, currency: region.currency, countryCode: region.countryCode,
      addOns: selectedAddOns.map((a) => ({ id: a.id, name: a.name, price: getUpsellPrice(a.price, region) })),
      total,
    }))
    navigate(`/order/${plan.id}`)
  }

  return (
    <main style={{ paddingTop: 100 }}>
      <section style={{ padding: '24px 16px 80px', maxWidth: 700, margin: '0 auto' }}>
        {/* Back */}
        <Link to="/pricing" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--muted)', textDecoration: 'none', fontSize: 14, marginBottom: 24, transition: 'color 0.2s' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}>
          <ArrowLeft size={15} /> Back to plans
        </Link>

        {/* Plan hero card */}
        <RevealCard>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 20, padding: '26px 22px', marginBottom: 14 }}>
            {/* Badges row - properly aligned */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 18 }}>
              <span className="tag">✦ PLAN</span>
              {plan.badge && (
                <span style={{
                  background: 'linear-gradient(135deg, var(--teal), var(--purple))',
                  color: '#0a0d14', fontSize: 11, fontWeight: 700,
                  fontFamily: 'Space Grotesk, sans-serif',
                  padding: '4px 12px', borderRadius: 999, letterSpacing: '0.05em',
                  display: 'inline-flex', alignItems: 'center',
                }}>
                  {plan.badge}
                </span>
              )}
            </div>

            <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 30, fontWeight: 700, marginBottom: 4 }}>{plan.name}</h1>
            <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 18 }}>{plan.tagline}</p>

            {/* Price */}
            <div style={{ marginBottom: 18 }}>
              {isCustom ? (
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: 'linear-gradient(135deg, rgba(0,212,184,0.1), rgba(155,93,229,0.1))',
                  border: '1px solid rgba(0,212,184,0.3)', borderRadius: 999,
                  padding: '8px 18px',
                }}>
                  <span style={{
                    width: 7, height: 7, borderRadius: '50%', background: 'var(--teal)',
                    display: 'inline-block', boxShadow: '0 0 8px var(--teal)',
                  }} />
                  <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 15, color: 'var(--teal)' }}>
                    Let's discuss your pricing
                  </span>
                </div>
              ) : appliedPromo ? (
                <div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 38, fontWeight: 700, color: 'var(--teal)' }}>{formatRegionPrice(discountedPrice, region)}</span>
                    <span style={{ color: 'var(--muted)', fontSize: 14 }}>/ one-time</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                    <span style={{ color: 'var(--muted)', fontSize: 13, textDecoration: 'line-through' }}>{formatRegionPrice(planPrice, region)}</span>
                    <span style={{ background: 'var(--teal-dim)', color: 'var(--teal)', fontSize: 12, fontWeight: 700, padding: '2px 8px', borderRadius: 6, fontFamily: 'Space Grotesk, sans-serif' }}>
                      {appliedPromo.discount}% OFF · {appliedPromo.code.toUpperCase()}
                    </span>
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 38, fontWeight: 700 }}>{formatRegionPrice(planPrice, region)}</span>
                  <span style={{ color: 'var(--muted)', fontSize: 14 }}>/ one-time</span>
                </div>
              )}
            </div>

            <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.6, marginBottom: 22 }}>{plan.description}</p>

            {/* Promo code - only for eligible plans, never for custom */}
            {promoEligible && !isCustom && (
              !appliedPromo ? (
                <div style={{ marginBottom: 0 }}>
                  <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted)', fontFamily: 'Space Grotesk, sans-serif', marginBottom: 8 }}>
                    ◈ PROMO CODE
                  </p>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <input type="text" value={promoCode} onChange={(e) => setPromoCode(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && applyPromo()}
                      placeholder="Enter promo code" className="field-input" style={{ flex: 1 }} />
                    <button onClick={applyPromo} disabled={promoLoading} className="btn-ghost" style={{ whiteSpace: 'nowrap', padding: '12px 20px' }}>
                      {promoLoading ? '...' : 'Apply'}
                    </button>
                  </div>
                  {promoError && (
                    <p style={{ color: '#ff6b6b', fontSize: 13, marginTop: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <AlertCircle size={13} /> {promoError}
                    </p>
                  )}
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(0,212,184,0.08)', border: '1px solid rgba(0,212,184,0.2)', borderRadius: 10, padding: '10px 14px' }}>
                  <Tag size={14} color="var(--teal)" />
                  <span style={{ fontSize: 13, color: 'var(--teal)', flex: 1, fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600 }}>
                    Promo {appliedPromo.code.toUpperCase()} applied · {appliedPromo.discount}% off
                  </span>
                  <button onClick={removePromo} style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer' }}>
                    <X size={14} />
                  </button>
                </div>
              )
            )}
          </div>
        </RevealCard>



        {/* What's included */}
        <RevealCard delay={150}>
          <div style={{ marginBottom: 24 }}>
            <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 19, fontWeight: 700, marginBottom: 14 }}>What's included</h2>
            {plan.domainNote && (
              <div style={{ background: 'rgba(255,200,50,0.06)', border: '1px solid rgba(255,200,50,0.2)', borderRadius: 14, padding: '16px', marginBottom: 14 }}>
                <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', color: '#f5c842', fontFamily: 'Space Grotesk, sans-serif', marginBottom: 6 }}>⚠ IMPORTANT DOMAIN INFORMATION</p>
                <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 8, fontFamily: 'Space Grotesk, sans-serif' }}>Custom domains require annual renewal</p>
                {plan.domainNote.split('. ').map((line, i) => line.trim() && (
                  <p key={i} style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 3, lineHeight: 1.5 }}>• {line}</p>
                ))}
              </div>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              {plan.features.map((f) => (
                <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--teal-dim)', border: '1px solid var(--teal)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Check size={12} color="var(--teal)" strokeWidth={2.5} />
                  </div>
                  <span style={{ fontSize: 14 }}>{f}</span>
                </div>
              ))}
            </div>
          </div>
        </RevealCard>

        {/* What to expect */}
        <RevealCard delay={200}>
          <div style={{ marginBottom: 24 }}>
            <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 19, fontWeight: 700, marginBottom: 14 }}>What to expect</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              {plan.whatToExpect.map((item) => (
                <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <Star size={13} color="var(--purple)" style={{ marginTop: 2, flexShrink: 0 }} />
                  <span style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </RevealCard>



        {/* Upsells - not applicable to custom inquiries */}
        {!isCustom && upsells.length > 0 && (
          <RevealCard delay={300}>
            <div>
              <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', color: 'var(--muted)', fontFamily: 'Space Grotesk, sans-serif', marginBottom: 14 }}>SUGGESTED SERVICES</p>
              <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 19, fontWeight: 700, marginBottom: 14 }}>Boost your launch</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {upsells.map((upsell) => {
                  const selected = !!selectedAddOns.find((a) => a.id === upsell.id)
                  return (
                    <div key={upsell.id} className="glass-card" style={{ padding: '16px 16px', border: selected ? '1px solid var(--teal)' : undefined, background: selected ? 'rgba(0,212,184,0.05)' : undefined, transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}
                      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,212,184,0.08)' }}
                      onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}>
                      <div style={{ marginBottom: 5 }}>
                        <span style={{ fontSize: 10, fontWeight: 600, fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '0.08em', color: 'var(--muted)', background: 'var(--surface)', border: '1px solid var(--border)', padding: '2px 7px', borderRadius: 5 }}>ONE-TIME</span>
                      </div>
                      <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 15, fontWeight: 700, marginBottom: 3 }}>{upsell.name}</h3>
                      <p style={{ color: 'var(--muted)', fontSize: 13, marginBottom: 10, lineHeight: 1.5 }}>{upsell.description}</p>
                      <p style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 10 }}>Pay once — added to your order total.</p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: 'var(--teal)', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 17 }}>
                          {formatRegionPrice(getUpsellPrice(upsell.price, region), region)}<span style={{ color: 'var(--muted)', fontWeight: 400, fontSize: 12 }}> / one-time</span>
                        </span>
                        <button onClick={() => toggleAddOn(upsell)} style={{ background: selected ? 'var(--teal)' : 'var(--surface)', border: `1px solid ${selected ? 'var(--teal)' : 'var(--border-strong)'}`, color: selected ? '#0a0d14' : 'var(--text)', borderRadius: 8, padding: '6px 14px', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'Space Grotesk, sans-serif', transition: 'all 0.2s ease' }}>
                          {selected ? '✓ Added' : '+ Add'}
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>

              {selectedAddOns.length > 0 && (
                <div style={{ marginTop: 18, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '16px 18px' }}>
                  <p style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 6 }}>TOTAL</p>
                  <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 26, fontWeight: 700, color: 'var(--teal)' }}>{formatRegionPrice(total, region)}</p>
                </div>
              )}
            </div>
          </RevealCard>
        )}

        {/* Single Place Order / Discuss CTA — always at the very bottom */}
        <RevealCard delay={100}>
          <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid var(--border)' }}>
            {isCustom ? (
              <>
                <div style={{ marginBottom: 16 }}>
                  <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', color: 'var(--muted)', fontFamily: 'Space Grotesk, sans-serif', marginBottom: 3 }}>READY TO SCOPE YOUR PROJECT?</p>
                  <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 18, fontWeight: 700 }}>
                    Tell us what you need — we'll quote it fairly.
                  </p>
                </div>
                <button
                  onClick={handleOrder}
                  className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center', fontSize: 16, padding: '15px', transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(240,240,245,0.15)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none' }}
                >
                  Discuss Your Project →
                </button>
                <p style={{ textAlign: 'center', color: 'var(--muted)', fontSize: 12, marginTop: 10 }}>
                  Quick form — describe your project and how to reach you. No commitment.
                </p>
              </>
            ) : (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
                  <div>
                    <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', color: 'var(--muted)', fontFamily: 'Space Grotesk, sans-serif', marginBottom: 3 }}>READY TO START?</p>
                    <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 18, fontWeight: 700 }}>
                      {plan.name} — {formatRegionPrice(appliedPromo ? discountedPrice : planPrice, region)}
                      {selectedAddOns.length > 0 && (
                        <span style={{ color: 'var(--teal)', fontSize: 14, fontWeight: 600, marginLeft: 8 }}>
                          + {formatRegionPrice(selectedAddOns.reduce((s, a) => s + getUpsellPrice(a.price, region), 0), region)} add-ons
                        </span>
                      )}
                    </p>
                  </div>
                  <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 22, fontWeight: 700, color: 'var(--teal)' }}>
                    {formatRegionPrice(total, region)}
                  </p>
                </div>
                <button
                  onClick={handleOrder}
                  className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center', fontSize: 16, padding: '15px', transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(240,240,245,0.15)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none' }}
                >
                  Place Order →
                </button>
                <p style={{ textAlign: 'center', color: 'var(--muted)', fontSize: 12, marginTop: 10 }}>
                  Continue to a quick order form for the {plan.name} plan.
                </p>
              </>
            )}
          </div>
        </RevealCard>

      </section>
    </main>
  )
}