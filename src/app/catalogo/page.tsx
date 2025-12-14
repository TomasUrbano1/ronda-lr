'use client'

import { useCart } from '@/hooks/useCart'
import { useSearchParams } from 'next/navigation'

const mockProducts = [
  {
    id: 'p1',
    vendor_id: 'v1',
    title: 'Bandeja desayuno clásica',
    price: 12000,
    description: 'Incluye jugo, café, medialunas',
    image_url: '/images/products/bandeja-clasica.jpg',
    category: 'comida'
  },
  {
    id: 'p2',
    vendor_id: 'v1',
    title: 'Bandeja sorpresa',
    price: 16000,
    description: 'Personalizable con dedicatoria',
    image_url: '/images/products/bandeja-sorpresa.jpg',
    category: 'comida'
  },
  {
    id: 'p3',
    vendor_id: 'v2',
    title: 'Camino de mesa tejido',
    price: 9000,
    description: 'Algodón 100%',
    image_url: '/images/products/tejido.png',
    category: 'artesanias'
  },
]

const mockVendors = [
  { id: 'v1', name: 'Desayunos La Vida', whatsapp: '5493805000000' },
  { id: 'v2', name: 'Kuntur Artesanías', whatsapp: '5493805111111' },
]

export default function CatalogoPage() {
  const { addItem } = useCart()
  const searchParams = useSearchParams()
  const selectedCategory = searchParams.get('cat') || 'todas'

  const products = mockProducts
    .map(p => {
      const vendor = mockVendors.find(v => v.id === p.vendor_id)
      return {
        ...p,
        vendor: vendor || { name: 'Emprendedor local', whatsapp: '5493800000000' }
      }
    })
    .filter(p => selectedCategory === 'todas' || p.category === selectedCategory)

  const handleAddToCart = (product: any) => {
    addItem(
      { id: product.id, title: product.title, price: product.price, description: product.description, image_url: product.image_url },
      product.vendor
    )
    alert('¡Agregado al carrito!')
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-24 pb-24 md:pb-0">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-5xl font-bold text-[#FF6B35] text-center mb-12">
          Catálogo completo
        </h1>

        {products.length === 0 ? (
          <p className="text-center text-[#666666] text-xl py-20">
            No hay productos en esta categoría aún.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
      </div>
    </div>
  )
}