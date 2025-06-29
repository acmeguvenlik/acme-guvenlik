import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, Package, Boxes, Edit } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AddStockForm } from "@/components/stock/AddStockForm";
import { dummyProducts, Product } from "@/data/dummyProducts";
import { Link } from "react-router-dom";
import { EmptyState } from "@/components/EmptyState";
import { SeoHead } from "@/components/seo/SeoHead"; // SeoHead import edildi

export const StockPage = () => {
  const [stockItems, setStockItems] = useState<Product[]>(dummyProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddStockDialogOpen, setIsAddStockDialogOpen] = useState(false);

  const handleAddStockSuccess = (newProduct: Product) => {
    const newId = `STK-${String(stockItems.length + 1).padStart(3, '0')}`;
    setStockItems((prev) => [...prev, { ...newProduct, id: newId, productCode: newId }]);
    setIsAddStockDialogOpen(false);
  };

  const filteredStockItems = stockItems.filter(item =>
    item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.productCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <SeoHead title="Stok Yönetimi" description="Ürün stoklarınızı yönetin ve yeni ürünler ekleyin." />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Stok Yönetimi</h1>
          <p className="text-gray-600 dark:text-gray-400">Ürün stoklarınızı buradan yönetebilirsiniz</p>
        </div>
        <Dialog open={isAddStockDialogOpen} onOpenChange={setIsAddStockDialogOpen}>
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
            <AddStockForm onSuccess={handleAddStockSuccess} />
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
            <div className="text-2xl font-bold">{stockItems.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Stok Adedi</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stockItems.reduce((sum, item) => sum + item.quantity, 0)}
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
          {filteredStockItems.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Stok Kodu</TableHead>
                  <TableHead>Ürün Adı</TableHead>
                  <TableHead>Kategori</TableHead>
                  <TableHead className="text-right">Adet</TableHead>
                  <TableHead className="text-right">Birim Fiyat</TableHead>
                  <TableHead className="text-right">İşlemler</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStockItems.map((item) => (
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
                    <TableCell className="text-right">
                      <Link to={`/stock/edit/${item.id}`}>
                        <Button
                          variant="ghost"
                          size="sm"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <EmptyState
              title="Ürün Bulunamadı"
              description="Aradığınız kriterlere uygun ürün bulunamadı. Yeni bir ürün ekleyebilir veya arama teriminizi değiştirebilirsiniz."
              buttonText="Yeni Stok Ekle"
              onButtonClick={() => setIsAddStockDialogOpen(true)}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};