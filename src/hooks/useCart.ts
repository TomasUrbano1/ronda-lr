'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type CartItem = {
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

type CartStore = {
  items: CartItem[]
  addItem: (product: any, vendor: any) => void
  removeItem: (id: string) => void
  clearCart: () => void
  getTotalPrice: () => number
  getTotalItems: () => number
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, vendor) => set((state) => {
        const existing = state.items.find(item => item.id === product.id)
        if (existing) {
          return {
            items: state.items.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          }
        }
        return {
          items: [...state.items, {
            id: product.id,
            title: product.title,
            price: product.price,
            quantity: 1,
            description: product.description,
            image_url: product.image_url,
            vendor
          }]
        }
      }),
      removeItem: (id) => set((state) => ({
        items: state.items.filter(item => item.id !== id)
      })),
      clearCart: () => set({ items: [] }),
      getTotalPrice: () => get().items.reduce((total, item) => total + item.price * item.quantity, 0),
      getTotalItems: () => get().items.reduce((total, item) => total + item.quantity, 0),
    }),
    {
      name: 'ronda-cart',
    }
  )
)