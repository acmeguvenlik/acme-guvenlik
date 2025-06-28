export interface TicketMessage {
  id: string;
  senderId: string; // Kullanıcı ID'si (admin veya bayi)
  senderRole: 'admin' | 'dealer';
  content: string;
  createdAt: Date;
}

export interface Ticket {
  id: string;
  subject: string;
  description: string;
  status: 'Açık' | 'Yanıtlandı' | 'Çözüldü' | 'Kapalı';
  priority: 'Düşük' | 'Orta' | 'Yüksek' | 'Acil';
  createdAt: Date;
  updatedAt: Date;
  dealerId: string; // Talebi oluşturan bayinin ID'si
  dealerName: string; // Talebi oluşturan bayinin adı
  messages: TicketMessage[];
}

export const dummyTickets: Ticket[] = [
  {
    id: "TKT-001",
    subject: "Kamera Kurulumunda Hata",
    description: "Yeni aldığımız güvenlik kamerasının kurulumunda 'bağlantı hatası' alıyoruz. Yardımcı olabilir misiniz?",
    status: "Açık",
    priority: "Yüksek",
    createdAt: new Date("2024-08-15T10:00:00Z"),
    updatedAt: new Date("2024-08-15T10:00:00Z"),
    dealerId: "D001",
    dealerName: "ABC Ticaret",
    messages: [
      { id: "MSG-001", senderId: "D001", senderRole: "dealer", content: "Kamera kurulumunda sorun yaşıyorum.", createdAt: new Date("2024-08-15T10:00:00Z") },
    ],
  },
  {
    id: "TKT-002",
    subject: "Fatura Sorgulama",
    description: "INV-2024-005 numaralı faturanın durumu hakkında bilgi almak istiyorum.",
    status: "Yanıtlandı",
    priority: "Düşük",
    createdAt: new Date("2024-08-14T14:30:00Z"),
    updatedAt: new Date("2024-08-15T11:00:00Z"),
    dealerId: "D002",
    dealerName: "XYZ Pazarlama",
    messages: [
      { id: "MSG-002", senderId: "D002", senderRole: "dealer", content: "Fatura durumu hakkında bilgi.", createdAt: new Date("2024-08-14T14:30:00Z") },
      { id: "MSG-003", senderId: "U001", senderRole: "admin", content: "Faturanız 'İptal Edildi' olarak görünmektedir. Detaylar için muhasebe departmanımızla iletişime geçebilirsiniz.", createdAt: new Date("2024-08-15T11:00:00Z") },
    ],
  },
  {
    id: "TKT-003",
    subject: "Yeni Ürün Talebi",
    description: "Kataloğunuza yeni bir akıllı kilit sistemi eklemeyi düşünüyor musunuz? Müşterilerimizden çok talep var.",
    status: "Çözüldü",
    priority: "Orta",
    createdAt: new Date("2024-08-12T09:00:00Z"),
    updatedAt: new Date("2024-08-13T16:00:00Z"),
    dealerId: "D001",
    dealerName: "ABC Ticaret",
    messages: [
      { id: "MSG-004", senderId: "D001", senderRole: "dealer", content: "Akıllı kilit sistemi talebi.", createdAt: new Date("2024-08-12T09:00:00Z") },
      { id: "MSG-005", senderId: "U001", senderRole: "admin", content: "Talebiniz değerlendirmeye alınmıştır. Yakın zamanda yeni ürünler eklenecektir.", createdAt: new Date("2024-08-12T10:00:00Z") },
      { id: "MSG-006", senderId: "U001", senderRole: "admin", content: "Yeni akıllı kilit sistemleri kataloğumuza eklenmiştir. Bilginize.", createdAt: new Date("2024-08-13T16:00:00Z") },
    ],
  },
  {
    id: "TKT-004",
    subject: "Şifre Sıfırlama Talebi",
    description: "Hesabıma giriş yapamıyorum, şifremi sıfırlamam gerekiyor.",
    status: "Kapalı",
    priority: "Acil",
    createdAt: new Date("2024-08-11T08:00:00Z"),
    updatedAt: new Date("2024-08-11T08:15:00Z"),
    dealerId: "D003",
    dealerName: "Güneş Elektronik",
    messages: [
      { id: "MSG-007", senderId: "D003", senderRole: "dealer", content: "Şifremi unuttum.", createdAt: new Date("2024-08-11T08:00:00Z") },
      { id: "MSG-008", senderId: "U001", senderRole: "admin", content: "Şifre sıfırlama linki e-posta adresinize gönderilmiştir. Lütfen kontrol ediniz.", createdAt: new Date("2024-08-11T08:05:00Z") },
      { id: "MSG-009", senderId: "D003", senderRole: "dealer", content: "Teşekkürler, sorun çözüldü.", createdAt: new Date("2024-08-11T08:10:00Z") },
    ],
  },
];