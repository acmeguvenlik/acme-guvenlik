import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { AddFAQForm } from "@/components/faq/AddFAQForm";
import { dummyFAQs, FAQ } from "@/data/dummyFAQs";
import { showSuccess } from "@/utils/toast";

const AddFAQPage = () => {
  const navigate = useNavigate();

  const handleAddFAQSuccess = (newFAQ: FAQ) => {
    dummyFAQs.push(newFAQ); // Dummy veriye yeni SSS'yi ekle
    showSuccess("SSS başarıyla eklendi!");
    navigate("/faq"); // Ekleme sonrası SSS listesine geri dön
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Yeni SSS Ekle</h1>
        <Link to="/faq">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Tüm SSS'lere Dön
          </Button>
        </Link>
      </div>
      <p className="text-gray-600 dark:text-gray-400">Yeni bir Sıkça Sorulan Soru oluşturmak için aşağıdaki formu doldurun.</p>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Yeni Soru Oluştur</CardTitle>
          <CardDescription>
            Sıkça sorulan sorular listenize yeni bir öğe ekleyin.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AddFAQForm onSuccess={handleAddFAQSuccess} />
        </CardContent>
      </Card>
    </div>
  );
};

export default AddFAQPage;