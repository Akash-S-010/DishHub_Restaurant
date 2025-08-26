import React, { useEffect } from "react";
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
import useAuthStore from "./store/authStore.js";
import Error from "./pages/shared/Error";

const App = () => {
  const hydrateUser = useAuthStore((s) => s.hydrateUser);
  const authLoading = useAuthStore((s) => s.loading);

  useEffect(() => {
    // attempt to hydrate the user from the server (will set loading)
    hydrateUser();
  }, []);

  if (authLoading) return <Loader />;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/food/:id" element={<Details />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/auth/:mode" element={<Auth />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
