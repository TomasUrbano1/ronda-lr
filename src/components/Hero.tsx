import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-[#FF6B35]/10 to-[#FF8A00]/5 rounded-3xl p-10 md:p-16 text-center shadow-[0_12px_32px_rgba(0,0,0,0.12)] mx-4 my-12 overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold text-[#FF6B35] mb-6">
          Descubrí productos hechos cerca tuyo
        </h1>
        <p className="text-lg md:text-xl text-[#666666] mb-10 max-w-2xl mx-auto">
          Emprendedores locales de La Rioja: desayunos, artesanías, regalos y más. Pedí directo por WhatsApp.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link href="/quiero-vender" className="bg-[#FF6B35] hover:bg-[#E55A2B] text-white font-semibold px-10 py-5 rounded-full transition-all shadow-[0_4px_16px_rgba(255,107,53,0.4)]">
            Quiero vender
          </Link>
          <Link href="/catalogo" className="bg-white border-2 border-[#FF6B35] text-[#FF6B35] hover:bg-[#FF6B35]/10 font-semibold px-10 py-5 rounded-full transition-all">
            Explorar catálogo
          </Link>
        </div>
      </div>
      <div className="absolute -top-20 -right-20 text-9xl font-black text-[#FF6B35] opacity-10 pointer-events-none">
        (R)
      </div>
    </section>
  )
}