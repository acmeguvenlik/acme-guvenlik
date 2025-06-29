import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Package, Boxes } from "lucide-react";
import { dummyProducts } from "@/data/dummyProducts";
import { Link } from "react-router-dom";
import { SeoHead } from "@/components/seo/SeoHead";

const DealerStockPage = () => {
  const totalProductTypes = dummyProducts.length;
  const totalStockQuantity = dummyProducts.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="space-y-6">
      <SeoHead title="Ürün Kataloğu" description="Mevcut ürünlerimizi ve stok durumlarını inceleyin." />
      <h1 className="text-3xl font-bold">Ürün Kataloğu</h1>
      <p className="text-gray-600 dark:text-gray-400">Mevcut ürünlerimizi ve stok durumlarını buradan inceleyebilirsiniz.</p>

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
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <CardTitle>Ürün Listesi</CardTitle>
          <div className="flex space-x-2 w-full sm:w-auto">
            <Input placeholder="Ürün ara..." className="max-w-sm w-full" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto"> {/* Tabloyu duyarlı hale getir */}
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
                {dummyProducts.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">
                      <Link to={`/product/${item.id}`} className="text-blue-600 hover:underline">
                        {item.productCode}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link to={`/product/${item.id}`} className="text-blue-600 hover:underline">
                        {item.productName}
                      </Link>
                    </TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell className="text-right">{item.quantity}</TableCell>
                    <TableCell className="text-right">{item.price.toFixed(2)} ₺</TableCell>
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

export default DealerStockPage;