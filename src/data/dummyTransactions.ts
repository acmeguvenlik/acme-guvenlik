export interface Transaction {
  id: string;
  dealerId: string;
  type: 'Ödeme' | 'Borç' | 'Fatura' | 'İade' | 'Diğer';
  amount: number;
  description: string;
  date: Date;
}

export const dummyTransactions: Transaction[] = [
  {
    id: "TRN-001",
    dealerId: "D001",
    type: "Fatura",
    amount: -1500.00,
    description: "INV-2024-001 numaralı fatura",
    date: new Date("2024-07-01T10:00:00Z"),
  },
  {
    id: "TRN-002",
    dealerId: "D001",
    type: "Ödeme",
    amount: 1500.00,
    description: "INV-2024-001 faturası ödemesi",
    date: new Date("2024-07-05T11:30:00Z"),
  },
  {
    id: "TRN-003",
    dealerId: "D002",
    type: "Fatura",
    amount: -250.50,
    description: "INV-2024-002 numaralı fatura",
    date: new Date("2024-07-05T14:00:00Z"),
  },
  {
    id: "TRN-004",
    dealerId: "D003",
    type: "Ödeme",
    amount: 750.00,
    description: "Peşin ödeme",
    date: new Date("2024-07-10T09:00:00Z"),
  },
  {
    id: "TRN-005",
    dealerId: "D004",
    type: "Fatura",
    amount: -1200.00,
    description: "INV-2024-004 numaralı fatura",
    date: new Date("2024-07-12T16:00:00Z"),
  },
  {
    id: "TRN-006",
    dealerId: "D001",
    type: "Borç",
    amount: -500.00,
    description: "Ek ürün alımı",
    date: new Date("2024-07-20T10:00:00Z"),
  },
  {
    id: "TRN-007",
    dealerId: "D001",
    type: "Ödeme",
    amount: 200.00,
    description: "Kısmi borç ödemesi",
    date: new Date("2024-07-25T14:00:00Z"),
  },
];