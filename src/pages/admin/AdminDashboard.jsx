import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaPlus, FaEdit, FaTrash, FaTimes, FaSignOutAlt } from 'react-icons/fa'
import { projectAPI, inquiryAPI, fileURL } from '../../utils/api'

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('projects')
  const [projects, setProjects] = useState([])
  const [inquiries, setInquiries] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'home',
  })
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    fetchProjects()
    fetchInquiries()
  }, [])

  const fetchProjects = async () => {
    try {
      const res = await projectAPI.getAll()
      setProjects(res.data)
    } catch (err) {
      console.error('Error fetching projects:', err)
    }
  }

  const fetchInquiries = async () => {
    try {
      const res = await inquiryAPI.getAll()
      setInquiries(res.data)
    } catch (err) {
      console.error('Error fetching inquiries:', err)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/admin/login')
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (isEditing) {
        await projectAPI.update(editingId, formData, imageFile)
      } else {
        await projectAPI.create(formData, imageFile)
      }
      setIsModalOpen(false)
      resetForm()
      fetchProjects()
    } catch (err) {
      console.error('Error saving project:', err)
      alert('Error saving project. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (project) => {
    setFormData({
      title: project.title,
      description: project.description || '',
      category: project.category,
    })
    setImagePreview(project.imageUrl || null)
    setImageFile(null)
    setEditingId(project.id)
    setIsEditing(true)
    setIsModalOpen(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await projectAPI.delete(id)
        fetchProjects()
      } catch (err) {
        console.error('Error deleting project:', err)
        alert('Error deleting project. Please try again.')
      }
    }
  }

  const handleDeleteInquiry = async (id) => {
    if (window.confirm('Are you sure you want to delete this inquiry?')) {
      try {
        await inquiryAPI.delete(id)
        fetchInquiries()
      } catch (err) {
        console.error('Error deleting inquiry:', err)
        alert('Error deleting inquiry. Please try again.')
      }
    }
  }

  const resetForm = () => {
    setFormData({ title: '', description: '', category: 'home' })
    setImageFile(null)
    setImagePreview(null)
    setIsEditing(false)
    setEditingId(null)
  }

  const openAddModal = () => {
    resetForm()
    setIsModalOpen(true)
  }

  return (
    <div className="pt-20 min-h-screen bg-charcoal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-serif font-bold text-charcoal-900">
            Admin Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-6 py-3 bg-charcoal-700 text-white rounded-lg hover:bg-charcoal-800 transition-colors"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-8 border-b border-charcoal-200">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'projects'
                ? 'border-b-2 border-royal-600 text-royal-600'
                : 'text-charcoal-600 hover:text-royal-600'
            }`}
          >
            Projects
          </button>
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'inquiries'
                ? 'border-b-2 border-royal-600 text-royal-600'
                : 'text-charcoal-600 hover:text-royal-600'
            }`}
          >
            Inquiries ({inquiries.length})
          </button>
        </div>

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div>
            <div className="flex justify-end mb-6">
              <button
                onClick={openAddModal}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-royal-600 to-gold-500 text-white rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              >
                <FaPlus />
                <span>Add Project</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={project.imageUrl ? fileURL(project.imageUrl) : 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80'}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <span className="inline-block px-3 py-1 bg-gold-500 text-charcoal-900 text-xs font-semibold rounded-full mb-3">
                      {project.category}
                    </span>
                    <h3 className="text-xl font-semibold text-charcoal-900 mb-2">
                      {project.title}
                    </h3>
                    <p className="text-charcoal-600 text-sm mb-4 line-clamp-2">
                      {project.description || 'No description'}
                    </p>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(project)}
                        className="flex-1 px-4 py-2 bg-royal-600 text-white rounded-lg hover:bg-royal-700 transition-colors flex items-center justify-center space-x-2"
                      >
                        <FaEdit />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
                      >
                        <FaTrash />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Inquiries Tab */}
        {activeTab === 'inquiries' && (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-charcoal-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-charcoal-900">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-charcoal-900">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-charcoal-900">Phone</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-charcoal-900">Message</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-charcoal-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-charcoal-100">
                  {inquiries.map((inquiry) => (
                    <tr key={inquiry.id} className="hover:bg-charcoal-50">
                      <td className="px-6 py-4 text-sm text-charcoal-900">{inquiry.name}</td>
                      <td className="px-6 py-4 text-sm text-charcoal-600">{inquiry.email}</td>
                      <td className="px-6 py-4 text-sm text-charcoal-600">{inquiry.phone || 'N/A'}</td>
                      <td className="px-6 py-4 text-sm text-charcoal-600 max-w-xs truncate">
                        {inquiry.message || 'N/A'}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleDeleteInquiry(inquiry.id)}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
                        >
                          <FaTrash />
                          <span>Delete</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {inquiries.length === 0 && (
                <div className="text-center py-12 text-charcoal-600">
                  No inquiries yet
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Project Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-charcoal-900/50 z-50 flex items-center justify-center p-4"
            onClick={() => {
              setIsModalOpen(false)
              resetForm()
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-charcoal-200 flex justify-between items-center">
                <h2 className="text-2xl font-serif font-bold text-charcoal-900">
                  {isEditing ? 'Edit Project' : 'Add New Project'}
                </h2>
                <button
                  onClick={() => {
                    setIsModalOpen(false)
                    resetForm()
                  }}
                  className="text-charcoal-500 hover:text-charcoal-900"
                >
                  <FaTimes size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-charcoal-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-royal-500 focus:border-transparent"
                    placeholder="Project title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-charcoal-700 mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-royal-500 focus:border-transparent"
                  >
                    <option value="home">Home Interior</option>
                    <option value="office">Office Interior</option>
                    <option value="kitchen">Modular Kitchen</option>
                    <option value="renovation">Renovation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-charcoal-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-royal-500 focus:border-transparent resize-none"
                    placeholder="Project description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-charcoal-700 mb-2">
                    Image {!isEditing && '*'}
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    required={!isEditing}
                    className="w-full px-4 py-3 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-royal-500 focus:border-transparent"
                  />
                  {imagePreview && (
                    <div className="mt-4">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-64 object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false)
                      resetForm()
                    }}
                    className="px-6 py-3 border border-charcoal-300 text-charcoal-700 rounded-lg hover:bg-charcoal-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-3 bg-gradient-to-r from-royal-600 to-gold-500 text-white rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
                  >
                    {isLoading ? 'Saving...' : isEditing ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default AdminDashboard

