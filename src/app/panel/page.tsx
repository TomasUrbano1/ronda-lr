'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function PanelPage() {
  const [user, setUser] = useState<any>(null)
  const [products, setProducts] = useState<any[]>([])
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
      } else {
        setUser(user)
        fetchProducts(user.id)
      }
    }

    getUser()
  }, [])

  const fetchProducts = async (userId: string) => {
    // Asumimos que guardamos el vendor_id en user_metadata o lo buscamos por email
    // Por ahora, cargamos todos los productos (mejoramos después)
    const { data } = await supabase.from('products').select('*')
    setProducts(data || [])
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-24 pb-24 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-[#FF6B35] text-center mb-10">
          Panel de vendedor
        </h1>

        <p className="text-center text-[#666666] mb-10">
          Bienvenido {user.email}. Acá podés agregar tus productos.
        </p>

        {/* Form para agregar producto */}
        {/* Lo hacemos en el siguiente mensaje */}

        <h2 className="text-3xl font-bold text-[#FF6B35] mb-6">
          Tus productos
        </h2>

        {/* Lista de productos del vendedor */}
      </div>
    </div>
  )
}