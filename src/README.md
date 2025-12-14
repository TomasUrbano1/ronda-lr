# (R)onda — Rediseño cálido · MVP funcional

**Incluye**
- Next.js 14 + TS + Tailwind (paleta crema/terracota/oliva).
- PWA instalable (manifest + íconos).
- Home con **Hero**, categorías y cards.
- Perfil de vendedor `/v/[id]`.
- Form **/apply** (is_approved=false).
- Panel **/admin** (ADMIN_SECRET) para aprobar vendedores.
- API: `/api/lead`, `/api/vendor/apply`, `/api/admin/approve`.
- Supabase listo (fallback demo si no hay claves).

## Arranque
```bash
npm install
npm run dev
# http://localhost:3000
```

## Variables
Copia `.env.example` a `.env.local` y completa:
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
ADMIN_SECRET=poné_un_password_seguro_aqui
```

## SQL base
Usá el SQL que te pasé en el chat para crear categories/vendors/products/leads + RLS.

Creado: 2025-10-12T17:30:41.799088Z
