import { create } from 'zustand'
import axios from '../config/axios'

// Helper function to convert base64/dataURL to File object
const dataURLtoFile = (dataurl, filename) => {
  const arr = dataurl.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, { type: mime })
}

const useAdminStore = create((set, get) => ({
  // State
  foods: [],
  orders: [],
  users: [],
  stats: {
    totalOrders: 0,
    totalUsers: 0,
    totalFoods: 0,
    totalRevenue: 0
  },
  loading: false,
  error: null,

  // Actions
  fetchFoods: async () => {
    set({ loading: true, error: null })
    try {
      const response = await axios.get('/food/all-food')
      set({ foods: response.data, loading: false })
    } catch (error) {
      set({ error: error.message, loading: false })
      console.error('Error fetching foods:', error)
    }
  },

  createFood: async (foodData) => {
    set({ loading: true, error: null })
    try {
      // Create FormData for file upload
      const formData = new FormData()
      
      // Append all form fields to FormData
      Object.keys(foodData).forEach(key => {
        // Handle image file separately
        if (key === 'image' && foodData[key] instanceof File) {
          formData.append('image', foodData[key])
        } else if (key === 'image' && typeof foodData[key] === 'string' && foodData[key].startsWith('data:')) {
          // Convert base64 to file if needed
          const file = dataURLtoFile(foodData[key], 'food-image.jpg')
          formData.append('image', file)
        } else {
          formData.append(key, foodData[key])
        }
      })
      
      const response = await axios.post('/food/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      
      set(state => ({
        foods: [...state.foods, response.data.food],
        loading: false
      }))
      return response.data
    } catch (error) {
      set({ error: error.message, loading: false })
      console.error('Error creating food:', error)
      throw error
    }
  },

  updateFood: async (id, foodData) => {
    set({ loading: true, error: null })
    try {
      // Create FormData for file upload
      const formData = new FormData()
      
      // Append all form fields to FormData
      Object.keys(foodData).forEach(key => {
        // Handle image file separately
        if (key === 'image' && foodData[key] instanceof File) {
          formData.append('image', foodData[key])
        } else if (key === 'image' && typeof foodData[key] === 'string' && foodData[key].startsWith('data:')) {
          // Convert base64 to file if needed
          const file = dataURLtoFile(foodData[key], 'food-image.jpg')
          formData.append('image', file)
        } else if (key === 'image' && typeof foodData[key] === 'string' && foodData[key].startsWith('http')) {
          // Skip if it's an existing URL and hasn't changed
          // The backend will keep the existing image
        } else {
          formData.append(key, foodData[key])
        }
      })
      
      const response = await axios.put(`/food/${id}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      
      set(state => ({
        foods: state.foods.map(food => 
          food._id === id ? response.data.food : food
        ),
        loading: false
      }))
      return response.data
    } catch (error) {
      set({ error: error.message, loading: false })
      console.error('Error updating food:', error)
      throw error
    }
  },

  deleteFood: async (id) => {
    set({ loading: true, error: null })
    try {
      await axios.delete(`/food/${id}/delete`)
      set(state => ({
        foods: state.foods.filter(food => food._id !== id),
        loading: false
      }))
    } catch (error) {
      set({ error: error.message, loading: false })
      console.error('Error deleting food:', error)
      throw error
    }
  },

  fetchOrders: async () => {
    set({ loading: true, error: null })
    try {
      const response = await axios.get('/order')
      set({ orders: response.data, loading: false })
    } catch (error) {
      set({ error: error.message, loading: false })
      console.error('Error fetching orders:', error)
    }
  },

  updateOrderStatus: async (orderId, status) => {
    set({ loading: true, error: null })
    try {
      await axios.put(`/order/${orderId}/status`, { orderStatus: status })
      set(state => ({
        orders: state.orders.map(order => 
          order._id === orderId ? { ...order, orderStatus: status } : order
        ),
        loading: false
      }))
    } catch (error) {
      set({ error: error.message, loading: false })
      console.error('Error updating order status:', error)
      throw error
    }
  },

  updatePaymentStatus: async (orderId, status) => {
    set({ loading: true, error: null })
    try {
      await axios.put(`/order/${orderId}/payment-status`, { paymentStatus: status })
      set(state => ({
        orders: state.orders.map(order => 
          order._id === orderId ? { ...order, paymentStatus: status } : order
        ),
        loading: false
      }))
    } catch (error) {
      set({ error: error.message, loading: false })
      console.error('Error updating payment status:', error)
      throw error
    }
  },

  fetchUsers: async () => {
    set({ loading: true, error: null })
    try {
      const response = await axios.get('/user/all-users')
      set({ users: response.data, loading: false })
    } catch (error) {
      set({ error: error.message, loading: false })
      console.error('Error fetching users:', error)
    }
  },

  toggleUserBlock: async (userId, isBlocked) => {
    set({ loading: true, error: null })
    try {
      await axios.patch(`/user/${userId}/block`, { isBlocked })
      set(state => ({
        users: state.users.map(user => 
          user._id === userId ? { ...user, isBlocked } : user
        ),
        loading: false
      }))
    } catch (error) {
      set({ error: error.message, loading: false })
      console.error('Error toggling user block:', error)
      throw error
    }
  },

  fetchStats: async () => {
    set({ loading: true, error: null })
    try {
      const [ordersRes, usersRes, foodsRes] = await Promise.all([
        axios.get('/order'),
        axios.get('/user/all-users'),
        axios.get('/food/all-food')
      ])

      const totalRevenue = ordersRes.data.reduce((sum, order) => {
        return order.paymentStatus === 'paid' ? sum + order.totalPrice : sum
      }, 0)

      set({
        stats: {
          totalOrders: ordersRes.data.length,
          totalUsers: usersRes.data.length,
          totalFoods: foodsRes.data.length,
          totalRevenue
        },
        loading: false
      })
    } catch (error) {
      set({ error: error.message, loading: false })
      console.error('Error fetching stats:', error)
    }
  },

  clearError: () => set({ error: null })
}))

export default useAdminStore
