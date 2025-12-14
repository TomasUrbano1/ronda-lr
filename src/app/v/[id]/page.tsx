import ProductCard from '@/components/ProductCard'
import { supabase, hasSupabase } from '@/lib/supabase'
import { mockProducts, mockVendors } from '@/lib/mock'

async function fetchVendor(id:string){
  if(!hasSupabase) return mockVendors.find(v=>v.id===id)||null
  const { data } = await supabase.from('vendors').select('*').eq('id', id).single()
  return data
}
async function fetchProductsByVendor(id:string){
  if(!hasSupabase) return mockProducts.filter(p=>p.vendor_id===id)
  const { data } = await supabase.from('products').select('*').eq('vendor_id', id).eq('is_active', true)
  return data ?? []
}

export default async function VendorPage({ params:{id} }:{ params:{id:string} }){
  const vendor:any = await fetchVendor(id)
  const products:any[] = await fetchProductsByVendor(id)
  if(!vendor) return <div className="container py-8">Vendedor no encontrado.</div>

  return (
    <main className="container py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold" style={{fontFamily:'Poppins'}}>{vendor.name}</h1>
        <p className="text-neutral-700">{vendor.city}</p>
        {vendor.bio && <p className="mt-2">{vendor.bio}</p>}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((p:any)=>(
          <ProductCard key={p.id}
            id={p.id} title={p.title} price={p.price}
            description={p.description} image_url={p.image_url}
            vendor={{id: vendor.id, name: vendor.name, whatsapp: vendor.whatsapp}} />
        ))}
      </div>
    </main>
  )
}
