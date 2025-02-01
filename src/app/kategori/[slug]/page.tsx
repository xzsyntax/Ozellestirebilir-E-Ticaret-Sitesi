import React from 'react'
import CategoryProducts from './CategoryProducts'
import { getProductsByCategory } from '@/store/products'

interface CategoryPageProps {
  params: {
    slug: string
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const products = getProductsByCategory(params.slug)
  return <CategoryProducts products={products} categoryName={params.slug} />
} 