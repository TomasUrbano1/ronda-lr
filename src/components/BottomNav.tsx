'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCart } from '@/hooks/useCart'
import { useEffect, useState } from 'react'

export default function BottomNav() {
  const pathname = usePathname()
  const [totalItems, setTotalItems] = useState(0)

  useEffect(() => {
    setTotalItems(useCart.getState().getTotalItems() ?? 0)

    const unsubscribe = useCart.subscribe(
      (state) => state.items,
      () => setTotalItems(useCart.getState().getTotalItems() ?? 0)
    )

    return () => unsubscribe()
  }, [])

  const isActive = (path: string) => pathname === path

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 md:hidden">
      <div className="grid grid-cols-5 py-3">
        <Link
          href="/"
          className={`flex flex-col items-center gap-1 px-2 py-2 transition-all ${isActive('/') ? 'text-[#FF6B35]' : 'text-[#666666]'}`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="text-xs font-medium">Inicio</span>
        </Link>

        <Link
          href="/catalogo"
          className={`flex flex-col items-center gap-1 px-2 py-2 transition-all ${isActive('/catalogo') ? 'text-[#FF6B35]' : 'text-[#666666]'}`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span className="text-xs font-medium">Explorar</span>
        </Link>

        <Link
          href="/carrito"
          className={`flex flex-col items-center gap-1 px-2 py-2 transition-all relative ${isActive('/carrito') ? 'text-[#FF6B35]' : 'text-[#666666]'}`}
        >
          <div className="relative">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#FF6B35] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md">
                {totalItems}
              </span>
            )}
          </div>
          <span className="text-xs font-medium">Carrito</span>
        </Link>

        <Link
          href="/quiero-vender"
          className={`flex flex-col items-center gap-1 px-2 py-2 transition-all ${isActive('/quiero-vender') ? 'text-[#FF6B35]' : 'text-[#666666]'}`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h3l.6 2h12.8l-2.4 8H6.6L4.2 5H3m4 14a2 2 0 100 4 2 2 0 000-4zm10 0a2 2 0 100 4 2 2 0 000-4z" />
          </svg>
          <span className="text-xs font-medium">Vender</span>
        </Link>

        <Link
          href="/quiero-repartir"
          className={`flex flex-col items-center gap-1 px-2 py-2 transition-all ${isActive('/quiero-repartir') ? 'text-[#00D4AA]' : 'text-[#666666]'}`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-xs font-medium">Repartir</span>
        </Link>

        {/* NUEVO BOTÓN PANEL DE VENDEDOR */}
        <Link
          href="/login"
          className={`flex flex-col items-center gap-1 px-2 py-2 transition-all ${isActive('/login') || isActive('/panel') ? 'text-[#2D2D2D]' : 'text-[#666666]'}`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
          </svg>
          <span className="text-xs font-medium">Panel</span>
        </Link>
      </div>
    </nav>
  )
}