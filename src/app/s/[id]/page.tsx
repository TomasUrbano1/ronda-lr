import ProductCard from '@/components/ProductCard'
import SectionTabs from '@/components/SectionTabs'
import { supabase, hasSupabase } from '@/lib/supabase'
import { mockVendors, mockProducts } from '@/lib/mock'

async function getVendor(id: string) {
  if (!hasSupabase) return mockVendors.find(v => v.id === id) || null
  const { data } = await supabase!
    .from('vendors')
    .select('*')
    .eq('id', id)
    .single()
  return data
}

async function getSections(vendorId: string) {
  if (!hasSupabase) return [{ id: 's1', name: 'Desayunos', slug: 'desayunos' }, { id: 's2', name: 'Boxes', slug: 'boxes' }]
  const { data } = await supabase!
    .from('vendor_sections')
    .select('id,name,slug,sort')
    .eq('vendor_id', vendorId)
    .order('sort')
  return data ?? []
}

async function getProducts(vendorId: string) {
  if (!hasSupabase) return mockProducts.filter(p => p.vendor_id === vendorId).map(p => ({ ...p, section_id: null }))
  const { data } = await supabase!
    .from('products')
    .select('id,title,price,description,image_url,section_id')
    .eq('vendor_id', vendorId)
    .eq('is_active', true)
    .order('title')
  return data ?? []
}

export default async function StorePage({ params: { id }, searchParams }: { params: { id: string }, searchParams?: { sec?: string } }) {
  const vendor: any = await getVendor(id)
  if (!vendor) return <div className="container py-8">Tienda no encontrada.</div>
  const [sections, products] = await Promise.all([getSections(id), getProducts(id)])

  const activeSlug = searchParams?.sec || (sections[0]?.slug ?? '')
  const activeSection = sections.find((s: any) => s.slug === activeSlug)
  const filtered = activeSection ? products.filter((p: any) => p.section_id === activeSection.id) : products

  return (
    <main className="container py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold" style={{ fontFamily: 'Poppins' }}>{vendor.name}</h1>
        <p className="text-neutral-700">{vendor.city}</p>
        {vendor.bio && <p className="text-neutral-700 mt-1">{vendor.bio}</p>}
      </div>

      {sections.length > 0 && <SectionTabs sections={sections as any} />}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filtered.map((p: any) => (
          <ProductCard
            key={p.id}
            id={p.id}
            title={p.title}
            price={p.price}
            description={p.description}
            image_url={p.image_url}
            vendor={{ id: vendor.id, name: vendor.name, whatsapp: vendor.whatsapp }}
          />
        ))}
        {filtered.length === 0 && (
          <div className="text-neutral-600">No hay productos en esta sección.</div>
        )}
      </div>
    </main>
  )
}