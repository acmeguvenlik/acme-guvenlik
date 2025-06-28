export interface BlogPost {
  id: string;
  title: string;
  slug: string; // URL için benzersiz isim
  content: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
  category: string;
  imageUrl?: string;
}

export const dummyBlogPosts: BlogPost[] = [
  {
    id: "BLOG-001",
    title: "Akıllı Güvenlik Sistemlerinde Son Trendler",
    slug: "akilli-guvenlik-sistemleri-trendleri",
    content: `
      <p>Günümüzde güvenlik sistemleri sadece hırsızlık önleme aracı olmaktan çıktı. Yapay zeka destekli kameralar, akıllı sensörler ve entegre otomasyon çözümleri ile ev ve iş yerlerimizi daha güvenli ve konforlu hale getiriyor.</p>
      <h3>Yapay Zeka Destekli Kameralar</h3>
      <p>Yüz tanıma, hareket analizi ve anormal davranış tespiti gibi özelliklerle donatılmış kameralar, yanlış alarmları minimize ederken gerçek tehditleri anında algılayabiliyor.</p>
      <h3>Akıllı Sensörler ve Entegrasyon</h3>
      <p>Kapı/pencere sensörleri, duman dedektörleri ve su baskını sensörleri gibi akıllı cihazlar, merkezi bir sistemle entegre çalışarak olası tehlikelere karşı erken uyarı sağlıyor.</p>
      <h3>Bulut Tabanlı Çözümler</h3>
      <p>Verilerin bulutta depolanması ve uzaktan erişim imkanı, kullanıcıların her yerden güvenlik sistemlerini yönetmelerine olanak tanıyor.</p>
      <p>Acme Güvenlik olarak, en son teknolojileri takip ederek müşterilerimize en güvenli ve yenilikçi çözümleri sunmaya devam ediyoruz.</p>
    `,
    author: "Acme Güvenlik Ekibi",
    createdAt: new Date("2024-08-20T10:00:00Z"),
    updatedAt: new Date("2024-08-20T10:00:00Z"),
    tags: ["güvenlik", "akıllı ev", "yapay zeka", "kamera"],
    category: "Teknoloji",
    imageUrl: "https://images.unsplash.com/photo-1587825140708-cb053950517f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "BLOG-002",
    title: "İşletmeler İçin Siber Güvenlik İpuçları",
    slug: "isletmeler-icin-siber-guvenlik-ipuclari",
    content: `
      <p>Günümüz dijital dünyasında işletmeler için siber güvenlik, sadece bir IT meselesi olmaktan çıkıp stratejik bir zorunluluk haline gelmiştir. İşte işletmenizi siber tehditlere karşı korumak için bazı temel ipuçları:</p>
      <h3>Güçlü Şifre Politikaları</h3>
      <p>Çalışanların karmaşık ve düzenli olarak güncellenen şifreler kullanmasını sağlayın. İki faktörlü kimlik doğrulama (2FA) kullanımını teşvik edin.</p>
      <h3>Düzenli Yedekleme</h3>
      <p>Tüm kritik verilerinizi düzenli olarak yedekleyin ve bu yedeklemelerin güvenli bir şekilde saklandığından emin olun. Felaket kurtarma planları oluşturun.</p>
      <h3>Çalışan Eğitimi</h3>
      <p>Siber güvenlik zincirinin en zayıf halkası genellikle insan faktörüdür. Çalışanlarınıza kimlik avı (phishing) saldırıları, kötü amaçlı yazılımlar ve diğer siber tehditler hakkında düzenli eğitimler verin.</p>
      <h3>Yazılım Güncellemeleri</h3>
      <p>Tüm işletim sistemleri, uygulamalar ve güvenlik yazılımlarını güncel tutun. Yazılım güncellemeleri genellikle bilinen güvenlik açıklarını kapatır.</p>
      <h3>Güvenlik Duvarı ve Antivirüs Kullanımı</h3>
      <p>Ağınızı korumak için güçlü bir güvenlik duvarı kullanın ve tüm cihazlarda güncel antivirüs/antimalware yazılımları bulundurun.</p>
      <p>Unutmayın, siber güvenlik sürekli bir süreçtir ve proaktif yaklaşımlar işletmenizin geleceği için hayati önem taşır.</p>
    `,
    author: "Acme Güvenlik Ekibi",
    createdAt: new Date("2024-08-15T14:00:00Z"),
    updatedAt: new Date("2024-08-15T14:00:00Z"),
    tags: ["siber güvenlik", "işletme", "veri güvenliği", "ipuçları"],
    category: "Siber Güvenlik",
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "BLOG-003",
    title: "Ev Güvenliğinde Yeni Nesil Çözümler",
    slug: "ev-guvenliginde-yeni-nesil-cozumler",
    content: `
      <p>Ev güvenliği, teknolojinin gelişmesiyle birlikte çok daha kapsamlı ve erişilebilir hale geldi. Geleneksel alarm sistemlerinin ötesine geçen yeni nesil çözümler, ev sahiplerine daha fazla kontrol ve huzur sunuyor.</p>
      <h3>Video Kapı Zilleri</h3>
      <p>Ziyaretçileri uzaktan görmenizi, onlarla konuşmanızı ve hatta kapınızı açmanızı sağlayan akıllı kapı zilleri, evinizin girişini sürekli gözetim altında tutar.</p>
      <h3>Akıllı Kilit Sistemleri</h3>
      <p>Anahtarlara veda edin! Akıllı kilitler, akıllı telefonunuzdan veya parmak izinizle kapınızı kilitleyip açmanıza olanak tanır. Misafirler için geçici erişim kodları da oluşturabilirsiniz.</p>
      <h3>Entegre Yangın ve Gaz Dedektörleri</h3>
      <p>Sadece dumanı değil, karbon monoksit ve doğal gaz sızıntılarını da algılayan akıllı dedektörler, tehlike anında sizi ve itfaiyeyi otomatik olarak uyarabilir.</p>
      <h3>Profesyonel İzleme Hizmetleri</h3>
      <p>Akıllı güvenlik sistemlerinizi 7/24 profesyonel bir izleme merkezine bağlayarak, herhangi bir alarm durumunda anında müdahale edilmesini sağlayabilirsiniz.</p>
      <p>Evinizi ve sevdiklerinizi korumak için en uygun yeni nesil güvenlik çözümlerini keşfetmek için Acme Güvenlik ile iletişime geçin.</p>
    `,
    author: "Acme Güvenlik Ekibi",
    createdAt: new Date("2024-08-10T09:30:00Z"),
    updatedAt: new Date("2024-08-10T09:30:00Z"),
    tags: ["ev güvenliği", "akıllı ev", "alarm", "kilit"],
    category: "Ev Güvenliği",
    imageUrl: "https://images.unsplash.com/photo-1587825140708-cb053950517f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];