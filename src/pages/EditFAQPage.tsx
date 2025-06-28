import { useParams, Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { dummyFAQs, FAQ } from "@/data/dummyFAQs";
import { AddFAQForm } from "@/components/faq/AddFAQForm";
import { showSuccess } from "@/utils/toast";
import { useState, useEffect } from "react";

const EditFAQPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [faq, setFaq] = useState<FAQ | undefined>(undefined);

  useEffect(() => {
    const foundFAQ = dummyFAQs.find(f => f.id === id);
    if (foundFAQ) {
      setFaq(foundFAQ);
    } else {
      navigate("/not-found"); // SSS bulunamazsa 404 sayfasına yönlendir
    }
  }, [id, navigate]);

  const handleSaveFAQ = (updatedData: FAQ) => {
    const faqIndex = dummyFAQs.findIndex(f => f.id === updatedData.id);
    if (faqIndex !== -1) {
      dummyFAQs[faqIndex] = updatedData;
      showSuccess("SSS başarıyla güncellendi!");
      navigate("/faq"); // Düzenleme sonrası SSS listesine geri dön
    } else {
      console.error("SSS bulunamadı, güncelleme yapılamadı.");
      navigate("/faq");
    }
  };

  if (!faq) {
    return null; // Yönlendirme yapıldığı için burada null dönebiliriz
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">SSS Düzenle: {faq.question}</h1>
        <Link to="/faq">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Tüm SSS'lere Dön
          </Button>
        </Link>
      </div>
      <p className="text-gray-600 dark:text-gray-400">Sıkça Sorulan Soru bilgilerini buradan güncelleyebilirsiniz.</p>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>SSS Bilgilerini Düzenle</CardTitle>
          <CardDescription>
            SSS ID: {faq.id}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AddFAQForm initialData={faq} onSuccess={handleSaveFAQ} />
        </CardContent>
      </Card>
    </div>
  );
};

export default EditFAQPage;