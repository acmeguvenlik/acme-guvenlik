export interface DynamicPage {
  id: string;
  title: string;
  slug: string;
  content: string;
  parentId: string | null; // For sub-pages, null for main pages
  targetRole: 'admin' | 'dealer' | 'all'; // Who can see this page
  createdAt: Date;
  updatedAt: Date;
}

export const dummyDynamicPages: DynamicPage[] = [
  {
    id: "PAGE-001",
    title: "Hakkımızda",
    slug: "hakkimizda",
    content: `
      <p>Acme Güvenlik olarak, 20 yılı aşkın süredir sektörde lider konumda bulunmaktayız. Müşterilerimize en son teknolojiye sahip güvenlik çözümleri sunarak, onların huzur ve güvenliğini sağlamayı misyon edindik.</p>
      <h3>Vizyonumuz</h3>
      <p>Güvenlik sektöründe inovasyonu ve müşteri memnuniyetini bir araya getirerek, geleceğin akıllı güvenlik sistemlerini bugünden sunmak.</p>
      <h3>Değerlerimiz</h3>
      <ul>
        <li>Güvenilirlik</li>
        <li>İnovasyon</li>
        <li>Müşteri Odaklılık</li>
        <li>Sürdürülebilirlik</li>
      </ul>
      <p>Daha fazla bilgi için bizimle iletişime geçebilirsiniz.</p>
    `,
    parentId: null,
    targetRole: "all",
    createdAt: new Date("2024-01-01T10:00:00Z"),
    updatedAt: new Date("2024-08-20T15:00:00Z"),
  },
  {
    id: "PAGE-002",
    title: "Gizlilik Politikası",
    slug: "gizlilik-politikasi",
    content: `
      <p>Bu gizlilik politikası, Acme Güvenlik'in web sitesi ve hizmetleri aracılığıyla topladığı, kullandığı ve ifşa ettiği bilgileri açıklar.</p>
      <h3>Topladığımız Bilgiler</h3>
      <p>Hizmetlerimizi kullanırken bize sağladığınız kişisel bilgileri (ad, e-posta, telefon numarası vb.) toplarız.</p>
      <h3>Bilgilerin Kullanımı</h3>
      <p>Topladığımız bilgileri hizmetlerimizi sunmak, geliştirmek ve sizinle iletişim kurmak için kullanırız.</p>
      <p>Daha fazla detay için lütfen ilgili bölümleri okuyunuz.</p>
    `,
    parentId: null,
    targetRole: "all",
    createdAt: new Date("2024-01-05T11:00:00Z"),
    updatedAt: new Date("2024-08-18T10:00:00Z"),
  },
  {
    id: "PAGE-003",
    title: "Bayi Başvuru Şartları",
    slug: "bayi-basvuru-sartlari",
    content: `
      <p>Acme Güvenlik bayi ağına katılmak için aşağıdaki şartları sağlamanız gerekmektedir:</p>
      <ol>
        <li>Güvenlik sektöründe en az 2 yıl deneyim.</li>
        <li>Yeterli teknik altyapı ve ekipman.</li>
        <li>Müşteri memnuniyetine odaklı hizmet anlayışı.</li>
        <li>Gerekli yasal belgelere sahip olmak.</li>
      </ol>
      <p>Başvurunuzu online formumuz aracılığıyla yapabilirsiniz.</p>
    `,
    parentId: null,
    targetRole: "dealer", // Sadece bayiler görebilir
    createdAt: new Date("2024-02-10T09:00:00Z"),
    updatedAt: new Date("2024-08-10T11:00:00Z"),
  },
  {
    id: "PAGE-004",
    title: "Alt Sayfa: Ek Hizmetlerimiz",
    slug: "ek-hizmetlerimiz",
    content: `
      <p>Ana sayfamızda belirtilen hizmetlere ek olarak, aşağıdaki özel hizmetleri de sunmaktayız:</p>
      <ul>
        <li>Özel Proje Danışmanlığı</li>
        <li>Sistem Entegrasyon Çözümleri</li>
        <li>24/7 Teknik Destek</li>
      </ul>
    `,
    parentId: "PAGE-001", // Hakkımızda sayfasının alt sayfası
    targetRole: "all",
    createdAt: new Date("2024-03-01T13:00:00Z"),
    updatedAt: new Date("2024-08-05T14:00:00Z"),
  },
];