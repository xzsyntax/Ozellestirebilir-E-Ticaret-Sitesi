'use client'

import React from 'react'
import ProductCard from '@/components/ProductCard'
import { Product } from '@/store/products'

interface CategoryProductsProps {
  products: Product[]
  categoryName: string
}

export default function CategoryProducts({ products, categoryName }: CategoryProductsProps) {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-neutral-dark capitalize mb-8">
          {categoryName.replace('-', ' ')}
        </h1>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-medium text-neutral-dark">Bu kategoride ürün bulunamadı</h2>
            <p className="mt-2 text-neutral">
              Başka kategorilere göz atabilir veya daha sonra tekrar kontrol edebilirsiniz.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 