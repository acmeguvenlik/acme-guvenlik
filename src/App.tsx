import React, { lazy, Suspense } from "react"; // lazy ve Suspense import edildi
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ThemeProvider } from "./components/theme/ThemeProvider";
import { HelmetProvider } from 'react-helmet-async';

// Sayfa bileşenlerini lazy loading ile import et
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const DealersPage = lazy(() => import("./pages/DealersPage"));
const StockPage = lazy(() => import("./pages/StockPage"));
const InvoicesPage = lazy(() => import("./pages/InvoicesPage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const DealerDashboardPage = lazy(() => import("./pages/DealerDashboardPage"));
const DealerOrdersPage = lazy(() => import("./pages/DealerOrdersPage"));
const OrdersPage = lazy(() => import("./pages/OrdersPage"));
const DealerStockPage = lazy(() => import("./pages/DealerStockPage"));
const DealerInvoicesPage = lazy(() => import("./pages/DealerInvoicesPage"));
const DealerProfilePage = lazy(() => import("./pages/DealerProfilePage"));
const AdminSettingsPage = lazy(() => import("./pages/AdminSettingsPage"));
const UsersPage = lazy(() => import("./pages/UsersPage"));
const ReportsPage = lazy(() => import("./pages/ReportsPage"));
const ProductDetailPage = lazy(() => import("./pages/ProductDetailPage"));
const AccountPage = lazy(() => import("./pages/AccountPage"));
const AnnouncementsPage = lazy(() => import("./pages/AnnouncementsPage"));
const DealerTicketsPage = lazy(() => import("./pages/DealerTicketsPage"));
const AdminTicketsPage = lazy(() => import("./pages/AdminTicketsPage"));
const TicketDetailPage = lazy(() => import("./pages/TicketDetailPage"));
const DealerTransactionsPage = lazy(() => import("./pages/DealerTransactionsPage"));
const NotificationsPage = lazy(() => import("./pages/NotificationsPage"));
const EditProductPage = lazy(() => import("./pages/EditProductPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const BlogPostDetailPage = lazy(() => import("./pages/BlogPostDetailPage"));
const EditBlogPostPage = lazy(() => import("./pages/EditBlogPostPage"));
const AddBlogPostPage = lazy(() => import("./pages/AddBlogPostPage"));
const AdminPagesPage = lazy(() => import("./pages/AdminPagesPage"));
const DynamicPageDisplayPage = lazy(() => import("./pages/DynamicPageDisplayPage"));

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
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-lg text-gray-700 dark:text-gray-300">
        Yükleniyor...
      </div>
    }>
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
          path="/dealers/:dealerId/transactions"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <MainLayout>
                <DealerTransactionsPage />
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
          path="/stock/edit/:id"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <MainLayout>
                <EditProductPage />
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
        <Route 
          path="/notifications"
          element={
            <ProtectedRoute allowedRoles={['admin', 'dealer']}>
              <MainLayout>
                <NotificationsPage />
              </MainLayout>
            </ProtectedRoute>
          } 
        />
        
        {/* Blog Rotaları */}
        <Route 
          path="/blog" 
          element={
            <ProtectedRoute allowedRoles={['admin', 'dealer']}>
              <MainLayout>
                <BlogPage />
              </MainLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/blog/add"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <MainLayout>
                <AddBlogPostPage />
              </MainLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/blog/:slug" 
          element={
            <ProtectedRoute allowedRoles={['admin', 'dealer']}>
              <MainLayout>
                <BlogPostDetailPage />
              </MainLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/blog/edit/:id"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <MainLayout>
                <EditBlogPostPage />
              </MainLayout>
            </ProtectedRoute>
          } 
        />

        {/* Dinamik Sayfa Rotaları */}
        <Route
          path="/admin-pages"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <MainLayout>
                <AdminPagesPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/pages/:slug"
          element={
            <ProtectedRoute allowedRoles={['admin', 'dealer']}> {/* Tüm kullanıcılar veya belirli roller */}
              <MainLayout>
                <DynamicPageDisplayPage />
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
    </Suspense>
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
            <HelmetProvider>
              <AppContent />
            </HelmetProvider>
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;