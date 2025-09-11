import React from 'react'
import { Navigate } from 'react-router-dom'
import useAuthStore from '../store/authStore.js'
import Loader from '../components/ui/Loader.jsx'

const AdminRoute = ({ children }) => {
  const user = useAuthStore((s) => s.user);
  const loading = useAuthStore((s) => s.loading);
  const hasCheckedAuth = useAuthStore((s) => s.hasCheckedAuth);

  if (loading || !hasCheckedAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!user) return <Navigate to="/admin/login" replace />;
  if (user.role !== "admin") return <Navigate to="/" replace />;

  return children;
};



export default AdminRoute
