'use client'

import Link from 'next/link'

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-3xl font-black text-[#FF6B35]">
          (R)onda
        </Link>

        {/* Buscador (placeholder por ahora) */}
        <div className="hidden md:block flex-1 max-w-md mx-8">
          <input
            type="text"
            placeholder="Buscar desayunos, artesanías..."
            className="w-full px-6 py-3 rounded-full border border-[#FF6B35]/30 focus:border-[#FF6B35] focus:outline-none text-[#2D2D2D]"
          />
        </div>

        {/* Botón Quiero vender */}
        <Link
          href="/quiero-vender"
          className="bg-[#FF6B35] hover:bg-[#E55A2B] text-white font-semibold px-8 py-3 rounded-full transition-all shadow-[0_4px_16px_rgba(255,107,53,0.4)]"
        >
          Quiero vender
        </Link>
      </div>
    </header>
  )
}