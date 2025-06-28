export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error'; // Bildirim tipi
  read: boolean; // Okunmuş mu?
  createdAt: Date;
  link?: string; // Bildirimin yönlendireceği sayfa
  targetRole: 'admin' | 'dealer' | 'all'; // Hangi role gösterileceği
}

export const dummyNotifications: Notification[] = [
  {
    id: "NOT-001",
    title: "Yeni Sipariş Oluşturuldu",
    message: "ABC Ticaret'ten yeni bir sipariş (ORD-2024-005) alındı.",
    type: "info",
    read: false,
    createdAt: new Date("2024-08-20T10:30:00Z"),
    link: "/orders",
    targetRole: "admin",
  },
  {
    id: "NOT-002",
    title: "Düşük Stok Uyarısı",
    message: "Güvenlik Kamerası (STK-001) stoğu kritik seviyenin altına düştü (15 adet kaldı).",
    type: "warning",
    read: false,
    createdAt: new Date("2024-08-19T15:00:00Z"),
    link: "/stock",
    targetRole: "admin",
  },
  {
    id: "NOT-003",
    title: "Siparişiniz Kargoya Verildi",
    message: "ORD-2024-002 numaralı siparişiniz kargoya verildi.",
    type: "success",
    read: false,
    createdAt: new Date("2024-08-18T11:45:00Z"),
    link: "/dealer-orders",
    targetRole: "dealer",
  },
  {
    id: "NOT-004",
    title: "Yeni Destek Talebi",
    message: "XYZ Pazarlama'dan yeni bir destek talebi (TKT-005) oluşturuldu.",
    type: "error",
    read: false,
    createdAt: new Date("2024-08-17T09:00:00Z"),
    link: "/admin-tickets",
    targetRole: "admin",
  },
  {
    id: "NOT-005",
    title: "Sistem Bakımı Tamamlandı",
    message: "Planlı sistem bakımı başarıyla tamamlandı. Tüm hizmetler aktif.",
    type: "info",
    read: true,
    createdAt: new Date("2024-08-16T04:00:00Z"),
    link: "/dashboard",
    targetRole: "all",
  },
  {
    id: "NOT-006",
    title: "Faturanız Ödendi",
    message: "INV-2024-001 numaralı faturanız başarıyla ödendi.",
    type: "success",
    read: true,
    createdAt: new Date("2024-08-15T16:00:00Z"),
    link: "/dealer-invoices",
    targetRole: "dealer",
  },
];