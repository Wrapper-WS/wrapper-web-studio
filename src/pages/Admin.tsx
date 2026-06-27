import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { formatPrice } from '../lib/plans'
import {
  LayoutDashboard, ShoppingBag, Package, BarChart2,
  Tag, Users, LogOut, ChevronDown, ChevronUp,
  Plus, Trash2, Check, RefreshCw
} from 'lucide-react'
import type { Order, Upsell, PromoCode } from '../lib/supabase'

type Tab = 'overview' | 'orders' | 'inventory' | 'analytics' | 'promos' | 'admins'
type OrderFilter = 'new' | 'done'

// ── Auth ──────────────────────────────────────────────────────────────
function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const login = async () => {
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError(error.message)
    else onLogin()
    setLoading(false)
  }

  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, paddingTop: 100 }}>
      <div style={{ width: '100%', maxWidth: 360, background: 'rgba(15,18,28,0.98)', border: '1px solid var(--border-strong)', borderRadius: 24, padding: 32 }}>
        <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Admin Sign In</h2>
        <p style={{ color: 'var(--muted)', fontSize: 13, marginBottom: 24 }}>Enter your credentials to continue.</p>
        <div style={{ marginBottom: 16 }}>
          <label className="field-label">Username</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="field-input" placeholder="admin@example.com" />
        </div>
        <div style={{ marginBottom: 20 }}>
          <label className="field-label">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && login()} className="field-input" />
        </div>
        {error && <p style={{ color: '#ff6b6b', fontSize: 13, marginBottom: 16 }}>{error}</p>}
        <button onClick={login} disabled={loading} className="btn-primary" style={{ width: '100%' }}>{loading ? 'Signing in...' : 'Sign in'}</button>
      </div>
    </main>
  )
}

// ── Overview ──────────────────────────────────────────────────────────
function Overview({ orders, upsells }: { orders: Order[]; upsells: Upsell[] }) {
  const newOrders = orders.filter((o) => o.status === 'new').length
  const completed = orders.filter((o) => o.status === 'done').length
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {[
        { label: 'TOTAL ORDERS', value: orders.length },
        { label: 'NEW ORDERS', value: newOrders },
        { label: 'COMPLETED ORDERS', value: completed },
        { label: 'UPSELLS', value: upsells.length },
      ].map((stat) => (
        <div key={stat.label} className="glass-card" style={{ padding: '22px 20px' }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', color: 'var(--muted)', fontFamily: 'Space Grotesk, sans-serif', marginBottom: 8 }}>{stat.label}</p>
          <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 40, fontWeight: 700 }}>{stat.value}</p>
        </div>
      ))}
    </div>
  )
}

// ── Orders ────────────────────────────────────────────────────────────
function Orders({ orders, onStatusChange }: { orders: Order[]; onStatusChange: (id: string, status: Order['status']) => void }) {
  const [filter, setFilter] = useState<OrderFilter>('new')
  const [expanded, setExpanded] = useState<string | null>(null)

  const filtered = orders.filter((o) => filter === 'new' ? o.status !== 'done' : o.status === 'done')

  const statusColors: Record<string, string> = {
    new: 'var(--teal)',
    in_progress: 'var(--purple)',
    ready: '#f5c842',
    done: '#25d366',
  }

  return (
    <div>
      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {(['new', 'done'] as OrderFilter[]).map((f) => {
          const count = orders.filter((o) => f === 'new' ? o.status !== 'done' : o.status === 'done').length
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '8px 16px', borderRadius: 999, border: '1px solid',
                borderColor: filter === f ? 'var(--teal)' : 'var(--border)',
                background: filter === f ? 'var(--teal-dim)' : 'transparent',
                color: filter === f ? 'var(--teal)' : 'var(--muted)',
                fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: 13, cursor: 'pointer',
              }}
            >
              {f === 'new' ? <ShoppingBag size={14} /> : <Check size={14} />}
              {f === 'new' ? 'New' : 'Completed'}
              <span style={{ background: filter === f ? 'rgba(0,212,184,0.2)' : 'var(--surface)', borderRadius: 999, padding: '1px 7px', fontSize: 11 }}>{count}</span>
            </button>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div className="glass-card" style={{ padding: 32, textAlign: 'center' }}>
          <p style={{ color: 'var(--muted)', fontSize: 14 }}>No {filter} orders yet.</p>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {filtered.map((order) => (
          <div key={order.id} className="glass-card" style={{ overflow: 'hidden' }}>
            <button
              onClick={() => setExpanded(expanded === order.id ? null : order.id)}
              style={{ width: '100%', background: 'none', border: 'none', padding: '18px 18px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}
            >
              <div style={{ textAlign: 'left' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 15, color: 'var(--text)', textTransform: 'uppercase' }}>
                    {order.business_name}
                  </span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: statusColors[order.status] ?? 'var(--muted)', background: `${statusColors[order.status]}18`, border: `1px solid ${statusColors[order.status]}40`, padding: '2px 8px', borderRadius: 6, fontFamily: 'Space Grotesk, sans-serif' }}>
                    {order.status.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
                <p style={{ color: 'var(--muted)', fontSize: 13 }}>
                  {order.plan_name} · {new Date(order.created_at).toLocaleString()}
                </p>
              </div>
              {expanded === order.id ? <ChevronUp size={16} color="var(--muted)" /> : <ChevronDown size={16} color="var(--muted)" />}
            </button>

            {expanded === order.id && (
              <div style={{ padding: '0 18px 18px', borderTop: '1px solid var(--border)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 16, marginBottom: 16 }}>
                  {[
                    { label: 'Plan', value: order.plan_name },
                    { label: 'Total Paid', value: formatPrice(order.final_price) },
                    { label: 'Business Type', value: order.business_type },
                    { label: 'Phone', value: order.phone_number },
                    { label: 'Style', value: order.website_style },
                    { label: 'Colors', value: `${order.preferred_colors}${order.color_variant ? ` · ${order.color_variant}` : ''}` },
                  ].map((item) => (
                    <div key={item.label}>
                      <p style={{ fontSize: 10, fontWeight: 600, color: 'var(--muted)', fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 3 }}>{item.label}</p>
                      <p style={{ fontSize: 13, color: 'var(--text)' }}>{item.value || '—'}</p>
                    </div>
                  ))}
                </div>

                {order.products_services && (
                  <div style={{ marginBottom: 12 }}>
                    <p style={{ fontSize: 10, fontWeight: 600, color: 'var(--muted)', fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 3 }}>Products / Services</p>
                    <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.5 }}>{order.products_services}</p>
                  </div>
                )}

                {order.target_audience && (
                  <div style={{ marginBottom: 12 }}>
                    <p style={{ fontSize: 10, fontWeight: 600, color: 'var(--muted)', fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 3 }}>Target Audience</p>
                    <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.5 }}>{order.target_audience}</p>
                  </div>
                )}

                {order.extra_notes && (
                  <div style={{ marginBottom: 12 }}>
                    <p style={{ fontSize: 10, fontWeight: 600, color: 'var(--muted)', fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 3 }}>Notes</p>
                    <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.5 }}>{order.extra_notes}</p>
                  </div>
                )}

                {order.promo_code && (
                  <div style={{ marginBottom: 16 }}>
                    <p style={{ fontSize: 10, fontWeight: 600, color: 'var(--muted)', fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 3 }}>Promo Code</p>
                    <p style={{ fontSize: 13, color: 'var(--teal)' }}>{order.promo_code.toUpperCase()} (−{formatPrice(order.discount_amount)})</p>
                  </div>
                )}

                {/* Status update */}
                <div>
                  <p style={{ fontSize: 10, fontWeight: 600, color: 'var(--muted)', fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8 }}>Update Status</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {(['new', 'in_progress', 'ready', 'done'] as Order['status'][]).map((s) => (
                      <button
                        key={s}
                        onClick={() => onStatusChange(order.id, s)}
                        style={{
                          padding: '6px 14px', borderRadius: 8, border: '1px solid',
                          borderColor: order.status === s ? statusColors[s] : 'var(--border)',
                          background: order.status === s ? `${statusColors[s]}18` : 'transparent',
                          color: order.status === s ? statusColors[s] : 'var(--muted)',
                          fontSize: 12, fontWeight: 600, cursor: 'pointer',
                          fontFamily: 'Space Grotesk, sans-serif',
                          transition: 'all 0.2s',
                        }}
                      >
                        {s.replace('_', ' ').toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Upsells (Inventory) ───────────────────────────────────────────────
function UpsellsTab({ upsells, onRefresh }: { upsells: Upsell[]; onRefresh: () => void }) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [featuresRaw, setFeaturesRaw] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const create = async () => {
    if (!name.trim() || !description.trim() || !price.trim()) {
      setError('Name, description, and price are required.')
      return
    }
    setLoading(true)
    setError('')
    const features = featuresRaw.split('\n').map((f) => f.trim()).filter(Boolean)
    const { error } = await supabase.from('upsells').insert({
      name: name.trim(),
      description: description.trim(),
      price: Number(price),
      features,
      active: true,
    })
    if (error) setError(error.message)
    else {
      setName(''); setDescription(''); setPrice(''); setFeaturesRaw('')
      onRefresh()
    }
    setLoading(false)
  }

  const toggle = async (upsell: Upsell) => {
    await supabase.from('upsells').update({ active: !upsell.active }).eq('id', upsell.id)
    onRefresh()
  }

  const remove = async (id: string) => {
    if (!confirm('Delete this upsell?')) return
    await supabase.from('upsells').delete().eq('id', id)
    onRefresh()
  }

  return (
    <div>
      {/* Create form */}
      <div className="glass-card" style={{ padding: '22px 20px', marginBottom: 20 }}>
        <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 17, fontWeight: 700, marginBottom: 4 }}>Create Upsell</h3>
        <p style={{ color: 'var(--muted)', fontSize: 13, marginBottom: 20 }}>Upsells appear as suggested add-ons on plan detail pages.</p>

        <div style={{ marginBottom: 14 }}>
          <label className="field-label">Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="field-input" placeholder="e.g. Product Uploads" />
        </div>
        <div style={{ marginBottom: 14 }}>
          <label className="field-label">Description</label>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="field-input" placeholder="Brief description shown to customers" />
        </div>
        <div style={{ marginBottom: 14 }}>
          <label className="field-label">Price (₦)</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="field-input" placeholder="30000" />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label className="field-label">Features (one per line)</label>
          <textarea value={featuresRaw} onChange={(e) => setFeaturesRaw(e.target.value)} className="field-input" rows={3} placeholder={'Clean product layouts\nConsistent formatting\nReady-to-sell catalog'} style={{ resize: 'vertical' }} />
        </div>
        {error && <p style={{ color: '#ff6b6b', fontSize: 13, marginBottom: 12 }}>{error}</p>}
        <button onClick={create} disabled={loading} className="btn-teal" style={{ width: '100%' }}>
          <Plus size={15} /> {loading ? 'Creating...' : 'Create Upsell'}
        </button>
      </div>

      {/* List */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <p style={{ color: 'var(--muted)', fontSize: 13 }}>{upsells.length} upsell{upsells.length !== 1 ? 's' : ''}</p>
        <button onClick={onRefresh} style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, fontSize: 13 }}>
          <RefreshCw size={13} /> Refresh
        </button>
      </div>

      {upsells.length === 0 && (
        <div className="glass-card" style={{ padding: 32, textAlign: 'center' }}>
          <p style={{ color: 'var(--muted)', fontSize: 14 }}>No upsells yet. Create one above.</p>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {upsells.map((u) => (
          <div key={u.id} className="glass-card" style={{ padding: '18px 18px', opacity: u.active ? 1 : 0.5 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{u.name}</p>
                <p style={{ color: 'var(--muted)', fontSize: 13, marginBottom: 8 }}>{u.description}</p>
                <p style={{ color: 'var(--teal)', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 16 }}>{formatPrice(u.price)}</p>
                {u.features.length > 0 && (
                  <div style={{ marginTop: 8 }}>
                    {u.features.map((f) => (
                      <p key={f} style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 3 }}>· {f}</p>
                    ))}
                  </div>
                )}
              </div>
              <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                <button
                  onClick={() => toggle(u)}
                  style={{ background: u.active ? 'var(--teal-dim)' : 'var(--surface)', border: `1px solid ${u.active ? 'var(--teal)' : 'var(--border)'}`, color: u.active ? 'var(--teal)' : 'var(--muted)', borderRadius: 8, padding: '6px 12px', fontSize: 12, cursor: 'pointer', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600 }}
                >
                  {u.active ? 'Active' : 'Off'}
                </button>
                <button onClick={() => remove(u.id)} style={{ background: 'rgba(255,80,80,0.1)', border: '1px solid rgba(255,80,80,0.2)', color: '#ff6b6b', borderRadius: 8, padding: '6px 10px', cursor: 'pointer' }}>
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Analytics ─────────────────────────────────────────────────────────
function Analytics({ orders }: { orders: Order[] }) {
  const total = orders.length
  const pending = orders.filter((o) => o.status === 'new' || o.status === 'in_progress').length
  const completed = orders.filter((o) => o.status === 'done').length
  const revenue = orders.filter((o) => o.status === 'done').reduce((s, o) => s + o.final_price, 0)

  const planCounts: Record<string, number> = {}
  orders.forEach((o) => { planCounts[o.plan_name] = (planCounts[o.plan_name] ?? 0) + 1 })
  const mostPopular = Object.entries(planCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? '—'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div className="glass-card" style={{ padding: '22px 20px' }}>
        <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 16, marginBottom: 16 }}>Plan analytics <span style={{ color: 'var(--muted)', fontWeight: 400, fontSize: 13 }}>{total} total views</span></p>
        <p style={{ color: 'var(--muted)', fontSize: 13, marginBottom: 8 }}>Most selected: <strong style={{ color: 'var(--text)' }}>{mostPopular}</strong></p>
        {Object.entries(planCounts).map(([plan, count]) => (
          <div key={plan} style={{ marginBottom: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <span style={{ fontSize: 13 }}>{plan}</span>
              <span style={{ fontSize: 13, color: 'var(--muted)' }}>{count}</span>
            </div>
            <div style={{ height: 4, background: 'var(--surface)', borderRadius: 2 }}>
              <div style={{ height: '100%', width: `${(count / total) * 100}%`, background: 'linear-gradient(90deg, var(--teal), var(--purple))', borderRadius: 2 }} />
            </div>
          </div>
        ))}
      </div>

      {[
        { label: 'TOTAL ORDERS', value: total },
        { label: 'PENDING', value: pending },
        { label: 'COMPLETED', value: completed },
      ].map((s) => (
        <div key={s.label} className="glass-card" style={{ padding: '20px 20px' }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', color: 'var(--muted)', fontFamily: 'Space Grotesk, sans-serif', marginBottom: 8 }}>{s.label}</p>
          <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 36, fontWeight: 700 }}>{s.value}</p>
        </div>
      ))}

      <div className="glass-card" style={{ padding: '20px 20px' }}>
        <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', color: 'var(--muted)', fontFamily: 'Space Grotesk, sans-serif', marginBottom: 8 }}>TOTAL REVENUE (COMPLETED)</p>
        <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 28, fontWeight: 700, color: 'var(--teal)' }}>{formatPrice(revenue)}</p>
      </div>
    </div>
  )
}

// ── Promos ────────────────────────────────────────────────────────────
function Promos() {
  const [promos, setPromos] = useState<PromoCode[]>([])
  const [code, setCode] = useState('')
  const [discount, setDiscount] = useState('10')
  const [days, setDays] = useState('30')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const load = async () => {
    const { data } = await supabase.from('promo_codes').select('*').order('created_at', { ascending: false })
    if (data) setPromos(data)
  }

  useEffect(() => { load() }, [])

  const create = async () => {
    if (!code.trim()) { setError('Code is required.'); return }
    setLoading(true)
    setError('')
    const expires = new Date()
    expires.setDate(expires.getDate() + Number(days))
    const { error } = await supabase.from('promo_codes').insert({
      code: code.trim().toLowerCase(),
      discount_percent: Number(discount),
      expires_at: expires.toISOString(),
      applies_to: ['business', 'pro'],
      active: true,
      uses: 0,
    })
    if (error) setError(error.message)
    else { setCode(''); load() }
    setLoading(false)
  }

  const togglePromo = async (promo: PromoCode) => {
    await supabase.from('promo_codes').update({ active: !promo.active }).eq('id', promo.id)
    load()
  }

  const deletePromo = async (id: string) => {
    if (!confirm('Delete this promo code?')) return
    await supabase.from('promo_codes').delete().eq('id', id)
    load()
  }

  return (
    <div>
      {/* Create */}
      <div className="glass-card" style={{ padding: '22px 20px', marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: 'var(--purple-dim)', border: '1px solid rgba(155,93,229,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Tag size={15} color="var(--purple)" />
          </div>
          <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 17, fontWeight: 700 }}>Create promo code</h3>
        </div>
        <p style={{ color: 'var(--muted)', fontSize: 13, marginBottom: 20 }}>Applies to Business and Pro plans. Discount is applied to the plan price.</p>

        <input type="text" value={code} onChange={(e) => setCode(e.target.value)} className="field-input" placeholder="Promo code (e.g. lyrics95)" style={{ marginBottom: 10 }} />
        <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
          <input type="number" value={discount} onChange={(e) => setDiscount(e.target.value)} className="field-input" placeholder="% discount" style={{ flex: 1 }} />
          <input type="number" value={days} onChange={(e) => setDays(e.target.value)} className="field-input" placeholder="Days until expiry" style={{ flex: 1 }} />
        </div>
        {error && <p style={{ color: '#ff6b6b', fontSize: 13, marginBottom: 10 }}>{error}</p>}
        <button onClick={create} disabled={loading} className="btn-primary" style={{ width: '100%' }}>
          <Plus size={14} /> {loading ? 'Creating...' : 'Create'}
        </button>
      </div>

      {/* Active promos */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 16 }}>Active promos</h3>
        <button onClick={load} style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontSize: 13, display: 'flex', alignItems: 'center', gap: 5 }}>
          <RefreshCw size={13} /> Refresh
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {promos.map((p) => (
          <div key={p.id} className="glass-card" style={{ padding: '16px 18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 15 }}>{p.code}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--teal)', background: 'var(--teal-dim)', padding: '2px 8px', borderRadius: 6 }}>{p.discount_percent}% OFF</span>
                </div>
                <p style={{ color: 'var(--muted)', fontSize: 12 }}>
                  {p.expires_at ? `Expires ${new Date(p.expires_at).toLocaleDateString()}` : 'No expiry'} · Used {p.uses} · Applies to {Array.isArray(p.applies_to) ? p.applies_to.join(', ') : p.applies_to}
                </p>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  onClick={() => togglePromo(p)}
                  style={{ padding: '5px 12px', borderRadius: 8, border: '1px solid', borderColor: p.active ? 'var(--border)' : 'var(--teal)', background: p.active ? 'var(--surface)' : 'var(--teal-dim)', color: p.active ? 'var(--muted)' : 'var(--teal)', fontSize: 12, cursor: 'pointer', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600 }}
                >
                  {p.active ? 'Disable' : 'Enable'}
                </button>
                <button onClick={() => deletePromo(p.id)} style={{ background: 'rgba(255,80,80,0.1)', border: '1px solid rgba(255,80,80,0.2)', color: '#ff6b6b', borderRadius: 8, padding: '5px 10px', cursor: 'pointer', fontSize: 12, fontWeight: 600, fontFamily: 'Space Grotesk, sans-serif' }}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
        {promos.length === 0 && (
          <div className="glass-card" style={{ padding: 32, textAlign: 'center' }}>
            <p style={{ color: 'var(--muted)', fontSize: 14 }}>No promo codes yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Admins ────────────────────────────────────────────────────────────
function Admins() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const grant = async () => {
    if (!email.trim()) return
    setLoading(true)
    setError('')
    setSuccess('')
    const { data: user } = await supabase.from('admin_roles').select('email').eq('email', email.trim()).single()
    if (user) { setError('This email already has admin access.'); setLoading(false); return }

    const { data: authUser } = await supabase.auth.admin?.listUsers?.() ?? { data: null }
    if (!authUser) {
      setError('Could not verify user. Make sure they have signed up first.')
      setLoading(false)
      return
    }

    const { error } = await supabase.from('admin_roles').insert({ email: email.trim() })
    if (error) setError(error.message)
    else { setSuccess(`Access granted to ${email}`); setEmail('') }
    setLoading(false)
  }

  return (
    <div>
      <div className="glass-card" style={{ padding: '24px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: 'var(--surface)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Users size={15} color="var(--muted)" />
          </div>
          <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 17, fontWeight: 700 }}>Authorize admin</h3>
        </div>
        <p style={{ color: 'var(--muted)', fontSize: 13, marginBottom: 20 }}>Grant dashboard access to an existing account.</p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="field-input"
          placeholder="admin@example.com"
          style={{ marginBottom: 12 }}
        />
        {error && <p style={{ color: '#ff6b6b', fontSize: 13, marginBottom: 10 }}>{error}</p>}
        {success && <p style={{ color: 'var(--teal)', fontSize: 13, marginBottom: 10 }}>{success}</p>}
        <button onClick={grant} disabled={loading} className="btn-primary" style={{ width: '100%' }}>
          <Users size={14} /> {loading ? 'Granting...' : 'Grant access'}
        </button>
      </div>
    </div>
  )
}

// ── Main Admin ────────────────────────────────────────────────────────
export default function Admin() {
  const [authed, setAuthed] = useState(false)
  const [checking, setChecking] = useState(true)
  const [tab, setTab] = useState<Tab>('overview')
  const [orders, setOrders] = useState<Order[]>([])
  const [upsells, setUpsells] = useState<Upsell[]>([])

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) checkAdmin(data.session.user.id)
      else setChecking(false)
    })
  }, [])

  const checkAdmin = async (userId: string) => {
    const { data } = await supabase.from('admin_roles').select('id').eq('user_id', userId).single()
    setAuthed(!!data)
    setChecking(false)
    if (data) loadData()
  }

  const loadData = async () => {
    const [{ data: o }, { data: u }] = await Promise.all([
      supabase.from('orders').select('*').order('created_at', { ascending: false }),
      supabase.from('upsells').select('*').order('created_at', { ascending: false }),
    ])
    if (o) setOrders(o)
    if (u) setUpsells(u)
  }

  const updateOrderStatus = async (id: string, status: Order['status']) => {
    await supabase.from('orders').update({ status }).eq('id', id)
    setOrders((prev) => prev.map((o) => o.id === id ? { ...o, status } : o))
  }

  const logout = async () => {
    await supabase.auth.signOut()
    setAuthed(false)
  }

  if (checking) {
    return (
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'var(--muted)' }}>Loading...</p>
      </main>
    )
  }

  if (!authed) return <AdminLogin onLogin={() => { setAuthed(true); loadData() }} />

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={15} /> },
    { id: 'orders', label: 'Orders', icon: <ShoppingBag size={15} /> },
    { id: 'inventory', label: 'Inventory', icon: <Package size={15} /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart2 size={15} /> },
    { id: 'promos', label: 'Promos', icon: <Tag size={15} /> },
    { id: 'admins', label: 'Admins', icon: <Users size={15} /> },
  ]

  return (
    <main style={{ paddingTop: 90, minHeight: '100vh' }}>
      <section style={{ padding: '24px 16px 80px', maxWidth: 800, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', color: 'var(--muted)', fontFamily: 'Space Grotesk, sans-serif', textTransform: 'uppercase', marginBottom: 4 }}>ADMIN</p>
            <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 32, fontWeight: 700, marginBottom: 4 }}>Dashboard</h1>
            <p style={{ color: 'var(--muted)', fontSize: 14 }}>Manage orders, upsells, promos, and analytics.</p>
          </div>
          <button onClick={logout} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '8px 14px', color: 'var(--muted)', fontSize: 13, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
            <LogOut size={14} /> Sign out
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 24 }}>
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '8px 14px', borderRadius: 10, border: '1px solid',
                borderColor: tab === t.id ? 'var(--border-strong)' : 'transparent',
                background: tab === t.id ? 'var(--surface)' : 'transparent',
                color: tab === t.id ? 'var(--text)' : 'var(--muted)',
                fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: 13, cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {tab === 'overview' && <Overview orders={orders} upsells={upsells} />}
        {tab === 'orders' && <Orders orders={orders} onStatusChange={updateOrderStatus} />}
        {tab === 'inventory' && <UpsellsTab upsells={upsells} onRefresh={loadData} />}
        {tab === 'analytics' && <Analytics orders={orders} />}
        {tab === 'promos' && <Promos />}
        {tab === 'admins' && <Admins />}
      </section>
    </main>
  )
}