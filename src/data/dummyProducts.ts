export interface Product {
  id: string;
  productCode: string;
  productName: string;
  category: string;
  quantity: number;
  price: number;
  description?: string;
  imageUrls?: string[]; // Birden fazla görsel için URL dizisi
  variants?: string; // Basit varyant açıklaması (örneğin: "Renk: Kırmızı, Mavi; Boyut: S, M, L")
  supplier?: { // Tedarikçi bilgileri
    name: string;
    contactPerson?: string;
    phone?: string;
    email?: string;
  };
  seo?: { // SEO ayarları
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string;
  };
}

export const dummyProducts: Product[] = [
  { 
    id: "STK-001", 
    productCode: "STK-001", 
    productName: "Güvenlik Kamerası", 
    category: "Kamera", 
    quantity: 125, 
    price: 899.99,
    description: "Yüksek çözünürlüklü, gece görüşlü ve hareket algılamalı dış mekan güvenlik kamerası. Kolay kurulum ve mobil uygulama desteği.",
    imageUrls: ["https://images.unsplash.com/photo-1587825140708-cb053950517f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "https://images.unsplash.com/photo-1587825140708-cb053950517f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
    variants: "Renk: Siyah, Beyaz; Çözünürlük: 1080p, 4K",
    supplier: {
      name: "Global Güvenlik Tedarik",
      contactPerson: "Can Yılmaz",
      phone: "02121112233",
      email: "can@globalguvenlik.com"
    },
    seo: {
      metaTitle: "Güvenlik Kamerası - Acme Güvenlik",
      metaDescription: "Yüksek çözünürlüklü dış mekan güvenlik kamerası modelleri.",
      keywords: "güvenlik kamerası, dış mekan kamera, gece görüşlü kamera"
    }
  },
  { 
    id: "STK-002", 
    productCode: "STK-002", 
    productName: "DVR Kayıt Cihazı", 
    category: "Kayıt Cihazı", 
    quantity: 42, 
    price: 1499.99,
    description: "8 kanallı dijital video kayıt cihazı. H.265+ sıkıştırma teknolojisi, uzaktan erişim ve 2TB depolama alanı.",
    imageUrls: ["https://images.unsplash.com/photo-1587825140708-cb053950517f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
    variants: "Depolama: 1TB, 2TB, 4TB",
    supplier: {
      name: "Tekno Depo",
      contactPerson: "Elif Demir",
      phone: "03124445566",
      email: "elif@teknodepo.com"
    },
    seo: {
      metaTitle: "DVR Kayıt Cihazı - Acme Güvenlik",
      metaDescription: "8 kanallı DVR kayıt cihazları ve depolama çözümleri.",
      keywords: "dvr, kayıt cihazı, güvenlik sistemi, 8 kanal dvr"
    }
  },
  { 
    id: "STK-003", 
    productCode: "STK-003", 
    productName: "Hareket Sensörü", 
    category: "Sensör", 
    quantity: 78, 
    price: 249.99,
    description: "Kablosuz PIR hareket sensörü. Geniş algılama alanı, düşük pil tüketimi ve kolay entegrasyon.",
    imageUrls: ["https://images.unsplash.com/photo-1587825140708-cb053950517f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
    variants: "Tip: Kablosuz, Kablolu",
    supplier: {
      name: "Sensör Dünyası",
      contactPerson: "Burak Can",
      phone: "02167778899",
      email: "burak@sensordunyasi.com"
    },
    seo: {
      metaTitle: "Hareket Sensörü - Acme Güvenlik",
      metaDescription: "Kablosuz ve kablolu hareket sensörleri ile güvenliğinizi artırın.",
      keywords: "hareket sensörü, pir sensör, kablosuz sensör"
    }
  },
  { 
    id: "STK-004", 
    productCode: "STK-004", 
    productName: "Alarm Paneli", 
    category: "Panel", 
    quantity: 35, 
    price: 1999.99,
    description: "Merkezi alarm kontrol paneli. Akıllı ev sistemleriyle uyumlu, dokunmatik ekran ve uzaktan kontrol.",
    imageUrls: ["https://images.unsplash.com/photo-1587825140708-cb053950517f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
    variants: "Ekran: Dokunmatik, Tuşlu",
    supplier: {
      name: "Güvenlik Çözümleri A.Ş.",
      contactPerson: "Deniz Ak",
      phone: "02321234567",
      email: "deniz@guvenlikcozumleri.com"
    },
    seo: {
      metaTitle: "Alarm Paneli - Acme Güvenlik",
      metaDescription: "Akıllı ev sistemleriyle uyumlu merkezi alarm kontrol panelleri.",
      keywords: "alarm paneli, kontrol paneli, akıllı ev alarm"
    }
  },
  { 
    id: "STK-005", 
    productCode: "STK-005", 
    productName: "IP Kamera", 
    category: "Kamera", 
    quantity: 90, 
    price: 1200.00,
    description: "Yüksek çözünürlüklü IP kamera. PoE desteği, iki yönlü ses ve bulut depolama seçenekleri.",
    imageUrls: ["https://images.unsplash.com/photo-1587825140708-cb053950517f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
    variants: "Bağlantı: Kablolu, Kablosuz",
    supplier: {
      name: "Global Güvenlik Tedarik",
      contactPerson: "Can Yılmaz",
      phone: "02121112233",
      email: "can@globalguvenlik.com"
    },
    seo: {
      metaTitle: "IP Kamera - Acme Güvenlik",
      metaDescription: "PoE destekli yüksek çözünürlüklü IP kameralar.",
      keywords: "ip kamera, poe kamera, bulut kamera"
    }
  },
  { 
    id: "STK-006", 
    productCode: "STK-006", 
    productName: "NVR Kayıt Cihazı", 
    category: "Kayıt Cihazı", 
    quantity: 20, 
    price: 2500.00,
    description: "16 kanallı ağ video kayıt cihazı. 4K çözünürlük desteği, RAID yapılandırması ve gelişmiş analiz özellikleri.",
    imageUrls: ["https://images.unsplash.com/photo-1587825140708-cb053950517f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
    variants: "Kanal Sayısı: 8, 16, 32",
    supplier: {
      name: "Tekno Depo",
      contactPerson: "Elif Demir",
      phone: "03124445566",
      email: "elif@teknodepo.com"
    },
    seo: {
      metaTitle: "NVR Kayıt Cihazı - Acme Güvenlik",
      metaDescription: "16 kanallı NVR kayıt cihazları ve 4K çözünürlük desteği.",
      keywords: "nvr, kayıt cihazı, 4k nvr, ağ kayıt cihazı"
    }
  },
];