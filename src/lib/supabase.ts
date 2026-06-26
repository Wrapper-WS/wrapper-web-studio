import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://endsqfdcxvuayloppswj.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVuZHNxZmRjeHZ1YXlsb3Bwc3dqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI0MDIyODgsImV4cCI6MjA5Nzk3ODI4OH0.LQUkLccnGoBaVkpCgjD1vce-z6ARC4sxkScPTcmHt_A'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export type Order = {
  id: string
  created_at: string
  plan_id: string
  plan_name: string
  plan_price: number
  promo_code?: string
  discount_amount: number
  final_price: number
  add_ons: AddOn[]
  business_name: string
  business_type: string
  products_services: string
  target_audience: string
  website_style: string
  preferred_colors: string
  color_variant?: string
  phone_number: string
  extra_notes?: string
  status: 'new' | 'in_progress' | 'ready' | 'done'
}

export type Upsell = {
  id: string
  created_at: string
  name: string
  description: string
  price: number
  features: string[]
  active: boolean
}

export type PromoCode = {
  id: string
  created_at: string
  code: string
  discount_percent: number
  expires_at?: string
  applies_to: string[]
  active: boolean
  uses: number
}

export type AddOn = {
  id: string
  name: string
  price: number
}