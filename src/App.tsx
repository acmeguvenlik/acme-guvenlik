import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import DashboardPage from "./pages/DashboardPage";
import DealersPage from "./pages/DealersPage";
import { StockPage } from "./pages/StockPage";
import InvoicesPage from "./pages/InvoicesPage";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import { AuthProvider, useAuth } from "./context/AuthContext";
import DealerDashboardPage from "./pages/DealerDashboardPage";
import DealerOrdersPage from "./pages/DealerOrdersPage";
import OrdersPage from "./pages/OrdersPage";
import DealerStockPage from "./pages/DealerStockPage";
import DealerInvoicesPage from "./pages/DealerInvoicesPage";
import DealerProfilePage from "./pages/DealerProfilePage";
import AdminSettingsPage from "./pages/AdminSettingsPage";
import UsersPage from "./pages/UsersPage";
import ReportsPage from "./pages/ReportsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import AccountPage from "./pages/AccountPage";
import AnnouncementsPage from "./pages/AnnouncementsPage";
import DealerTicketsPage from "./pages/DealerTicketsPage"; // Yeni import
import AdminTicketsPage from "./pages/AdminTicketsPage";   // Yeni import
import TicketDetailPage from "./pages/TicketDetailPage";   // Yeni import
import { ThemeProvider } from "./components/theme/ThemeProvider"; 

const queryClient = new QueryClient();

// Giriş yapmış kullanıcılar için korumalı rota bileşeni
const ProtectedRoute = ({ children, allowedRoles }: { children: JSX.Element; allowedRoles: ('admin' | 'dealer' | 'viewer')[] }) => {
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
        path="/invoices" 
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <MainLayout>
              <InvoicesPage />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/orders" 
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <MainLayout>
              <OrdersPage />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/users" 
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <MainLayout>
              <UsersPage />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/reports" 
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <MainLayout>
              <ReportsPage />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/announcements" 
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <MainLayout>
              <AnnouncementsPage />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin-tickets" 
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <MainLayout>
              <AdminTicketsPage />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/tickets/:id" 
        element={
          <ProtectedRoute allowedRoles={['admin', 'dealer']}>
            <MainLayout>
              <TicketDetailPage />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/settings" 
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <MainLayout>
              <AdminSettingsPage />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/product/:id" 
        element={
          <ProtectedRoute allowedRoles={['admin', 'dealer']}>
            <MainLayout>
              <ProductDetailPage />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/account" 
        element={
          <ProtectedRoute allowedRoles={['admin', 'dealer', 'viewer']}>
            <MainLayout>
              <AccountPage />
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
      <Route 
        path="/dealer-orders" 
        element={
          <ProtectedRoute allowedRoles={['dealer']}>
            <MainLayout>
              <DealerOrdersPage />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/dealer-stock" 
        element={
          <ProtectedRoute allowedRoles={['dealer']}>
            <MainLayout>
              <DealerStockPage />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/dealer-invoices" 
        element={
          <ProtectedRoute allowedRoles={['dealer']}>
            <MainLayout>
              <DealerInvoicesPage />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/dealer-tickets" 
        element={
          <ProtectedRoute allowedRoles={['dealer']}>
            <MainLayout>
              <DealerTicketsPage />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/dealer-profile" 
        element={
          <ProtectedRoute allowedRoles={['dealer']}>
            <MainLayout>
              <DealerProfilePage />
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
          <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
            <AppContent />
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;