import React from 'react'
import ProductDetail from './ProductDetail'
import { getProductById } from '@/store/products'

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductById(parseInt(params.id))

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-neutral-dark">Ürün bulunamadı</h1>
          <a href="/" className="mt-4 text-primary hover:underline">
            Ana sayfaya dön
          </a>
        </div>
      </div>
    )
  }

  return <ProductDetail product={product} />
} 