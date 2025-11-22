import { motion } from 'framer-motion'
import { FaHome, FaBuilding, FaUtensils, FaHammer } from 'react-icons/fa'

const Services = () => {
  const services = [
    {
      icon: FaHome,
      title: 'Home Interior',
      description: 'Transform your living spaces into elegant, comfortable sanctuaries that reflect your personal style and enhance your daily life.',
      features: ['Living Room Design', 'Bedroom Design', 'Bathroom Design', 'Home Staging'],
    },
    {
      icon: FaBuilding,
      title: 'Office Interior',
      description: 'Create productive and inspiring work environments that balance functionality with modern aesthetics for maximum efficiency.',
      features: ['Corporate Offices', 'Co-working Spaces', 'Reception Areas', 'Meeting Rooms'],
    },
    {
      icon: FaUtensils,
      title: 'Modular Kitchen',
      description: 'Design beautiful, functional kitchens that combine style with practicality, making cooking a joy in your home.',
      features: ['Custom Cabinetry', 'Modern Appliances', 'Storage Solutions', 'Island Design'],
    },
    {
      icon: FaHammer,
      title: 'Renovation',
      description: 'Breathe new life into existing spaces with thoughtful renovations that modernize while preserving character.',
      features: ['Complete Renovation', 'Partial Renovation', 'Space Optimization', 'Material Selection'],
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
              Our Services
            </h1>
            <p className="text-xl md:text-2xl text-charcoal-600 max-w-3xl mx-auto">
              Comprehensive interior design solutions tailored to your needs
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-charcoal-100"
              >
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-royal-600 to-gold-500 rounded-lg flex items-center justify-center text-white">
                      <service.icon size={32} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-charcoal-900 mb-4">
                      {service.title}
                    </h3>
                    <p className="text-charcoal-600 mb-6">
                      {service.description}
                    </p>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-charcoal-600">
                          <span className="w-2 h-2 bg-gold-500 rounded-full mr-3" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-charcoal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-charcoal-900 mb-4">
              Our Process
            </h2>
            <p className="text-xl text-charcoal-600">
              A streamlined approach to bringing your vision to life
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Consultation', description: 'We discuss your needs, preferences, and budget' },
              { step: '02', title: 'Design', description: 'Our team creates detailed design concepts and plans' },
              { step: '03', title: 'Approval', description: 'You review and approve the design before implementation' },
              { step: '04', title: 'Execution', description: 'We bring the design to life with quality craftsmanship' },
            ].map((process, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-royal-600 to-gold-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {process.step}
                </div>
                <h3 className="text-xl font-semibold text-charcoal-900 mb-2">{process.title}</h3>
                <p className="text-charcoal-600">{process.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Services

