import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from './ApperIcon'
import MessageInput from './MessageInput'
import { format, isToday, isYesterday } from 'date-fns'

export default function ChatThread({ thread, onNewMessage, onBack }) {
  const messagesEndRef = useRef(null)
  const [isTyping, setIsTyping] = useState(false)

  // Mock messages for the selected thread
  const [messages, setMessages] = useState([
    {
      id: 1,
      senderId: 2,
      text: "Hey! How's the new project going?",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isRead: true
    },
    {
      id: 2,
      senderId: 1,
      text: "It's going great! Just finished the initial setup. Really excited about the tech stack we chose.",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000 + 5 * 60 * 1000),
      isRead: true
    },
    {
      id: 3,
      senderId: 2,
      text: "Awesome! React with Vite is such a great combo 🚀",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000 + 10 * 60 * 1000),
      isRead: true
    },
    {
      id: 4,
      senderId: 1,
      text: "Totally agree! The hot reload is so fast, and the build optimization is incredible.",
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      isRead: true
    },
    {
      id: 5,
      senderId: 2,
      text: "Hey! How was your presentation today?",
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      isRead: true
    }
  ])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (messageText) => {
    const newMessage = {
      id: Date.now(),
      senderId: 1, // Current user
      text: messageText,
      timestamp: new Date(),
      isRead: true
    }

    setMessages(prev => [...prev, newMessage])
    onNewMessage(thread.id, newMessage)

    // Simulate typing indicator and response
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      // Simulate a response (optional)
      if (Math.random() > 0.7) {
        const responses = [
          "Thanks for the message! 😊",
          "Got it, will check that out!",
          "Sounds good to me!",
          "Let me think about it and get back to you.",
          "That's a great idea!"
        ]
        const response = {
          id: Date.now() + 1,
          senderId: thread.participant.id || 2,
          text: responses[Math.floor(Math.random() * responses.length)],
          timestamp: new Date(Date.now() + 2000),
          isRead: false
        }
        setTimeout(() => {
          setMessages(prev => [...prev, response])
        }, 2000)
      }
    }, 2000)
  }

  const formatMessageDate = (timestamp) => {
    if (isToday(timestamp)) {
      return 'Today'
    } else if (isYesterday(timestamp)) {
      return 'Yesterday'
    } else {
      return format(timestamp, 'MMM d, yyyy')
    }
  }

  const formatMessageTime = (timestamp) => {
    return format(timestamp, 'HH:mm')
  }

  const groupMessagesByDate = (messages) => {
    const groups = {}
    messages.forEach(message => {
      const dateKey = format(message.timestamp, 'yyyy-MM-dd')
      if (!groups[dateKey]) {
        groups[dateKey] = []
      }
      groups[dateKey].push(message)
    })
    return groups
  }

  const groupedMessages = groupMessagesByDate(messages)

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="chat-header"
      >
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onBack}
            className="lg:hidden social-button p-2"
          >
            <ApperIcon name="ArrowLeft" className="w-4 h-4" />
          </motion.button>
          
          <div className="relative">
            <img
              src={thread.participant.avatar}
              alt={thread.participant.name}
              className="w-10 h-10 rounded-xl object-cover"
            />
            <div className={thread.participant.isOnline ? 'online-indicator' : 'offline-indicator'}></div>
          </div>
          
          <div className="flex-1">
            <h2 className="font-semibold text-surface-900 dark:text-white">
              {thread.participant.name}
            </h2>
            <p className="text-sm text-surface-500 dark:text-surface-400">
              {thread.participant.isOnline 
                ? 'Active now' 
                : `Last seen ${format(thread.participant.lastSeen || new Date(), 'MMM d, HH:mm')}`
              }
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="social-button p-2"
            >
              <ApperIcon name="Phone" className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="social-button p-2"
            >
              <ApperIcon name="Video" className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="social-button p-2"
            >
              <ApperIcon name="MoreVertical" className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Messages Area */}
      <div className="chat-messages">
        <AnimatePresence>
          {Object.entries(groupedMessages).map(([dateKey, dayMessages]) => (
            <div key={dateKey}>
              {/* Date Separator */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-center mb-4"
              >
                <span className="bg-surface-200 dark:bg-surface-700 text-surface-600 dark:text-surface-400 px-3 py-1 rounded-full text-xs font-medium">
                  {formatMessageDate(new Date(dateKey))}
                </span>
              </motion.div>

              {/* Messages for this date */}
              {dayMessages.map((message, index) => {
                const isCurrentUser = message.senderId === 1
                const isLastInGroup = index === dayMessages.length - 1 || 
                  dayMessages[index + 1]?.senderId !== message.senderId

                return (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`message-group ${isCurrentUser ? 'sent' : 'received'} mb-2`}
                  >
                    <div className={`message-bubble ${isCurrentUser ? 'sent' : 'received'}`}>
                      <p className="text-sm">{message.text}</p>
                    </div>
                    {isLastInGroup && (
                      <div className={`message-timestamp ${isCurrentUser ? 'text-right' : 'text-left'}`}>
                        {formatMessageTime(message.timestamp)}
                        {isCurrentUser && (
                          <ApperIcon 
                            name={message.isRead ? "CheckCheck" : "Check"} 
                            className={`inline w-3 h-3 ml-1 ${message.isRead ? 'text-primary' : 'text-surface-400'}`} 
                          />
                        )}
                      </div>
                    )}
                  </motion.div>
                )
              })}
            </div>
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        <AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="message-group received"
            >
              <div className="typing-indicator">
                <img
                  src={thread.participant.avatar}
                  alt={thread.participant.name}
                  className="w-6 h-6 rounded-full mr-2"
                />
                <span className="text-sm">{thread.participant.name} is typing</span>
                <div className="typing-dots ml-2">
                  <div className="typing-dot"></div>
                  <div className="typing-dot" style={{ animationDelay: '0.2s' }}></div>
                  <div className="typing-dot" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="chat-input-area"
      >
        <MessageInput onSendMessage={handleSendMessage} />
      </motion.div>
    </div>
  )
}