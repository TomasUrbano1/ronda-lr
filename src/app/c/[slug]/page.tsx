import VendorListItem from '@/components/VendorListItem'
import { supabase, hasSupabase } from '@/lib/supabase'

async function getCategory(slug: string) {
  if (!hasSupabase) return { id: 'mock', name: slug.toUpperCase(), slug }
  const { data } = await supabase!
    .from('categories')
    .select('id,name,slug')
    .eq('slug', slug)
    .single()
  return data
}

async function getVendors(categoryId: string) {
  if (!hasSupabase) return [
    { id: 'v1', name: 'Desayunos La Vida', city: 'La Rioja', instagram: 'desayunoslavida' },
    { id: 'v2', name: 'Kuntur Artesanías', city: 'La Rioja', instagram: 'kuntur' },
  ]
  const { data } = await supabase!
    .from('vendors')
    .select('id,name,city,instagram,whatsapp')
    .eq('category_id', categoryId)
    .eq('is_approved', true)
    .order('name')
  return data ?? []
}

export default async function CategoryPage({ params: { slug } }: { params: { slug: string } }) {
  const category: any = await getCategory(slug)
  if (!category) return <div className="container py-8">Categoría no encontrada.</div>
  const vendors: any[] = await getVendors(category.id)

  return (
    <main className="container py-8">
      <h1 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Poppins' }}>
        {category.name}
      </h1>
      <p className="text-neutral-700 mb-6">Tiendas en esta categoría</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {vendors.map(v => (
          <VendorListItem key={v.id} v={v} />
        ))}
      </div>
    </main>
  )
}