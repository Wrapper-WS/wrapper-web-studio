import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Check, Send } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useRegion } from '../lib/useRegion'
import type { Upsell } from '../lib/supabase'

export default function ServiceInquiry() {
  const { serviceId } = useParams<{ serviceId: string }>()
  const { region } = useRegion()
  const [service, setService] = useState<Upsell | null>(null)
  const [loadingService, setLoadingService] = useState(true)

  const [businessName, setBusinessName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (!serviceId) return
    supabase.from('upsells').select('*').eq('id', serviceId).maybeSingle().then(({ data }) => {
      setService(data)
      setLoadingService(false)
    })
  }, [serviceId])

  const validate = () => {
    const e: Record<string, string> = {}
    if (!businessName.trim()) e.businessName = 'Please tell us your business name'
    if (!phoneNumber.trim()) e.phoneNumber = 'Please provide a WhatsApp number so we can reach you'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const submit = async () => {
    if (!validate() || !service) return
    setLoading(true)
    try {
      const { error } = await supabase.from('orders').insert({
        plan_id: 'service-inquiry',
        plan_name: `${service.name} (Service Inquiry)`,
        plan_price: 0,
        discount_amount: 0,
        final_price: 0,
        add_ons: [],
        business_name: businessName,
        business_type: 'Service inquiry — no website purchase',
        products_services: `Requested service: ${service.name}. ${service.description}`,
        target_audience: 'N/A — service inquiry',
        website_style: 'N/A',
        preferred_colors: 'N/A',
        phone_number: phoneNumber,
        extra_notes: '',
        status: 'new',
        currency: region.currency,
        country_code: region.countryCode,
      })
      if (error) throw error
      setSubmitted(true)
    } catch (err) {
      console.error(err)
      alert('Something went wrong. Please try again or message us directly on WhatsApp.')
    }
    setLoading(false)
  }

  if (loadingService) {
    return <main style={{ paddingTop: 140, textAlign: 'center', color: 'var(--muted)' }}>Loading...</main>
  }

  if (!service) {
    return (
      <main style={{ paddingTop: 120, textAlign: 'center', padding: '120px 16px' }}>
        <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', marginBottom: 16 }}>Service not found</h1>
        <Link to="/pricing" className="btn-primary">Back to Pricing</Link>
      </main>
    )
  }

  if (submitted) {
    return (
      <main style={{ paddingTop: 100, padding: '120px 16px', textAlign: 'center' }}>
        <div style={{ maxWidth: 480, margin: '0 auto' }}>
          <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--teal-dim)', border: '2px solid var(--teal)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <Check size={32} color="var(--teal)" />
          </div>
          <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 26, fontWeight: 700, marginBottom: 12 }}>
            Got it — we'll reach out shortly.
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: 15, lineHeight: 1.6, marginBottom: 32 }}>
            Thanks for your interest in <strong style={{ color: 'var(--text)' }}>{service.name}</strong>. We'll message you on{' '}
            <strong style={{ color: 'var(--text)' }}>{phoneNumber}</strong> to discuss the details.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <a
              href={`https://wa.me/2348159088811?text=${encodeURIComponent(`Hello! I just requested "${service.name}" for my business "${businessName}". Looking forward to discussing it.`)}`}
              target="_blank" rel="noopener noreferrer" className="btn-teal" style={{ justifyContent: 'center' }}
            >
              Message us on WhatsApp now
            </a>
            <Link to="/pricing" className="btn-ghost" style={{ justifyContent: 'center' }}>Back to Pricing</Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main style={{ paddingTop: 100 }}>
      <section style={{ padding: '24px 16px 80px', maxWidth: 560, margin: '0 auto' }}>
        <Link to="/pricing" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--muted)', textDecoration: 'none', fontSize: 14, marginBottom: 24 }}>
          <ArrowLeft size={15} /> Back to Pricing
        </Link>

        <div style={{ marginBottom: 24 }}>
          <span className="tag" style={{ marginBottom: 12, display: 'inline-flex' }}>SERVICE INQUIRY</span>
          <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(24px, 5vw, 34px)', fontWeight: 700, letterSpacing: '-0.02em', marginTop: 12, marginBottom: 10 }}>
            {service.name}
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.6 }}>{service.description}</p>
        </div>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 20, padding: '26px 20px', marginBottom: 16 }}>
          <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 20, lineHeight: 1.6 }}>
            Already have a website with us — or don't need a new one? No problem. Just leave your details and we'll reach out to sort it out.
          </p>

          <div style={{ marginBottom: 18 }}>
            <label className="field-label">BUSINESS NAME <span style={{ color: '#ff6b6b' }}>*</span></label>
            <input
              type="text" value={businessName}
              onChange={(e) => { setBusinessName(e.target.value); setErrors((p) => ({ ...p, businessName: '' })) }}
              placeholder="e.g. Ada's Skincare" className="field-input"
            />
            {errors.businessName && <p style={{ color: '#ff6b6b', fontSize: 12, marginTop: 5 }}>{errors.businessName}</p>}
          </div>

          <div>
            <label className="field-label">WHATSAPP NUMBER <span style={{ color: '#ff6b6b' }}>*</span></label>
            <input
              type="tel" value={phoneNumber}
              onChange={(e) => { setPhoneNumber(e.target.value); setErrors((p) => ({ ...p, phoneNumber: '' })) }}
              placeholder="08012345678" className="field-input"
            />
            {errors.phoneNumber && <p style={{ color: '#ff6b6b', fontSize: 12, marginTop: 5 }}>{errors.phoneNumber}</p>}
          </div>
        </div>

        <button onClick={submit} disabled={loading} className="btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: 16, padding: '15px' }}>
          {loading ? 'Sending...' : <><Send size={15} /> Request This Service</>}
        </button>
        <p style={{ textAlign: 'center', color: 'var(--muted)', fontSize: 12, marginTop: 12 }}>
          We'll reach out on WhatsApp to confirm details and pricing.
        </p>
      </section>
    </main>
  )
}