import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaInstagram, FaFacebook, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: FaInstagram, url: '#', label: 'Instagram' },
    { icon: FaFacebook, url: '#', label: 'Facebook' },
    { icon: FaLinkedin, url: '#', label: 'LinkedIn' },
  ]

  const footerLinks = {
    company: [
      { path: '/about', label: 'About Us' },
      { path: '/services', label: 'Services' },
      { path: '/portfolio', label: 'Portfolio' },
      { path: '/contact', label: 'Contact' },
    ],
  }

  return (
    <footer className="bg-charcoal-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold font-display mb-4">
              Interio<span className="text-gold-500">Lab</span>
            </h3>
            <p className="text-charcoal-400 mb-4">
              Creating luxurious modern interiors for homes and offices with elegance and sophistication.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-charcoal-400 hover:text-gold-500 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-charcoal-400 hover:text-gold-500 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3 text-charcoal-400">
                <FaPhone className="text-gold-500" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3 text-charcoal-400">
                <FaEnvelope className="text-gold-500" />
                <span>info@interiolab.com</span>
              </li>
              <li className="flex items-start space-x-3 text-charcoal-400">
                <FaMapMarkerAlt className="text-gold-500 mt-1" />
                <span>123 Design Street, Luxury City, LC 12345</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Copyright */}
        <div className="border-t border-charcoal-800 mt-8 pt-8 text-center text-charcoal-500">
          <p>&copy; {currentYear} InterioLab. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

