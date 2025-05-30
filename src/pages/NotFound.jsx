import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ApperIcon from '../components/ApperIcon'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-surface-50 via-white to-primary/5 dark:from-surface-900 dark:via-surface-800 dark:to-primary-dark/10">
      <div className="text-center px-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="w-32 h-32 mx-auto bg-gradient-to-tr from-primary to-secondary rounded-full flex items-center justify-center shadow-soft">
            <ApperIcon name="AlertCircle" className="w-16 h-16 text-white" />
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-6xl sm:text-8xl font-bold gradient-text mb-4">404</h1>
          <h2 className="text-2xl sm:text-3xl font-semibold text-surface-900 dark:text-white mb-4">
            Page Not Found
          </h2>
          <p className="text-surface-600 dark:text-surface-400 mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved to another location.
          </p>
          
          <Link to="/" className="btn-primary inline-flex items-center gap-2">
            <ApperIcon name="Home" className="w-5 h-5" />
            Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  )
}