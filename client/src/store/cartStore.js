import { create } from 'zustand'
import axios from '../config/axios.js'
import { toast } from 'react-hot-toast'

const useCartStore = create((set, get) => ({
  items: [],
  loading: false,
  error: null,

  get count(){
    return get().items.reduce((sum, it)=> sum + (it.quantity||0), 0)
  },

  get subtotal(){
    return get().items.reduce((sum, it)=> sum + (it.food?.price||0) * it.quantity, 0)
  },

  hydrate: async () => {
    set({ loading: true, error: null })
    try {
      const { data } = await axios.get('/cart')
      set({ items: data, loading: false })
    } catch (err) {
      set({ loading: false, error: err })
    }
  },

  add: async (foodId, quantity = 1) => {
    try {
      await axios.post('/cart/add', { foodId, quantity })
      const { data } = await axios.get('/cart')
      set({ items: data })
      toast.success('Added to cart')
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Could not add to cart')
    }
  },

  updateQty: async (foodId, quantity) => {
    try{
      await axios.put('/cart/update', { foodId, quantity })
      const { data } = await axios.get('/cart')
      set({ items: data })
    } catch (err){
      toast.error('Update failed')
    }
  },

  remove: async (foodId) => {
    try{
      await axios.delete(`/cart/remove/${foodId}`)
      const { data } = await axios.get('/cart')
      set({ items: data })
      toast('Removed from cart')
    } catch (err){
      toast.error('Remove failed')
    }
  },

  clear: async () => {
    try{
      await axios.delete('/cart/clear')
      set({ items: [] })
      toast('Cart cleared')
    } catch (err){
      toast.error('Clear failed')
    }
  }
}))

export default useCartStore


