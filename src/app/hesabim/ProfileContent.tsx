'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useAuthStore } from '@/store/auth'

export default function ProfileContent() {
  const router = useRouter()
  const { user, updateProfile, logout } = useAuthStore()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>('')
  const [success, setSuccess] = useState<string>('')

  useEffect(() => {
    if (!user) {
      router.push('/giris')
    }
  }, [user, router])

  if (!user) {
    return null
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const name = formData.get('name')?.toString() || ''
    const phone = formData.get('phone')?.toString() || ''
    const address = formData.get('address')?.toString() || ''

    try {
      await updateProfile({ name, phone, address })
      setSuccess('Profil bilgileriniz başarıyla güncellendi')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Profil güncellenirken bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <div className="pb-6 border-b border-neutral-light">
            <h1 className="text-2xl font-bold text-neutral-dark">Hesap Bilgilerim</h1>
            <p className="mt-1 text-sm text-neutral">
              Profil bilgilerinizi buradan güncelleyebilirsiniz.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Sol Taraf - Avatar ve Temel Bilgiler */}
            <div className="w-full md:w-1/3">
              <div className="bg-neutral-50 p-6 rounded-lg">
                <div className="flex flex-col items-center">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden">
                    <Image
                      src={user.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'}
                      alt={user.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h2 className="mt-4 text-xl font-semibold text-neutral-dark">{user.name}</h2>
                  <p className="text-neutral">{user.email}</p>
                </div>

                <div className="mt-6">
                  <button
                    onClick={handleLogout}
                    className="w-full btn-secondary"
                  >
                    Çıkış yap
                  </button>
                </div>
              </div>
            </div>

            {/* Sağ Taraf - Profil Düzenleme Formu */}
            <div className="flex-1">
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                    {error}
                  </div>
                )}

                {success && (
                  <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-md text-sm">
                    {success}
                  </div>
                )}

                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-neutral-dark">
                    Ad Soyad
                  </label>
                  <div className="mt-1">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      defaultValue={user.name}
                      className="block w-full rounded-md border border-neutral-light px-3 py-2 focus:border-primary focus:outline-none focus:ring-primary"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-neutral-dark">
                    Telefon
                  </label>
                  <div className="mt-1">
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      defaultValue={user.phone}
                      className="block w-full rounded-md border border-neutral-light px-3 py-2 focus:border-primary focus:outline-none focus:ring-primary"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-neutral-dark">
                    Adres
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="address"
                      name="address"
                      rows={3}
                      defaultValue={user.address}
                      className="block w-full rounded-md border border-neutral-light px-3 py-2 focus:border-primary focus:outline-none focus:ring-primary"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-primary disabled:opacity-50"
                  >
                    {loading ? 'Güncelleniyor...' : 'Bilgileri Güncelle'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 