'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, ShoppingCart } from 'lucide-react'
import { useFavoritesStore } from '@/store/favorites'
import { useCartStore } from '@/store/cart'
import { getProductById } from '@/store/products'

export default function FavoritesPage() {
  const { items, removeItem } = useFavoritesStore()
  const { addItem: addToCart } = useCartStore()
  
  const favoriteProducts = items
    .map(id => getProductById(id))
    .filter((product): product is NonNullable<typeof product> => product !== undefined)

  const totalPrice = favoriteProducts.reduce((total, product) => 
    total + parseFloat(product.price), 0
  )

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-baseline">
          <h1 className="text-3xl font-bold text-neutral-dark">Favorilerim</h1>
          {favoriteProducts.length > 0 && (
            <p className="text-lg text-secondary">
              Toplam Değer: {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(totalPrice)}
            </p>
          )}
        </div>

        <div className="mt-8">
          {favoriteProducts.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-xl font-medium text-neutral-dark">Favori ürününüz bulunmuyor</h2>
              <p className="mt-2 text-neutral">Beğendiğiniz ürünleri favorilere ekleyerek takip edebilirsiniz.</p>
              <Link href="/" className="mt-4 btn-primary inline-block">
                Alışverişe Başla
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {favoriteProducts.map((product) => (
                <div key={product.id} className="group relative">
                  <div className="aspect-square relative overflow-hidden rounded-lg bg-neutral-light">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.oldPrice && (
                      <div className="absolute top-2 right-2 bg-secondary text-white px-2 py-1 rounded-md text-sm font-medium">
                        İndirim
                      </div>
                    )}
                    <button
                      onClick={() => removeItem(product.id)}
                      className="absolute top-2 left-2 p-2 rounded-full bg-white/80 hover:bg-red-500 hover:text-white transition-colors"
                    >
                      <Heart className="h-5 w-5 fill-current" />
                    </button>
                  </div>

                  <div className="mt-4">
                    <Link href={`/urun/${product.id}`}>
                      <h3 className="text-lg font-semibold text-neutral-dark hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="mt-1 text-lg font-medium text-secondary">
                      {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(parseFloat(product.price))}
                    </p>
                    {product.oldPrice && (
                      <p className="mt-1 text-sm text-neutral line-through">
                        {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(parseFloat(product.oldPrice))}
                      </p>
                    )}

                    <div className="mt-4">
                      <button
                        onClick={() => addToCart(product.id)}
                        className="w-full btn-primary"
                        disabled={product.stock === 0}
                      >
                        <ShoppingCart className="mr-2 h-5 w-5" />
                        Sepete Ekle
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 