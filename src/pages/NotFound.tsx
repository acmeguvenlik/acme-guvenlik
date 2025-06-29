import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { SeoHead } from "@/components/seo/SeoHead"; // SeoHead import edildi

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <SeoHead title="404 Sayfa Bulunamadı" description="Aradığınız sayfa bulunamadı." />
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Sayfa bulunamadı</p>
        <a href="/" className="text-blue-500 hover:text-blue-700 underline">
          Ana Sayfaya Dön
        </a>
      </div>
    </div>
  );
};

export default NotFound;