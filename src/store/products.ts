export interface Product {
  id: number
  name: string
  price: string
  oldPrice?: string
  image: string
  gallery?: string[]
  category: string
  description: string
  specs: string[]
  rating: number
  reviewCount: number
  stock: number
  brand: string
}

export interface Review {
  id: number
  productId: number
  userName: string
  rating: number
  comment: string
  date: string
  likes: number
  helpful: number
}

export const products: Product[] = [
  {
    id: 1,
    name: 'iPhone 15 Pro',
    price: '84.999',
    oldPrice: '89.999',
    image: 'https://picsum.photos/800/800?random=1',
    gallery: [
      'https://picsum.photos/800/800?random=11',
      'https://picsum.photos/800/800?random=12',
      'https://picsum.photos/800/800?random=13',
    ],
    category: 'Elektronik',
    description: 'A17 Pro çip, 48MP Kamera, Titanyum tasarım',
    specs: [
      '6.7 inç Super Retina XDR OLED ekran',
      'A17 Pro çip',
      '48MP Ana kamera',
      '8GB RAM',
      '256GB Depolama',
      'iOS 17',
    ],
    rating: 4.8,
    reviewCount: 245,
    stock: 10,
    brand: 'Apple'
  },
  {
    id: 2,
    name: 'Samsung Galaxy S24 Ultra',
    price: '72.999',
    oldPrice: '76.999',
    image: 'https://picsum.photos/800/800?random=2',
    gallery: [
      'https://picsum.photos/800/800?random=21',
      'https://picsum.photos/800/800?random=22',
      'https://picsum.photos/800/800?random=23',
    ],
    category: 'Elektronik',
    description: 'Snapdragon 8 Gen 3, 200MP Kamera, S Pen',
    specs: [
      '6.8 inç Dynamic AMOLED 2X ekran',
      'Snapdragon 8 Gen 3',
      '200MP Ana kamera',
      '12GB RAM',
      '512GB Depolama',
      'Android 14',
    ],
    rating: 4.7,
    reviewCount: 189,
    stock: 15,
    brand: 'Samsung'
  },
  {
    id: 3,
    name: 'MacBook Pro 16"',
    price: '92.999',
    oldPrice: '96.999',
    image: 'https://picsum.photos/800/800?random=3',
    gallery: [
      'https://picsum.photos/800/800?random=31',
      'https://picsum.photos/800/800?random=32',
      'https://picsum.photos/800/800?random=33',
    ],
    category: 'Elektronik',
    description: 'M3 Max çip, 32GB RAM, 1TB SSD',
    specs: [
      '16 inç Liquid Retina XDR ekran',
      'M3 Max çip',
      '32GB RAM',
      '1TB SSD',
      'macOS Sonoma',
      '22 saat pil ömrü',
    ],
    rating: 4.9,
    reviewCount: 156,
    stock: 8,
    brand: 'Apple'
  },
  {
    id: 4,
    name: 'Sony WH-1000XM5',
    price: '12.999',
    oldPrice: '14.999',
    image: 'https://picsum.photos/800/800?random=4',
    gallery: [
      'https://picsum.photos/800/800?random=41',
      'https://picsum.photos/800/800?random=42',
      'https://picsum.photos/800/800?random=43',
    ],
    category: 'Elektronik',
    description: 'Gürültü önleyici kablosuz kulaklık',
    specs: [
      '30 saat pil ömrü',
      'Aktif gürültü önleme',
      'LDAC desteği',
      'Çoklu cihaz bağlantısı',
      'Touch kontroller',
      'Hızlı şarj',
    ],
    rating: 4.6,
    reviewCount: 312,
    stock: 25,
    brand: 'Sony'
  },
  {
    id: 5,
    name: 'Nike Air Max 270',
    price: '4.999',
    oldPrice: '5.499',
    image: 'https://picsum.photos/800/800?random=5',
    gallery: [
      'https://picsum.photos/800/800?random=51',
      'https://picsum.photos/800/800?random=52',
      'https://picsum.photos/800/800?random=53',
    ],
    category: 'Moda',
    description: 'Maksimum konfor ve stil',
    specs: [
      'Air Max yastıklama',
      'Nefes alabilen üst malzeme',
      'Dayanıklı taban',
      'Hafif tasarım',
      'Çeşitli renk seçenekleri',
    ],
    rating: 4.5,
    reviewCount: 428,
    stock: 30,
    brand: 'Nike'
  }
]

export const reviews: Review[] = [
  {
    id: 1,
    productId: 1,
    userName: 'Ahmet Y.',
    rating: 5,
    comment: 'Harika bir telefon, kamera performansı muhteşem!',
    date: '2024-02-01',
    likes: 12,
    helpful: 8
  },
  {
    id: 2,
    productId: 1,
    userName: 'Mehmet K.',
    rating: 4,
    comment: 'Genel olarak memnunum ama fiyatı biraz yüksek.',
    date: '2024-01-28',
    likes: 8,
    helpful: 5
  },
  {
    id: 3,
    productId: 2,
    userName: 'Ayşe S.',
    rating: 5,
    comment: 'S Pen özelliği çok kullanışlı, pil ömrü uzun.',
    date: '2024-01-25',
    likes: 15,
    helpful: 10
  }
]

export const categories = [
  {
    id: 'elektronik',
    name: 'Elektronik',
    subcategories: ['Telefon', 'Bilgisayar', 'Tablet', 'Kulaklık']
  },
  {
    id: 'moda',
    name: 'Moda',
    subcategories: ['Erkek', 'Kadın', 'Çocuk', 'Spor']
  },
  {
    id: 'ev-yasam',
    name: 'Ev & Yaşam',
    subcategories: ['Mobilya', 'Dekorasyon', 'Ev Tekstili', 'Mutfak']
  }
]

export const getProductsByCategory = (categoryId: string) => {
  return products.filter(product => 
    product.category.toLowerCase() === categoryId.toLowerCase()
  )
}

export const getProductById = (id: number) => {
  return products.find(product => product.id === id)
}

export const getReviewsByProductId = (productId: number) => {
  return reviews.filter(review => review.productId === productId)
}

export const getProductsBySearch = (query: string) => {
  const searchTerms = query.toLowerCase().split(' ')
  return products.filter(product => {
    const searchText = `${product.name} ${product.description} ${product.brand} ${product.category}`.toLowerCase()
    return searchTerms.every(term => searchText.includes(term))
  })
} 