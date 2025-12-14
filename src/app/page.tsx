'use client'

import CategoryGrid from '@/components/CategoryGrid'
import { useCart } from '@/hooks/useCart'
import { useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'  // <--- Import del client de Supabase
import { useEffect, useState } from 'react'

export default function HomePage() {
  const { addItem } = useCart()
  const searchParams = useSearchParams()
  const selectedCategory = searchParams.get('cat') || 'todas'

  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true)

      // Cargar productos
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('id, title, description, price, image_url, category, vendor_id')

      if (productsError) {
        console.error('Error cargando productos:', productsError)
        setProducts([])
        setLoading(false)
        return
      }

      // Cargar vendedores aprobados
      const { data: approvedVendors, error: vendorsError } = await supabase
        .from('vendors')
        .select('id, name, whatsapp')
        .eq('approved', true)

      if (vendorsError) {
        console.error('Error cargando vendedores:', vendorsError)
        setProducts([])
        setLoading(false)
        return
      }

      const approvedVendorIds = approvedVendors?.map(v => v.id) || []

      // Unir productos con vendedores aprobados
      const filteredProducts = (productsData || [])
        .filter(p => approvedVendorIds.includes(p.vendor_id))
        .map(p => {
          const vendor = approvedVendors?.find(v => v.id === p.vendor_id)
          return {
            ...p,
            vendor: vendor || { name: 'Emprendedor local', whatsapp: '5493800000000' }
          }
        })

      // Filtro por categoría
      const finalProducts = selectedCategory === 'todas'
        ? filteredProducts
        : filteredProducts.filter(p => p.category === selectedCategory)

      setProducts(finalProducts)
      setLoading(false)
    }

    fetchProducts()
  }, [selectedCategory])

  const handleAddToCart = (product: any) => {
    addItem(
      { id: product.id, title: product.title, price: product.price, description: product.description, image_url: product.image_url },
      product.vendor
    )
    alert('¡Agregado al carrito!')
  }

  const categoryTitle = selectedCategory === 'todas'
    ? 'Productos destacados en La Rioja'
    : `Productos de ${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}`

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* HERO */}
      <section className="relative bg-gradient-to-br from-[#FF6B35]/10 to-[#FF8A00]/5 rounded-3xl p-10 md:p-20 text-center shadow-[0_12px_32px_rgba(0,0,0,0.12)] mx-4 my-8 overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-[#FF6B35] mb-6">
            Descubrí productos hechos cerca tuyo
          </h1>
          <p className="text-lg md:text-xl text-[#666666] mb-10 max-w-2xl mx-auto">
            Emprendedores locales de La Rioja: desayunos, artesanías, regalos y más. Pedí directo por WhatsApp.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a href="/quiero-vender" className="bg-[#FF6B35] hover:bg-[#E55A2B] text-white font-bold px-10 py-5 rounded-full transition-all shadow-[0_4px_16px_rgba(255,107,53,0.4)]">
              Quiero vender
            </a>
            <a href="/catalogo" className="bg-white border-2 border-[#FF6B35] text-[#FF6B35] hover:bg-[#FF6B35]/10 font-bold px-10 py-5 rounded-full transition-all">
              Explorar catálogo
            </a>
          </div>
        </div>
        <div className="absolute -top-20 -right-20 text-9xl font-black text-[#FF6B35] opacity-10 pointer-events-none">
          (R)
        </div>
      </section>

      {/* CATEGORÍAS */}
      <CategoryGrid />

      {/* PRODUCTOS DESTACADOS (desde Supabase) */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <h2 className="text-4xl font-bold text-[#FF6B35] text-center mb-12">
          {categoryTitle}
        </h2>

        {loading ? (
          <p className="text-center text-[#666666] text-xl py-20">
            Cargando productos...
          </p>
        ) : products.length === 0 ? (
          <p className="text-center text-[#666666] text-xl py-20">
            No hay productos en esta categoría aún.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)] overflow-hidden flex flex-col transition-all duration-300">
                <div className="relative h-64 w-full bg-gray-100">
                  <img
                    src={product.image_url}
                    alt={product.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = 'https://placehold.co/600x400/orange/white?text=Imagen+no+disponible'
                    }}
                  />
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-[#2D2D2D] mb-2 line-clamp-2">{product.title}</h3>
                  <p className="text-[#666666] text-sm mb-4 line-clamp-3 flex-1">{product.description}</p>
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-3xl font-bold text-[#FF6B35]">${product.price.toLocaleString('es-AR')}</span>
                  </div>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-[#FF6B35] hover:bg-[#E55A2B] text-white text-center py-4 rounded-full font-semibold transition-all shadow-[0_4px_16px_rgba(255,107,53,0.4)] mb-4"
                  >
                    Agregar al carrito
                  </button>

                  <a
                    href={`https://wa.me/${product.vendor?.whatsapp || '5493800000000'}?text=Hola! Me interesa ${encodeURIComponent(product.title)} - (R)onda La Rioja`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center text-[#FF6B35] font-semibold py-2 border border-[#FF6B35] rounded-full hover:bg-[#FF6B35]/10 transition-all"
                  >
                    O pedir directo por WhatsApp
                  </a>

                  <div className="mt-4 text-center text-sm text-[#999999]">
                    Por {product.vendor?.name || 'Emprendedor local'} - La Rioja
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}