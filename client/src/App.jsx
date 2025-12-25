import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import CategoryProducts from './pages/CategoryProducts';
import Suppliers from './pages/Suppliers';
import SupplierDetails from './pages/SupplierDetails';
import Farmers from './pages/Farmers';
import AdminDashboard from './pages/AdminDashboard';
import Profile from './pages/Profile';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <div className="min-h-screen bg-background font-sans antialiased text-foreground">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password/:token" element={<ResetPassword />} />
                <Route path="/register" element={<Register />} />
                <Route path="/category/:category" element={<CategoryProducts />} />
                <Route path="/suppliers" element={<Suppliers />} />
                <Route path="/suppliers/:id" element={<SupplierDetails />} />
                <Route path="/farmers" element={<Farmers />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;
