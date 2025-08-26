import React, { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Heart, ShoppingCart, User } from "lucide-react";
import logo from "../../assets/DishHub_Logo.png";
import useAuthStore from "../../store/authStore.js";
import useCartStore from "../../store/cartStore.js";
import { Button } from "../ui/Button.jsx";

const Navbar = () => {
  const user = useAuthStore((s) => s.user);
  const cartCount = useCartStore((s) =>
    s.items.reduce((sum, it) => sum + (it.quantity || 0), 0)
  );
  const hydrateCart = useCartStore((s) => s.hydrate);
  const displayCount = cartCount > 99 ? "99+" : cartCount;

  useEffect(() => {
    hydrateCart();
  }, [user]);

  return (
    <header className="bg-black shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2">
          {/* left: logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="DishHub" className="h-15 w-auto" />
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
                <Link to="/profile" aria-label="Profile">
                  {/* circle with user's initial */}
                  <div className="h-8 w-8 rounded-full border-2 border-primary text-primary flex items-center justify-center font-extrabold">
                    {(() => {
                      const name = user?.name || user?.email || "";
                      return name ? name.charAt(0).toUpperCase() : "U";
                    })()}
                  </div>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
