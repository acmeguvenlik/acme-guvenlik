export interface Product {
  id: string;
  productCode: string;
  productName: string;
  category: string;
  quantity: number;
  price: number;
  description?: string;
  imageUrl?: string;
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
    imageUrl: "https://images.unsplash.com/photo-1587825140708-cb053950517f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  { 
    id: "STK-002", 
    productCode: "STK-002", 
    productName: "DVR Kayıt Cihazı", 
    category: "Kayıt Cihazı", 
    quantity: 42, 
    price: 1499.99,
    description: "8 kanallı dijital video kayıt cihazı. H.265+ sıkıştırma teknolojisi, uzaktan erişim ve 2TB depolama alanı.",
    imageUrl: "https://images.unsplash.com/photo-1587825140708-cb053950517f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  { 
    id: "STK-003", 
    productCode: "STK-003", 
    productName: "Hareket Sensörü", 
    category: "Sensör", 
    quantity: 78, 
    price: 249.99,
    description: "Kablosuz PIR hareket sensörü. Geniş algılama alanı, düşük pil tüketimi ve kolay entegrasyon.",
    imageUrl: "https://images.unsplash.com/photo-1587825140708-cb053950517f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  { 
    id: "STK-004", 
    productCode: "STK-004", 
    productName: "Alarm Paneli", 
    category: "Panel", 
    quantity: 35, 
    price: 1999.99,
    description: "Merkezi alarm kontrol paneli. Akıllı ev sistemleriyle uyumlu, dokunmatik ekran ve uzaktan kontrol.",
    imageUrl: "https://images.unsplash.com/photo-1587825140708-cb053950517f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  { 
    id: "STK-005", 
    productCode: "STK-005", 
    productName: "IP Kamera", 
    category: "Kamera", 
    quantity: 90, 
    price: 1200.00,
    description: "Yüksek çözünürlüklü IP kamera. PoE desteği, iki yönlü ses ve bulut depolama seçenekleri.",
    imageUrl: "https://images.unsplash.com/photo-1587825140708-cb053950517f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  { 
    id: "STK-006", 
    productCode: "STK-006", 
    productName: "NVR Kayıt Cihazı", 
    category: "Kayıt Cihazı", 
    quantity: 20, 
    price: 2500.00,
    description: "16 kanallı ağ video kayıt cihazı. 4K çözünürlük desteği, RAID yapılandırması ve gelişmiş analiz özellikleri.",
    imageUrl: "https://images.unsplash.com/photo-1587825140708-cb053950517f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
];