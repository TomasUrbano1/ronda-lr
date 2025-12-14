// src/lib/mock.ts

export const mockVendors = [
  {
    id: 'v1',
    name: 'Desayunos La Rioja',
    whatsapp: '5493804000000',
    city: 'La Rioja',
    description: 'Desayunos artesanales',
    image_url: '/images/vendors/desayunos.jpg',
    approved: true,
  },
  {
    id: 'v2',
    name: 'Tejidos del Valle',
    whatsapp: '5493804111111',
    city: 'La Rioja',
    description: 'Tejidos artesanales',
    image_url: '/images/vendors/tejidos.jpg',
    approved: true,
  },
]

export const mockProducts = [
  {
    id: 'p1',
    vendor_id: 'v1',
    title: 'Bandeja desayuno clásica',
    price: 12000,
    description: 'Incluye jugo, café, medialunas',
    image_url: '/images/products/bandeja-clasica.jpg',
    category: 'desayunos',
  },
  {
    id: 'p2',
    vendor_id: 'v1',
    title: 'Bandeja sorpresa',
    price: 16000,
    description: 'Personalizable',
    image_url: '/images/products/bandeja-sorpresa.jpg',
    category: 'desayunos',
  },
]

export const mockCategories = [
  { id: 'c1', name: 'Desayunos', slug: 'desayunos' },
  { id: 'c2', name: 'Hogar', slug: 'hogar' },
]
