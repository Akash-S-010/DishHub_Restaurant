import React, { useEffect } from 'react'
import useAdminStore from '../../store/adminStore'
import { Package, Users, Utensils, DollarSign } from 'lucide-react'

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-600 text-sm font-medium">{title}</p>
        <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
      </div>
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </div>
)

const AdminDashboard = () => {
  const { stats, loading, fetchStats } = useAdminStore()

  useEffect(() => {
    fetchStats()
  }, [fetchStats])

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h2>
      
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="text-gray-500 mt-4">Loading dashboard data...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="Total Orders" 
            value={stats.totalOrders} 
            icon={Package}
            color="bg-blue-500"
          />
          <StatCard 
            title="Total Users" 
            value={stats.totalUsers} 
            icon={Users}
            color="bg-green-500"
          />
          <StatCard 
            title="Total Foods" 
            value={stats.totalFoods} 
            icon={Utensils}
            color="bg-orange-500"
          />
          <StatCard 
            title="Total Revenue" 
            value={`₹${stats.totalRevenue.toLocaleString()}`} 
            icon={DollarSign}
            color="bg-purple-500"
          />
        </div>
      )}

      {/* Recent Activity Section */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <p className="text-gray-500 text-center">Recent activity will be displayed here</p>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
