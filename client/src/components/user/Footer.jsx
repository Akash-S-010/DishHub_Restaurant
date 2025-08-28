import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Twitter, Instagram, Mail } from 'lucide-react'
import logo from '../../assets/DishHub_Logo.png'
import Button from '../ui/Button'
import { toast } from 'react-hot-toast'

const Footer = () => {
  const [email, setEmail] = useState('')

  const submitNewsletter = (e) => {
    e.preventDefault()
    if (!email || !email.includes('@')) return toast.error('Enter a valid email')
    setEmail('')
    toast.success('Subscribed — check your inbox')
  }

  return (
    <footer className="border-t border-surface bg-black text-off-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-3">
            <Link to="/" className="inline-flex items-center gap-2">
              <img src={logo} alt="DishHub" className="h-10 w-auto" />
              <span className="font-extrabold text-primary text-2xl mt-2">DishHub</span>
            </Link>
            <p className="text-muted text-sm">
              Fresh meals delivered fast. Crafted with love and the best
              ingredients — order today and enjoy.
            </p>
            <div className="flex items-center gap-3 mt-2">
              <a aria-label="Twitter" href="#" className="text-muted hover:text-primary">
                <Twitter className="w-5 h-5" />
              </a>
              <a aria-label="Instagram" href="#" className="text-muted hover:text-primary">
                <Instagram className="w-5 h-5" />
              </a>
              <a aria-label="Email" href="mailto:hello@dishhub.example" className="text-muted hover:text-primary">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-semibold text-off-white mb-3">Quick links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/menu" className="text-muted hover:text-primary">Menu</Link>
              </li>
              <li>
                <Link to="/about" className="text-muted hover:text-primary">About</Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted hover:text-primary">Contact</Link>
              </li>
              <li>
                <Link to="/wishlist" className="text-muted hover:text-primary">Wishlist</Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-off-white mb-3">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/faq" className="text-muted hover:text-primary">FAQ</Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted hover:text-primary">Terms</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted hover:text-primary">Privacy</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-off-white mb-3">Newsletter</h4>
            <p className="text-muted text-sm mb-3">Get exclusive offers and updates.</p>
            <form onSubmit={submitNewsletter} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="flex-1 rounded-md px-3 py-2 bg-bg border border-primary text-off-white placeholder:text-muted"
              />
              <Button type="submit" className="px-4 py-2">Subscribe</Button>
            </form>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-surface text-sm text-muted flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>© {new Date().getFullYear()} DishHub. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <Link to="/terms" className="hover:text-primary">Terms</Link>
            <Link to="/privacy" className="hover:text-primary">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
