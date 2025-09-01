import { create } from 'zustand'
import axios from '../config/axios.js'
import { toast } from 'react-hot-toast'


const useAuthStore = create((set, get) => ({
    user: null,
    loading: false,
    error: null,

    // hydrate from server: GET /user/me (checkAuth middleware required on server)
    hydrateUser: async () => {
        set({ loading: true, error: null })
        try {
            // Try to get user from server
            const res = await axios.get('/user/me')
            const user = res?.data ?? null
            
            // Store in state and localStorage for persistence
            if (user) {
                localStorage.setItem('authUser', JSON.stringify(user))
                set({ user, loading: false })
                return user
            } else {
                // If server returns no user, clear localStorage and state
                // This is crucial for admin authentication
                localStorage.removeItem('authUser')
                set({ user: null, loading: false })
                return null
            }
        } catch (err) {
            // API call failed - could be expired token or server error
            // For admin routes, we should be strict about authentication
            // and not rely on potentially outdated localStorage data
            localStorage.removeItem('authUser')
            set({ user: null, loading: false, error: err })
            // no toast here to avoid noise on first load
            return null
        }
    },


    //  { login, password }
    login: async (credentials) => {
        set({ loading: true, error: null })
        try {
            const res = await axios.post('/user/login', credentials)
            const user = res?.data?.user ?? res?.data ?? null
            
            // Store user in localStorage for persistence
            if (user) {
                localStorage.setItem('authUser', JSON.stringify(user))
            }
            
            set({ user, loading: false })
            toast.success('Welcome back!')
            return { ok: true, user, data: res.data }
        } catch (err) {
            set({ loading: false, error: err })
            toast.error(err?.response?.data?.message || 'Login failed')
            return { ok: false, error: err }
        }
    },

    // signup -> POST /user/signup { name, email, phone, password }
    signup: async (payload) => {
        set({ loading: true, error: null })
        try {
            const res = await axios.post('/user/signup', payload)
            const user = res?.data?.user ?? res?.data ?? null
            
            // Store user in localStorage for persistence
            if (user) {
                localStorage.setItem('authUser', JSON.stringify(user))
            }
            
            set({ user, loading: false })
            toast.success('Account created!')
            return { ok: true, user, data: res.data }
        } catch (err) {
            set({ loading: false, error: err })
            toast.error(err?.response?.data?.message || 'Signup failed')
            return { ok: false, error: err }
        }
    },

    // logout -> POST /user/logout
    logout: async () => {
        set({ loading: true, error: null })
        try {
            await axios.post('/user/logout')
            
            // Clear localStorage on logout
            localStorage.removeItem('authUser')
            
            set({ user: null, loading: false })
            toast('Logged out')
            return { ok: true }
        } catch (err) {
            // Still clear localStorage even if API call fails
            localStorage.removeItem('authUser')
            
            set({ loading: false, error: err, user: null })
            toast.error(err?.response?.data?.message || 'Logout failed')
            return { ok: false, error: err }
        }
    },

    // update profile -> PUT /user/update-profile { name, email, phone, password }
    updateProfile: async (payload) => {
        set({ loading: true, error: null })
        try {
            const res = await axios.put('/user/update-profile', payload)
            const user = res?.data?.user ?? res?.data ?? null
            
            // Update user in localStorage for persistence
            if (user) {
                localStorage.setItem('authUser', JSON.stringify(user))
            }
            
            set({ user, loading: false })
            toast.success('Profile updated!')
            return { ok: true, user, data: res.data }
        } catch (err) {
            set({ loading: false, error: err })
            toast.error(err?.response?.data?.message || 'Update failed')
            return { ok: false, error: err }
        }
    },

    checkAuth: () => !!get().user,

    // direct setter
    setUser: (user) => set({ user }),
}))

export default useAuthStore
