import React, { useEffect } from 'react'
import useAdminStore from '../../store/adminStore'
import { Package, Users, Utensils, DollarSign } from 'lucide-react'
import Loader from '../../components/ui/Loader'
import Button from '../../components/ui/Button'
import { useNavigate } from 'react-router-dom'

const StatCard = ({ title, value, icon: Icon, color, text, location }) => {
  const navigate = useNavigate()

  return (
    <div className="bg-card border border-surface p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-muted text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-off-white mt-2">{value}</p>
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
          <Icon className="w-6 h-6 text-off"/>
        </div>
      </div>
      <Button className="mt-10 w-full" onClick={() => navigate(location)}>
        {text}
      </Button>
    </div>
  )
}

const AdminDashboard = () => {
  const { stats, loading, fetchStats } = useAdminStore()

  useEffect(() => {
    fetchStats()
  }, [fetchStats])

  return (
    <div className="p-6 h-screen bg-bg ">
      <h2 className="text-2xl font-bold text-off-white mb-6">Dashboard</h2>
      
      {loading ? (
        <div className="text-center py-12">
          <Loader/>
          <p className="text-muted mt-4">Loading dashboard data...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="Total Orders" 
            value={stats.totalOrders} 
            icon={Package}
            color="bg-primary"
            text="View Orders"
            location="/admin/orders"
          />
          <StatCard 
            title="Total Users" 
            value={stats.totalUsers} 
            icon={Users}
            color="bg-primary"
            text="View Users"
            location="/admin/users"
          />
          <StatCard 
            title="Total Foods" 
            value={stats.totalFoods} 
            icon={Utensils}
            color="bg-primary"
            text="View Foods"
            location="/admin/foods"
          />
          <StatCard 
            title="Total Revenue" 
            value={`₹ ${stats.totalRevenue.toLocaleString()}`} 
            icon={DollarSign}
            color="bg-primary"
            text="View Revenue"
            location="/admin"
          />
        </div>
      )}
    </div>
  )
}

export default AdminDashboard
