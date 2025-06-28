import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import DashboardPage from "./pages/DashboardPage";
import DealersPage from "./pages/DealersPage";
import { StockPage } from "./pages/StockPage";
import CurrentAccountsPage from "./pages/CurrentAccountsPage";
import InvoicesPage from "./pages/InvoicesPage";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage"; // Yeni giriş sayfası
import { AuthProvider, useAuth } from "./context/AuthContext"; // AuthContext'i import et
import DealerDashboardPage from "./pages/DealerDashboardPage"; // Yeni bayi paneli sayfası

const queryClient = new QueryClient();

// Giriş yapmış kullanıcılar için korumalı rota bileşeni
const ProtectedRoute = ({ children, allowedRoles }: { children: JSX.Element; allowedRoles: ('admin' | 'dealer')[] }) => {
  const { isAuthenticated, userRole } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && userRole && !allowedRoles.includes(userRole)) {
    // Yetkisiz erişim durumunda ana sayfaya veya yetkisiz sayfasına yönlendir
    return <Navigate to="/" replace />;
  }

  return children;
};

const AppContent = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      
      {/* Korumalı Rotalar */}
      <Route 
        path="/" 
        element={
          isAuthenticated ? (
            <MainLayout>
              <DashboardPage />
            </MainLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        } 
      />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <MainLayout>
              <DashboardPage />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/dealers" 
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <MainLayout>
              <DealersPage />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/stock" 
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <MainLayout>
              <StockPage />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/current-accounts" 
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <MainLayout>
              <CurrentAccountsPage />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/invoices" 
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <MainLayout>
              <InvoicesPage />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      {/* Bayi Paneli Rotası */}
      <Route 
        path="/dealer-dashboard" 
        element={
          <ProtectedRoute allowedRoles={['dealer']}>
            <MainLayout>
              <DealerDashboardPage />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      
      {/* 404 Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;