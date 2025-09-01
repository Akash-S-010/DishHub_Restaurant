import React, { useEffect, useState, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { Heart, ShoppingCart, User, LogOut } from "lucide-react";
import logo from "../../assets/DishHub_Logo.png";
import useAuthStore from "../../store/authStore.js";
import useCartStore from "../../store/cartStore.js";
import { Button } from "../ui/Button.jsx";

const Navbar = () => {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const cartCount = useCartStore((s) =>
    s.items.reduce((sum, it) => sum + (it.quantity || 0), 0)
  );
  const hydrateCart = useCartStore((s) => s.hydrate);
  const displayCount = cartCount > 99 ? "99+" : cartCount;
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    hydrateCart();
  }, [user]);

  useEffect(() => {
    const onDocClick = (e) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setMenuOpen(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm shadow-sm border-b border-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2">
          {/* left: logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="DishHub" className="size-12" />
              <span className="font-extrabold text-primary text-2xl mt-2">
                DishHub
              </span>
            </Link>
          </div>

          {/* center: nav links */}
          <nav className="hidden md:flex space-x-6">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? "text-primary font-semibold" : "text-off-white "
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/menu"
              className={({ isActive }) =>
                isActive ? "text-primary font-semibold" : "text-off-white "
              }
            >
              Menu
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "text-primary font-semibold" : "text-off-white "
              }
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? "text-primary font-semibold" : "text-off-white "
              }
            >
              Contact
            </NavLink>
          </nav>

          {/* right: auth / icons */}
          <div className="flex items-center gap-4">
            {!user ? (
              <>
                <Button
                  title="Login"
                  onClick={() => (window.location.href = "/auth/login")}
                />
                <Button
                  title="Sign Up"
                  className=""
                  onClick={() => (window.location.href = "/auth/signup")}
                />
              </>
            ) : (
              <>
                <Link
                  to="/wishlist"
                  aria-label="Wishlist"
                  className="text-off-white  hover:text-[var(--color-primary)]"
                >
                  <Heart />
                </Link>
                <Link
                  to="/cart"
                  aria-label="Cart"
                  className="relative text-off-white  hover:text-[var(--color-primary)]"
                >
                  <ShoppingCart />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary text-black text-[10px] font-bold px-1.5 rounded-full">
                      {displayCount}
                    </span>
                  )}
                </Link>
                <Link to="/wishlist" aria-label="Wishlist" className="sr-only">
                  Wishlist
                </Link>
                <Link to="/cart" aria-label="Cart" className="sr-only">
                  Cart
                </Link>
                {/* profile avatar with dropdown */}
                <div className="relative" ref={menuRef}>
                  <button
                    onClick={() => setMenuOpen((v) => !v)}
                    aria-label="User menu"
                    className="h-8 w-8 rounded-full border-2 border-primary text-primary cursor-pointer flex items-center justify-center font-extrabold"
                  >
                    {(() => {
                      const name = user?.name || user?.email || "";
                      return name ? name.charAt(0).toUpperCase() : "U";
                    })()}
                  </button>

                  {menuOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-md bg-card border border-primary shadow-lg py-2 z-50">
                      <Link to="/profile" className="block px-4 py-2 text-sm text-off-white hover:bg-bg">Profile</Link>
                      <Link to="/orders" className="block px-4 py-2 text-sm text-off-white hover:bg-bg">Orders</Link>
                      <Link to="/address" className="block px-4 py-2 text-sm text-off-white hover:bg-bg">Address</Link>
                      <hr className="border-surface my-1" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-400 hover:bg-bg hover:text-red-300"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
