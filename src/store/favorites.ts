import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface FavoritesStore {
  items: number[] // Favori ürünlerin ID'leri
  addItem: (id: number) => void
  removeItem: (id: number) => void
  hasItem: (id: number) => boolean
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (id) =>
        set((state) => ({
          items: state.items.includes(id) ? state.items : [...state.items, id],
        })),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((itemId) => itemId !== id),
        })),
      hasItem: (id) => get().items.includes(id),
    }),
    {
      name: 'favorites-storage',
    }
  )
) 