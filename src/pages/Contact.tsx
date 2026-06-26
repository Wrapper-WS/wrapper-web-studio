import { Link } from 'react-router-dom'
import { MessageCircle, Mail } from 'lucide-react'

const WHATSAPP_NUMBER = '2348159088811'
const EMAIL = 'sp3techinitiative@gmail.com'

export default function Contact() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello, I'm interested in getting a website from Wrapper Web Studio.")}`

  return (
    <main style={{ paddingTop: 100 }}>
      {/* Hero */}
      <section style={{ textAlign: 'center', padding: '40px 16px 16px', maxWidth: 600, margin: '0 auto' }}>
        <p
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--muted)',
            fontFamily: 'Space Grotesk, sans-serif',
            marginBottom: 16,
          }}
        >
          GET IN TOUCH
        </p>
        <h1
          style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 'clamp(30px, 6vw, 52px)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            marginBottom: 16,
          }}
        >
          Let's build{' '}
          <span className="gradient-text">your store.</span>
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: 16, lineHeight: 1.6 }}>
          One message is all it takes. Tell us what you sell and we'll guide you to the right plan.
        </p>
      </section>

      {/* Contact cards */}
      <section style={{ padding: '40px 16px 60px', maxWidth: 600, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* WhatsApp */}
        <div className="glass-card" style={{ padding: '28px 24px', textAlign: 'center' }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 18,
              background: 'rgba(37,211,102,0.12)',
              border: '1px solid rgba(37,211,102,0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
            }}
          >
            <MessageCircle size={26} color="#25d366" />
          </div>
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 20, fontWeight: 700, marginBottom: 8 }}>
            Message us on WhatsApp
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 20, lineHeight: 1.6 }}>
            We usually reply within an hour. No pushy sales — just real answers.
          </p>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 999,
              padding: '8px 16px',
              marginBottom: 20,
            }}
          >
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#25d366', display: 'inline-block' }} />
            <span style={{ fontSize: 15, fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600 }}>
              0815 908 8811
            </span>
          </div>
          <div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', fontSize: 15 }}
            >
              Chat on WhatsApp →
            </a>
          </div>
          <p style={{ color: 'var(--muted)', fontSize: 13, marginTop: 16 }}>
            Prefer to compare options first?{' '}
            <Link to="/pricing" style={{ color: 'var(--teal)', textDecoration: 'none', fontWeight: 600 }}>
              See pricing
            </Link>
            .
          </p>
        </div>

        {/* Email */}
        <div className="glass-card" style={{ padding: '28px 24px', textAlign: 'center' }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 18,
              background: 'var(--purple-dim)',
              border: '1px solid rgba(155,93,229,0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
            }}
          >
            <Mail size={26} color="var(--purple)" />
          </div>
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 20, fontWeight: 700, marginBottom: 8 }}>
            Or send us an email
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 20, lineHeight: 1.6 }}>
            We'll get back within a business day.
          </p>
          <a
            href={`mailto:${EMAIL}`}
            style={{
              display: 'inline-block',
              background: 'var(--surface)',
              border: '1px solid var(--border-strong)',
              borderRadius: 10,
              padding: '10px 18px',
              color: 'var(--text)',
              textDecoration: 'none',
              fontSize: 14,
              fontFamily: 'Inter, sans-serif',
              transition: 'all 0.2s ease',
            }}
          >
            {EMAIL}
          </a>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {[
            { value: '< 1 hour', label: 'Reply time' },
            { value: '2–10 days', label: 'Delivery' },
            { value: 'Until live', label: 'Support' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="glass-card"
              style={{ padding: '20px 12px', textAlign: 'center' }}
            >
              <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 16, marginBottom: 4 }}>
                {stat.value}
              </p>
              <p style={{ color: 'var(--muted)', fontSize: 12 }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Hidden welcome link */}
      <section style={{ padding: '0 16px 80px', textAlign: 'center' }}>
        <a
          href="/admin"
          style={{
            color: 'rgba(255,255,255,0.08)',
            fontSize: 12,
            textDecoration: 'none',
            fontFamily: 'Inter, sans-serif',
            userSelect: 'none',
          }}
        >
          · welcome ·
        </a>
      </section>
    </main>
  )
}