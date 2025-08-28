import { create } from 'zustand'
import axios from '../config/axios.js'
import { toast } from 'react-hot-toast'

const useOrderStore = create((set, get) => ({
  orders: [],
  loading: false,

  hydrate: async () => {
    set({ loading: true })
    try {
      const { data } = await axios.get('/order/my-orders')
      set({ orders: data, loading: false })
    } catch (err) {
      set({ loading: false })
      toast.error('Could not load orders')
    }
  }
}))

export default useOrderStore
