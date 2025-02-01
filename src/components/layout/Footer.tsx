import React from 'react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-neutral-dark text-neutral-light">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Hakkımızda</h3>
            <ul className="space-y-2">
              <li><Link href="/hakkimizda" className="hover:text-primary transition-colors">Şirket Bilgileri</Link></li>
              <li><Link href="/kariyer" className="hover:text-primary transition-colors">Kariyer</Link></li>
              <li><Link href="/iletisim" className="hover:text-primary transition-colors">İletişim</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Müşteri Hizmetleri</h3>
            <ul className="space-y-2">
              <li><Link href="/yardim" className="hover:text-primary transition-colors">Yardım Merkezi</Link></li>
              <li><Link href="/iade" className="hover:text-primary transition-colors">İade ve Değişim</Link></li>
              <li><Link href="/kargo-takip" className="hover:text-primary transition-colors">Kargo Takip</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Politikalar</h3>
            <ul className="space-y-2">
              <li><Link href="/gizlilik" className="hover:text-primary transition-colors">Gizlilik Politikası</Link></li>
              <li><Link href="/kullanim-kosullari" className="hover:text-primary transition-colors">Kullanım Koşulları</Link></li>
              <li><Link href="/cerez-politikasi" className="hover:text-primary transition-colors">Çerez Politikası</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Bizi Takip Edin</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                Facebook
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                Instagram
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                Twitter
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-neutral pt-8 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} ModernShop. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  )
} 