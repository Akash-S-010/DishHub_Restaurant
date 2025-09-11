import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Upload, Plus, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import useAdminStore from '../../store/adminStore'
import { toast } from 'react-hot-toast'
import axios from '../../config/axios.js'
import { SubmitBtn } from "../../components/ui/Button"

const EditFood = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { updateFood, loading } = useAdminStore()
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Pizza',
    price: '',
    image: '',
    stockAvailable: true
  })

  const categories = ['Pizza', 'Burger', 'Sandwich', 'Pasta']

  useEffect(() => {
    fetchFood()
  }, [id])

  const fetchFood = async () => {
    try {
      const response = await axios.get(`/food/${id}`)
      const food = response.data
      setFormData({
        name: food.name,
        description: food.description,
        category: food.category,
        price: food.price,
        image: food.image,
        stockAvailable: food.stockAvailable
      })
    } catch (error) {
      console.error('Error fetching food:', error)
      toast.error('Failed to load food item')
      navigate('/admin/foods')
    }
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Store the actual file object for upload
      setFormData(prev => ({
        ...prev,
        image: file
      }))
      
      // Also create a preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          imagePreview: e.target.result
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)

    try {
      await updateFood(id, formData)
      toast.success('Food item updated successfully')
      navigate('/admin/foods')
    } catch (error) {
      toast.error('Failed to update food item')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="text-gray-500 mt-4">Loading food item...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 bg-bg">
      <div className="flex items-center gap-4 mb-6">
        <Link
          to="/admin/foods"
          className="flex items-center gap-2 text-muted hover:text-gray-800"
        >
          <ArrowLeft className="w-4 h-4 text-primary" />
          Back to Foods
        </Link>
      </div>

      <h2 className="text-2xl font-bold text-primary mb-6">Edit Food Item</h2>
      
      <div className="bg-bg  shadow-sm p-6">
        <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
          {/* Upload Image */}
          <div>
            <label className="block text-sm font-medium text-off-white mb-2">
              Upload image
            </label>
            <div className="border-2 border-dashed border-surface rounded-lg p-6 text-center">
              {formData.imagePreview || formData.image ? (
                <div className="space-y-2">
                  <img 
                    src={formData.imagePreview || formData.image} 
                    alt="Preview" 
                    className="w-32 h-32 object-cover mx-auto rounded"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, image: '', imagePreview: '' }))}
                    className="text-red-600 text-sm hover:text-red-800"
                  >
                    Remove Image
                  </button>
                </div>
              ) : (
                <div>
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Click to upload or drag and drop</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="mt-2 inline-flex items-center px-4 py-2  rounded-md shadow-sm text-sm font-medium text-bg bg-primary hover:bg-primary/85 transition cursor-pointer"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Upload Image
                  </label>
                </div>
              )}
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-off-white mb-2">
              Food Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-surface rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="Enter food name"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-off-white mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={3}
              className="w-full px-3 py-2 border border-surface rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="Enter food description"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-off-white mb-2">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border bg-bg border-surface rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-off-white mb-2">
              Price (₹)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
              min="0"
              step="0.01"
              className="w-full px-3 py-2 border border-surface rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="Enter price"
            />
          </div>

          {/* Stock Available */}
          <div className="flex items-center">
            <input
              type="checkbox"
              name="stockAvailable"
              checked={formData.stockAvailable}
              onChange={handleInputChange}
              className="h-4 w-4 text-orange-100 focus:ring-primary border-surface rounded"
            />
            <label className="ml-2 block text-sm text-off">
              Available in stock
            </label>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <SubmitBtn loading={loading} disabled={loading} />
            <button
              type="button"
              onClick={() => navigate('/admin/foods')}
              className="px-4 py-2 border border-surface text-off-white rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditFood
