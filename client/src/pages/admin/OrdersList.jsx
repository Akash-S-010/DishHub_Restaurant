import React, { useEffect } from 'react'
import { Package, ChevronDown } from 'lucide-react'
import useAdminStore from '../../store/adminStore'
import { toast } from 'react-hot-toast'
import Loader from '../../components/ui/Loader'

const OrdersList = () => {
  const { orders, loading, fetchOrders, updateOrderStatus } = useAdminStore()

  const orderStatuses = [
    'Pending',
    'Preparing', 
    'Out for Delivery',
    'Delivered',
    'Cancelled'
  ]

  useEffect(() => {
    fetchOrders()
  }, [fetchOrders])

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus)
      toast.success('Order status updated successfully')
    } catch (error) {
      toast.error('Failed to update order status')
    }
  }

  const formatItems = (items) => {
    return items.map(item => `${item.food.name} x ${item.quantity}`).join(', ')
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'Preparing':
        return 'bg-blue-100 text-blue-800'
      case 'Out for Delivery':
        return 'bg-purple-100 text-purple-800'
      case 'Delivered':
        return 'bg-green-100 text-green-800'
      case 'Cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="p-6 bg-bg">
       <Loader />
      </div>
    )
  }

  return (
    <div className="p-6 bg-bg min-h-screen">
      <h2 className="text-2xl font-bold text-off-white mb-6">Order Management</h2>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order._id} className="border border-surface rounded-lg p-4 bg-card">
            {/* Order Summary Row */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-off-white">
                    {formatItems(order.items)}
                  </p>
                  <p className="text-xs text-muted">
                    Items: {order.items.length}
                  </p>
                  <p className="text-xs text-gray-500">
                    Order Id: #{order._id.slice(-6)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-md font-medium text-off-white">
                    ₹ {order.totalPrice}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.orderStatus)}`}>
                    {order.orderStatus}
                  </span>
                  
                  <div className="relative">
                    <select
                      value={order.orderStatus}
                      onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                      className="appearance-none bg-card border border-surface rounded px-5 py-1 text-xs "
                    >
                      {orderStatuses.map(status => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-1 top-1/2 transform -translate-y-1/2 w-3 h-3 text-off-white pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            {/* Order Details */}
            <div className="border-t border-surface pt-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-muted mb-1">Customer</p>
                  <p className="font-medium">{order.user?.name || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-muted mb-1">Phone</p>
                  <p className="font-medium">{order.user?.phone || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-muted mb-1">Payment</p>
                  <p className={`font-medium ${order.paymentStatus === 'paid' ? 'text-green-600' : 'text-red-600'}`}>
                    {order.paymentStatus === 'paid' ? 'Paid' : 'Pending'}
                  </p>
                </div>
                <div>
                  <p className="text-muted mb-1">Date</p>
                  <p className="font-medium">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {order.deliveryAddress && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-muted text-sm mb-1">Delivery Address</p>
                  <p className="text-sm">
                    {order.deliveryAddress.street}, {order.deliveryAddress.city}, {order.deliveryAddress.state} - {order.deliveryAddress.pincode}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {orders.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-12 h-12 text-off-white mx-auto mb-4" />
          <p className="text-off-white text-lg font-semibold mb-0">No orders found.</p>
        </div>
      )}
    </div>
  )
}

export default OrdersList
