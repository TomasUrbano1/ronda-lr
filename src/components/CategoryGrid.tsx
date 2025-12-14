'use client'

import Link from 'next/link'

const categories = [
  { id: 'todas', name: 'Todas', icon: '🔥' },
  { id: 'comida', name: 'Comida', icon: '🍽️' },
  { id: 'artesanias', name: 'Artesanías', icon: '🧶' },
  { id: 'regalos', name: 'Regalos', icon: '🎁' },
  { id: 'deco', name: 'Deco', icon: '🏠' },
]

export default function CategoryGrid() {
  return (
    <section className="px-4 py-8 bg-[#FAFAFA]">
      <h2 className="text-2xl font-bold text-[#2D2D2D] mb-6 px-4">Categorías</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/?cat=${cat.id}`}
            className="bg-white rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)] transition-all duration-300 p-6 text-center group flex flex-col items-center justify-center"
          >
            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
              {cat.icon}
            </div>
            <span className="font-semibold text-[#2D2D2D] group-hover:text-[#FF6B35] transition-colors">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}