import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'
import { randomBytes } from 'crypto'

function code() {
  return randomBytes(3).toString('hex').toUpperCase()
}

export async function POST(req: Request) {
  const { vendor_id, product_id, utm } = await req.json()

  const hasSupabase = !!supabase

  const leadCode = code()

  if (hasSupabase) {
    const { error } = await supabase!.from('leads').insert([{ vendor_id, product_id, code: leadCode, utm }])
    if (error) throw error
  }

  return NextResponse.json({ ok: true, code: leadCode })
}