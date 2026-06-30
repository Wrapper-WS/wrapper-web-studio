export type Plan = {
  id: string
  name: string
  tagline: string
  price: number
  features: string[]
  highlight?: boolean
  badge?: string
  description: string
  whatToExpect: string[]
  domainNote?: string
  customPricing?: boolean
}

export const plans: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    tagline: 'Launch fast. Sell today.',
    price: 50000,
    features: ['Subdomain', 'Basic design', 'WhatsApp ordering'],
    description: 'A clean, fast store to get you selling immediately.',
    whatToExpect: [
      'A professionally designed storefront',
      'WhatsApp-based ordering system',
      'Mobile-first layout',
      'Delivery in 3–5 days',
    ],
  },
  {
    id: 'starter-plus',
    name: 'Starter+',
    tagline: 'Your own .com, ready to grow.',
    price: 80000,
    features: ['Everything in Starter', '.com domain', 'Priority setup'],
    description: 'Everything in Starter, plus your own .com domain and faster turnaround.',
    whatToExpect: [
      'Custom .com domain (first year included)',
      'Priority build queue',
      'Professional email setup guidance',
      'Delivery in 2–4 days',
    ],
    domainNote: 'Custom domains require annual renewal. After the first year, domain renewal costs ₦30,000/year. We send renewal reminders before expiry.',
  },
  {
    id: 'business',
    name: 'Business',
    tagline: 'A real store experience.',
    price: 150000,
    features: [
      'Everything in Starter+',
      'Dynamic homepage',
      'Recently viewed',
      'Full cart',
      'Smooth animations',
    ],
    highlight: true,
    badge: 'MOST POPULAR',
    description: 'A full eCommerce experience designed to convert serious shoppers.',
    whatToExpect: [
      'Dynamic homepage that updates with your catalog',
      'Recently viewed products section',
      'Full add-to-cart and checkout flow',
      'Polished motion across the experience',
      'Delivery in 5–7 days',
    ],
    domainNote: 'Custom domains require annual renewal. After the first year, domain renewal costs ₦30,000/year. We send renewal reminders before expiry.',
  },
  {
    id: 'pro',
    name: 'Pro',
    tagline: 'Premium-tier, end-to-end.',
    price: 250000,
    features: [
      'Everything in Business',
      'Smart product suggestions',
      'Persistent cart across devices',
      'Premium UI polish',
    ],
    description: 'Our most complete build — for brands serious about conversions.',
    whatToExpect: [
      'AI-powered product suggestions',
      'Cart that persists across sessions and devices',
      'Premium micro-interactions and UI polish',
      'Dedicated build support',
      'Delivery in 7–10 days',
    ],
    domainNote: 'Custom domains require annual renewal. After the first year, domain renewal costs ₦30,000/year. We send renewal reminders before expiry.',
  },
  {
    id: 'custom',
    name: 'Custom Website',
    tagline: 'Built around exactly what you need — no template, no limits.',
    price: 0,
    customPricing: true,
    features: [
      'Custom design from scratch',
      'Tailored page structure',
      'Brand-led visuals & motion',
      'Built for your specific goals',
    ],
    description: 'For organizations that need more than a store — schools, hospitals, clinics, NGOs, churches, real estate firms, agencies, and enterprises with unique workflows, booking systems, dashboards, or large catalogs. If your project needs real infrastructure planning, this is where we scope it properly and price it fairly.',
    whatToExpect: [
      'Deep discovery session to understand your brand and operations',
      'Custom visual identity and layout design',
      'Infrastructure scoped to your actual needs (booking systems, dashboards, portals, large catalogs, and more)',
      'Hand-crafted animations and interactions',
      'A transparent quote after we understand your scope — timeline discussed based on what you need',
    ],
  },
]

export function getPlan(id: string): Plan | undefined {
  return plans.find((p) => p.id === id)
}

export function formatPrice(amount: number): string {
  return `₦${amount.toLocaleString()}`
}