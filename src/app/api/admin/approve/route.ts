import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(req:Request){
  try{
    const form = await req.formData()
    const secret = form.get('secret')?.toString() || ''
    const vendor_id = form.get('vendor_id')?.toString() || ''
    if(!secret || !vendor_id) return NextResponse.json({ ok:false, error:'Missing fields' }, { status:400 })
    const adminSecret = process.env.ADMIN_SECRET
    if(secret !== adminSecret) return NextResponse.json({ ok:false, error:'Unauthorized' }, { status:401 })
    const { error } = await supabase.from('vendors').update({ is_approved:true }).eq('id', vendor_id)
    if(error) return NextResponse.json({ ok:false, error: error.message }, { status:500 })
    return NextResponse.redirect(new URL('/admin', req.url))
  }catch(e:any){
    return NextResponse.json({ ok:false, error: e.message ?? 'server error' }, { status:500 })
  }
}
