'use client'  // Necesario para usar el hook del carrito

import { useCart } from '@/hooks/useCart'

type ProductCardProps = {
  id: string
  name: string
  price: number
  description: string
  image: string
  whatsapp?: string
  vendor?: {
    name: string
    whatsapp: string
  }
}

export default function ProductCard({ id, name, price, description, image, whatsapp, vendor }: ProductCardProps) {
  const { addItem } = useCart()

  const whatsappLink = whatsapp || `https://wa.me/?text=Hola! Me interesa ${encodeURIComponent(name)} - (R)onda La Rioja`

  const imageSrc = image && image.trim() !== '' 
    ? image 
    : 'https://placehold.co/600x400/orange/white?text=(R)onda+La+Rioja&font=inter'

  const handleAddToCart = () => {
    addItem(
      { id, title: name, price, description, image_url: image },
      vendor || { name: 'Emprendedor local', whatsapp: '5493800000000' }
    )
    alert('¡Agregado al carrito!')  // Mensaje temporal para que veas que funciona
  }

  return (
    <div className="bg-white rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)] overflow-hidden flex flex-col h-full transition-all duration-300">
      <div className="relative h-64 w-full bg-gray-100">
        <img
          src={imageSrc}
          alt={name}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = 'https://placehold.co/600x400/orange/white?text=(R)onda+La+Rioja&font=inter'
          }}
        />
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-[#2D2D2D] mb-2 line-clamp-2">{name}</h3>
        <p className="text-[#666666] text-sm mb-4 line-clamp-3 flex-1">{description}</p>
        <div className="flex justify-between items-center mb-6">
          <span className="text-3xl font-bold text-[#FF6B35]">${price.toLocaleString('es-AR')}</span>
        </div>

        {/* BOTÓN AGREGAR AL CARRITO (nuevo) */}
        <button
          onClick={handleAddToCart}
          className="w-full bg-[#FF6B35] hover:bg-[#E55A2B] text-white text-center py-4 rounded-full font-semibold transition-all shadow-[0_4px_16px_rgba(255,107,53,0.4)] mb-4"
        >
          Agregar al carrito
        </button>

        {/* BOTÓN WHATSAPP DIRECTO */}
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center text-[#FF6B35] font-semibold py-2 border border-[#FF6B35] rounded-full hover:bg-[#FF6B35]/10 transition-all"
        >
          O pedir directo por WhatsApp
        </a>
      </div>
      <div className="px-6 pb-4 text-center text-xs text-[#999999]">
        Hecho con ❤️ en La Rioja · (R)onda
      </div>
    </div>
  )
}