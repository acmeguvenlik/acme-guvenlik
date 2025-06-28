import { DealerFormData } from "@/components/dealers/AddDealerForm";

export const dummyDealers: DealerFormData[] = [
  { id: "D001", name: "ABC Ticaret", contact: "Ali Can", phone: "5551234567", email: "abc@example.com", balance: 1500.00, accountType: "Müşteri" },
  { id: "D002", name: "XYZ Pazarlama", contact: "Ayşe Yılmaz", phone: "5559876543", email: "xyz@example.com", balance: -250.50, accountType: "Müşteri" },
  { id: "D003", name: "Güneş Elektronik", contact: "Mehmet Demir", phone: "5551112233", email: "gunes@example.com", balance: 750.00, accountType: "Tedarikçi" },
  { id: "D004", name: "Yıldız Dağıtım", contact: "Zeynep Kaya", phone: "5554445566", email: "yildiz@example.com", balance: -1200.00, accountType: "Tedarikçi" },
  { id: "D005", name: "Merkez Ofis Giderleri", contact: "Canan Ak", phone: "5550001122", email: "merkez@example.com", balance: 0.00, accountType: "Diğer" },
];