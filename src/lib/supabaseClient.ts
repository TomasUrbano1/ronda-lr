// src/lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

// Variables de entorno (las pondremos en .env.local)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabasePublishableKey) {
  throw new Error('Faltan las claves de Supabase. Revisá tu .env.local – recomendada: sb_publishable_ para frontend')
}

// Cliente para frontend (home, login, carrito, etc.) – usa publishable o anon legacy
export const supabase = createClient(supabaseUrl, supabasePublishableKey)

// Cliente para backend/admin (CRUD completo, bypass RLS) – usa secret key (NO exponer en frontend!)
export const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.SUPABASE_SECRET_KEY || process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY || '',
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
)