import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Details from './pages/Details'
import About from './pages/About'
import Contact from './pages/Contact'
import Menu from './pages/Menu'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Orders from './pages/Orders'
import Wishlist from './pages/Wishlist'
import Profile from './pages/Profile'
import Addresses from './pages/Addresses'
import Auth from './pages/Auth'
import Navbar from './components/user/Navbar'
import useAuthStore from './store/authStore'
import useCartStore from './store/cartStore'
import useWishlistStore from './store/wishlistStore'

const App = () => {
  const hydrateUser = useAuthStore(s => s.hydrateUser)
  const hydrateCart = useCartStore(s => s.hydrate)
  const hydrateWishlist = useWishlistStore(s => s.hydrate)

  useEffect(() => {
    // hydrate auth, then cart and wishlist
    (async () => {
      await hydrateUser()
      await Promise.allSettled([hydrateCart(), hydrateWishlist()])
    })()
  }, [])

  return (
    <div className="min-h-dvh bg-[#0B0B0F] text-white">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/food/:id" element={<Details />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/addresses" element={<Addresses />} />
          <Route path="/auth/:mode" element={<Auth />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
