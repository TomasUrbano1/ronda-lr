import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const formData = await req.formData()
  const secret = formData.get('secret') as string
  const vendor_id = formData.get('vendor_id') as string

  const adminSecret = process.env.ADMIN_SECRET
  if (secret !== adminSecret) return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })

  const { error } = await supabase!
    .from('vendors')
    .update({ is_approved: true })
    .eq('id', vendor_id)

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 })

  return NextResponse.redirect(new URL('/admin', req.url))
}