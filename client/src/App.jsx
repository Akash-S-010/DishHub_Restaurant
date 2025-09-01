import React, { useEffect, useRef } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/user/Navbar";
import Loader from "./components/ui/Loader";
import Home from "./pages/user/Home";
import About from "./pages/user/About";
import Contact from "./pages/user/Contact";
import Menu from "./pages/user/Menu";
import Details from "./pages/user/Details";
import Cart from "./pages/user/Cart";
import Wishlist from "./pages/user/Wishlist";
import Auth from "./pages/user/Auth";
import Profile from "./pages/user/Profile";
import Address from "./pages/user/Address";
import Checkout from "./pages/user/Checkout";
import Orders from "./pages/user/Orders";
import AdminRoute from "./routes/AdminRoute";
import AdminLayout from "./layouts/AdminLayout.jsx";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AddFood from "./pages/admin/AddFood";
import FoodsList from "./pages/admin/FoodsList";
import EditFood from "./pages/admin/EditFood";
import OrdersList from "./pages/admin/OrdersList";
import UsersList from "./pages/admin/UsersList";
import useAuthStore from "./store/authStore.js";
import Error from "./pages/shared/Error";
import Footer from "./components/user/Footer.jsx";

const App = () => {
  const hydrateUser = useAuthStore((s) => s.hydrateUser);
  const authLoading = useAuthStore((s) => s.loading);

  // Use a ref to track if hydration has been done
  const initialHydrationDone = useRef(false);

  useEffect(() => {
    const initAuth = async () => {
      // Only run this once
      if (initialHydrationDone.current) return;
      initialHydrationDone.current = true;
      
      // Check localStorage first for immediate user state
      const storedUser = localStorage.getItem('authUser');
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          useAuthStore.setState({ user: parsedUser, loading: false });
        } catch (err) {
          // Invalid stored data, remove it
          localStorage.removeItem('authUser');
        }
      }
      
      // Hydrate the user from the server for fresh data
      // This ensures the token is still valid
      // This is crucial for admin authentication persistence
      await hydrateUser();
    };
    
    initAuth();
  }, [hydrateUser]);

  if (authLoading) return <Loader />;

  return (
    <Routes>
      {/* User Routes with User Layout */}
      <Route path="*" element={
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1 pt-18">
            <Routes>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="menu" element={<Menu />} />
              <Route path="food/:id" element={<Details />} />
              <Route path="cart" element={<Cart />} />
              <Route path="wishlist" element={<Wishlist />} />
              <Route path="address" element={<Address />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="orders" element={<Orders />} />
              <Route path="profile" element={<Profile />} />
              <Route path="auth/:mode" element={<Auth />} />
            </Routes>
          </main>
          <Footer />
        </div>
      } />

      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
        <Route index element={<AdminDashboard />} />
        <Route path="add-food" element={<AddFood />} />
        <Route path="foods" element={<FoodsList />} />
        <Route path="foods/edit/:id" element={<EditFood />} />
        <Route path="orders" element={<OrdersList />} />
        <Route path="users" element={<UsersList />} />
      </Route>

      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default App;
