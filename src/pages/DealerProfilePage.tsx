import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DealerProfileForm } from "@/components/dealer-profile/DealerProfileForm";
import { useState } from "react";
import { SeoHead } from "@/components/seo/SeoHead"; // SeoHead import edildi

const dummyDealerProfile = {
  name: "ABC Ticaret",
  contact: "Ali Can",
  phone: "5551234567",
  email: "abc@example.com",
};

const DealerProfilePage = () => {
  const [profileData, setProfileData] = useState(dummyDealerProfile);

  const handleSaveProfile = (values: typeof dummyDealerProfile) => {
    setProfileData(values);
    console.log("Güncellenmiş profil verileri:", values);
  };

  return (
    <div className="space-y-6">
      <SeoHead title="Profilim" description="Kişisel ve bayi bilgilerinizi güncelleyin." />
      <h1 className="text-3xl font-bold">Profilim</h1>
      <p className="text-gray-600">Kişisel ve bayi bilgilerinizi buradan güncelleyebilirsiniz.</p>

      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>Profil Bilgileri</CardTitle>
        </CardHeader>
        <CardContent>
          <DealerProfileForm initialData={profileData} onSave={handleSaveProfile} />
        </CardContent>
      </Card>
    </div>
  );
};

export default DealerProfilePage;