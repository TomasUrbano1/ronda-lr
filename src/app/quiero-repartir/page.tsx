'use client'

import { useState } from 'react'

export default function QuieroRepartirPage() {
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    zona: '',
    vehiculo: '',
    horarios: '',
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Delivery registrado:', formData)
    setSubmitted(true)
    // Acá irá WhatsApp o Supabase
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] pt-24 pb-24 md:pb-0 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-[0_12px_32px_rgba(0,0,0,0.12)] p-10 text-center">
          <div className="text-6xl mb-6">🚀</div>
          <h1 className="text-3xl font-bold text-[#FF6B35] mb-4">¡Gracias por sumarte!</h1>
          <p className="text-[#666666] mb-8">
            Te contactaremos por WhatsApp en las próximas horas para activarte como repartidor en (R)onda.
          </p>
          <a
            href="/"
            className="bg-[#FF6B35] hover:bg-[#E55A2B] text-white font-bold px-10 py-4 rounded-full transition-all shadow-[0_4px_16px_rgba(255,107,53,0.4)] inline-block"
          >
            Volver al inicio
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-24 pb-24 md:pb-0 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-[0_12px_32px_rgba(0,0,0,0.12)] p-10">
        <h1 className="text-4xl font-bold text-[#FF6B35] text-center mb-4">
          Quiero repartir en (R)onda
        </h1>
        <p className="text-[#666666] text-center mb-10">
          Ganá plata llevando pedidos de emprendedores locales. Vos elegís cuándo y dónde.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[#2D2D2D] mb-2">
              Tu nombre
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-5 py-3 rounded-full border border-[#FF6B35]/30 focus:border-[#FF6B35] focus:outline-none transition-all"
              placeholder="Ej: Juan Pérez"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2D2D2D] mb-2">
              WhatsApp (con código de país)
            </label>
            <input
              type="tel"
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleChange}
              required
              className="w-full px-5 py-3 rounded-full border border-[#FF6B35]/30 focus:border-[#FF6B35] focus:outline-none transition-all"
              placeholder="5493805000000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2D2D2D] mb-2">
              Zona que cubrís en La Rioja
            </label>
            <input
              type="text"
              name="zona"
              value={formData.zona}
              onChange={handleChange}
              required
              className="w-full px-5 py-3 rounded-full border border-[#FF6B35]/30 focus:border-[#FF6B35] focus:outline-none transition-all"
              placeholder="Ej: Centro, Sur, Norte"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2D2D2D] mb-2">
              Vehículo
            </label>
            <select
              name="vehiculo"
              value={formData.vehiculo}
              onChange={handleChange}
              required
              className="w-full px-5 py-3 rounded-full border border-[#FF6B35]/30 focus:border-[#FF6B35] focus:outline-none transition-all"
            >
              <option value="">Seleccioná uno</option>
              <option value="moto">Moto</option>
              <option value="bici">Bici</option>
              <option value="auto">Auto</option>
              <option value="pie">A pie</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2D2D2D] mb-2">
              Horarios disponibles (opcional)
            </label>
            <textarea
              name="horarios"
              value={formData.horarios}
              onChange={handleChange}
              rows={3}
              className="w-full px-5 py-3 rounded-2xl border border-[#FF6B35]/30 focus:border-[#FF6B35] focus:outline-none transition-all resize-none"
              placeholder="Ej: Lunes a viernes 18-22hs, sábados todo el día"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#FF6B35] hover:bg-[#E55A2B] text-white font-bold py-5 rounded-full transition-all shadow-[0_4px_16px_rgba(255,107,53,0.4)] text-lg"
          >
            Enviar solicitud
          </button>
        </form>

        <p className="text-xs text-[#999999] text-center mt-8">
          Te contactaremos por WhatsApp en menos de 24hs. ¡Sin costo para empezar!
        </p>
      </div>
    </div>
  )
}