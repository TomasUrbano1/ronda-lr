'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'  // <--- Import del client de Supabase

export default function QuieroVenderPage() {
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    category: '',
    bio: '',
  })

  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)  // Para mostrar "enviando..."

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { data, error } = await supabase!
      .from('vendors')
      .insert([
        {
          name: formData.name,
          whatsapp: formData.whatsapp,
          category: formData.category,
          bio: formData.bio || null,  // opcional
          approved: false  // Vos aprobás manualmente después
        }
      ])

    setLoading(false)

    if (error) {
      console.error('Error al enviar solicitud:', error)
      alert('Hubo un error al enviar tu solicitud. Intentá de nuevo.')
    } else {
      console.log('Solicitud enviada:', data)
      setSubmitted(true)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] pt-24 pb-24 md:pb-0 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-[0_12px_32px_rgba(0,0,0,0.12)] p-10 text-center">
          <div className="text-6xl mb-6">🎉</div>
          <h1 className="text-3xl font-bold text-[#FF6B35] mb-4">¡Gracias por sumarte!</h1>
          <p className="text-[#666666] mb-8">
            Te contactaremos por WhatsApp en las próximas horas para activar tu perfil en (R)onda.
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
          Quiero vender en (R)onda
        </h1>
        <p className="text-[#666666] text-center mb-10">
          Unite a la ronda de emprendedores de La Rioja. Publicá tus productos y llegá a más clientes.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[#2D2D2D] mb-2">
              Nombre del emprendimiento o tu nombre
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full px-5 py-3 rounded-full border border-[#FF6B35]/30 focus:border-[#FF6B35] focus:outline-none transition-all disabled:opacity-70"
              placeholder="Ej: Desayunos La Vida"
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
              disabled={loading}
              className="w-full px-5 py-3 rounded-full border border-[#FF6B35]/30 focus:border-[#FF6B35] focus:outline-none transition-all disabled:opacity-70"
              placeholder="5493805000000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2D2D2D] mb-2">
              Categoría principal
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full px-5 py-3 rounded-full border border-[#FF6B35]/30 focus:border-[#FF6B35] focus:outline-none transition-all disabled:opacity-70"
            >
              <option value="">Seleccioná una</option>
              <option value="comida">Comida (desayunos, tortas, etc.)</option>
              <option value="artesanias">Artesanías y tejidos</option>
              <option value="regalos">Regalos personalizados</option>
              <option value="deco">Deco y hogar</option>
              <option value="otros">Otros</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2D2D2D] mb-2">
              Contanos sobre tu emprendimiento (opcional)
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={4}
              disabled={loading}
              className="w-full px-5 py-3 rounded-2xl border border-[#FF6B35]/30 focus:border-[#FF6B35] focus:outline-none transition-all resize-none disabled:opacity-70"
              placeholder="Qué vendés, desde cuándo, qué te hace único..."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#FF6B35] hover:bg-[#E55A2B] disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold py-5 rounded-full transition-all shadow-[0_4px_16px_rgba(255,107,53,0.4)] text-lg"
          >
            {loading ? 'Enviando...' : 'Enviar solicitud'}
          </button>
        </form>

        <p className="text-xs text-[#999999] text-center mt-8">
          Te contactaremos por WhatsApp en menos de 24hs para activar tu perfil. ¡Sin costo inicial!
        </p>
      </div>
    </div>
  )
}