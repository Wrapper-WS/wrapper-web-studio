export type Currency = 'NGN' | 'GHS' | 'KES' | 'ZAR' | 'UGX' | 'TZS' | 'FCFA' | 'RWF' | 'ETB' | 'USD'

export type RegionPrices = {
  starter: number
  'starter-plus': number
  business: number
  pro: number
  custom: number
}

export type Region = {
  country: string
  countryCode: string
  currency: Currency
  symbol: string
  prices: RegionPrices
}

// Master pricing table — confirmed rates per country/currency.
const REGION_MAP: Record<string, Region> = {
  NG: {
    country: 'Nigeria', countryCode: 'NG', currency: 'NGN', symbol: '₦',
    prices: { starter: 50000, 'starter-plus': 80000, business: 150000, pro: 250000, custom: 150000 },
  },
  GH: {
    country: 'Ghana', countryCode: 'GH', currency: 'GHS', symbol: 'GH₵',
    prices: { starter: 600, 'starter-plus': 1200, business: 2500, pro: 5000, custom: 2500 },
  },
  KE: {
    country: 'Kenya', countryCode: 'KE', currency: 'KES', symbol: 'KSh',
    prices: { starter: 4500, 'starter-plus': 9000, business: 22000, pro: 45000, custom: 22000 },
  },
  ZA: {
    country: 'South Africa', countryCode: 'ZA', currency: 'ZAR', symbol: 'R',
    prices: { starter: 900, 'starter-plus': 1800, business: 4500, pro: 9000, custom: 4500 },
  },
  UG: {
    country: 'Uganda', countryCode: 'UG', currency: 'UGX', symbol: 'UGX',
    prices: { starter: 95000, 'starter-plus': 195000, business: 490000, pro: 980000, custom: 490000 },
  },
  TZ: {
    country: 'Tanzania', countryCode: 'TZ', currency: 'TZS', symbol: 'TZS',
    prices: { starter: 65000, 'starter-plus': 135000, business: 340000, pro: 680000, custom: 340000 },
  },
  CM: {
    country: 'Cameroon', countryCode: 'CM', currency: 'FCFA', symbol: 'FCFA',
    prices: { starter: 30000, 'starter-plus': 60000, business: 145000, pro: 290000, custom: 145000 },
  },
  RW: {
    country: 'Rwanda', countryCode: 'RW', currency: 'RWF', symbol: 'RWF',
    prices: { starter: 35000, 'starter-plus': 70000, business: 175000, pro: 350000, custom: 175000 },
  },
  ET: {
    country: 'Ethiopia', countryCode: 'ET', currency: 'ETB', symbol: 'ETB',
    prices: { starter: 2500, 'starter-plus': 5000, business: 12500, pro: 25000, custom: 12500 },
  },
}

// "Rest of Africa" — any African country not explicitly listed above.
const REST_OF_AFRICA: Region = {
  country: 'Rest of Africa', countryCode: 'XA', currency: 'USD', symbol: '$',
  prices: { starter: 25, 'starter-plus': 55, business: 130, pro: 260, custom: 130 },
}

// Non-Africa fallback (EU, US, and everywhere else).
const DEFAULT_REGION: Region = {
  country: 'International', countryCode: 'XX', currency: 'USD', symbol: '$',
  prices: { starter: 99, 'starter-plus': 149, business: 349, pro: 699, custom: 349 },
}

// Other African countries that fall under the "Rest of Africa" USD rate.
const REST_OF_AFRICA_CODES = [
  'CI', 'SN', 'MZ', 'MW', 'ZM', 'ZW', 'AO', 'BJ', 'BF', 'TD', 'CD', 'EG',
  'GM', 'LR', 'ML', 'MR', 'MA', 'NE', 'SL', 'SO', 'SD', 'TG', 'TN',
]

export function getRegionByCode(countryCode: string): Region {
  const code = countryCode.toUpperCase()
  if (REGION_MAP[code]) return REGION_MAP[code]
  if (REST_OF_AFRICA_CODES.includes(code)) return { ...REST_OF_AFRICA, countryCode: code }
  return DEFAULT_REGION
}

export function formatRegionPrice(amount: number, region: Region): string {
  const { currency } = region
  if (currency === 'NGN') return `₦${amount.toLocaleString()}`
  if (currency === 'GHS') return `GH₵${amount.toLocaleString()}`
  if (currency === 'KES') return `KSh ${amount.toLocaleString()}`
  if (currency === 'ZAR') return `R${amount.toLocaleString()}`
  if (currency === 'UGX') return `UGX ${amount.toLocaleString()}`
  if (currency === 'TZS') return `TZS ${amount.toLocaleString()}`
  if (currency === 'FCFA') return `FCFA ${amount.toLocaleString()}`
  if (currency === 'RWF') return `RWF ${amount.toLocaleString()}`
  if (currency === 'ETB') return `ETB ${amount.toLocaleString()}`
  return `$${amount.toLocaleString()}`
}

export { DEFAULT_REGION, REST_OF_AFRICA }
export type { Region as RegionType }

// ── Upsell/service pricing ──────────────────────────────────────────
// Curated services (seeded via SQL) carry an exact per-currency price
// map researched for that market. Any ad-hoc service an admin creates
// manually through the dashboard won't have that map — for those we
// fall back to scaling proportionally off the Business plan price,
// so a reasonable regional price still shows without extra admin work.
const NGN_BUSINESS_BASELINE = 150000

function niceRound(value: number, currency: Currency): number {
  if (currency === 'NGN') return Math.round(value / 500) * 500
  if (currency === 'KES') return Math.round(value / 100) * 100
  if (currency === 'GHS') return Math.round(value / 5) * 5
  if (currency === 'ZAR') return Math.round(value / 10) * 10
  if (currency === 'UGX' || currency === 'TZS' || currency === 'FCFA' || currency === 'RWF') {
    return Math.round(value / 1000) * 1000
  }
  if (currency === 'ETB') return Math.round(value / 50) * 50
  // USD
  return value >= 50 ? Math.round(value / 5) * 5 : Math.max(1, Math.round(value))
}

export function getUpsellPrice(ngnBasePrice: number, region: Region): number {
  if (region.currency === 'NGN') return ngnBasePrice
  const ratio = region.prices.business / NGN_BUSINESS_BASELINE
  const raw = ngnBasePrice * ratio
  return niceRound(raw, region.currency)
}

// Reads the curated per-currency price map on a service if present,
// otherwise falls back to proportional conversion from its NGN price.
export function getServicePrice(
  service: { price: number; prices?: Record<string, number> | null },
  region: Region
): number {
  const exact = service.prices?.[region.currency]
  if (typeof exact === 'number') return exact
  return getUpsellPrice(service.price, region)
}