export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
  targetRole: 'admin' | 'dealer' | 'all'; // Hangi role gösterileceği
}

export const dummyFAQs: FAQ[] = [
  {
    id: "FAQ-001",
    question: "Siparişimi nasıl takip edebilirim?",
    answer: "<p>Siparişinizi takip etmek için <strong>'Siparişlerim'</strong> sayfasına giderek ilgili siparişin detaylarını görüntüleyebilirsiniz. Siparişinizin güncel durumu ve kargo bilgileri burada yer alacaktır.</p>",
    category: "Siparişler",
    createdAt: new Date("2024-08-01T10:00:00Z"),
    updatedAt: new Date("2024-08-01T10:00:00Z"),
    targetRole: "dealer",
  },
  {
    id: "FAQ-002",
    question: "Fatura bilgilerimi nereden görebilirim?",
    answer: "<p>Tüm faturalarınıza <strong>'Faturalarım'</strong> sayfasından ulaşabilirsiniz. Burada geçmiş faturalarınızı görüntüleyebilir ve indirebilirsiniz.</p>",
    category: "Faturalar",
    createdAt: new Date("2024-08-01T10:15:00Z"),
    updatedAt: new Date("2024-08-01T10:15:00Z"),
    targetRole: "dealer",
  },
  {
    id: "FAQ-003",
    question: "Yeni bir destek talebi nasıl oluşturulur?",
    answer: "<p>Yeni bir destek talebi oluşturmak için <strong>'Destek Taleplerim'</strong> sayfasına giderek <strong>'Yeni Talep Oluştur'</strong> butonuna tıklayınız. Açılan formu doldurarak talebinizi iletebilirsiniz.</p>",
    category: "Destek",
    createdAt: new Date("2024-08-01T10:30:00Z"),
    updatedAt: new Date("2024-08-01T10:30:00Z"),
    targetRole: "all",
  },
  {
    id: "FAQ-004",
    question: "Ürün stok durumunu nasıl kontrol edebilirim?",
    answer: "<p>Ürünlerin güncel stok durumunu <strong>'Ürün Kataloğu'</strong> sayfasından kontrol edebilirsiniz. Her ürünün yanında mevcut stok adedi belirtilmiştir.</p>",
    category: "Stok",
    createdAt: new Date("2024-08-01T10:45:00Z"),
    updatedAt: new Date("2024-08-01T10:45:00Z"),
    targetRole: "dealer",
  },
  {
    id: "FAQ-005",
    question: "Şifremi unuttum, ne yapmalıyım?",
    answer: "<p>Giriş sayfasındaki <strong>'Şifremi Unuttum'</strong> bağlantısına tıklayarak şifre sıfırlama adımlarını takip edebilirsiniz. Kayıtlı e-posta adresinize bir sıfırlama bağlantısı gönderilecektir.</p>",
    category: "Hesap",
    createdAt: new Date("2024-08-02T09:00:00Z"),
    updatedAt: new Date("2024-08-02T09:00:00Z"),
    targetRole: "all",
  },
  {
    id: "FAQ-006",
    question: "Bayi bilgilerimi nasıl güncelleyebilirim?",
    answer: "<p>Bayi profil bilgilerinizi güncellemek için <strong>'Profilim'</strong> sayfasına giderek ilgili alanları düzenleyebilir ve kaydedebilirsiniz.</p>",
    category: "Hesap",
    createdAt: new Date("2024-08-02T09:30:00Z"),
    updatedAt: new Date("2024-08-02T09:30:00Z"),
    targetRole: "dealer",
  },
  {
    id: "FAQ-007",
    question: "Yeni ürünler ne zaman ekleniyor?",
    answer: "<p>Ürün kataloğumuz düzenli olarak güncellenmektedir. Yeni ürünler eklendiğinde veya önemli güncellemeler olduğunda <strong>'Duyurular'</strong> bölümünden bilgilendirme yapılacaktır.</p>",
    category: "Ürünler",
    createdAt: new Date("2024-08-03T11:00:00Z"),
    updatedAt: new Date("2024-08-03T11:00:00Z"),
    targetRole: "all",
  },
  {
    id: "FAQ-008",
    question: "Ödeme yöntemleri nelerdir?",
    answer: "<p>Şu anda banka havalesi ve kredi kartı ile ödeme seçenekleri mevcuttur. Detaylı bilgi için lütfen finans departmanımızla iletişime geçiniz.</p>",
    category: "Ödeme",
    createdAt: new Date("2024-08-03T11:30:00Z"),
    updatedAt: new Date("2024-08-03T11:30:00Z"),
    targetRole: "all",
  },
  {
    id: "FAQ-009",
    question: "Sistem bakımı ne zaman yapılıyor?",
    answer: "<p>Planlı sistem bakımları genellikle hafta sonları veya gece saatlerinde yapılmaktadır. Bakım öncesinde <strong>'Duyurular'</strong> bölümünden bilgilendirme yapılacaktır.</p>",
    category: "Sistem",
    createdAt: new Date("2024-08-04T13:00:00Z"),
    updatedAt: new Date("2024-08-04T13:00:00Z"),
    targetRole: "all",
  },
  {
    id: "FAQ-010",
    question: "Admin paneline nasıl erişebilirim?",
    answer: "<p>Admin paneline sadece yetkili yöneticiler erişebilir. Giriş bilgilerinizi kullanarak sisteme giriş yaptıktan sonra otomatik olarak yönlendirileceksiniz.</p>",
    category: "Sistem",
    createdAt: new Date("2024-08-04T13:30:00Z"),
    updatedAt: new Date("2024-08-04T13:30:00Z"),
    targetRole: "admin",
  },
];