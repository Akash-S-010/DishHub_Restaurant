import React, { useEffect } from 'react'
import { User, Shield, ShieldOff, Mail, Phone } from 'lucide-react'
import useAdminStore from '../../store/adminStore'
import { toast } from 'react-hot-toast'

const UsersList = () => {
  const { users, loading, fetchUsers, toggleUserBlock } = useAdminStore()

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const handleToggleBlock = async (userId, currentStatus) => {
    try {
      await toggleUserBlock(userId, !currentStatus)
      toast.success(`User ${!currentStatus ? 'blocked' : 'unblocked'} successfully`)
    } catch (error) {
      toast.error('Failed to update user status')
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString()
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="text-gray-500 mt-4">Loading users...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 bg-bg h-screen">
      <h2 className="text-2xl font-bold text-off-white mb-6">Users Management</h2>

      <div className="bg-bg border border-surface rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-surface">
            <thead className="bg-card">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-primary uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-primary uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-primary uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-primary uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-primary uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-primary uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-card divide-y divide-surface cursor-pointer">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-black">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                          <User className="w-5 h-5 text-off-white" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-off-white">{user.name}</div>
                        <div className="text-sm text-muted">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2 text-sm text-off-white">
                      <Phone className="w-4 h-4" />
                      {user.phone || 'N/A'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {user.role === 'admin' ? (
                        <Shield className="w-4 h-4 text-blue-600" />
                      ) : (
                        <User className="w-4 h-4 text-off-white" />
                      )}
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        user.role === 'admin' 
                          ? 'text-blue-500' 
                          : ''
                      }`}>
                        {user.role === 'admin' ? 'Admin' : ''}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      user.isBlocked 
                        ? 'bg-accent text-red-800' 
                        : 'bg-green-300 text-green-900'
                    }`}>
                      {user.isBlocked ? 'Blocked' : 'Active'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-off-white">
                    {formatDate(user.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleToggleBlock(user._id, user.isBlocked)}
                      disabled={user.role === 'admin'}
                      className={`px-3 py-1 rounded-md text-xs font-medium cursor-pointer ${
                        user.isBlocked
                          ? 'bg-green-300 text-green-800 hover:bg-green-200'
                          : 'bg-accent text-red-800 hover:bg-red-400 '
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      {user.isBlocked ? 'Unblock' : 'Block'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {users.length === 0 && (
        <div className="text-center py-12">
          <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No users found.</p>
        </div>
      )}
    </div>
  )
}

export default UsersList
