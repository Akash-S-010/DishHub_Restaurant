import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminNavbar from '../components/admin/AdminNavbar.jsx'
import AdminFooter from '../components/admin/AdminFooter.jsx'

const AdminLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <AdminNavbar />
      <main className="flex-1 pb-20">
        <Outlet />
      </main>
      <AdminFooter />
    </div>
  )
}

export default AdminLayout
