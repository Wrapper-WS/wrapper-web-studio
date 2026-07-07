import { Check, X } from 'lucide-react'

type Row = {
  label: string
  starter: string | boolean
  entry: string | boolean
  business: string | boolean
  pro: string | boolean
}

const rows: Row[] = [
  { label: 'Pages', starter: '1 (landing)', entry: '3–5', business: 'Up to 10', pro: 'Unlimited' },
  { label: 'Mobile-first design', starter: true, entry: true, business: true, pro: true },
  { label: 'AI-built with Claude', starter: true, entry: true, business: true, pro: true },
  { label: 'Custom domain connection', starter: false, entry: true, business: true, pro: true },
  { label: 'Supabase backend', starter: false, entry: 'Basic', business: 'Full', pro: 'Full + custom' },
  { label: 'Google Search Console', starter: false, entry: false, business: true, pro: true },
  { label: 'SEO setup', starter: false, entry: 'Basic meta', business: 'Full on-page', pro: 'Full + structured data' },
  { label: 'Revision rounds', starter: '1', entry: '2', business: '3', pro: 'Unlimited (30 days)' },
  { label: 'Delivery time', starter: '3 days', entry: '5 days', business: '7–10 days', pro: '14 days' },
  { label: 'Post-launch support', starter: false, entry: '7 days', business: '14 days', pro: '30 days' },
]

function Cell({ value }: { value: string | boolean }) {
  if (value === true) return <Check size={16} color="var(--teal)" strokeWidth={2.5} style={{ margin: '0 auto' }} />
  if (value === false) return <X size={16} color="rgba(255,255,255,0.25)" strokeWidth={2.5} style={{ margin: '0 auto' }} />
  return <span style={{ fontSize: 13, color: 'var(--text)' }}>{value}</span>
}

export function TierComparisonTable() {
  const columns: { key: Exclude<keyof Row, 'label'>; label: string; sub: string; highlight: boolean }[] = [
    { key: 'starter', label: 'Starter', sub: '₦50k', highlight: false },
    { key: 'entry', label: 'Entry', sub: '₦80k', highlight: false },
    { key: 'business', label: 'Business', sub: '₦150k', highlight: true },
    { key: 'pro', label: 'Pro', sub: '₦250k', highlight: false },
  ]

  return (
    <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
      <table style={{ width: '100%', minWidth: 560, borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: '12px 14px', fontSize: 12, fontWeight: 600, color: 'var(--muted)', fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '0.04em', textTransform: 'uppercase', borderBottom: '1px solid var(--border-strong)' }}>
              Feature
            </th>
            {columns.map((col) => (
              <th
                key={col.key}
                style={{
                  padding: '12px 14px', textAlign: 'center', minWidth: 100,
                  borderBottom: '1px solid var(--border-strong)',
                  background: col.highlight ? 'rgba(0,217,188,0.06)' : 'transparent',
                }}
              >
                <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 14, color: col.highlight ? 'var(--teal)' : 'var(--text)' }}>
                  {col.label}
                </div>
                <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>{col.sub}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.label} style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)' }}>
              <td style={{ padding: '13px 14px', fontSize: 13, color: 'var(--muted)', borderBottom: '1px solid var(--border)' }}>
                {row.label}
              </td>
              {columns.map((col) => (
                <td
                  key={col.key}
                  style={{
                    padding: '13px 14px', textAlign: 'center', borderBottom: '1px solid var(--border)',
                    background: col.highlight ? 'rgba(0,217,188,0.04)' : 'transparent',
                  }}
                >
                  <Cell value={row[col.key]} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}