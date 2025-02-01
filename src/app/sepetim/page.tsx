'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, X } from 'lucide-react'
import { useCartStore } from '@/store/cart'
import { getProductById } from '@/store/products'

export default function CartPage() {
  const { items, removeItem, updateQuantity } = useCartStore()
  
  const cartItems = items.map(item => ({
    ...item,
    product: getProductById(item.id)
  })).filter(item => item.product !== undefined)

  const subtotal = cartItems.reduce((total, item) => 
    total + parseFloat(item.product!.price) * item.quantity, 0
  )
  const shipping = cartItems.length > 0 ? 29.90 : 0
  const total = subtotal + shipping

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-neutral-dark">Sepetim</h1>

        <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <h2 className="text-xl font-medium text-neutral-dark">Sepetiniz boş</h2>
                <p className="mt-2 text-neutral">Alışverişe başlamak için ürünlerimize göz atın.</p>
                <Link href="/" className="mt-4 btn-primary inline-block">
                  Alışverişe Başla
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-6 py-6 border-b border-neutral">
                    <div className="aspect-square relative w-24 overflow-hidden rounded-lg bg-neutral-light">
                      <Image
                        src={item.product!.image}
                        alt={item.product!.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-neutral-dark">
                            <Link href={`/urun/${item.id}`}>{item.product!.name}</Link>
                          </h3>
                          <p className="mt-1 text-sm text-neutral">
                            {item.product!.stock > 0 ? 'Stokta var' : 'Stokta yok'}
                          </p>
                        </div>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-neutral hover:text-red-500 transition-colors"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>

                      <div className="flex flex-1 items-end justify-between">
                        <div className="flex items-center border border-neutral rounded-lg">
                          <button 
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="p-2 text-neutral hover:text-primary transition-colors"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-4 text-neutral-dark">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, Math.min(item.product!.stock, item.quantity + 1))}
                            className="p-2 text-neutral hover:text-primary transition-colors"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-medium text-secondary">
                            {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(parseFloat(item.product!.price) * item.quantity)}
                          </p>
                          {item.quantity > 1 && (
                            <p className="text-sm text-neutral">
                              Birim fiyat: {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(parseFloat(item.product!.price))}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-4">
            <div className="rounded-lg bg-neutral-light p-6">
              <h2 className="text-lg font-medium text-neutral-dark">Sipariş Özeti</h2>

              <div className="mt-6 space-y-4">
                <div className="flex justify-between">
                  <p className="text-neutral">Ara Toplam</p>
                  <p className="text-neutral-dark">
                    {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(subtotal)}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-neutral">Kargo</p>
                  <p className="text-neutral-dark">
                    {shipping === 0 ? 'Ücretsiz' : new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(shipping)}
                  </p>
                </div>
                <div className="border-t border-neutral pt-4">
                  <div className="flex justify-between">
                    <p className="text-base font-medium text-neutral-dark">Toplam</p>
                    <p className="text-xl font-medium text-secondary">
                      {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(total)}
                    </p>
                  </div>
                </div>
              </div>

              <button 
                className="mt-6 w-full btn-primary"
                disabled={cartItems.length === 0}
              >
                Ödemeye Geç
              </button>

              <div className="mt-4 text-center">
                <Link href="/" className="text-sm text-primary hover:underline">
                  Alışverişe Devam Et
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 