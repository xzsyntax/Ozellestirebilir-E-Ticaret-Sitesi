'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, Heart, Share2, Star, ThumbsUp, MessageCircle } from 'lucide-react'
import { Product, getReviewsByProductId } from '@/store/products'
import { useCartStore } from '@/store/cart'
import { useFavoritesStore } from '@/store/favorites'

interface ProductDetailProps {
  product: Product
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const reviews = getReviewsByProductId(product.id)
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
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8 text-sm">
          <Link href="/" className="text-neutral hover:text-primary">
            Ana Sayfa
          </Link>
          <span className="mx-2 text-neutral">/</span>
          <Link href={`/kategori/${product.category.toLowerCase()}`} className="text-neutral hover:text-primary">
            {product.category}
          </Link>
          <span className="mx-2 text-neutral">/</span>
          <span className="text-neutral-dark">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2">
          {/* Ürün Görselleri */}
          <div className="space-y-4">
            <div className="aspect-square relative overflow-hidden rounded-lg bg-neutral-light">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {product.oldPrice && (
                <div className="absolute top-4 right-4 bg-secondary text-white px-3 py-1 rounded-md text-sm font-medium">
                  %{Math.round((1 - parseFloat(product.price) / parseFloat(product.oldPrice)) * 100)} İndirim
                </div>
              )}
            </div>
            {product.gallery && (
              <div className="grid grid-cols-3 gap-4">
                {product.gallery.map((image, index) => (
                  <div key={index} className="aspect-square relative overflow-hidden rounded-lg bg-neutral-light">
                    <Image
                      src={image}
                      alt={`${product.name} - ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Ürün Bilgileri */}
          <div className="lg:max-w-lg">
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-neutral-dark sm:text-3xl">{product.name}</h1>
                <div className="mt-1 flex items-center space-x-2">
                  <p className="text-sm text-primary">{product.category}</p>
                  <span className="text-neutral">•</span>
                  <p className="text-sm text-primary">{product.brand}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-neutral">({product.reviewCount} değerlendirme)</span>
              </div>

              <div className="space-y-2">
                <p className="text-3xl font-bold text-neutral-dark">
                  {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(parseFloat(product.price))}
                </p>
                {product.oldPrice && (
                  <p className="text-sm text-neutral line-through">
                    {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(parseFloat(product.oldPrice))}
                  </p>
                )}
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-neutral-dark">Ürün Açıklaması</h2>
                <p className="text-neutral">{product.description}</p>

                <div className="space-y-2">
                  <h3 className="font-medium text-neutral-dark">Özellikler:</h3>
                  <ul className="list-disc list-inside space-y-1 text-neutral">
                    {product.specs.map((spec, index) => (
                      <li key={index}>{spec}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-sm text-neutral">
                  <span className={product.stock > 0 ? 'text-accent' : 'text-red-500'}>
                    {product.stock > 0 ? `Stokta ${product.stock} adet var` : 'Stokta yok'}
                  </span>
                </div>

                <div className="flex space-x-4">
                  <button 
                    className="flex-1 btn-primary"
                    onClick={() => addToCart(product.id)}
                    disabled={product.stock === 0}
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Sepete Ekle
                  </button>
                  <button 
                    className={`btn-secondary ${isFavorite(product.id) ? 'bg-red-500 text-white hover:bg-red-600' : ''}`}
                    onClick={() => toggleFavorite(product.id)}
                  >
                    <Heart className={`h-5 w-5 ${isFavorite(product.id) ? 'fill-current' : ''}`} />
                  </button>
                  <button className="btn-secondary">
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Yorumlar */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-neutral-dark">Müşteri Değerlendirmeleri</h2>
          <div className="mt-8 space-y-8">
            {reviews.length === 0 ? (
              <p className="text-neutral">Bu ürün için henüz değerlendirme yapılmamış.</p>
            ) : (
              reviews.map((review) => (
                <div key={review.id} className="border-b border-neutral pb-8">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <p className="font-medium text-neutral-dark">{review.userName}</p>
                        <span className="text-neutral">•</span>
                        <time className="text-sm text-neutral">
                          {new Date(review.date).toLocaleDateString('tr-TR')}
                        </time>
                      </div>
                      <div className="mt-1 flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 text-neutral">{review.comment}</p>
                  <div className="mt-4 flex items-center space-x-4">
                    <button className="flex items-center text-sm text-neutral hover:text-primary transition-colors">
                      <ThumbsUp className="mr-1 h-4 w-4" />
                      <span>Faydalı ({review.helpful})</span>
                    </button>
                    <button className="flex items-center text-sm text-neutral hover:text-primary transition-colors">
                      <MessageCircle className="mr-1 h-4 w-4" />
                      <span>Yanıtla</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}