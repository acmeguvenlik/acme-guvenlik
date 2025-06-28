import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Package, Boxes } from "lucide-react";

// Örnek stok verileri (StockPage'den alınmıştır, daha sonra API'den gelebilir)
const dummyStockItems = [
  { id: "STK-001", name: "Güvenlik Kamerası", category: "Kamera", quantity: 125, price: 899.99 },
  { id: "STK-002", name: "DVR Kayıt Cihazı", category: "Kayıt Cihazı", quantity: 42, price: 1499.99 },
  { id: "STK-003", name: "Hareket Sensörü", category: "Sensör", quantity: 78, price: 249.99 },
  { id: "STK-004", name: "Alarm Paneli", category: "Panel", quantity: 35, price: 1999.99 },
  { id: "STK-005", name: "IP Kamera", category: "Kamera", quantity: 90, price: 1200.00 },
  { id: "STK-006", name: "NVR Kayıt Cihazı", category: "Kayıt Cihazı", quantity: 20, price: 2500.00 },
];

const DealerStockPage = () => {
  const totalProductTypes = dummyStockItems.length;
  const totalStockQuantity = dummyStockItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Ürün Kataloğu</h1>
      <p className="text-gray-600">Mevcut ürünlerimizi ve stok durumlarını buradan inceleyebilirsiniz.</p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Ürün Çeşidi</CardTitle>
            <Boxes className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProductTypes}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Stok Adedi</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalStockQuantity}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Ürün Listesi</CardTitle>
          <div className="flex space-x-2">
            <Input placeholder="Ürün ara..." className="max-w-sm" />
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
              {dummyStockItems.map((item) => (
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

export default DealerStockPage;