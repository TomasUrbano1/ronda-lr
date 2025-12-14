'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase!.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
    } else {
      router.push('/panel')  // Va al panel de vendedor
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-[0_12px_32px_rgba(0,0,0,0.12)] p-10">
        <h1 className="text-4xl font-bold text-[#FF6B35] text-center mb-8">
          Panel de vendedor
        </h1>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[#2D2D2D] mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-5 py-3 rounded-full border border-[#FF6B35]/30 focus:border-[#FF6B35] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2D2D2D] mb-2">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-5 py-3 rounded-full border border-[#FF6B35]/30 focus:border-[#FF6B35] focus:outline-none"
            />
          </div>

          {error && (
            <p className="text-red-500 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#FF6B35] hover:bg-[#E55A2B] text-white font-bold py-5 rounded-full transition-all shadow-[0_4px_16px_rgba(255,107,53,0.4)]"
          >
            {loading ? 'Iniciando...' : 'Iniciar sesión'}
          </button>
        </form>

        <p className="text-center text-[#666666] mt-6">
          ¿No tenés cuenta? Contactanos por WhatsApp para registrarte.
        </p>
      </div>
    </div>
  )
}