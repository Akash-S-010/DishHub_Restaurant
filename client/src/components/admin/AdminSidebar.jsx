import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Plus, ListTodo, Package, Users, LayoutDashboard, LogOut } from 'lucide-react'
import useAuthStore from '../../store/authStore'

const AdminSidebar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const logout = useAuthStore((s) => s.logout)

  const isActive = (path) => {
    if (path === '/admin') {
      return location.pathname === '/admin'
    }
    return location.pathname.startsWith(path)
  }

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  return (
    <aside className="w-64 bg-gray-100 border-r border-gray-200 p-4 min-h-screen flex flex-col">
      <div className="mb-8">
        <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
      </div>
      
      <nav className="space-y-2 flex-1">
        <Link 
          to="/admin" 
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            isActive('/admin') 
              ? 'bg-orange-100 border border-orange-300 text-orange-700' 
              : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
          }`}
        >
          <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
            <LayoutDashboard className="w-4 h-4 text-white" />
          </div>
          <span className="font-medium">Dashboard</span>
        </Link>

        <Link 
          to="/admin/add-food" 
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            isActive('/admin/add-food') 
              ? 'bg-orange-100 border border-orange-300 text-orange-700' 
              : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
          }`}
        >
          <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center">
            <Plus className="w-4 h-4 text-white" />
          </div>
          <span className="font-medium">Add Items</span>
        </Link>

        <Link 
          to="/admin/foods" 
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            isActive('/admin/foods') 
              ? 'bg-orange-100 border border-orange-300 text-orange-700' 
              : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
          }`}
        >
          <div className="w-6 h-6 rounded-full bg-gray-500 flex items-center justify-center">
            <ListTodo className="w-4 h-4 text-white" />
          </div>
          <span className="font-medium">List Items</span>
        </Link>

        <Link 
          to="/admin/orders" 
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            isActive('/admin/orders') 
              ? 'bg-orange-100 border border-orange-300 text-orange-700' 
              : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
          }`}
        >
          <div className="w-6 h-6 rounded-full bg-gray-500 flex items-center justify-center">
            <Package className="w-4 h-4 text-white" />
          </div>
          <span className="font-medium">Orders</span>
        </Link>

        <Link 
          to="/admin/users" 
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            isActive('/admin/users') 
              ? 'bg-orange-100 border border-orange-300 text-orange-700' 
              : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
          }`}
        >
          <div className="w-6 h-6 rounded-full bg-gray-500 flex items-center justify-center">
            <Users className="w-4 h-4 text-white" />
          </div>
          <span className="font-medium">Users</span>
        </Link>
      </nav>

      {/* Logout Button */}
      <div className="mt-auto pt-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors w-full bg-red-50 border border-red-200 text-red-700 hover:bg-red-100"
        >
          <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
            <LogOut className="w-4 h-4 text-white" />
          </div>
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  )
}

export default AdminSidebar
