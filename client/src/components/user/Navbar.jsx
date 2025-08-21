import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Heart, ShoppingCart, User } from 'lucide-react'
import logo from '../../assets/DishHub_Logo.png'
import useAuthStore from '../../store/authStore.js'

const Navbar = () => {
  const user = useAuthStore((s) => s.user)

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm">
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
            <NavLink to="/" end className={({ isActive }) => (isActive ? 'text-primary font-semibold' : 'text-gray-700 dark:text-gray-200')}>
              Home
            </NavLink>
            <NavLink to="/menu" className={({ isActive }) => (isActive ? 'text-primary font-semibold' : 'text-gray-700 dark:text-gray-200')}>
              Menu
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => (isActive ? 'text-primary font-semibold' : 'text-gray-700 dark:text-gray-200')}>
              About
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => (isActive ? 'text-primary font-semibold' : 'text-gray-700 dark:text-gray-200')}>
              Contact
            </NavLink>
          </nav>

          {/* right: auth / icons */}
          <div className="flex items-center gap-4">
            {!user ? (
              <>
                <Link to="/auth/login" className="px-3 py-1 rounded-md bg-primary hover:bg-primary-600 text-black font-medium">
                  Login
                </Link>
                <Link to="/auth/register" className="px-3 py-1 rounded-md border border-primary text-primary hover:bg-primary-50">
                  Signup
                </Link>
              </>
            ) : (
              <>
                <Link to="/wishlist" aria-label="Wishlist" className="text-gray-700 dark:text-gray-200 hover:text-[var(--color-primary)]">
                  <Heart />
                </Link>
                <Link to="/cart" aria-label="Cart" className="text-gray-700 dark:text-gray-200 hover:text-[var(--color-primary)]">
                  <ShoppingCart />
                </Link>
                <Link to="/wishlist" aria-label="Wishlist" className="sr-only">Wishlist</Link>
                <Link to="/cart" aria-label="Cart" className="sr-only">Cart</Link>
                <Link to="/profile" aria-label="Profile">
                  {/* circle with user's initial */}
                  <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-black font-semibold">
                    {(() => {
                      const name = user?.name || user?.email || ''
                      return name ? name.charAt(0).toUpperCase() : 'U'
                    })()}
                  </div>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
