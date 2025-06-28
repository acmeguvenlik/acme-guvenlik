import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import DashboardPage from "./pages/DashboardPage";
import DealersPage from "./pages/DealersPage";
import { StockPage } from "./pages/StockPage"; // Named export olduğu için süslü parantez içinde import edildi
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout><DashboardPage /></MainLayout>} />
          <Route path="/dashboard" element={<MainLayout><DashboardPage /></MainLayout>} />
          <Route path="/dealers" element={<MainLayout><DealersPage /></MainLayout>} />
          <Route path="/stock" element={<MainLayout><StockPage /></MainLayout>} /> {/* Stok sayfası eklendi */}
          <Route path="/current-accounts" element={<MainLayout><div className="p-6 text-center text-xl font-semibold">Cari Hesaplar Sayfası (Yakında)</div></MainLayout>} />
          <Route path="/invoices" element={<MainLayout><div className="p-6 text-center text-xl font-semibold">Faturalar Sayfası (Yakında)</div></MainLayout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;