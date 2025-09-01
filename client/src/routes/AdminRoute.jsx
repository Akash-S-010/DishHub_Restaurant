import React, { useEffect, useRef } from 'react'
import { Navigate } from 'react-router-dom'
import useAuthStore from '../store/authStore.js'
import Loader from '../components/ui/Loader.jsx'

const AdminRoute = ({ children }) => {
  const user = useAuthStore((s) => s.user)
  const loading = useAuthStore((s) => s.loading)
  const hydrateUser = useAuthStore((s) => s.hydrateUser)
  const initialHydrationDone = useRef(false)

  // Attempt to validate admin role when component mounts (only once)
  useEffect(() => {
    const checkAuth = async () => {
      if (!initialHydrationDone.current) {
        initialHydrationDone.current = true
        
        // Try to get from localStorage first for immediate response
        const storedUser = localStorage.getItem('authUser')
        if (storedUser) {
          try {
            const parsedUser = JSON.parse(storedUser)
            // Check if the stored user is an admin before setting the state
            if (parsedUser && parsedUser.role === 'admin') {
              useAuthStore.setState({ user: parsedUser, loading: false })
              // We don't need to call hydrateUser() here as it's already called in App.jsx
              // This prevents continuous API calls
            } else {
              // If stored user is not an admin, clear it
              localStorage.removeItem('authUser')
              // We don't need to call hydrateUser() here as it will be handled by App.jsx
            }
          } catch (err) {
            // Invalid stored data, remove it
            localStorage.removeItem('authUser')
            // We don't need to call hydrateUser() here as it will be handled by App.jsx
          }
        }
        // No need to call hydrateUser() here as it's already called in App.jsx
      }
    }
    
    checkAuth()
  }, [hydrateUser])

  // Show loading while authentication is being checked
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    )
  }

  // If not loading and no user, redirect to admin login
  if (!user) {
    return <Navigate to="/admin/login" replace />
  }

  // If user exists but is not admin, redirect to home
  if (user.role !== 'admin') {
    return <Navigate to="/" replace />
  }

  // User is authenticated and is admin, render the admin content
  return children
}

export default AdminRoute
