import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projectAPI, fileURL } from '../utils/api'

const Portfolio = () => {
  const [projects, setProjects] = useState([])
  const [filteredProjects, setFilteredProjects] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedProject, setSelectedProject] = useState(null)

  const categories = [
    { value: 'all', label: 'All Projects' },
    { value: 'home', label: 'Home Interior' },
    { value: 'office', label: 'Office Interior' },
    { value: 'kitchen', label: 'Modular Kitchen' },
    { value: 'renovation', label: 'Renovation' },
  ]

  useEffect(() => {
    projectAPI.getAll()
      .then(res => {
        setProjects(res.data)
        setFilteredProjects(res.data)
      })
      .catch(err => console.error('Error fetching projects:', err))
  }, [])

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredProjects(projects)
    } else {
      setFilteredProjects(projects.filter(p => p.category === selectedCategory))
    }
  }, [selectedCategory, projects])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-royal-50 via-white to-gold-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-charcoal-900 mb-6">
              Our Portfolio
            </h1>
            <p className="text-xl md:text-2xl text-charcoal-600 max-w-3xl mx-auto">
              Explore our collection of stunning interior design projects
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 bg-white border-b border-charcoal-100 sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  selectedCategory === category.value
                    ? 'bg-gradient-to-r from-royal-600 to-gold-500 text-white shadow-gold'
                    : 'bg-charcoal-100 text-charcoal-700 hover:bg-charcoal-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  whileHover={{ y: -10, scale: 1.02 }}
                  onClick={() => setSelectedProject(project)}
                  className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={project.imageUrl ? fileURL(project.imageUrl) : 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80'}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/90 via-charcoal-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <span className="inline-block px-3 py-1 bg-gold-500 text-charcoal-900 text-xs font-semibold rounded-full mb-3">
                        {project.category}
                      </span>
                      <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
                      {project.description && (
                        <p className="text-sm text-white/90 line-clamp-2">{project.description}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredProjects.length === 0 && (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-xl text-charcoal-600">No projects found in this category.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-charcoal-900/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl w-full bg-white rounded-xl overflow-hidden shadow-2xl"
            >
              <div className="relative h-96 overflow-hidden">
                <img
                  src={selectedProject.imageUrl ? fileURL(selectedProject.imageUrl) : 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80'}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-charcoal-900 font-bold transition-colors"
                >
                  ×
                </button>
              </div>
              <div className="p-8">
                <span className="inline-block px-3 py-1 bg-gold-500 text-charcoal-900 text-sm font-semibold rounded-full mb-4">
                  {selectedProject.category}
                </span>
                <h2 className="text-3xl font-serif font-bold text-charcoal-900 mb-4">
                  {selectedProject.title}
                </h2>
                {selectedProject.description && (
                  <p className="text-lg text-charcoal-600">{selectedProject.description}</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Portfolio

