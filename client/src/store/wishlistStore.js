import { create } from 'zustand'
import axios from '../config/axios.js'
import { toast } from 'react-hot-toast'

const useWishlistStore = create((set, get) => ({
  items: [],
  loading: false,
  error: null,

  hydrate: async () => {
    set({ loading: true, error: null })
    try {
      const { data } = await axios.get('/wishlist')
      set({ items: data, loading: false })
    } catch (err) {
      set({ loading: false, error: err })
      // Only show toast for non-authentication errors
      if (err?.response?.status !== 401) {
        toast.error(err?.response?.data?.message || 'Could not load wishlist')
      }
    }
  },

  add: async (foodId) => {
    set({ loading: true })
    try {
      await axios.post(`/wishlist/${foodId}`)
      const { data } = await axios.get('/wishlist')
      set({ items: data, loading: false })
      toast.success('Added to wishlist')
    } catch (err) {
      set({ loading: false, error: err })
      // Only show toast for non-authentication errors
      if (err?.response?.status !== 401) {
        toast.error(err?.response?.data?.message || 'Could not add to wishlist')
      }
    }
  },

  remove: async (foodId) => {
    set({ loading: true })
    try {
      await axios.delete(`/wishlist/${foodId}`)
      set({ items: get().items.filter(it => (it._id || it) !== foodId), loading: false })
      toast('Removed from wishlist')
    } catch (err) {
      set({ loading: false, error: err })
      // Only show toast for non-authentication errors
      if (err?.response?.status !== 401) {
        toast.error(err?.response?.data?.message || 'Could not remove from wishlist')
      }
    }
  }
}))

export default useWishlistStore



