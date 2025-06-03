import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Index from "./pages/Index";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import Cart from "./pages/Cart";
import Account from "./pages/Account";
import Wishlist from "./pages/Wishlist";
import Notifications from "./pages/Notifications";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Payment from "./pages/Payment";
import Features from "./pages/Features";
import SellerDashboard from "./pages/SellerDashboard";
import SellerProducts from "./pages/SellerProducts";
import SellerOrders from "./pages/SellerOrders";
import SellerAnalytics from "./pages/SellerAnalytics";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/features" element={<Features />} />
          {/* Add other public routes here */}

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}> {/* Default protected route, requires authentication */} 
          <Route path="/home" element={<Index />} />
          <Route path="/products" element={<Products />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/account" element={<Account />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/payment" element={<Payment />} />
             {/* Add other general authenticated routes here */}
          </Route>
          
          {/* Seller Protected Routes */}
           <Route element={<ProtectedRoute allowedRoles={['ROLE_SELLER', 'ROLE_ADMIN']} />}> {/* Requires Seller or Admin role */} 
          <Route path="/seller/dashboard" element={<SellerDashboard />} />
          <Route path="/seller/products" element={<SellerProducts />} />
          <Route path="/seller/orders" element={<SellerOrders />} />
          <Route path="/seller/analytics" element={<SellerAnalytics />} />
          </Route>
          
          {/* Admin Protected Routes */}
          <Route element={<ProtectedRoute allowedRoles={['ROLE_ADMIN']} />}> {/* Requires Admin role */} 
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
             {/* Assuming admin can also manage products, orders, analytics, and settings */}
          <Route path="/admin/products" element={<Products />} />
          <Route path="/admin/orders" element={<SellerOrders />} />
          <Route path="/admin/analytics" element={<SellerAnalytics />} />
          <Route path="/admin/settings" element={<Account />} />
          </Route>
          
          {/* CATCH-ALL Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
