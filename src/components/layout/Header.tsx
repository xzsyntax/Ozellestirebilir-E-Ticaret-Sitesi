'use client'

import React from 'react'
import Link from 'next/link'
import { ShoppingCart, User, Search, Heart } from 'lucide-react'
import { useCartStore } from '@/store/cart'
import { useFavoritesStore } from '@/store/favorites'
import { useRouter } from 'next/navigation'

export default function Header() {
  const cartItems = useCartStore((state) => state.items)
  const favoriteItems = useFavoritesStore((state) => state.items)
  const router = useRouter()

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const query = formData.get('search')?.toString() || ''
    if (query.trim()) {
      router.push(`/arama?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <header className="bg-white shadow-sm">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-primary">
              ModernShop
            </Link>
          </div>

          <div className="flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                name="search"
                placeholder="Ürün ara..."
                className="w-full rounded-lg border-gray-200 py-2 pl-10 pr-4 focus:border-primary focus:ring-primary"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </form>
          </div>

          <div className="flex items-center space-x-6">
            <Link href="/hesabim" className="flex items-center text-neutral-dark hover:text-primary transition-colors">
              <User className="h-6 w-6" />
              <span className="ml-2 hidden sm:inline">Hesabım</span>
            </Link>
            <Link href="/favoriler" className="flex items-center text-neutral-dark hover:text-primary transition-colors">
              <div className="relative">
                <Heart className="h-6 w-6" />
                {favoriteItems.length > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-xs text-white">
                    {favoriteItems.length}
                  </span>
                )}
              </div>
              <span className="ml-2 hidden sm:inline">Favoriler</span>
            </Link>
            <Link href="/sepetim" className="flex items-center text-neutral-dark hover:text-primary transition-colors">
              <div className="relative">
                <ShoppingCart className="h-6 w-6" />
                {cartItems.length > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-xs text-white">
                    {cartItems.length}
                  </span>
                )}
              </div>
              <span className="ml-2 hidden sm:inline">Sepetim</span>
            </Link>
          </div>
        </div>

        <div className="flex space-x-8 py-2 overflow-x-auto">
          {['Elektronik', 'Moda', 'Ev & Yaşam', 'Kozmetik', 'Spor', 'Kitap'].map((category) => (
            <Link
              key={category}
              href={`/kategori/${category.toLowerCase()}`}
              className="text-neutral hover:text-primary transition-colors whitespace-nowrap"
            >
              {category}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  )
} 