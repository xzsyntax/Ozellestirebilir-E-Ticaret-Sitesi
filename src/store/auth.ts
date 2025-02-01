import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface User {
  id: number
  email: string
  name: string
  avatar?: string
  phone?: string
  address?: string
}

interface AuthStore {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string) => Promise<void>
  logout: () => void
  updateProfile: (data: Partial<User>) => Promise<void>
}

// Simüle edilmiş kullanıcı veritabanı
const mockUsers: (User & { password: string })[] = [
  {
    id: 1,
    email: 'demo@example.com',
    password: 'demo123',
    name: 'Demo Kullanıcı',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo',
    phone: '555-0123',
    address: 'İstanbul, Türkiye'
  }
]

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        // Simüle edilmiş API çağrısı
        const user = mockUsers.find(u => u.email === email && u.password === password)
        
        if (!user) {
          throw new Error('E-posta veya şifre hatalı')
        }

        const { password: _, ...userData } = user
        set({ user: userData, isAuthenticated: true })
      },

      register: async (email: string, password: string, name: string) => {
        // E-posta kontrolü
        if (mockUsers.some(u => u.email === email)) {
          throw new Error('Bu e-posta adresi zaten kullanımda')
        }

        // Yeni kullanıcı oluştur
        const newUser: User & { password: string } = {
          id: mockUsers.length + 1,
          email,
          password,
          name,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
        }

        mockUsers.push(newUser)
        
        const { password: _, ...userData } = newUser
        set({ user: userData, isAuthenticated: true })
      },

      logout: () => {
        set({ user: null, isAuthenticated: false })
      },

      updateProfile: async (data: Partial<User>) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null
        }))
      }
    }),
    {
      name: 'auth-storage'
    }
  )
) 