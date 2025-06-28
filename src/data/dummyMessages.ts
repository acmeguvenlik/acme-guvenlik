export interface Message {
  id: string;
  senderId: string; // Gönderen kullanıcı ID'si (örn: U001, D001)
  senderName: string; // Gönderen adı
  content: string;
  createdAt: Date;
}

export interface Conversation {
  id: string;
  participants: { id: string; name: string; role: 'admin' | 'dealer' | 'viewer' }[];
  subject: string;
  messages: Message[];
  lastMessageAt: Date;
}

export const dummyConversations: Conversation[] = [
  {
    id: "CONV-001",
    participants: [
      { id: "U001", name: "Admin User", role: "admin" },
      { id: "D001", name: "ABC Ticaret", role: "dealer" },
    ],
    subject: "Yeni Sipariş Hakkında Bilgi",
    messages: [
      { id: "MSG-C1-001", senderId: "D001", senderName: "ABC Ticaret", content: "Merhaba, yeni siparişimiz ORD-2024-006'nın durumu hakkında bilgi alabilir miyim?", createdAt: new Date("2024-08-22T10:00:00Z") },
      { id: "MSG-C1-002", senderId: "U001", senderName: "Admin User", content: "Merhaba! Siparişiniz şu anda hazırlanıyor, tahmini kargoya veriliş tarihi yarın.", createdAt: new Date("2024-08-22T10:15:00Z") },
      { id: "MSG-C1-003", senderId: "D001", senderName: "ABC Ticaret", content: "Teşekkürler, harika haber!", createdAt: new Date("2024-08-22T10:20:00Z") },
    ],
    lastMessageAt: new Date("2024-08-22T10:20:00Z"),
  },
  {
    id: "CONV-002",
    participants: [
      { id: "U001", name: "Admin User", role: "admin" },
      { id: "D002", name: "XYZ Pazarlama", role: "dealer" },
    ],
    subject: "Fatura Ödemesi Hatırlatması",
    messages: [
      { id: "MSG-C2-001", senderId: "U001", senderName: "Admin User", content: "Merhaba XYZ Pazarlama, INV-2024-002 numaralı faturanızın ödemesi gecikmiştir. Bilginize.", createdAt: new Date("2024-08-20T11:00:00Z") },
      { id: "MSG-C2-002", senderId: "D002", senderName: "XYZ Pazarlama", content: "Kontrol ediyorum, en kısa sürede ödemeyi gerçekleştireceğiz.", createdAt: new Date("2024-08-20T11:30:00Z") },
    ],
    lastMessageAt: new Date("2024-08-20T11:30:00Z"),
  },
  {
    id: "CONV-003",
    participants: [
      { id: "U001", name: "Admin User", role: "admin" },
      { id: "D003", name: "Güneş Elektronik", role: "dealer" },
    ],
    subject: "Yeni Ürün Talebi",
    messages: [
      { id: "MSG-C3-001", senderId: "D003", senderName: "Güneş Elektronik", content: "Merhaba, yeni akıllı ev sensörleri ne zaman stoklarınıza eklenecek?", createdAt: new Date("2024-08-18T15:00:00Z") },
      { id: "MSG-C3-002", senderId: "U001", senderName: "Admin User", content: "Merhaba, yeni sensörler önümüzdeki hafta içinde kataloğumuza eklenecek. Takipte kalın!", createdAt: new Date("2024-08-18T15:10:00Z") },
    ],
    lastMessageAt: new Date("2024-08-18T15:10:00Z"),
  },
];