import React from 'react'
import { useSearchParams } from 'next/navigation'
import { getProductsBySearch } from '@/store/products'
import ProductCard from '@/components/ProductCard'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const products = getProductsBySearch(query)

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-baseline">
          <h1 className="text-2xl font-bold text-neutral-dark">
            "{query}" için arama sonuçları
          </h1>
          <p className="text-neutral">
            {products.length} ürün bulundu
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-medium text-neutral-dark">Sonuç bulunamadı</h2>
            <p className="mt-2 text-neutral">
              Farklı anahtar kelimeler deneyebilir veya kategorilere göz atabilirsiniz.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 