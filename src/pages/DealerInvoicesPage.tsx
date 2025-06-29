import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ReceiptText, DollarSign, Clock } from "lucide-react";
import { format } from "date-fns";
import { SeoHead } from "@/components/seo/SeoHead";

// Örnek fatura verileri (InvoicesPage'den alınmıştır, daha sonra API'den gelebilir)
const dummyInvoices = [
  { id: "INV-2024-001", invoiceNumber: "INV-2024-001", dealerName: "ABC Ticaret", amount: 1500.00, invoiceDate: new Date("2024-07-01"), status: "Ödendi" },
  { id: "INV-2024-002", invoiceNumber: "INV-2024-002", dealerName: "XYZ Pazarlama", amount: 250.50, invoiceDate: new Date("2024-07-05"), status: "Beklemede" },
  { id: "INV-2024-003", invoiceNumber: "INV-2024-003", dealerName: "Güneş Elektronik", amount: 750.00, invoiceDate: new Date("2024-07-10"), status: "Ödendi" },
  { id: "INV-2024-004", invoiceNumber: "INV-2024-004", dealerName: "Yıldız Dağıtım", amount: 1200.00, invoiceDate: new Date("2024-07-12"), status: "Beklemede" },
  { id: "INV-2024-005", invoiceNumber: "INV-2024-005", dealerName: "ABC Ticaret", amount: 300.00, invoiceDate: new Date("2024-07-15"), status: "İptal Edildi" },
];

const DealerInvoicesPage = () => {
  // Şimdilik, örnek olarak "ABC Ticaret" bayisinin faturalarını gösterelim.
  // Gerçek uygulamada bu, giriş yapan bayinin ID'sine göre filtrelenmelidir.
  const dealerSpecificInvoices = dummyInvoices.filter(invoice => invoice.dealerName === "ABC Ticaret");

  const totalInvoices = dealerSpecificInvoices.length;
  const totalAmount = dealerSpecificInvoices.reduce((sum, invoice) => sum + invoice.amount, 0);
  const pendingInvoices = dealerSpecificInvoices.filter(invoice => invoice.status === "Beklemede").length;

  return (
    <div className="space-y-6">
      <SeoHead title="Faturalarım" description="Size ait faturaları takip edin ve durumlarını görüntüleyin." />
      <h1 className="text-3xl font-bold">Faturalarım</h1>
      <p className="text-gray-600">Size ait faturaları buradan takip edebilirsiniz.</p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Fatura</CardTitle>
            <ReceiptText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalInvoices}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Tutar</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₺{totalAmount.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bekleyen Fatura</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingInvoices}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0 pb-2">
          <CardTitle className="text-xl font-semibold">Fatura Listesi</CardTitle>
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <Input
              placeholder="Fatura ara..."
              className="max-w-sm w-full"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto"> {/* Tabloyu duyarlı hale getir */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fatura No</TableHead>
                  <TableHead>Bayi Adı</TableHead>
                  <TableHead className="text-right">Tutar</TableHead>
                  <TableHead>Tarih</TableHead>
                  <TableHead>Durum</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dealerSpecificInvoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">{invoice.invoiceNumber}</TableCell>
                    <TableCell>{invoice.dealerName}</TableCell>
                    <TableCell className="text-right">{invoice.amount.toFixed(2)} ₺</TableCell>
                    <TableCell>{format(invoice.invoiceDate, "dd.MM.yyyy")}</TableCell>
                    <TableCell>{invoice.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DealerInvoicesPage;