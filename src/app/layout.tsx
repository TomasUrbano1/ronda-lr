import type { Metadata, Viewport } from 'next'
import './globals.css'
import BottomNav from '@/components/BottomNav'

export const metadata: Metadata = {
  title: '(R)onda — Hecho cerca tuyo',
  description: 'Marketplace local de emprendedores de La Rioja',
}

export const viewport: Viewport = {
  themeColor: '#FF6B35'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#FF6B35" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
        {/* NAVBAR SUPERIOR FIJO */}
        <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            {/* Logo */}
            <a href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#FF6B35] flex items-center justify-center font-bold text-white text-xl shadow-lg">
                R
              </div>
              <span className="font-bold text-2xl text-[#2D2D2D]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                (R)onda
              </span>
            </a>

            {/* Buscador (solo desktop) */}
            <div className="hidden md:block flex-1 max-w-lg mx-8">
              <input
                type="text"
                placeholder="Buscar desayunos, artesanías, regalos..."
                className="w-full px-6 py-3 rounded-full border border-[#FF6B35]/30 focus:border-[#FF6B35] focus:outline-none text-[#2D2D2D] bg-gray-50 transition-all"
              />
            </div>

            {/* Botones: Quiero vender + Quiero repartir + Panel de vendedor */}
            <div className="flex items-center gap-4">
              <a
                href="/quiero-vender"
                className="bg-[#FF6B35] hover:bg-[#E55A2B] text-white font-bold px-8 py-3 rounded-full transition-all shadow-[0_4px_16px_rgba(255,107,53,0.4)] hidden sm:block"
              >
                Quiero vender
              </a>
              <a
                href="/quiero-repartir"
                className="bg-[#00D4AA] hover:bg-[#00B894] text-white font-bold px-8 py-3 rounded-full transition-all shadow-[0_4px_16px_rgba(0,212,170,0.4)] hidden sm:block"
              >
                Quiero repartir
              </a>
              <a
                href="/login"
                className="bg-[#2D2D2D] hover:bg-[#1A1A1A] text-white font-bold px-8 py-3 rounded-full transition-all shadow-[0_4px_16px_rgba(45,45,45,0.4)] hidden sm:block"
              >
                Panel de vendedor
              </a>
            </div>
          </div>
        </header>

        {/* Contenido principal */}
        <main className="pt-24 pb-24 md:pb-0 min-h-screen">
          {children}
        </main>

        {/* BottomNav solo en móvil */}
        <BottomNav />

        {/* Footer */}
        <footer className="py-10 text-center text-sm text-[#666666] bg-gray-50 border-t">
          Hecho con ❤️ en La Rioja · (R)onda
        </footer>
      </body>
    </html>
  )
}