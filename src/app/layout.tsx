import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata = {
  title: 'Modern E-Ticaret | En İyi Ürünler, En İyi Fiyatlar',
  description: 'Türkiye\'nin en modern e-ticaret sitesi. Kaliteli ürünler, uygun fiyatlar ve hızlı teslimat.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" className={`${inter.variable} scroll-smooth`}>
      <body className="flex min-h-screen flex-col bg-neutral-light">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
} 