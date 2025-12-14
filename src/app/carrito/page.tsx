'use client'

import { useCart } from '@/hooks/useCart'
import Link from 'next/link'

export default function CarritoPage() {
  const { items, getTotalPrice, clearCart, removeItem } = useCart()

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] pt-24 pb-24 md:pb-0 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-8xl mb-6">🛒</div>
          <h1 className="text-3xl font-bold text-[#FF6B35] mb-4">Tu carrito está vacío</h1>
          <p className="text-[#666666] mb-8">
            Explorá productos y agregalos para pedir todo junto.
          </p>
          <Link
            href="/"
            className="bg-[#FF6B35] hover:bg-[#E55A2B] text-white font-bold px-10 py-4 rounded-full transition-all shadow-[0_4px_16px_rgba(255,107,53,0.4)] inline-block"
          >
            Volver a explorar
          </Link>
        </div>
      </div>
    )
  }

  // Mensaje para WhatsApp con la lista completa
  const whatsappMessage = items
    .map((item) => `${item.quantity}x ${item.title} - $${(item.price * item.quantity).toLocaleString('es-AR')}`)
    .join('%0A') + `%0A%0ATotal: $${getTotalPrice().toLocaleString('es-AR')}%0A%0AGracias por elegir (R)onda La Rioja`

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-24 pb-24 md:pb-0 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-[#FF6B35] text-center mb-10">
          Tu carrito ({items.length} {items.length === 1 ? 'producto' : 'productos'})
        </h1>

        <div className="space-y-6 mb-10">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.08)] p-6 flex items-center gap-6">
              <div className="relative w-24 h-24 bg-gray-100 rounded-xl overflow-hidden">
                <img
                  src={item.image_url || 'https://placehold.co/200x200/orange/white?text=(R)onda'}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-bold text-[#2D2D2D] mb-1">{item.title}</h3>
                <p className="text-[#666666] text-sm mb-2">Cantidad: {item.quantity}</p>
                <p className="text-[#666666] text-sm">Por {item.vendor.name}</p>
              </div>

              <div className="text-right">
                <p className="text-2xl font-bold text-[#FF6B35] mb-4">
                  ${(item.price * item.quantity).toLocaleString('es-AR')}
                </p>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-[#FF6B35] text-sm underline hover:no-underline"
                >
                  Quitar
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-[0_12px_32px_rgba(0,0,0,0.12)] p-8 text-center">
          <p className="text-3xl font-bold text-[#FF6B35] mb-8">
            Total: ${getTotalPrice().toLocaleString('es-AR')}
          </p>

          <a
            href={`https://wa.me/?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#FF6B35] hover:bg-[#E55A2B] text-white font-bold px-12 py-6 rounded-full text-xl transition-all shadow-[0_4px_16px_rgba(255,107,53,0.4)] inline-block mb-6"
          >
            Enviar pedido por WhatsApp
          </a>

          <button
            onClick={clearCart}
            className="block mx-auto text-[#666666] underline hover:no-underline"
          >
            Vaciar carrito
          </button>
        </div>
      </div>
    </div>
  )
}