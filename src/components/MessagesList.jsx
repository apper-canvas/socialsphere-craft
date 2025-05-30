import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'
import ChatThread from './ChatThread'
import { format } from 'date-fns'

export default function MessagesList() {
  const [selectedThread, setSelectedThread] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark')
    setIsDarkMode(isDark)
  }, [])

  // Mock message threads data
  const [messageThreads, setMessageThreads] = useState([
    {
      id: 1,
      participant: {
        name: 'Sarah Johnson',
        username: '@sarahj',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b68b12af?w=100&h=100&fit=crop&crop=face',
        isOnline: true
      },
      lastMessage: {
        text: 'Hey! How was your presentation today?',
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        isRead: false,
        senderId: 2
      },
      unreadCount: 2
    },
    {
      id: 2,
      participant: {
        name: 'Mike Chen',
        username: '@mikechen',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        isOnline: false,
        lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000)
      },
      lastMessage: {
        text: 'Thanks for the code review! 🙏',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        isRead: true,
        senderId: 1
      },
      unreadCount: 0
    },
    {
      id: 3,
      participant: {
        name: 'Emma Wilson',
        username: '@emmaw',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
        isOnline: true
      },
      lastMessage: {
        text: 'Can we schedule a call for tomorrow?',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        isRead: true,
        senderId: 2
      },
      unreadCount: 0
    },
    {
      id: 4,
      participant: {
        name: 'Alex Rodriguez',
        username: '@alexr',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        isOnline: false,
        lastSeen: new Date(Date.now() - 5 * 60 * 60 * 1000)
      },
      lastMessage: {
        text: 'Looking forward to the team meeting!',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        isRead: true,
        senderId: 2
      },
      unreadCount: 0
    }
  ])

  const filteredThreads = messageThreads.filter(thread =>
    thread.participant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    thread.participant.username.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleThreadSelect = (thread) => {
    setSelectedThread(thread)
    // Mark messages as read
    if (thread.unreadCount > 0) {
      setMessageThreads(prev =>
        prev.map(t =>
          t.id === thread.id
            ? { ...t, unreadCount: 0, lastMessage: { ...t.lastMessage, isRead: true } }
            : t
        )
      )
      toast.success(`Opened conversation with ${thread.participant.name}`)
    }
  }

  const handleNewMessage = (threadId, message) => {
    setMessageThreads(prev =>
      prev.map(thread =>
        thread.id === threadId
          ? {
              ...thread,
              lastMessage: {
                text: message.text,
                timestamp: message.timestamp,
                isRead: true,
                senderId: 1 // Current user
              }
            }
          : thread
      )
    )
    toast.success('Message sent!')
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    if (isDarkMode) {
      document.documentElement.classList.remove('dark')
    } else {
      document.documentElement.classList.add('dark')
    }
  }

  const formatMessageTime = (timestamp) => {
    const now = new Date()
    const messageTime = new Date(timestamp)
    const diffInHours = (now - messageTime) / (1000 * 60 * 60)
    
    if (diffInHours < 1) {
      return format(messageTime, 'HH:mm')
    } else if (diffInHours < 24) {
      return format(messageTime, 'HH:mm')
    } else if (diffInHours < 48) {
      return 'Yesterday'
    } else {
      return format(messageTime, 'MMM d')
    }
  }

  return (
    <div className="chat-container">
      {/* Header */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="chat-header"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.a
              href="/"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3"
            >
              <div className="w-8 h-8 bg-gradient-to-tr from-primary to-secondary rounded-lg flex items-center justify-center">
                <ApperIcon name="ArrowLeft" className="w-4 h-4 text-white" />
              </div>
            </motion.a>
            <h1 className="text-xl font-bold text-surface-900 dark:text-white">Messages</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleDarkMode}
              className="social-button p-2"
            >
              <ApperIcon name={isDarkMode ? 'Sun' : 'Moon'} className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => toast.info('New message feature coming soon!')}
              className="social-button p-2"
            >
              <ApperIcon name="Plus" className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </motion.header>

      <div className="flex flex-1 overflow-hidden">
        {/* Message Threads Sidebar */}
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className={`chat-sidebar ${selectedThread ? 'hidden lg:flex' : 'flex'}`}
        >
          {/* Search */}
          <div className="p-4 border-b border-surface-200 dark:border-surface-700">
            <div className="relative">
              <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-surface-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-surface-100 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          {/* Thread List */}
          <div className="flex-1 overflow-y-auto">
            <AnimatePresence>
              {filteredThreads.map((thread, index) => (
                <motion.div
                  key={thread.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleThreadSelect(thread)}
                  className={`message-thread-item ${selectedThread?.id === thread.id ? 'active' : ''}`}
                >
                  <div className="relative">
                    <img
                      src={thread.participant.avatar}
                      alt={thread.participant.name}
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                    <div className={thread.participant.isOnline ? 'online-indicator' : 'offline-indicator'}></div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium text-surface-900 dark:text-white truncate">
                        {thread.participant.name}
                      </p>
                      <span className="text-xs text-surface-500 dark:text-surface-400">
                        {formatMessageTime(thread.lastMessage.timestamp)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-surface-600 dark:text-surface-400 truncate">
                        {thread.lastMessage.text}
                      </p>
                      {thread.unreadCount > 0 && (
                        <span className="ml-2 bg-primary text-white text-xs px-2 py-1 rounded-full min-w-[20px] text-center">
                          {thread.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Chat Area */}
        <div className={`flex-1 ${selectedThread ? 'flex' : 'hidden lg:flex'} flex-col`}>
          {selectedThread ? (
            <ChatThread 
              thread={selectedThread} 
              onNewMessage={handleNewMessage}
              onBack={() => setSelectedThread(null)}
            />
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex-1 flex items-center justify-center bg-surface-50 dark:bg-surface-900"
            >
              <div className="text-center">
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ApperIcon name="MessageSquare" className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-surface-900 dark:text-white mb-2">
                  Select a conversation
                </h3>
                <p className="text-surface-600 dark:text-surface-400">
                  Choose from your existing conversations or start a new one
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}