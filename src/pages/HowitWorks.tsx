import { Link } from 'react-router-dom'
import { List, FileText, Lock, CreditCard, CheckCircle, ArrowRight } from 'lucide-react'

const steps = [
  {
    icon: <List size={22} color="var(--teal)" />,
    number: '01',
    title: 'Select a Plan',
    desc: 'Pick the pricing plan that fits your business — Starter, Starter+, Business, or Pro.',
  },
  {
    icon: <FileText size={22} color="var(--purple)" />,
    number: '02',
    title: 'Fill the Order Form',
    desc: 'Share your business name, type, products/services, target audience, style preference, color choice, and phone number.',
  },
  {
    icon: <Lock size={22} color="var(--teal)" />,
    number: '03',
    title: 'Client Portal Access',
    desc: 'Admin creates your client account, you receive secure login credentials, and you sign in to track your project.',
  },
  {
    icon: <CreditCard size={22} color="var(--purple)" />,
    number: '04',
    title: 'Pay 50% Deposit',
    desc: 'Inside your portal, pay a 50% deposit to kick off production. Our team begins building right away.',
  },
  {
    icon: <CheckCircle size={22} color="var(--teal)" />,
    number: '05',
    title: 'Completion & Final Payment',
    desc: 'Admin marks the project Ready, you pay the remaining 50%, and your website is unlocked — link, receipt, and credentials delivered.',
  },
]

export default function HowItWorks() {
  return (
    <main style={{ paddingTop: 100 }}>
      {/* Hero */}
      <section style={{ textAlign: 'center', padding: '40px 16px 60px', maxWidth: 680, margin: '0 auto' }}>
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
          THE PROCESS
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
          From idea to{' '}
          <span className="gradient-text">live store</span>, in days.
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: 16, lineHeight: 1.6 }}>
          Four clear steps. No back-and-forth. No waiting weeks for updates.
        </p>
      </section>

      {/* Steps */}
      <section style={{ padding: '0 16px 80px', maxWidth: 700, margin: '0 auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {steps.map((step, i) => (
            <div
              key={i}
              className="glass-card"
              style={{ padding: '24px 20px', display: 'flex', gap: 20, alignItems: 'flex-start' }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 16,
                  background: i % 2 === 0 ? 'var(--teal-dim)' : 'var(--purple-dim)',
                  border: `1px solid ${i % 2 === 0 ? 'rgba(0,212,184,0.25)' : 'rgba(155,93,229,0.25)'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  position: 'relative',
                }}
              >
                {step.icon}
                <span
                  style={{
                    position: 'absolute',
                    bottom: -8,
                    right: -8,
                    background: 'var(--bg)',
                    border: '1px solid var(--border)',
                    borderRadius: 6,
                    padding: '1px 5px',
                    fontSize: 10,
                    fontWeight: 700,
                    color: 'var(--muted)',
                    fontFamily: 'Space Grotesk, sans-serif',
                  }}
                >
                  {step.number}
                </span>
              </div>
              <div>
                <h3
                  style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: 18,
                    fontWeight: 700,
                    marginBottom: 8,
                  }}
                >
                  {step.title}
                </h3>
                <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.6 }}>
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '0 16px 100px', maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(0,212,184,0.07), rgba(155,93,229,0.07))',
            border: '1px solid var(--border-strong)',
            borderRadius: 24,
            padding: '48px 24px',
          }}
        >
          <h2
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(24px, 4vw, 36px)',
              fontWeight: 700,
              marginBottom: 12,
            }}
          >
            Ready to begin?
          </h2>
          <p style={{ color: 'var(--muted)', marginBottom: 28, fontSize: 15 }}>
            Pick your plan and we'll take it from there.
          </p>
          <Link to="/pricing" className="btn-primary" style={{ fontSize: 16, padding: '14px 32px' }}>
            View Plans <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  )
}