import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, ShoppingCart } from 'lucide-react'
import { useCartStore } from '@/store/cart'
import { useFavoritesStore } from '@/store/favorites'
import { Product } from '@/store/products'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem: addToCart } = useCartStore()
  const { addItem: addToFavorites, removeItem: removeFromFavorites, hasItem: isFavorite } = useFavoritesStore()

  const toggleFavorite = (id: number) => {
    if (isFavorite(id)) {
      removeFromFavorites(id)
    } else {
      addToFavorites(id)
    }
  }

  return (
    <div className="group relative">
      <div className="aspect-square relative overflow-hidden rounded-lg bg-neutral-light">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.oldPrice && (
          <div className="absolute top-2 right-2 bg-secondary text-white px-2 py-1 rounded-md text-sm font-medium">
            %{Math.round((1 - parseFloat(product.price) / parseFloat(product.oldPrice)) * 100)} İndirim
          </div>
        )}
        <button
          onClick={() => toggleFavorite(product.id)}
          className="absolute top-2 left-2 p-2 rounded-full bg-white/80 hover:bg-red-500 hover:text-white transition-colors"
        >
          <Heart className={`h-5 w-5 ${isFavorite(product.id) ? 'fill-current' : ''}`} />
        </button>
      </div>

      <div className="mt-4">
        <Link href={`/urun/${product.id}`}>
          <h3 className="text-lg font-semibold text-neutral-dark hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="mt-1 flex items-center space-x-2">
          <p className="text-sm text-primary">{product.category}</p>
          <span className="text-neutral">•</span>
          <p className="text-sm text-primary">{product.brand}</p>
        </div>
        <p className="mt-2 text-lg font-medium text-secondary">
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
            {product.stock === 0 ? 'Stokta Yok' : 'Sepete Ekle'}
          </button>
        </div>
      </div>
    </div>
  )
} 