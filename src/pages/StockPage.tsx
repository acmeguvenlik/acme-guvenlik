import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, Package, Boxes } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AddStockForm } from "@/components/stock/AddStockForm";

// Örnek stok verileri
const dummyStockItems = [
  { id: "STK-001", name: "Güvenlik Kamerası", category: "Kamera", quantity: 125, price: 899.99 },
  { id: "STK-002", name: "DVR Kayıt Cihazı", category: "Kayıt Cihazı", quantity: 42, price: 1499.99 },
  { id: "STK-003", name: "Hareket Sensörü", category: "Sensör", quantity: 78, price: 249.99 },
  { id: "STK-004", name: "Alarm Paneli", category: "Panel", quantity: 35, price: 1999.99 },
];

export const StockPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStockItems = dummyStockItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Stok Yönetimi</h1>
          <p className="text-gray-600">Ürün stoklarınızı buradan yönetebilirsiniz</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Stok Ekle
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Yeni Stok Ekle</DialogTitle>
            </DialogHeader>
            <AddStockForm />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Ürün Çeşidi</CardTitle>
            <Boxes className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dummyStockItems.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Stok Adedi</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dummyStockItems.reduce((sum, item) => sum + item.quantity, 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Stok Listesi</CardTitle>
          <div className="flex space-x-2">
            <Input
              placeholder="Ürün ara..."
              className="max-w-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Stok Kodu</TableHead>
                <TableHead>Ürün Adı</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead className="text-right">Adet</TableHead>
                <TableHead className="text-right">Birim Fiyat</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStockItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell className="text-right">{item.quantity}</TableCell>
                  <TableCell className="text-right">{item.price.toFixed(2)} ₺</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};