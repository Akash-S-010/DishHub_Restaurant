import { create } from 'zustand'
import axios from '../config/axios.js'
import { toast } from 'react-hot-toast'

const useAddressStore = create((set, get) => ({
    addresses: [],
    loading: false,

    hydrate: async () => {
        set({ loading: true })
        try {
            const { data } = await axios.get('/address')
            set({ addresses: data, loading: false })
        } catch (err) {
            set({ loading: false })
            toast.error('Could not load addresses')
        }
    },

    add: async (addr) => {
        try {
            const { data } = await axios.post('/address', addr)
            set({ addresses: data.addresses })
            toast.success('Address added')
        } catch (err) {
            toast.error(err?.response?.data?.message || 'Add failed')
        }
    },

    update: async (id, updated) => {
        try {
            const { data } = await axios.put(`/address/${id}`, updated)
            set({ addresses: data.addresses })
            toast.success('Address updated')
        } catch (err) {
            toast.error('Update failed')
        }
    },

    remove: async (id) => {
        try {
            const { data } = await axios.delete(`/address/${id}`)
            set({ addresses: data.addresses })
            toast.success('Address removed')
        } catch (err) {
            toast.error('Remove failed')
        }
    }
}))

export default useAddressStore
