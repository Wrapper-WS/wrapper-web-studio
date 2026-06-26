import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
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
  'Physical retail store',
  'Online store',
  'Fashion & clothing',
  'Food & beverages',
  'Beauty & skincare',
  'Electronics',
  'Service provider',
  'Health & wellness',
  'Education',
  'Other',
]

const websiteStyles = [
  'Minimal & clean',
  'Bold & vibrant',
  'Elegant & luxury',
  'Playful & fun',
  'Professional & corporate',
  'Dark & modern',
]

const colorOptions = [
  { label: 'Black & white', variants: [] },
  { label: 'Blue tones', variants: ['Navy blue', 'Sky blue', 'Royal blue'] },
  { label: 'Green tones', variants: ['Forest green', 'Mint green', 'Emerald'] },
  { label: 'Red / pink tones', variants: ['Deep red', 'Rose gold', 'Hot pink'] },
  { label: 'Purple / violet', variants: ['Deep purple', 'Lavender', 'Violet'] },
  { label: 'Orange / warm', variants: ['Burnt orange', 'Gold', 'Terracotta'] },
  { label: 'Custom (describe in notes)', variants: [] },
]

export default function OrderForm() {
  const { planId } = useParams<{ planId: string }>()
  const navigate = useNavigate()
  const plan = getPlan(planId ?? '')

  const [orderState, setOrderState] = useState<OrderState | null>(null)
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Partial<FormData>>({})

  const [form, setForm] = useState<FormData>({
    businessName: '',
    businessType: '',
    productsServices: '',
    targetAudience: '',
    websiteStyle: '',
    preferredColors: '',
    colorVariant: '',
    phoneNumber: '',
    extraNotes: '',
  })

  useEffect(() => {
    const stored = sessionStorage.getItem('order_plan')
    if (stored) {
      try {
        setOrderState(JSON.parse(stored))
      } catch { /* ignore */ }
    }
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
    if (step === 2) {
      if (!form.targetAudience.trim()) e.targetAudience = 'Target audience is required'
    }
    if (step === 3) {
      if (!form.websiteStyle) e.websiteStyle = 'Please choose a style'
      if (!form.preferredColors) e.preferredColors = 'Please pick a color'
    }
    if (step === 4) {
      if (!form.phoneNumber.trim()) e.phoneNumber = 'Phone number is required'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const next = () => {
    if (validateStep()) setStep((s) => Math.min(s + 1, 4))
  }

  const back = () => setStep((s) => Math.max(s - 1, 1))

  const submit = async () => {
    if (!validateStep()) return
    setLoading(true)
    try {
      const { error } = await supabase.from('orders').insert({
        plan_id: plan.id,
        plan_name: plan.name,
        plan_price: plan.price,
        promo_code: orderState?.promoCode ?? null,
        discount_amount: discountAmount,
        final_price: total,
        add_ons: addOns,
        business_name: form.businessName,
        business_type: form.businessType,
        products_services: form.productsServices,
        target_audience: form.targetAudience,
        website_style: form.websiteStyle,
        preferred_colors: form.preferredColors,
        color_variant: form.colorVariant,
        phone_number: form.phoneNumber,
        extra_notes: form.extraNotes,
        status: 'new',
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
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: '50%',
              background: 'var(--teal-dim)',
              border: '2px solid var(--teal)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
            }}
          >
            <Check size={32} color="var(--teal)" />
          </div>
          <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 28, fontWeight: 700, marginBottom: 12 }}>
            Order received!
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: 15, lineHeight: 1.6, marginBottom: 32 }}>
            We've got your {plan.name} order. We'll reach out on{' '}
            <strong style={{ color: 'var(--text)' }}>{form.phoneNumber}</strong> shortly to confirm and set up your client portal.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <a
              href={`https://wa.me/2348159088811?text=${encodeURIComponent(`Hello! I just placed an order for the ${plan.name} plan on Wrapper Web Studio. My business is ${form.businessName}.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-teal"
              style={{ justifyContent: 'center' }}
            >
              Message us on WhatsApp
            </a>
            <Link to="/" className="btn-ghost" style={{ justifyContent: 'center' }}>
              Back to home
            </Link>
          </div>
        </div>
      </main>
    )
  }

  const selectedColor = colorOptions.find((c) => c.label === form.preferredColors)

  return (
    <main style={{ paddingTop: 100 }}>
      <section style={{ padding: '24px 16px 80px', maxWidth: 600, margin: '0 auto' }}>
        {/* Back */}
        <Link
          to={`/plans/${plan.id}`}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--muted)', textDecoration: 'none', fontSize: 14, marginBottom: 20 }}
        >
          <ArrowLeft size={15} /> Back to plan
        </Link>

        {/* Summary strip */}
        <div
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 14,
            padding: '14px 18px',
            marginBottom: 20,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 8,
          }}
        >
          <div>
            <p style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 2 }}>
              SELECTED PLAN
            </p>
            <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 17 }}>
              Order Your {plan.name} Plan
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 22, color: 'var(--teal)' }}>
              {formatPrice(total)}
            </p>
            {discountAmount > 0 && (
              <p style={{ color: 'var(--muted)', fontSize: 12, textDecoration: 'line-through' }}>
                {formatPrice(plan.price + addOns.reduce((s, a) => s + a.price, 0))}
              </p>
            )}
          </div>
        </div>

        {/* Promo badge */}
        {orderState?.promoCode && (
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(0,212,184,0.08)',
              border: '1px solid rgba(0,212,184,0.2)',
              borderRadius: 8,
              padding: '6px 12px',
              marginBottom: 16,
              fontSize: 13,
            }}
          >
            <span style={{ color: 'var(--teal)', fontWeight: 600, fontFamily: 'Space Grotesk, sans-serif' }}>
              ◈ Promo {orderState.promoCode.toUpperCase()} applied · {Math.round((discountAmount / plan.price) * 100)}% off
            </span>
            <Link to={`/plans/${plan.id}`} style={{ color: 'var(--muted)', fontSize: 12, textDecoration: 'underline' }}>Remove</Link>
          </div>
        )}

        {/* Add-ons */}
        {addOns.length > 0 && (
          <div style={{ marginBottom: 20 }}>
            <p style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 10 }}>
              ADD-ONS
            </p>
            {addOns.map((a) => (
              <div key={a.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--muted)', marginBottom: 6 }}>
                <span>+ {a.name}</span>
                <span>{formatPrice(a.price)}</span>
              </div>
            ))}
          </div>
        )}

        {/* Step indicator */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 24, alignItems: 'center' }}>
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                border: `2px solid ${s < step ? 'var(--teal)' : s === step ? 'var(--teal)' : 'var(--border-strong)'}`,
                background: s < step ? 'var(--teal)' : s === step ? 'var(--teal-dim)' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 13,
                fontWeight: 700,
                fontFamily: 'Space Grotesk, sans-serif',
                color: s < step ? '#0a0d14' : s === step ? 'var(--teal)' : 'var(--muted)',
                transition: 'all 0.3s ease',
              }}
            >
              {s < step ? <Check size={14} strokeWidth={3} /> : s}
            </div>
          ))}
        </div>

        {/* Form card */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 20, padding: '28px 20px', marginBottom: 16 }}>
          {/* Step 1 */}
          {step === 1 && (
            <div>
              <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 22, fontWeight: 700, marginBottom: 24 }}>
                Tell us about your business
              </h2>
              <div style={{ marginBottom: 20 }}>
                <label className="field-label">BUSINESS NAME <span style={{ color: '#ff6b6b' }}>*</span></label>
                <input
                  type="text"
                  value={form.businessName}
                  onChange={(e) => set('businessName', e.target.value)}
                  placeholder="e.g. Ada's Skincare"
                  className="field-input"
                />
                {errors.businessName && <p style={{ color: '#ff6b6b', fontSize: 12, marginTop: 6 }}>{errors.businessName}</p>}
              </div>
              <div style={{ marginBottom: 20 }}>
                <label className="field-label">BUSINESS TYPE <span style={{ color: '#ff6b6b' }}>*</span></label>
                <select
                  value={form.businessType}
                  onChange={(e) => set('businessType', e.target.value)}
                  className="field-input"
                >
                  <option value="">Choose business type...</option>
                  {businessTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
                {errors.businessType && <p style={{ color: '#ff6b6b', fontSize: 12, marginTop: 6 }}>{errors.businessType}</p>}
              </div>
              <div style={{ marginBottom: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <label className="field-label" style={{ margin: 0 }}>PRODUCTS OR SERVICES <span style={{ color: '#ff6b6b' }}>*</span></label>
                  <span style={{ fontSize: 11, color: 'var(--muted)' }}>What you sell or the services you offer</span>
                </div>
                <textarea
                  value={form.productsServices}
                  onChange={(e) => set('productsServices', e.target.value)}
                  placeholder="Skincare products for sensitive skin, shipped nationwide..."
                  className="field-input"
                  rows={4}
                  style={{ resize: 'vertical' }}
                />
                {errors.productsServices && <p style={{ color: '#ff6b6b', fontSize: 12, marginTop: 6 }}>{errors.productsServices}</p>}
              </div>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div>
              <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 22, fontWeight: 700, marginBottom: 24 }}>
                Who are your customers?
              </h2>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <label className="field-label" style={{ margin: 0 }}>TARGET AUDIENCE <span style={{ color: '#ff6b6b' }}>*</span></label>
                  <span style={{ fontSize: 11, color: 'var(--muted)' }}>Age, location, interests, lifestyle</span>
                </div>
                <textarea
                  value={form.targetAudience}
                  onChange={(e) => set('targetAudience', e.target.value)}
                  placeholder="Women 18-35 in Lagos who care about clean beauty..."
                  className="field-input"
                  rows={5}
                  style={{ resize: 'vertical' }}
                />
                {errors.targetAudience && <p style={{ color: '#ff6b6b', fontSize: 12, marginTop: 6 }}>{errors.targetAudience}</p>}
              </div>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div>
              <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 22, fontWeight: 700, marginBottom: 24 }}>
                Design preferences
              </h2>
              <div style={{ marginBottom: 20 }}>
                <label className="field-label">WEBSITE STYLE <span style={{ color: '#ff6b6b' }}>*</span></label>
                <select
                  value={form.websiteStyle}
                  onChange={(e) => set('websiteStyle', e.target.value)}
                  className="field-input"
                >
                  <option value="">Choose a style...</option>
                  {websiteStyles.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                {errors.websiteStyle && <p style={{ color: '#ff6b6b', fontSize: 12, marginTop: 6 }}>{errors.websiteStyle}</p>}
              </div>
              <div style={{ marginBottom: 8 }}>
                <label className="field-label">PREFERRED COLORS <span style={{ color: '#ff6b6b' }}>*</span></label>
                <select
                  value={form.preferredColors}
                  onChange={(e) => { set('preferredColors', e.target.value); set('colorVariant', '') }}
                  className="field-input"
                  style={{ marginBottom: 10 }}
                >
                  <option value="">Pick a base color...</option>
                  {colorOptions.map((c) => <option key={c.label} value={c.label}>{c.label}</option>)}
                </select>
                {selectedColor && selectedColor.variants.length > 0 && (
                  <select
                    value={form.colorVariant}
                    onChange={(e) => set('colorVariant', e.target.value)}
                    className="field-input"
                  >
                    <option value="">Select shade...</option>
                    {selectedColor.variants.map((v) => <option key={v} value={v}>{v}</option>)}
                  </select>
                )}
                {errors.preferredColors && <p style={{ color: '#ff6b6b', fontSize: 12, marginTop: 6 }}>{errors.preferredColors}</p>}
              </div>
            </div>
          )}

          {/* Step 4 */}
          {step === 4 && (
            <div>
              <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 22, fontWeight: 700, marginBottom: 24 }}>
                How can we reach you?
              </h2>
              <div style={{ marginBottom: 20 }}>
                <label className="field-label">PHONE NUMBER <span style={{ color: '#ff6b6b' }}>*</span></label>
                <input
                  type="tel"
                  value={form.phoneNumber}
                  onChange={(e) => set('phoneNumber', e.target.value)}
                  placeholder="08012345678"
                  className="field-input"
                />
                {errors.phoneNumber && <p style={{ color: '#ff6b6b', fontSize: 12, marginTop: 6 }}>{errors.phoneNumber}</p>}
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <label className="field-label" style={{ margin: 0 }}>EXTRA NOTES / ADDITIONAL REQUESTS</label>
                  <span style={{ fontSize: 11, color: 'var(--muted)' }}>Anything else we should know? (optional)</span>
                </div>
                <textarea
                  value={form.extraNotes}
                  onChange={(e) => set('extraNotes', e.target.value)}
                  placeholder="Reference sites you like, must-have features, content I'll provide..."
                  className="field-input"
                  rows={4}
                  style={{ resize: 'vertical' }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'space-between' }}>
          <button
            onClick={back}
            className="btn-ghost"
            style={{ display: step === 1 ? 'none' : 'inline-flex' }}
          >
            <ArrowLeft size={15} /> Back
          </button>
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
        <p style={{ textAlign: 'center', color: 'var(--muted)', fontSize: 12, marginTop: 16 }}>
          By placing your order you agree to be contacted on the phone number provided.
        </p>
      </section>
    </main>
  )
}