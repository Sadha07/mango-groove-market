
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import PageLayout from "@/components/layout/PageLayout";

import Home from "@/pages/Home";
import ProductsPage from "@/pages/ProductsPage";
import CartPage from "@/pages/CartPage";
import ProfilePage from "@/pages/ProfilePage";
import LoginPage from "@/pages/auth/LoginPage";
import SignupPage from "@/pages/auth/SignupPage";
import AdminSignIn from "@/pages/admin/AdminSignIn";
import Dashboard from "@/pages/admin/Dashboard";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public Routes with PageLayout */}
              <Route
                path="/"
                element={
                  <PageLayout>
                    <Home />
                  </PageLayout>
                }
              />
              <Route
                path="/products"
                element={
                  <PageLayout>
                    <ProductsPage />
                  </PageLayout>
                }
              />
              <Route
                path="/cart"
                element={
                  <PageLayout>
                    <CartPage />
                  </PageLayout>
                }
              />
              <Route
                path="/profile"
                element={
                  <PageLayout>
                    <ProfilePage />
                  </PageLayout>
                }
              />
              <Route
                path="/login"
                element={
                  <PageLayout>
                    <LoginPage />
                  </PageLayout>
                }
              />
              <Route
                path="/signup"
                element={
                  <PageLayout>
                    <SignupPage />
                  </PageLayout>
                }
              />

              {/* Admin Routes (No PageLayout) */}
              <Route path="/admin/signin" element={<AdminSignIn />} />
              <Route path="/admin/dashboard" element={<Dashboard />} />
              
              {/* Admin redirect */}
              <Route path="/admin" element={<Navigate to="/admin/signin" replace />} />

              {/* Catch-all route */}
              <Route
                path="*"
                element={
                  <PageLayout>
                    <NotFound />
                  </PageLayout>
                }
              />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
