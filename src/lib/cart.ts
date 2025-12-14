// src/lib/cart.ts
export type CartItem = {
  id: string
  title: string
  price: number
  quantity: number
  description: string
  image_url: string
  vendor: {
    name: string
    whatsapp: string
  }
}

export const addToCart = (product: any, vendor: any) => {
  const cart = JSON.parse(localStorage.getItem('ronda-cart') || '[]')
  const existing = cart.find((item: CartItem) => item.id === product.id)

  if (existing) {
    existing.quantity += 1
  } else {
    cart.push({
      id: product.id,
      title: product.title || product.name,
      price: product.price,
      quantity: 1,
      description: product.description,
      image_url: product.image_url || product.image,
      vendor
    })
  }

  localStorage.setItem('ronda-cart', JSON.stringify(cart))
}

export const getCart = (): CartItem[] => {
  return JSON.parse(localStorage.getItem('ronda-cart') || '[]')
}

export const getTotalItems = (): number => {
  const cart = getCart()
  return cart.reduce((total: number, item: CartItem) => total + item.quantity, 0)
}

export const clearCart = () => {
  localStorage.removeItem('ronda-cart')
}