import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [notifications, setNotifications] = useState(3)

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const navItems = [
    { icon: 'Home', label: 'Home', active: true },
    { icon: 'Search', label: 'Explore' },
    { icon: 'Bell', label: 'Notifications', badge: notifications },
    { icon: 'MessageSquare', label: 'Messages' },
    { icon: 'Bookmark', label: 'Saved' },
    { icon: 'User', label: 'Profile' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 via-white to-primary/5 dark:from-surface-900 dark:via-surface-800 dark:to-primary-dark/10">
      {/* Header */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-40 glass-card border-b border-surface-200/50 dark:border-surface-700/50"
      >
        <div className="container-custom py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div 
              className="flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-10 h-10 bg-gradient-to-tr from-primary to-secondary rounded-xl flex items-center justify-center shadow-soft">
                <ApperIcon name="Zap" className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold gradient-text hidden sm:block">
                SocialSphere
              </h1>
            </motion.div>

            {/* Search Bar - Hidden on mobile */}
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-surface-400" />
                <input
                  type="text"
                  placeholder="Search SocialSphere..."
                  className="w-full pl-10 pr-4 py-2 bg-surface-100/80 dark:bg-surface-800/80 border border-surface-200/50 dark:border-surface-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center gap-2 sm:gap-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="social-button p-2"
              >
                <ApperIcon name={isDarkMode ? 'Sun' : 'Moon'} className="w-5 h-5" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="social-button p-2 relative md:hidden"
              >
                <ApperIcon name="Search" className="w-5 h-5" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="social-button p-2 relative"
              >
                <ApperIcon name="Bell" className="w-5 h-5" />
                {notifications > 0 && (
                  <span className="notification-dot"></span>
                )}
              </motion.button>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-primary to-secondary shadow-soft cursor-pointer overflow-hidden"
              >
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="flex">
        {/* Sidebar Navigation - Hidden on mobile */}
        <motion.aside 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="hidden lg:block w-64 xl:w-72 fixed left-0 top-[73px] h-screen bg-white/50 dark:bg-surface-900/50 backdrop-blur-sm border-r border-surface-200/50 dark:border-surface-700/50 p-6"
        >
          <nav className="space-y-2">
            {navItems.map((item, index) => (
              <motion.a
                key={item.label}
                href="#"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 * index }}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 relative group ${
                  item.active 
                    ? 'bg-primary text-white shadow-soft' 
                    : 'text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-800'
                }`}
              >
                <ApperIcon name={item.icon} className="w-6 h-6" />
                <span className="font-medium">{item.label}</span>
                {item.badge && (
                  <span className="ml-auto bg-secondary text-white text-xs px-2 py-1 rounded-full">
                    {item.badge}
                  </span>
                )}
              </motion.a>
            ))}
          </nav>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 p-4 neu-card"
          >
            <h3 className="font-semibold text-surface-900 dark:text-white mb-2">Trending Topics</h3>
            <div className="space-y-2">
              {['#ReactJS', '#WebDev', '#AI', '#Design'].map((tag, index) => (
                <motion.span
                  key={tag}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mr-2 mb-2 hover:bg-primary/20 cursor-pointer transition-colors"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 xl:ml-72">
          <div className="container-custom py-6">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <MainFeature />
            </motion.div>
          </div>
        </main>

        {/* Right Sidebar - Hidden on mobile and tablet */}
        <motion.aside 
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="hidden xl:block w-80 fixed right-0 top-[73px] h-screen bg-white/50 dark:bg-surface-900/50 backdrop-blur-sm border-l border-surface-200/50 dark:border-surface-700/50 p-6"
        >
          {/* Suggested Connections */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="card p-6 mb-6"
          >
            <h3 className="font-semibold text-surface-900 dark:text-white mb-4">Suggested for you</h3>
            <div className="space-y-4">
              {[
                { name: 'Sarah Johnson', username: '@sarahj', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b68b12af?w=100&h=100&fit=crop&crop=face' },
                { name: 'Mike Chen', username: '@mikechen', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face' },
                { name: 'Emma Wilson', username: '@emmaw', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face' }
              ].map((user, index) => (
                <motion.div
                  key={user.username}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-surface-900 dark:text-white text-sm">{user.name}</p>
                    <p className="text-surface-500 text-xs">{user.username}</p>
                  </div>
                  <button className="btn-primary py-1 px-3 text-sm">Follow</button>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Active Stories */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="card p-6"
          >
            <h3 className="font-semibold text-surface-900 dark:text-white mb-4">Active Stories</h3>
            <div className="grid grid-cols-4 gap-3">
              {Array.from({ length: 8 }).map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.05 }}
                  className="story-circle hover:scale-105 transition-transform cursor-pointer"
                >
                  <div className="story-inner">
                    <img
                      src={`https://images.unsplash.com/photo-${1500000000000 + index * 100000000}?w=60&h=60&fit=crop&crop=face`}
                      alt="Story"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.aside>
      </div>

      {/* Mobile Bottom Navigation */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="lg:hidden fixed bottom-0 left-0 right-0 glass-card border-t border-surface-200/50 dark:border-surface-700/50 p-2"
      >
        <div className="flex items-center justify-around">
          {navItems.slice(0, 5).map((item) => (
            <motion.button
              key={item.label}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg relative ${
                item.active ? 'text-primary' : 'text-surface-600 dark:text-surface-400'
              }`}
            >
              <ApperIcon name={item.icon} className="w-6 h-6" />
              <span className="text-xs font-medium">{item.label}</span>
              {item.badge && (
                <span className="notification-dot"></span>
              )}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  )
}