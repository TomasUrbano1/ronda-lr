import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { name, city, category, whatsapp, instagram, bio } = await req.json()

  const slug = String(category).toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/\s+/g, '-')
  let category_id: string | undefined

  const { data: cat } = await supabase!
    .from('categories')
    .select('id,slug,name')
    .or(`slug.eq.${slug},name.eq.${category}`)
    .maybeSingle()

  if (cat?.id) category_id = cat.id

  const { error } = await supabase!
    .from('vendors')
    .insert([{ name, city, category_id, whatsapp, instagram, bio, is_approved: false }])

  if (error) throw error

  return NextResponse.json({ ok: true })
}