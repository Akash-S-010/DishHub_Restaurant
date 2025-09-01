import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/DishHub_Logo.png'
import { 
  LayoutDashboard, 
  Bell, 
  Settings, 
  User, 
  LogOut, 
  Menu, 
  X,
  Home
} from 'lucide-react'
import useAuthStore from '../../store/authStore'

const AdminNavbar = () => {
  const navigate = useNavigate()
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
    navigate('/admin/login')
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen)
  }

  return (
    <nav className="bg-black shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo and Brand */}
          <div className="flex items-center">
            <Link to="/admin" className="flex items-center space-x-3">
              <img src={logo} alt="Logo" className="size-10" />
              <span className="text-xl font-bold text-off-white mt-1">Admin Panel</span>
            </Link>
          </div>

          {/* Center - Navigation Links (Desktop) */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/admin" 
              className="text-off-white hover:text-primary transition-colors"
            >
              Dashboard
            </Link>
            <Link 
              to="/admin/foods" 
              className="text-off-white hover:text-primary transition-colors"
            >
              Foods
            </Link>
            <Link 
              to="/admin/orders" 
              className="text-off-white hover:text-primary transition-colors"
            >
              Orders
            </Link>
            <Link 
              to="/admin/users" 
              className="text-off-white hover:text-primary transition-colors"
            >
              Users
            </Link>
          </div>

          {/* Right side - Notifications, Profile, Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={toggleProfile}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-surface transition-colors cursor-pointer"
              >
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-off-white" />
                </div>
                <span className="hidden sm:block text-sm font-medium text-off-white">
                  {user?.name || 'Admin'}
                </span>
              </button>

              {/* Profile Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-card rounded-lg shadow-lg border border-surface py-2 z-50">
                  <div className="px-4 py-2 border-b border-surface">
                    <p className="text-sm font-medium text-off-white">{user?.name}</p>
                    <p className="text-xs text-muted">{user?.email}</p>
                  </div>
                  
                  <Link
                    to="/"
                    className="flex items-center px-4 py-2 text-sm text-primary hover:bg-surface transition-colors"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <Home className="w-4 h-4 mr-2" />
                    View Main Site
                  </Link>
                  
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 text-off-white hover:text-off-white transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-surface py-4">
            <div className="flex flex-col space-y-2">
              <Link 
                to="/admin" 
                className="px-4 py-2 text-off-white hover:text-primary hover:bg-surface rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link 
                to="/admin/foods" 
                className="px-4 py-2 text-off-white hover:text-primary hover:bg-surface rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Foods
              </Link>
              <Link 
                to="/admin/orders" 
                className="px-4 py-2 text-off-white hover:text-primary hover:bg-surface rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Orders
              </Link>
              <Link 
                to="/admin/users" 
                className="px-4 py-2 text-off-white hover:text-primary hover:bg-surface rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Users
              </Link>
              <div className="border-t border-surface pt-2 mt-2">
                <Link
                  to="/"
                  className="flex items-center px-4 py-2 text-off-white hover:text-primary hover:bg-surface rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Home className="w-4 h-4 mr-2" />
                  View Main Site
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default AdminNavbar
