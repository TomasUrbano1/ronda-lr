import { supabase } from '@/lib/supabase'

async function fetchPending(){
  const { data } = await supabase.from('vendors').select('id,name,city,whatsapp,instagram,is_approved').eq('is_approved', false).order('created_at',{ascending:true})
  return data ?? []
}

export default async function AdminPage(){
  const pending = await fetchPending()
  return (
    <main className="container py-8">
      <h1 className="text-2xl font-bold mb-4" style={{fontFamily:'Poppins'}}>Admin — Aprobación de vendedores</h1>
      <form action="/api/admin/approve" method="post" className="card flex flex-col gap-3 mb-6">
        <label className="text-sm">Password admin</label>
        <input name="secret" type="password" className="rounded-xl border p-2" placeholder="ADMIN_SECRET"/>
        <label className="text-sm">Vendor ID a aprobar</label>
        <input name="vendor_id" className="rounded-xl border p-2" placeholder="uuid del vendor"/>
        <button className="btn btn-primary w-fit">Aprobar</button>
      </form>

      <h2 className="font-semibold mb-3" style={{fontFamily:'Poppins'}}>Pendientes</h2>
      <div className="grid gap-3">
        {pending.map((v:any)=> (
          <div key={v.id} className="card">
            <div className="font-semibold">{v.name}</div>
            <div className="text-sm text-neutral-700">{v.city} • {v.whatsapp} • {v.instagram || '-'}</div>
            <div className="text-xs mt-2">ID: {v.id}</div>
          </div>
        ))}
        {pending.length===0 && <div className="text-neutral-600">No hay pendientes.</div>}
      </div>
    </main>
  )
}
