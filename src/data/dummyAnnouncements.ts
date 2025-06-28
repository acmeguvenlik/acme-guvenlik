export interface Announcement {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  targetRole: 'admin' | 'dealer' | 'all';
}

export const dummyAnnouncements: Announcement[] = [
  {
    id: "ANN-001",
    title: "Sistem Bakımı Duyurusu",
    content: "Değerli kullanıcılarımız, 15 Ağustos 2024 tarihinde 02:00 - 04:00 saatleri arasında planlı sistem bakımı yapılacaktır. Bu süre zarfında sistemde kısa süreli kesintiler yaşanabilir. Anlayışınız için teşekkür ederiz.",
    createdAt: new Date("2024-08-10T10:00:00Z"),
    targetRole: "all",
  },
  {
    id: "ANN-002",
    title: "Yeni Ürün Kataloğu Yayınlandı",
    content: "Bayilerimiz için güncel ürün kataloğumuz yayınlanmıştır. Stok sayfasından yeni ürünleri ve güncel fiyatları inceleyebilirsiniz.",
    createdAt: new Date("2024-08-08T14:30:00Z"),
    targetRole: "dealer",
  },
  {
    id: "ANN-003",
    title: "Admin Paneli Güncellemesi",
    content: "Admin paneline yeni raporlama özellikleri eklenmiştir. Raporlar sayfasından detayları inceleyebilirsiniz.",
    createdAt: new Date("2024-08-05T09:00:00Z"),
    targetRole: "admin",
  },
];