import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import DashboardPage from "./pages/DashboardPage";
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
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="/dealers" element={<MainLayout><div className="p-6 text-center text-xl font-semibold">Bayiler Sayfası (Yakında)</div></MainLayout>} />
          <Route path="/stock" element={<MainLayout><div className="p-6 text-center text-xl font-semibold">Stok Sayfası (Yakında)</div></MainLayout>} />
          <Route path="/current-accounts" element={<MainLayout><div className="p-6 text-center text-xl font-semibold">Cari Hesaplar Sayfası (Yakında)</div></MainLayout>} />
          <Route path="/invoices" element={<MainLayout><div className="p-6 text-center text-xl font-semibold">Faturalar Sayfası (Yakında)</div></MainLayout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;