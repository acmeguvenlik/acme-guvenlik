import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { dummyProducts } from "@/data/dummyProducts";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { SeoHead } from "@/components/seo/SeoHead"; // SeoHead import edildi

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const product = dummyProducts.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Ürün Bulunamadı</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">Aradığınız ürün mevcut değil.</p>
          <Link to="/stock" className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-600 underline">
            Stok Listesine Geri Dön
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SeoHead
        title={product.seo?.metaTitle || product.productName}
        description={product.seo?.metaDescription || product.description}
        keywords={product.seo?.keywords || product.category}
        imageUrl={product.imageUrls?.[0]}
        canonicalUrl={`${window.location.origin}/product/${product.id}`}
      />
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Ürün Detayı: {product.productName}</h1>
        <Link to="/stock">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Stok Listesine Dön
          </Button>
        </Link>
      </div>
      <p className="text-gray-600 dark:text-gray-400">Ürünün detaylı bilgilerini buradan inceleyebilirsiniz.</p>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{product.productName} ({product.productCode})</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-6">
          <div className="flex flex-col space-y-4">
            {product.imageUrls && product.imageUrls.length > 0 ? (
              <Carousel className="w-full max-w-xs mx-auto">
                <CarouselContent>
                  {product.imageUrls.map((url, index) => (
                    <CarouselItem key={index}>
                      <div className="p-1">
                        <Card>
                          <CardContent className="flex aspect-square items-center justify-center p-6">
                            <img 
                              src={url} 
                              alt={`${product.productName} - Görsel ${index + 1}`} 
                              className="object-contain w-full h-full max-h-64" 
                              onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/400x300?text=Görsel+Yok"; }}
                            />
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            ) : (
              <div className="w-full h-64 bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden flex items-center justify-center text-muted-foreground">
                Görsel Yok
              </div>
            )}
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Genel Bilgiler</h3>
              <p><strong>Kategori:</strong> {product.category}</p>
              <p><strong>Mevcut Adet:</strong> {product.quantity}</p>
              <p><strong>Birim Fiyat:</strong> ₺{product.price.toFixed(2)}</p>
              {product.variants && <p><strong>Varyantlar:</strong> {product.variants}</p>}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Açıklama</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {product.description || "Bu ürün için henüz bir açıklama bulunmamaktadır."}
            </p>

            {product.supplier && (
              <>
                <h3 className="text-lg font-semibold mb-2">Tedarikçi Bilgileri</h3>
                <p><strong>Adı:</strong> {product.supplier.name}</p>
                {product.supplier.contactPerson && <p><strong>Yetkili Kişi:</strong> {product.supplier.contactPerson}</p>}
                {product.supplier.phone && <p><strong>Telefon:</strong> {product.supplier.phone}</p>}
                {product.supplier.email && <p><strong>E-posta:</strong> {product.supplier.email}</p>}
              </>
            )}

            {product.seo && (
              <>
                <h3 className="text-lg font-semibold mt-4 mb-2">SEO Ayarları</h3>
                {product.seo.metaTitle && <p><strong>Meta Başlığı:</strong> {product.seo.metaTitle}</p>}
                {product.seo.metaDescription && <p><strong>Meta Açıklaması:</strong> {product.seo.metaDescription}</p>}
                {product.seo.keywords && <p><strong>Anahtar Kelimeler:</strong> {product.seo.keywords}</p>}
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductDetailPage;