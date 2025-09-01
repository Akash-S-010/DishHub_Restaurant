import React from 'react'

const AdminFooter = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-4 px-6">
      <div className="text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} DishHub Admin Panel. All rights reserved.
      </div>
    </footer>
  )
}

export default AdminFooter