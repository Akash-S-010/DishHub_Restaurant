import { create } from 'zustand'
import axios from '../config/axios.js'
import { toast } from 'react-hot-toast'

const useFoodStore = create((set, get) => ({
  foods: [],
  loading: false,
  error: null,

  fetchAll: async () => {
    set({ loading: true, error: null })
    try {
      const { data } = await axios.get('/food/all-food')
      set({ foods: data, loading: false })
      if (!Array.isArray(data) || data.length === 0) toast('No foods found')
    } catch (err) {
      set({ loading: false, error: err })
      toast.error(err?.response?.data?.message || 'Failed to load menu')
    }
  },

  fetchById: async (id) => {
    set({ loading: true, error: null })
    try {
      const { data } = await axios.get(`/food/${id}`)
      set({ loading: false })
      return data
    } catch (err) {
      set({ loading: false, error: err })
      toast.error(err?.response?.data?.message || 'Food not found')
      return null
    }
  },
}))

export default useFoodStore


