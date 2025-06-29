import { useParams, Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { dummyProducts, Product } from "@/data/dummyProducts";
import { AddStockForm } from "@/components/stock/AddStockForm";
import { showSuccess } from "@/utils/toast";
import { SeoHead } from "@/components/seo/SeoHead"; // SeoHead import edildi

const EditProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = dummyProducts.find(p => p.id === id);

  const handleSaveProduct = (updatedData: Product) => {
    const productIndex = dummyProducts.findIndex(p => p.id === updatedData.id);
    if (productIndex !== -1) {
      dummyProducts[productIndex] = updatedData;
      showSuccess("Ürün başarıyla güncellendi!");
      navigate("/stock");
    } else {
      console.error("Ürün bulunamadı, güncelleme yapılamadı.");
      navigate("/stock");
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Ürün Bulunamadı</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">Düzenlemek istediğiniz ürün mevcut değil.</p>
          <Link to="/stock" className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-600 underline">
            Stok Listesine Geri Dön
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SeoHead title={`Ürün Düzenle: ${product.productName}`} description={`"${product.productName}" ürün bilgilerini güncelleyin.`} />
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Ürün Düzenle: {product.productName}</h1>
        <Link to="/stock">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Stok Listesine Dön
          </Button>
        </Link>
      </div>
      <p className="text-gray-600 dark:text-gray-400">Ürün bilgilerini buradan güncelleyebilirsiniz.</p>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Ürün Bilgilerini Düzenle</CardTitle>
          <CardDescription>
            Ürün kodu: {product.productCode}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AddStockForm initialData={product} onSuccess={handleSaveProduct} />
        </CardContent>
      </Card>
    </div>
  );
};

export default EditProductPage;