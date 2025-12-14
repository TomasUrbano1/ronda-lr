import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(req:Request){
  try{
    const { name, city, category, whatsapp, instagram, bio } = await req.json()
    if(!name || !city || !category || !whatsapp) return NextResponse.json({error:'missing fields'},{status:400})
    const slug = String(category).toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu,'').replace(/\s+/g,'-')
    let category_id:string|undefined
    const { data:cat } = await supabase.from('categories').select('id,slug,name').or(`slug.eq.${slug},name.eq.${category}`).maybeSingle()
    if(cat?.id) category_id = cat.id
    const { error } = await supabase.from('vendors').insert([{ name, city, category_id, whatsapp, instagram, bio, is_approved:false }])
    if(error) throw error
    return NextResponse.json({ ok:true })
  }catch(e:any){
    return NextResponse.json({ error: e.message ?? 'server error' }, { status:500 })
  }
}
