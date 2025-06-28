import { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, HelpCircle, Edit, Trash2, Search } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AddFAQForm } from "@/components/faq/AddFAQForm";
import { dummyFAQs, FAQ } from "@/data/dummyFAQs";
import { showSuccess } from "@/utils/toast";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const FAQPage = () => {
  const { userRole } = useAuth();
  const [faqs, setFaqs] = useState<FAQ[]>(dummyFAQs);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("Tümü");

  useEffect(() => {
    // Kullanıcı rolüne göre SSS'leri filtrele
    const filteredForRole = dummyFAQs.filter(faq =>
      faq.targetRole === 'all' || faq.targetRole === userRole
    );
    setFaqs(filteredForRole);
  }, [userRole]);

  const handleAddFAQSuccess = (newFAQ: FAQ) => {
    dummyFAQs.push(newFAQ); // Dummy veriye yeni SSS'yi ekle
    setFaqs([...dummyFAQs.filter(faq => faq.targetRole === 'all' || faq.targetRole === userRole)]); // State'i güncelle
    showSuccess("SSS başarıyla eklendi!");
  };

  const handleDeleteFAQ = (id: string) => {
    if (window.confirm("Bu SSS'yi silmek istediğinizden emin misiniz?")) {
      const index = dummyFAQs.findIndex(f => f.id === id);
      if (index !== -1) {
        dummyFAQs.splice(index, 1);
      }
      setFaqs([...dummyFAQs.filter(faq => faq.targetRole === 'all' || faq.targetRole === userRole)]); // State'i güncelle
      showSuccess("SSS başarıyla silindi!");
    }
  };

  const allCategories = useMemo(() => {
    const categories = new Set<string>();
    faqs.forEach(faq => categories.add(faq.category));
    return ["Tümü", ...Array.from(categories).sort()];
  }, [faqs]);

  const filteredFAQs = useMemo(() => {
    let tempFAQs = faqs.filter(faq =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filterCategory !== "Tümü") {
      tempFAQs = tempFAQs.filter(faq => faq.category === filterCategory);
    }

    return tempFAQs.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }, [faqs, searchTerm, filterCategory]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Sıkça Sorulan Sorular</h1>
          <p className="text-gray-600 dark:text-gray-400">Yaygın sorulara hızlıca yanıt bulun.</p>
        </div>
        {userRole === 'admin' && (
          <Link to="/faq/add">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Yeni SSS Ekle
            </Button>
          </Link>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Input
          placeholder="SSS ara..."
          className="flex-1"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          icon={<Search className="h-4 w-4 text-muted-foreground" />}
        />
        <Select onValueChange={setFilterCategory} defaultValue="Tümü">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Kategoriye Göre Filtrele" />
          </SelectTrigger>
          <SelectContent>
            {allCategories.map(category => (
              <SelectItem key={category} value={category}>{category}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <HelpCircle className="h-5 w-5 mr-2" /> Soru & Cevaplar
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredFAQs.length > 0 ? (
            <Accordion type="single" collapsible className="w-full">
              {filteredFAQs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id}>
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center justify-between w-full pr-4">
                      <span className="font-semibold">{faq.question}</span>
                      {userRole === 'admin' && (
                        <div className="flex items-center space-x-2 ml-auto">
                          <Link to={`/faq/edit/${faq.id}`}>
                            <Button variant="ghost" size="sm" onClick={(e) => e.stopPropagation()}>
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button variant="destructive" size="sm" onClick={(e) => { e.stopPropagation(); handleDeleteFAQ(faq.id); }}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: faq.answer }} />
                    <p className="text-xs text-muted-foreground mt-2">
                      Kategori: {faq.category} | Hedef: {faq.targetRole === 'all' ? 'Tüm Kullanıcılar' : faq.targetRole === 'admin' ? 'Yöneticiler' : 'Bayiler'}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <p className="text-center text-muted-foreground py-8">
              Gösterilecek Sıkça Sorulan Soru bulunmamaktadır.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FAQPage;