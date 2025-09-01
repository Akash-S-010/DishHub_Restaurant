import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock, Eye, EyeOff } from 'lucide-react'
import useAuthStore from '../../store/authStore'
import { toast } from 'react-hot-toast'
import { SubmitBtn } from '../../components/ui/button'

const AdminLogin = () => {
  const navigate = useNavigate()
  const { login, loading } = useAuthStore()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    login: '',
    password: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const result = await login(formData)
      if (result.ok && result.user.role === 'admin') {
        toast.success('Welcome to Admin Panel!')
        navigate('/admin')
      } else {
        toast.error('Access denied. Admin privileges required.')
      }
    } catch (error) {
      toast.error('Login failed. Please check your credentials.')
    }
  }

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-primary rounded-full flex items-center justify-center">
            <Lock className="h-8 w-8 text-off-white" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-primary">
            Admin Login
          </h2>
          <p className="mt-2 text-sm text-muted">
            Access the restaurant management panel
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-lg shadow-lg p-8 border bg-card border-surface">
            <div className="space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="login" className="block text-sm font-medium text-off-white mb-2">
                  Email Address
                </label>
                <input
                  id="login"
                  name="login"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.login}
                  onChange={handleInputChange}
                  className="w-full px-3 py-3 border border-surface rounded-lg"
                  placeholder="admin@restaurant.com"
                />
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-off-white mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-3 py-3 pr-10 border border-surface rounded-lg"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 h-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <div>
                <SubmitBtn
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Signing in...
                    </div>
                  ) : (
                    'Sign in to Admin Panel'
                  )}
                </SubmitBtn>
              </div>

              {/* Back to Main Site */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="text-surface"
                >
                  ← Back to main site
                </button>
              </div>
            </div>
          </div>
        </form>

        {/* Admin Notice */}
        <div className="text-center">
          <p className="text-xs text-surface">
            This panel is restricted to authorized administrators only.
          </p>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
