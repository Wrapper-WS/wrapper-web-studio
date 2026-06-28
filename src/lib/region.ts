export type Currency = 'NGN' | 'GHS' | 'KES' | 'ZAR' | 'USD'

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

// Country code → region config
const REGION_MAP: Record<string, Region> = {
  NG: {
    country: 'Nigeria', countryCode: 'NG', currency: 'NGN', symbol: '₦',
    prices: { starter: 50000, 'starter-plus': 80000, business: 150000, pro: 250000, custom: 150000 },
  },
  GH: {
    country: 'Ghana', countryCode: 'GH', currency: 'GHS', symbol: 'GH₵',
    prices: { starter: 600, 'starter-plus': 950, business: 2200, pro: 4500, custom: 2200 },
  },
  KE: {
    country: 'Kenya', countryCode: 'KE', currency: 'KES', symbol: 'KSh',
    prices: { starter: 5000, 'starter-plus': 8500, business: 18000, pro: 38000, custom: 18000 },
  },
  ZA: {
    country: 'South Africa', countryCode: 'ZA', currency: 'ZAR', symbol: 'R',
    prices: { starter: 1200, 'starter-plus': 1900, business: 4500, pro: 9000, custom: 4500 },
  },
  // USD - smaller African countries
  UG: {
    country: 'Uganda', countryCode: 'UG', currency: 'USD', symbol: '$',
    prices: { starter: 35, 'starter-plus': 60, business: 150, pro: 300, custom: 150 },
  },
  TZ: {
    country: 'Tanzania', countryCode: 'TZ', currency: 'USD', symbol: '$',
    prices: { starter: 35, 'starter-plus': 60, business: 150, pro: 300, custom: 150 },
  },
  CM: {
    country: 'Cameroon', countryCode: 'CM', currency: 'USD', symbol: '$',
    prices: { starter: 35, 'starter-plus': 60, business: 150, pro: 300, custom: 150 },
  },
  CI: {
    country: "Côte d'Ivoire", countryCode: 'CI', currency: 'USD', symbol: '$',
    prices: { starter: 35, 'starter-plus': 60, business: 150, pro: 300, custom: 150 },
  },
  SN: {
    country: 'Senegal', countryCode: 'SN', currency: 'USD', symbol: '$',
    prices: { starter: 35, 'starter-plus': 60, business: 150, pro: 300, custom: 150 },
  },
  MZ: {
    country: 'Mozambique', countryCode: 'MZ', currency: 'USD', symbol: '$',
    prices: { starter: 35, 'starter-plus': 60, business: 150, pro: 300, custom: 150 },
  },
  MW: {
    country: 'Malawi', countryCode: 'MW', currency: 'USD', symbol: '$',
    prices: { starter: 35, 'starter-plus': 60, business: 150, pro: 300, custom: 150 },
  },
  // Other African countries (by continent detection fallback)
  ET: { country: 'Ethiopia', countryCode: 'ET', currency: 'USD', symbol: '$', prices: { starter: 35, 'starter-plus': 60, business: 150, pro: 300, custom: 150 } },
  RW: { country: 'Rwanda', countryCode: 'RW', currency: 'USD', symbol: '$', prices: { starter: 35, 'starter-plus': 60, business: 150, pro: 300, custom: 150 } },
  ZM: { country: 'Zambia', countryCode: 'ZM', currency: 'USD', symbol: '$', prices: { starter: 35, 'starter-plus': 60, business: 150, pro: 300, custom: 150 } },
  ZW: { country: 'Zimbabwe', countryCode: 'ZW', currency: 'USD', symbol: '$', prices: { starter: 35, 'starter-plus': 60, business: 150, pro: 300, custom: 150 } },
  AO: { country: 'Angola', countryCode: 'AO', currency: 'USD', symbol: '$', prices: { starter: 35, 'starter-plus': 60, business: 150, pro: 300, custom: 150 } },
  BJ: { country: 'Benin', countryCode: 'BJ', currency: 'USD', symbol: '$', prices: { starter: 35, 'starter-plus': 60, business: 150, pro: 300, custom: 150 } },
  BF: { country: 'Burkina Faso', countryCode: 'BF', currency: 'USD', symbol: '$', prices: { starter: 35, 'starter-plus': 60, business: 150, pro: 300, custom: 150 } },
  TD: { country: 'Chad', countryCode: 'TD', currency: 'USD', symbol: '$', prices: { starter: 35, 'starter-plus': 60, business: 150, pro: 300, custom: 150 } },
  CD: { country: 'DR Congo', countryCode: 'CD', currency: 'USD', symbol: '$', prices: { starter: 35, 'starter-plus': 60, business: 150, pro: 300, custom: 150 } },
  EG: { country: 'Egypt', countryCode: 'EG', currency: 'USD', symbol: '$', prices: { starter: 35, 'starter-plus': 60, business: 150, pro: 300, custom: 150 } },
  GM: { country: 'Gambia', countryCode: 'GM', currency: 'USD', symbol: '$', prices: { starter: 35, 'starter-plus': 60, business: 150, pro: 300, custom: 150 } },
  LR: { country: 'Liberia', countryCode: 'LR', currency: 'USD', symbol: '$', prices: { starter: 35, 'starter-plus': 60, business: 150, pro: 300, custom: 150 } },
  ML: { country: 'Mali', countryCode: 'ML', currency: 'USD', symbol: '$', prices: { starter: 35, 'starter-plus': 60, business: 150, pro: 300, custom: 150 } },
  MR: { country: 'Mauritania', countryCode: 'MR', currency: 'USD', symbol: '$', prices: { starter: 35, 'starter-plus': 60, business: 150, pro: 300, custom: 150 } },
  MA: { country: 'Morocco', countryCode: 'MA', currency: 'USD', symbol: '$', prices: { starter: 35, 'starter-plus': 60, business: 150, pro: 300, custom: 150 } },
  NE: { country: 'Niger', countryCode: 'NE', currency: 'USD', symbol: '$', prices: { starter: 35, 'starter-plus': 60, business: 150, pro: 300, custom: 150 } },
  SL: { country: 'Sierra Leone', countryCode: 'SL', currency: 'USD', symbol: '$', prices: { starter: 35, 'starter-plus': 60, business: 150, pro: 300, custom: 150 } },
  SO: { country: 'Somalia', countryCode: 'SO', currency: 'USD', symbol: '$', prices: { starter: 35, 'starter-plus': 60, business: 150, pro: 300, custom: 150 } },
  SD: { country: 'Sudan', countryCode: 'SD', currency: 'USD', symbol: '$', prices: { starter: 35, 'starter-plus': 60, business: 150, pro: 300, custom: 150 } },
  TG: { country: 'Togo', countryCode: 'TG', currency: 'USD', symbol: '$', prices: { starter: 35, 'starter-plus': 60, business: 150, pro: 300, custom: 150 } },
  TN: { country: 'Tunisia', countryCode: 'TN', currency: 'USD', symbol: '$', prices: { starter: 35, 'starter-plus': 60, business: 150, pro: 300, custom: 150 } },
  // EU countries
  AT: { country: 'Austria', countryCode: 'AT', currency: 'USD', symbol: '$', prices: { starter: 99, 'starter-plus': 149, business: 349, pro: 699, custom: 349 } },
  BE: { country: 'Belgium', countryCode: 'BE', currency: 'USD', symbol: '$', prices: { starter: 99, 'starter-plus': 149, business: 349, pro: 699, custom: 349 } },
  HR: { country: 'Croatia', countryCode: 'HR', currency: 'USD', symbol: '$', prices: { starter: 99, 'starter-plus': 149, business: 349, pro: 699, custom: 349 } },
  CY: { country: 'Cyprus', countryCode: 'CY', currency: 'USD', symbol: '$', prices: { starter: 99, 'starter-plus': 149, business: 349, pro: 699, custom: 349 } },
  CZ: { country: 'Czech Republic', countryCode: 'CZ', currency: 'USD', symbol: '$', prices: { starter: 99, 'starter-plus': 149, business: 349, pro: 699, custom: 349 } },
  DK: { country: 'Denmark', countryCode: 'DK', currency: 'USD', symbol: '$', prices: { starter: 99, 'starter-plus': 149, business: 349, pro: 699, custom: 349 } },
  FI: { country: 'Finland', countryCode: 'FI', currency: 'USD', symbol: '$', prices: { starter: 99, 'starter-plus': 149, business: 349, pro: 699, custom: 349 } },
  FR: { country: 'France', countryCode: 'FR', currency: 'USD', symbol: '$', prices: { starter: 99, 'starter-plus': 149, business: 349, pro: 699, custom: 349 } },
  DE: { country: 'Germany', countryCode: 'DE', currency: 'USD', symbol: '$', prices: { starter: 99, 'starter-plus': 149, business: 349, pro: 699, custom: 349 } },
  GR: { country: 'Greece', countryCode: 'GR', currency: 'USD', symbol: '$', prices: { starter: 99, 'starter-plus': 149, business: 349, pro: 699, custom: 349 } },
  HU: { country: 'Hungary', countryCode: 'HU', currency: 'USD', symbol: '$', prices: { starter: 99, 'starter-plus': 149, business: 349, pro: 699, custom: 349 } },
  IE: { country: 'Ireland', countryCode: 'IE', currency: 'USD', symbol: '$', prices: { starter: 99, 'starter-plus': 149, business: 349, pro: 699, custom: 349 } },
  IT: { country: 'Italy', countryCode: 'IT', currency: 'USD', symbol: '$', prices: { starter: 99, 'starter-plus': 149, business: 349, pro: 699, custom: 349 } },
  LU: { country: 'Luxembourg', countryCode: 'LU', currency: 'USD', symbol: '$', prices: { starter: 99, 'starter-plus': 149, business: 349, pro: 699, custom: 349 } },
  NL: { country: 'Netherlands', countryCode: 'NL', currency: 'USD', symbol: '$', prices: { starter: 99, 'starter-plus': 149, business: 349, pro: 699, custom: 349 } },
  PL: { country: 'Poland', countryCode: 'PL', currency: 'USD', symbol: '$', prices: { starter: 99, 'starter-plus': 149, business: 349, pro: 699, custom: 349 } },
  PT: { country: 'Portugal', countryCode: 'PT', currency: 'USD', symbol: '$', prices: { starter: 99, 'starter-plus': 149, business: 349, pro: 699, custom: 349 } },
  RO: { country: 'Romania', countryCode: 'RO', currency: 'USD', symbol: '$', prices: { starter: 99, 'starter-plus': 149, business: 349, pro: 699, custom: 349 } },
  SK: { country: 'Slovakia', countryCode: 'SK', currency: 'USD', symbol: '$', prices: { starter: 99, 'starter-plus': 149, business: 349, pro: 699, custom: 349 } },
  SI: { country: 'Slovenia', countryCode: 'SI', currency: 'USD', symbol: '$', prices: { starter: 99, 'starter-plus': 149, business: 349, pro: 699, custom: 349 } },
  ES: { country: 'Spain', countryCode: 'ES', currency: 'USD', symbol: '$', prices: { starter: 99, 'starter-plus': 149, business: 349, pro: 699, custom: 349 } },
  SE: { country: 'Sweden', countryCode: 'SE', currency: 'USD', symbol: '$', prices: { starter: 99, 'starter-plus': 149, business: 349, pro: 699, custom: 349 } },
  GB: { country: 'United Kingdom', countryCode: 'GB', currency: 'USD', symbol: '$', prices: { starter: 99, 'starter-plus': 149, business: 349, pro: 699, custom: 349 } },
  // United States
  US: { country: 'United States', countryCode: 'US', currency: 'USD', symbol: '$', prices: { starter: 99, 'starter-plus': 149, business: 349, pro: 699, custom: 349 } },
  CA: { country: 'Canada', countryCode: 'CA', currency: 'USD', symbol: '$', prices: { starter: 99, 'starter-plus': 149, business: 349, pro: 699, custom: 349 } },
  AU: { country: 'Australia', countryCode: 'AU', currency: 'USD', symbol: '$', prices: { starter: 99, 'starter-plus': 149, business: 349, pro: 699, custom: 349 } },
}

// Default fallback for unlisted countries
const DEFAULT_REGION: Region = {
  country: 'International', countryCode: 'XX', currency: 'USD', symbol: '$',
  prices: { starter: 99, 'starter-plus': 149, business: 349, pro: 699, custom: 349 },
}

export function getRegionByCode(countryCode: string): Region {
  return REGION_MAP[countryCode.toUpperCase()] ?? DEFAULT_REGION
}

export function formatRegionPrice(amount: number, region: Region): string {
  const { symbol, currency } = region
  if (currency === 'NGN') return `₦${amount.toLocaleString()}`
  if (currency === 'GHS') return `GH₵${amount.toLocaleString()}`
  if (currency === 'KES') return `KSh ${amount.toLocaleString()}`
  if (currency === 'ZAR') return `R${amount.toLocaleString()}`
  // USD
  return `$${amount.toLocaleString()}`
}

export { DEFAULT_REGION }
export type { Region as RegionType }