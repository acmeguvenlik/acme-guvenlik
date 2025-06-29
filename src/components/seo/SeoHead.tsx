import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SeoHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  imageUrl?: string;
}

export function SeoHead({
  title = "Acme Güvenlik Yönetim Paneli",
  description = "Acme Güvenlik B2B yönetim paneli ile bayilerinizi, stoklarınızı ve finansal işlemlerinizi kolayca yönetin.",
  keywords = "güvenlik, b2b, yönetim, panel, stok, bayi, fatura, sipariş, duyuru, destek",
  canonicalUrl,
  imageUrl,
}: SeoHeadProps) {
  const fullTitle = title === "Acme Güvenlik Yönetim Paneli" ? title : `${title} | Acme Güvenlik`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      {imageUrl && <meta property="og:image" content={imageUrl} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      {imageUrl && <meta property="og:image" content={imageUrl} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {imageUrl && <meta name="twitter:image" content={imageUrl} />}
    </Helmet>
  );
}