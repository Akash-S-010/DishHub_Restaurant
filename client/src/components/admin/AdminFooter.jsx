import React from 'react'

const AdminFooter = () => {
  return (
    <footer className="bg-black border-t border-surface py-4 px-6">
      <div className="text-center text-muted text-sm">
        © {new Date().getFullYear()} DishHub Admin Panel. All rights reserved.
      </div>
    </footer>
  )
}

export default AdminFooter