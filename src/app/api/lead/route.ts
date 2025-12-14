import { NextResponse } from 'next/server'
import { supabase, hasSupabase } from '@/lib/supabase'

function code(n=4){ const ABC='ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; let s=''; for(let i=0;i<n;i++) s+=ABC[Math.floor(Math.random()*ABC.length)]; return `RN-${s}` }

export async function POST(req:Request){
  try{
    const { vendor_id, product_id, utm } = await req.json()
    if(!vendor_id || !product_id) return NextResponse.json({error:'missing fields'},{status:400})
    const leadCode = code()
    if(hasSupabase){
      const { error } = await supabase.from('leads').insert([{ vendor_id, product_id, code: leadCode, utm }])
      if(error) throw error
    }
    return NextResponse.json({ ok:true, code: leadCode })
  }catch(e:any){
    return NextResponse.json({ error: e.message ?? 'server error' }, { status: 500 })
  }
}
