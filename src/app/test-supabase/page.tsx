// src/app/test-supabase/page.tsx
import { supabase, supabaseAdmin } from '@/lib/supabaseClient'

export default async function TestSupabase() {
  let frontendData = null
  let frontendError = null

  let backendData = null
  let backendError = null

  // Test frontend
  try {
    const { data, error } = await supabase.rpc('version', {}).single()
    if (error) throw error
    frontendData = data
  } catch (err: any) {
    frontendError = err.message || 'No RPC disponible'
  }

  // Test backend (admin)
  try {
    const { data, error } = await supabaseAdmin.rpc('version', {}).single()
    if (error) throw error
    backendData = data
  } catch (err: any) {
    backendError = err.message || 'No RPC disponible'
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      <div className="bg-white rounded-2xl shadow-xl p-10 max-w-2xl w-full space-y-8">
        <h1 className="text-4xl font-bold text-center text-primary-500">(R)onda – Test Supabase Diciembre 2025</h1>
        
        <div className="space-y-6">
          <div className="border-b pb-4">
            <h2 className="text-2xl font-semibold mb-3">1. Frontend (Publishable Key)</h2>
            {frontendError ? (
              <div className="bg-red-50 border border-red-300 text-red-700 p-6 rounded-xl">
                <p className="font-bold">❌ Error frontend:</p>
                <pre className="text-sm mt-2 overflow-auto">{frontendError}</pre>
              </div>
            ) : (
              <div className="bg-green-50 border border-green-300 text-green-700 p-6 rounded-xl">
                <p className="font-bold text-xl">✅ Frontend conectado perfecto!</p>
                <p>Versión Supabase: {frontendData?.version || 'Conectado (sin versión)'}</p>
              </div>
            )}
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">2. Backend/Admin (Secret Key)</h2>
            {backendError ? (
              <div className="bg-red-50 border border-red-300 text-red-700 p-6 rounded-xl">
                <p className="font-bold">❌ Error backend (normal si no pusiste secret key aún):</p>
                <pre className="text-sm mt-2 overflow-auto">{backendError}</pre>
              </div>
            ) : (
              <div className="bg-green-50 border border-green-300 text-green-700 p-6 rounded-xl">
                <p className="font-bold text-xl">✅ Backend/Admin conectado! Listo para CRUD real</p>
              </div>
            )}
          </div>
        </div>

        <div className="text-center text-sm text-gray-600 mt-8">
          <p>Si ves verde en frontend: ¡Ya podés conectar login, categorías y productos!</p>
          <p>Verde en ambos: (R)onda está lista para datos reales y admin full.</p>
          <p className="font-bold mt-4">Próximo paso: Crear tablas y conectar tu home real</p>
        </div>
      </div>
    </div>
  )
}