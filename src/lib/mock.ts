// src/lib/mock.ts

export const mockVendors = [
  {
    id: 'v1',
    name: 'Desayunos La Rioja',
    city: 'La Rioja',
    whatsapp: '5493804000000',
    bio: 'Desayunos artesanales',
  },
  {
    id: 'v2',
    name: 'Tejidos del Valle',
    city: 'La Rioja',
    whatsapp: '5493804111111',
    bio: 'Tejidos hechos a mano',
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
  },
  {
    id: 'p2',
    vendor_id: 'v1',
    title: 'Bandeja sorpresa',
    price: 16000,
    description: 'Personalizable',
    image_url: '/images/products/bandeja-sorpresa.jpg',
  },
]