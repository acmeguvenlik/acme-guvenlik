import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlusCircle, ReceiptText, DollarSign, Clock } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AddInvoiceForm } from "@/components/invoices/AddInvoiceForm";
import { format } from "date-fns";
import { SeoHead } from "@/components/seo/SeoHead"; // SeoHead import edildi

// Örnek fatura verileri
const dummyInvoices = [
  { id: "INV-2024-001", invoiceNumber: "INV-2024-001", dealerName: "ABC Ticaret", amount: 1500.00, invoiceDate: new Date("2024-07-01"), status: "Ödendi" },
  { id: "INV-2024-002", invoiceNumber: "INV-2024-002", dealerName: "XYZ Pazarlama", amount: 250.50, invoiceDate: new Date("2024-07-05"), status: "Beklemede" },
  { id: "INV-2024-003", invoiceNumber: "INV-2024-003", dealerName: "Güneş Elektronik", amount: 750.00, invoiceDate: new Date("2024-07-10"), status: "Ödendi" },
  { id: "INV-2024-004", invoiceNumber: "INV-2024-004", dealerName: "Yıldız Dağıtım", amount: 1200.00, invoiceDate: new Date("2024-07-12"), status: "Beklemede" },
  { id: "INV-2024-005", invoiceNumber: "INV-2024-005", dealerName: "ABC Ticaret", amount: 300.00, invoiceDate: new Date("2024-07-15"), status: "İptal Edildi" },
];

const InvoicesPage = () => {
  const [isAddInvoiceDialogOpen, setIsAddInvoiceDialogOpen] = useState(false);

  const handleAddInvoiceSuccess = () => {
    setIsAddInvoiceDialogOpen(false);
  };

  const totalInvoices = dummyInvoices.length;
  const totalAmount = dummyInvoices.reduce((sum, invoice) => sum + invoice.amount, 0);
  const pendingInvoices = dummyInvoices.filter(invoice => invoice.status === "Beklemede").length;

  return (
    <div className="space-y-6">
      <SeoHead title="Faturalar Yönetimi" description="Sisteme kayıtlı faturalarınızı yönetin ve yeni faturalar ekleyin." />
      <h1 className="text-3xl font-bold">Faturalar Yönetimi</h1>
      <p className="text-gray-600">Sisteme kayıtlı faturalarınızı buradan yönetebilirsiniz.</p>

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
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-semibold">Fatura Listesi</CardTitle>
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Fatura ara..."
              className="max-w-sm"
            />
            <Dialog open={isAddInvoiceDialogOpen} onOpenChange={setIsAddInvoiceDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Yeni Fatura Ekle
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Yeni Fatura Ekle</DialogTitle>
                  <DialogDescription>
                    Yeni bir fatura eklemek için aşağıdaki formu doldurun.
                  </DialogDescription>
                </DialogHeader>
                <AddInvoiceForm onSuccess={handleAddInvoiceSuccess} />
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
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
              {dummyInvoices.map((invoice) => (
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
        </CardContent>
      </Card>
    </div>
  );
};

export default InvoicesPage;