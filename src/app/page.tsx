import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  const featuredProducts = [
    {
      id: 1,
      name: 'Akıllı Telefon XYZ',
      price: '12.999',
      image: 'https://picsum.photos/400/400?random=1',
      category: 'Elektronik'
    },
    {
      id: 2,
      name: 'Spor Ayakkabı ABC',
      price: '1.299',
      image: 'https://picsum.photos/400/400?random=2',
      category: 'Moda'
    },
    {
      id: 3,
      name: 'Kablosuz Kulaklık',
      price: '899',
      image: 'https://picsum.photos/400/400?random=3',
      category: 'Elektronik'
    },
    {
      id: 4,
      name: 'Akıllı Saat',
      price: '2.499',
      image: 'https://picsum.photos/400/400?random=4',
      category: 'Elektronik'
    }
  ]

  return (
    <div className="flex flex-col gap-8">
      {/* Hero Section */}
      <section className="relative h-[500px] bg-gradient-to-r from-primary to-primary-dark">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            Modern Alışverişin Adresi
          </h1>
          <p className="mt-4 text-xl text-white">
            En yeni ürünler, en iyi fiyatlarla sizlerle
          </p>
          <Link
            href="/urunler"
            className="mt-8 rounded-md bg-secondary px-8 py-3 text-lg font-semibold text-white shadow-sm hover:bg-secondary-dark transition-colors"
          >
            Alışverişe Başla
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-neutral-dark mb-8">Öne Çıkan Ürünler</h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <Link key={product.id} href={`/urun/${product.id}`} className="group">
              <div className="aspect-square relative overflow-hidden rounded-lg bg-neutral-light">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="mt-4">
                <p className="text-sm text-primary">{product.category}</p>
                <h3 className="text-lg font-semibold text-neutral-dark">{product.name}</h3>
                <p className="mt-1 text-lg font-medium text-secondary">
                  {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(parseFloat(product.price))}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-neutral-light py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="rounded-full bg-primary/10 p-3">
                <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-neutral-dark">Güvenli Alışveriş</h3>
              <p className="mt-2 text-neutral">256-bit SSL sertifikası ile güvenli ödeme</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="rounded-full bg-primary/10 p-3">
                <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-neutral-dark">Hızlı Teslimat</h3>
              <p className="mt-2 text-neutral">24 saat içinde kargoya teslim</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="rounded-full bg-primary/10 p-3">
                <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-neutral-dark">Kolay İade</h3>
              <p className="mt-2 text-neutral">14 gün içinde ücretsiz iade</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-primary py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">Fırsatları Kaçırmayın!</h2>
            <p className="mt-4 text-lg text-white/90">
              En yeni ürünler ve özel indirimlerden haberdar olmak için bültenimize kayıt olun.
            </p>
            <form className="mt-8 flex max-w-md mx-auto gap-x-4">
              <input
                type="email"
                required
                className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
                placeholder="E-posta adresiniz"
              />
              <button
                type="submit"
                className="flex-none rounded-md bg-secondary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-secondary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Kayıt Ol
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
} 