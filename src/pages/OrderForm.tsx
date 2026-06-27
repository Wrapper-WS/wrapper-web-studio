import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Send, Check } from 'lucide-react'
import { getPlan, formatPrice } from '../lib/plans'
import { supabase } from '../lib/supabase'

type OrderState = {
  planId: string
  promoCode: string | null
  discountAmount: number
  discountedPrice: number
  addOns: { id: string; name: string; price: number }[]
  total: number
}

type FormData = {
  businessName: string
  businessType: string
  productsServices: string
  targetAudience: string
  websiteStyle: string
  preferredColors: string
  colorVariant: string
  phoneNumber: string
  extraNotes: string
}

const businessTypes = [
  'Physical retail store', 'Online store', 'Fashion & clothing',
  'Food & beverages', 'Beauty & skincare', 'Electronics',
  'Service provider', 'Health & wellness', 'Education', 'Other',
]

const websiteStyles = [
  'Minimal & clean', 'Bold & vibrant', 'Elegant & luxury',
  'Playful & fun', 'Professional & corporate', 'Dark & modern',
]

const colorOptions = [
  { label: 'Black & white', swatch: 'linear-gradient(135deg, #000 50%, #fff 50%)', variants: [
    { label: 'Pure black', color: '#000000' }, { label: 'Charcoal', color: '#36454f' }, { label: 'Slate grey', color: '#708090' },
    { label: 'Pure white', color: '#ffffff' }, { label: 'Off white', color: '#f5f5f0' }, { label: 'Cream', color: '#fffdd0' },
  ]},
  { label: 'Blue tones', swatch: 'linear-gradient(135deg, #1a3a6b, #87ceeb)', variants: [
    { label: 'Navy blue', color: '#001f5b' }, { label: 'Midnight blue', color: '#191970' }, { label: 'Royal blue', color: '#4169e1' },
    { label: 'Cobalt', color: '#0047ab' }, { label: 'Sky blue', color: '#87ceeb' }, { label: 'Baby blue', color: '#89cff0' },
    { label: 'Teal blue', color: '#367588' }, { label: 'Steel blue', color: '#4682b4' }, { label: 'Electric blue', color: '#0077ff' },
  ]},
  { label: 'Green tones', swatch: 'linear-gradient(135deg, #1a5c2a, #3cb371)', variants: [
    { label: 'Forest green', color: '#228b22' }, { label: 'Emerald', color: '#50c878' }, { label: 'Mint green', color: '#98ff98' },
    { label: 'Sage', color: '#bcbf8d' }, { label: 'Olive', color: '#808000' }, { label: 'Lime', color: '#32cd32' },
    { label: 'Dark teal', color: '#008080' }, { label: 'Jade', color: '#00a86b' }, { label: 'Hunter green', color: '#355e3b' },
  ]},
  { label: 'Red / pink tones', swatch: 'linear-gradient(135deg, #8b0000, #ff69b4)', variants: [
    { label: 'Deep red', color: '#8b0000' }, { label: 'Crimson', color: '#dc143c' }, { label: 'Scarlet', color: '#ff2400' },
    { label: 'Rose gold', color: '#b76e79' }, { label: 'Blush pink', color: '#ffb6c1' }, { label: 'Hot pink', color: '#ff69b4' },
    { label: 'Magenta', color: '#ff00ff' }, { label: 'Coral', color: '#ff6b6b' }, { label: 'Dusty rose', color: '#dcae96' },
  ]},
  { label: 'Purple / violet', swatch: 'linear-gradient(135deg, #4b0082, #da70d6)', variants: [
    { label: 'Deep purple', color: '#4b0082' }, { label: 'Royal purple', color: '#7851a9' }, { label: 'Violet', color: '#ee82ee' },
    { label: 'Lavender', color: '#e6e6fa' }, { label: 'Plum', color: '#8e4585' }, { label: 'Mauve', color: '#e0b0ff' },
    { label: 'Lilac', color: '#c8a2c8' }, { label: 'Amethyst', color: '#9966cc' }, { label: 'Indigo', color: '#4b0082' },
  ]},
  { label: 'Orange / warm', swatch: 'linear-gradient(135deg, #cc4400, #ffd700)', variants: [
    { label: 'Burnt orange', color: '#cc5500' }, { label: 'Tangerine', color: '#f28500' }, { label: 'Amber', color: '#ffbf00' },
    { label: 'Gold', color: '#ffd700' }, { label: 'Terracotta', color: '#c96a30' }, { label: 'Rust', color: '#b7410e' },
    { label: 'Peach', color: '#ffcba4' }, { label: 'Honey', color: '#e8a838' }, { label: 'Saffron', color: '#f4c430' },
  ]},
  { label: 'Brown / earth', swatch: 'linear-gradient(135deg, #3b1f0a, #c4a265)', variants: [
    { label: 'Dark brown', color: '#3b1f0a' }, { label: 'Chocolate', color: '#7b3f00' }, { label: 'Mocha', color: '#967259' },
    { label: 'Caramel', color: '#c68642' }, { label: 'Sand', color: '#c4a265' }, { label: 'Tan', color: '#d2b48c' },
    { label: 'Beige', color: '#f5f0dc' }, { label: 'Walnut', color: '#5c3317' }, { label: 'Khaki', color: '#c3b091' },
  ]},
  { label: 'Custom (describe in notes)', swatch: 'linear-gradient(135deg, #333, #888)', variants: [] },
]

export default function OrderForm() {
  const { planId } = useParams<{ planId: string }>()
  const plan = getPlan(planId ?? '')

  const [orderState, setOrderState] = useState<OrderState | null>(null)
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Partial<FormData>>({})

  const [form, setForm] = useState<FormData>({
    businessName: '', businessType: '', productsServices: '',
    targetAudience: '', websiteStyle: '', preferredColors: '',
    colorVariant: '', phoneNumber: '', extraNotes: '',
  })

  useEffect(() => {
    const stored = sessionStorage.getItem('order_plan')
    if (stored) { try { setOrderState(JSON.parse(stored)) } catch { /* ignore */ } }
  }, [])

  if (!plan) {
    return (
      <main style={{ paddingTop: 120, textAlign: 'center', padding: '120px 16px' }}>
        <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', marginBottom: 16 }}>Plan not found</h1>
        <Link to="/pricing" className="btn-primary">Back to Pricing</Link>
      </main>
    )
  }

  const total = orderState?.total ?? plan.price
  const discountAmount = orderState?.discountAmount ?? 0
  const addOns = orderState?.addOns ?? []

  const set = (key: keyof FormData, val: string) => {
    setForm((f) => ({ ...f, [key]: val }))
    setErrors((e) => ({ ...e, [key]: '' }))
  }

  const validateStep = () => {
    const e: Partial<FormData> = {}
    if (step === 1) {
      if (!form.businessName.trim()) e.businessName = 'Business name is required'
      if (!form.businessType) e.businessType = 'Please select a business type'
      if (!form.productsServices.trim()) e.productsServices = 'Please describe your products/services'
    }
    if (step === 2) { if (!form.targetAudience.trim()) e.targetAudience = 'Target audience is required' }
    if (step === 3) {
      if (!form.websiteStyle) e.websiteStyle = 'Please choose a style'
      if (!form.preferredColors) e.preferredColors = 'Please pick a color'
    }
    if (step === 4) { if (!form.phoneNumber.trim()) e.phoneNumber = 'Phone number is required' }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const next = () => { if (validateStep()) setStep((s) => Math.min(s + 1, 4)) }
  const back = () => setStep((s) => Math.max(s - 1, 1))

  const submit = async () => {
    if (!validateStep()) return
    setLoading(true)
    try {
      const { error } = await supabase.from('orders').insert({
        plan_id: plan.id, plan_name: plan.name, plan_price: plan.price,
        promo_code: orderState?.promoCode ?? null,
        discount_amount: discountAmount, final_price: total,
        add_ons: addOns,
        business_name: form.businessName, business_type: form.businessType,
        products_services: form.productsServices, target_audience: form.targetAudience,
        website_style: form.websiteStyle, preferred_colors: form.preferredColors,
        color_variant: form.colorVariant, phone_number: form.phoneNumber,
        extra_notes: form.extraNotes, status: 'new',
      })
      if (error) throw error
      sessionStorage.removeItem('order_plan')
      setSubmitted(true)
    } catch (err) {
      console.error(err)
      alert('Something went wrong. Please try again or contact us on WhatsApp.')
    }
    setLoading(false)
  }

  if (submitted) {
    return (
      <main style={{ paddingTop: 100, padding: '120px 16px', textAlign: 'center' }}>
        <div style={{ maxWidth: 480, margin: '0 auto' }}>
          <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--teal-dim)', border: '2px solid var(--teal)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <Check size={32} color="var(--teal)" />
          </div>
          <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 28, fontWeight: 700, marginBottom: 12 }}>Order received!</h1>
          <p style={{ color: 'var(--muted)', fontSize: 15, lineHeight: 1.6, marginBottom: 32 }}>
            We've got your {plan.name} order. We'll reach out on{' '}
            <strong style={{ color: 'var(--text)' }}>{form.phoneNumber}</strong> shortly to confirm and set up your client portal.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <a href={`https://wa.me/2348159088811?text=${encodeURIComponent(`Hello! I just placed an order for the ${plan.name} plan. My business is ${form.businessName}.`)}`}
              target="_blank" rel="noopener noreferrer" className="btn-teal" style={{ justifyContent: 'center' }}>
              Message us on WhatsApp
            </a>
            <Link to="/" className="btn-ghost" style={{ justifyContent: 'center' }}>Back to home</Link>
          </div>
        </div>
      </main>
    )
  }

  const selectedColorOption = colorOptions.find((c) => c.label === form.preferredColors)

  return (
    <main style={{ paddingTop: 100 }}>
      <section style={{ padding: '24px 16px 80px', maxWidth: 600, margin: '0 auto' }}>
        {/* Back */}
        <Link to={`/plans/${plan.id}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--muted)', textDecoration: 'none', fontSize: 14, marginBottom: 18 }}>
          <ArrowLeft size={15} /> Back to plan
        </Link>

        {/* Summary strip */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '14px 16px', marginBottom: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
          <div>
            <p style={{ fontSize: 10, color: 'var(--muted)', fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 2 }}>SELECTED PLAN</p>
            <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 16 }}>Order Your {plan.name} Plan</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 20, color: 'var(--teal)' }}>{formatPrice(total)}</p>
            {discountAmount > 0 && <p style={{ color: 'var(--muted)', fontSize: 12, textDecoration: 'line-through' }}>{formatPrice(plan.price + addOns.reduce((s, a) => s + a.price, 0))}</p>}
          </div>
        </div>

        {/* Promo badge */}
        {orderState?.promoCode && (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(0,212,184,0.08)', border: '1px solid rgba(0,212,184,0.2)', borderRadius: 8, padding: '6px 12px', marginBottom: 14, fontSize: 13 }}>
            <span style={{ color: 'var(--teal)', fontWeight: 600, fontFamily: 'Space Grotesk, sans-serif' }}>
              ◈ Promo {orderState.promoCode.toUpperCase()} applied · {Math.round((discountAmount / plan.price) * 100)}% off
            </span>
          </div>
        )}

        {/* Add-ons */}
        {addOns.length > 0 && (
          <div style={{ marginBottom: 16 }}>
            <p style={{ fontSize: 10, color: 'var(--muted)', fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8 }}>ADD-ONS</p>
            {addOns.map((a) => (
              <div key={a.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--muted)', marginBottom: 5 }}>
                <span>+ {a.name}</span><span>{formatPrice(a.price)}</span>
              </div>
            ))}
          </div>
        )}

        {/* Step indicator */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 20, alignItems: 'center' }}>
          {[1, 2, 3, 4].map((s) => (
            <div key={s} style={{
              width: 36, height: 36, borderRadius: '50%',
              border: `2px solid ${s <= step ? 'var(--teal)' : 'var(--border-strong)'}`,
              background: s < step ? 'var(--teal)' : s === step ? 'var(--teal-dim)' : 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 13, fontWeight: 700, fontFamily: 'Space Grotesk, sans-serif',
              color: s < step ? '#0a0d14' : s === step ? 'var(--teal)' : 'var(--muted)',
              transition: 'all 0.3s ease',
            }}>
              {s < step ? <Check size={14} strokeWidth={3} /> : s}
            </div>
          ))}
        </div>

        {/* Form card */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 20, padding: '26px 18px', marginBottom: 14 }}>

          {/* Step 1 */}
          {step === 1 && (
            <div>
              <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 21, fontWeight: 700, marginBottom: 22 }}>Tell us about your business</h2>
              <div style={{ marginBottom: 18 }}>
                <label className="field-label">BUSINESS NAME <span style={{ color: '#ff6b6b' }}>*</span></label>
                <input type="text" value={form.businessName} onChange={(e) => set('businessName', e.target.value)} placeholder="e.g. Ada's Skincare" className="field-input" />
                {errors.businessName && <p style={{ color: '#ff6b6b', fontSize: 12, marginTop: 5 }}>{errors.businessName}</p>}
              </div>
              <div style={{ marginBottom: 18 }}>
                <label className="field-label">BUSINESS TYPE <span style={{ color: '#ff6b6b' }}>*</span></label>
                <select value={form.businessType} onChange={(e) => set('businessType', e.target.value)} className="field-input">
                  <option value="">Choose business type...</option>
                  {businessTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
                {errors.businessType && <p style={{ color: '#ff6b6b', fontSize: 12, marginTop: 5 }}>{errors.businessType}</p>}
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
                  <label className="field-label" style={{ margin: 0 }}>PRODUCTS OR SERVICES <span style={{ color: '#ff6b6b' }}>*</span></label>
                  <span style={{ fontSize: 11, color: 'var(--muted)' }}>What you sell</span>
                </div>
                <textarea value={form.productsServices} onChange={(e) => set('productsServices', e.target.value)} placeholder="Skincare products for sensitive skin, shipped nationwide..." className="field-input" rows={4} style={{ resize: 'vertical' }} />
                {errors.productsServices && <p style={{ color: '#ff6b6b', fontSize: 12, marginTop: 5 }}>{errors.productsServices}</p>}
              </div>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div>
              <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 21, fontWeight: 700, marginBottom: 22 }}>Who are your customers?</h2>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
                  <label className="field-label" style={{ margin: 0 }}>TARGET AUDIENCE <span style={{ color: '#ff6b6b' }}>*</span></label>
                  <span style={{ fontSize: 11, color: 'var(--muted)' }}>Age, location, interests</span>
                </div>
                <textarea value={form.targetAudience} onChange={(e) => set('targetAudience', e.target.value)} placeholder="Women 18-35 in Lagos who care about clean beauty..." className="field-input" rows={5} style={{ resize: 'vertical' }} />
                {errors.targetAudience && <p style={{ color: '#ff6b6b', fontSize: 12, marginTop: 5 }}>{errors.targetAudience}</p>}
              </div>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div>
              <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 21, fontWeight: 700, marginBottom: 22 }}>Design preferences</h2>
              <div style={{ marginBottom: 18 }}>
                <label className="field-label">WEBSITE STYLE <span style={{ color: '#ff6b6b' }}>*</span></label>
                <select value={form.websiteStyle} onChange={(e) => set('websiteStyle', e.target.value)} className="field-input">
                  <option value="">Choose a style...</option>
                  {websiteStyles.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                {errors.websiteStyle && <p style={{ color: '#ff6b6b', fontSize: 12, marginTop: 5 }}>{errors.websiteStyle}</p>}
              </div>

              <div>
                <label className="field-label">PREFERRED COLORS <span style={{ color: '#ff6b6b' }}>*</span></label>

                {/* Color picker with swatches */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: 8, marginBottom: 12 }}>
                  {colorOptions.map((c) => (
                    <button
                      key={c.label}
                      onClick={() => { set('preferredColors', c.label); set('colorVariant', '') }}
                      style={{
                        background: form.preferredColors === c.label ? 'rgba(0,212,184,0.08)' : 'var(--surface)',
                        border: `2px solid ${form.preferredColors === c.label ? 'var(--teal)' : 'var(--border)'}`,
                        borderRadius: 12, padding: '10px 10px', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', gap: 10,
                        transition: 'all 0.2s ease', textAlign: 'left',
                      }}
                    >
                      <div style={{ width: 28, height: 28, borderRadius: 8, background: c.swatch, flexShrink: 0, border: '1px solid rgba(255,255,255,0.1)' }} />
                      <span style={{ fontSize: 12, color: form.preferredColors === c.label ? 'var(--teal)' : 'var(--muted)', fontFamily: 'Inter, sans-serif', fontWeight: form.preferredColors === c.label ? 600 : 400, lineHeight: 1.3 }}>
                        {c.label}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Variant picker */}
                {selectedColorOption && selectedColorOption.variants.length > 0 && (
                  <div>
                    <p style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8 }}>SELECT SHADE</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {selectedColorOption.variants.map((v) => (
                        <button
                          key={v.label}
                          onClick={() => set('colorVariant', v.label)}
                          style={{
                            display: 'flex', alignItems: 'center', gap: 8,
                            background: form.colorVariant === v.label ? 'rgba(0,212,184,0.08)' : 'var(--surface)',
                            border: `2px solid ${form.colorVariant === v.label ? 'var(--teal)' : 'var(--border)'}`,
                            borderRadius: 10, padding: '7px 12px', cursor: 'pointer',
                            transition: 'all 0.2s ease',
                          }}
                        >
                          <div style={{ width: 20, height: 20, borderRadius: 6, background: v.color, border: '1px solid rgba(255,255,255,0.15)', flexShrink: 0 }} />
                          <span style={{ fontSize: 12, color: form.colorVariant === v.label ? 'var(--teal)' : 'var(--muted)', fontFamily: 'Inter, sans-serif', fontWeight: form.colorVariant === v.label ? 600 : 400 }}>
                            {v.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {errors.preferredColors && <p style={{ color: '#ff6b6b', fontSize: 12, marginTop: 8 }}>{errors.preferredColors}</p>}
              </div>
            </div>
          )}

          {/* Step 4 */}
          {step === 4 && (
            <div>
              <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 21, fontWeight: 700, marginBottom: 22 }}>How can we reach you?</h2>
              <div style={{ marginBottom: 18 }}>
                <label className="field-label">PHONE NUMBER <span style={{ color: '#ff6b6b' }}>*</span></label>
                <input type="tel" value={form.phoneNumber} onChange={(e) => set('phoneNumber', e.target.value)} placeholder="08012345678" className="field-input" />
                {errors.phoneNumber && <p style={{ color: '#ff6b6b', fontSize: 12, marginTop: 5 }}>{errors.phoneNumber}</p>}
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
                  <label className="field-label" style={{ margin: 0 }}>EXTRA NOTES</label>
                  <span style={{ fontSize: 11, color: 'var(--muted)' }}>Optional</span>
                </div>
                <textarea value={form.extraNotes} onChange={(e) => set('extraNotes', e.target.value)} placeholder="Reference sites, must-have features, content I'll provide..." className="field-input" rows={4} style={{ resize: 'vertical' }} />
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          {step > 1 && (
            <button onClick={back} className="btn-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <ArrowLeft size={15} /> Back
            </button>
          )}
          <div style={{ flex: 1 }} />
          {step < 4 ? (
            <button onClick={next} className="btn-primary">
              Continue <ArrowRight size={15} />
            </button>
          ) : (
            <button onClick={submit} disabled={loading} className="btn-primary">
              {loading ? 'Placing...' : <><Send size={15} /> Place Order</>}
            </button>
          )}
        </div>
        <p style={{ textAlign: 'center', color: 'var(--muted)', fontSize: 12, marginTop: 14 }}>
          By placing your order you agree to be contacted on the phone number provided.
        </p>
      </section>
    </main>
  )
}