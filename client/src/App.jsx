import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Loader from "./components/ui/Loader";

// User pages
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

// Admin pages
import AdminRoute from "./routes/AdminRoute";
import AdminLayout from "./layouts/AdminLayout";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AddFood from "./pages/admin/AddFood";
import FoodsList from "./pages/admin/FoodsList";
import EditFood from "./pages/admin/EditFood";
import OrdersList from "./pages/admin/OrdersList";
import UsersList from "./pages/admin/UsersList";

// Shared
import Error from "./pages/shared/Error";
import useAuthStore from "./store/authStore";
import UserLayout from "./layouts/UserLayout";

const App = () => {
  const hydrateUser = useAuthStore((s) => s.hydrateUser);
  const loading = useAuthStore((s) => s.loading);

  useEffect(() => {
    hydrateUser();
  }, [hydrateUser]);

  if (loading) return <Loader />;

  return (
    <Routes>
      {/* User routes */}
      <Route path="/" element={<UserLayout />}>
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
      </Route>

      {/* Admin routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="add-food" element={<AddFood />} />
        <Route path="foods" element={<FoodsList />} />
        <Route path="foods/edit/:id" element={<EditFood />} />
        <Route path="orders" element={<OrdersList />} />
        <Route path="users" element={<UsersList />} />
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default App;
