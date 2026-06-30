import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Check, Send, Mail, MessageCircle } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useRegion } from '../lib/useRegion'

export default function CustomInquiry() {
  const { region } = useRegion()
  const [orgName, setOrgName] = useState('')
  const [orgType, setOrgType] = useState('')
  const [projectDetails, setProjectDetails] = useState('')
  const [contactMethod, setContactMethod] = useState<'whatsapp' | 'email'>('whatsapp')
  const [contactValue, setContactValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const orgTypes = [
    'School / Educational institution', 'Hospital / Clinic / Healthcare',
    'NGO / Non-profit', 'Church / Religious organization',
    'Real estate firm', 'Agency / Consultancy',
    'Government / Public sector', 'Large enterprise',
    'Booking or appointment-based business', 'Other',
  ]

  const validate = () => {
    const e: Record<string, string> = {}
    if (!orgName.trim()) e.orgName = 'Please tell us your organization or project name'
    if (!orgType) e.orgType = 'Please select what best describes you'
    if (!projectDetails.trim() || projectDetails.trim().length < 20) e.projectDetails = 'Please describe your project in a bit more detail (at least a few sentences)'
    if (!contactValue.trim()) e.contactValue = `Please provide your ${contactMethod === 'whatsapp' ? 'WhatsApp number' : 'email address'}`
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const submit = async () => {
    if (!validate()) return
    setLoading(true)
    try {
      const { error } = await supabase.from('orders').insert({
        plan_id: 'custom',
        plan_name: 'Custom Website',
        plan_price: 0,
        discount_amount: 0,
        final_price: 0,
        add_ons: [],
        business_name: orgName,
        business_type: orgType,
        products_services: projectDetails,
        target_audience: 'N/A — custom inquiry',
        website_style: 'Custom (to be discussed)',
        preferred_colors: 'N/A',
        phone_number: contactMethod === 'whatsapp' ? contactValue : 'See email',
        extra_notes: contactMethod === 'email' ? `Contact email: ${contactValue}` : '',
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

  if (submitted) {
    return (
      <main style={{ paddingTop: 100, padding: '120px 16px', textAlign: 'center' }}>
        <div style={{ maxWidth: 480, margin: '0 auto' }}>
          <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--teal-dim)', border: '2px solid var(--teal)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <Check size={32} color="var(--teal)" />
          </div>
          <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 26, fontWeight: 700, marginBottom: 12 }}>
            Thanks — we've got your project details.
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: 15, lineHeight: 1.6, marginBottom: 32 }}>
            We'll review what you've shared and reach out via {contactMethod === 'whatsapp' ? 'WhatsApp' : 'email'} within a business day to discuss scope, timeline, and a fair quote.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <a
              href={`https://wa.me/2348159088811?text=${encodeURIComponent(`Hello! I just submitted a custom website inquiry for "${orgName}". Looking forward to discussing it.`)}`}
              target="_blank" rel="noopener noreferrer" className="btn-teal" style={{ justifyContent: 'center' }}
            >
              Message us on WhatsApp now
            </a>
            <Link to="/" className="btn-ghost" style={{ justifyContent: 'center' }}>Back to home</Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main style={{ paddingTop: 100 }}>
      <section style={{ padding: '24px 16px 80px', maxWidth: 620, margin: '0 auto' }}>
        <Link to="/plans/custom" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--muted)', textDecoration: 'none', fontSize: 14, marginBottom: 20 }}>
          <ArrowLeft size={15} /> Back to Custom Website
        </Link>

        <div style={{ marginBottom: 28 }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', fontFamily: 'Space Grotesk, sans-serif', marginBottom: 12 }}>
            CUSTOM PROJECT
          </p>
          <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(26px, 5vw, 38px)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 12 }}>
            Tell us about <span className="gradient-text">your project</span>
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.6 }}>
            The more detail you give us, the more accurate your quote will be. No commitment — this just starts the conversation.
          </p>
        </div>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 20, padding: '26px 20px' }}>
          <div style={{ marginBottom: 18 }}>
            <label className="field-label">ORGANIZATION / PROJECT NAME <span style={{ color: '#ff6b6b' }}>*</span></label>
            <input type="text" value={orgName} onChange={(e) => { setOrgName(e.target.value); setErrors((p) => ({ ...p, orgName: '' })) }} placeholder="e.g. Bright Future Academy" className="field-input" />
            {errors.orgName && <p style={{ color: '#ff6b6b', fontSize: 12, marginTop: 5 }}>{errors.orgName}</p>}
          </div>

          <div style={{ marginBottom: 18 }}>
            <label className="field-label">WHAT BEST DESCRIBES YOU? <span style={{ color: '#ff6b6b' }}>*</span></label>
            <select value={orgType} onChange={(e) => { setOrgType(e.target.value); setErrors((p) => ({ ...p, orgType: '' })) }} className="field-input">
              <option value="">Choose one...</option>
              {orgTypes.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
            {errors.orgType && <p style={{ color: '#ff6b6b', fontSize: 12, marginTop: 5 }}>{errors.orgType}</p>}
          </div>

          <div style={{ marginBottom: 18 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
              <label className="field-label" style={{ margin: 0 }}>DESCRIBE WHAT YOU NEED <span style={{ color: '#ff6b6b' }}>*</span></label>
              <span style={{ fontSize: 11, color: 'var(--muted)' }}>Features, scale, anything specific</span>
            </div>
            <textarea
              value={projectDetails}
              onChange={(e) => { setProjectDetails(e.target.value); setErrors((p) => ({ ...p, projectDetails: '' })) }}
              placeholder="e.g. We're a hospital and need a website with an appointment booking system, doctor profiles, and a patient portal for test results..."
              className="field-input" rows={6} style={{ resize: 'vertical' }}
            />
            {errors.projectDetails && <p style={{ color: '#ff6b6b', fontSize: 12, marginTop: 5 }}>{errors.projectDetails}</p>}
          </div>

          <div>
            <label className="field-label">HOW SHOULD WE REACH YOU? <span style={{ color: '#ff6b6b' }}>*</span></label>
            <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
              <button
                type="button"
                onClick={() => setContactMethod('whatsapp')}
                style={{
                  flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
                  padding: '10px', borderRadius: 10, cursor: 'pointer',
                  border: `1px solid ${contactMethod === 'whatsapp' ? 'var(--teal)' : 'var(--border)'}`,
                  background: contactMethod === 'whatsapp' ? 'rgba(0,212,184,0.08)' : 'var(--surface)',
                  color: contactMethod === 'whatsapp' ? 'var(--teal)' : 'var(--muted)',
                  fontSize: 13, fontWeight: 600, fontFamily: 'Space Grotesk, sans-serif', transition: 'all 0.2s ease',
                }}
              >
                <MessageCircle size={14} /> WhatsApp
              </button>
              <button
                type="button"
                onClick={() => setContactMethod('email')}
                style={{
                  flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
                  padding: '10px', borderRadius: 10, cursor: 'pointer',
                  border: `1px solid ${contactMethod === 'email' ? 'var(--teal)' : 'var(--border)'}`,
                  background: contactMethod === 'email' ? 'rgba(0,212,184,0.08)' : 'var(--surface)',
                  color: contactMethod === 'email' ? 'var(--teal)' : 'var(--muted)',
                  fontSize: 13, fontWeight: 600, fontFamily: 'Space Grotesk, sans-serif', transition: 'all 0.2s ease',
                }}
              >
                <Mail size={14} /> Email
              </button>
            </div>
            <input
              type={contactMethod === 'email' ? 'email' : 'tel'}
              value={contactValue}
              onChange={(e) => { setContactValue(e.target.value); setErrors((p) => ({ ...p, contactValue: '' })) }}
              placeholder={contactMethod === 'whatsapp' ? '08012345678' : 'you@example.com'}
              className="field-input"
            />
            {errors.contactValue && <p style={{ color: '#ff6b6b', fontSize: 12, marginTop: 5 }}>{errors.contactValue}</p>}
          </div>
        </div>

        <button onClick={submit} disabled={loading} className="btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: 16, padding: '15px', marginTop: 16 }}>
          {loading ? 'Sending...' : <><Send size={15} /> Submit Project Details</>}
        </button>
        <p style={{ textAlign: 'center', color: 'var(--muted)', fontSize: 12, marginTop: 12 }}>
          We'll review your project and reach out with a tailored quote — no pressure, no obligation.
        </p>
      </section>
    </main>
  )
}