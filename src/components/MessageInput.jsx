import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import ApperIcon from './ApperIcon'

export default function MessageInput({ onSendMessage }) {
  const [message, setMessage] = useState('')
  const [isEmojiOpen, setIsEmojiOpen] = useState(false)
  const textareaRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (message.trim()) {
      onSendMessage(message.trim())
      setMessage('')
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'
      }
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const handleTextareaChange = (e) => {
    setMessage(e.target.value)
    
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`
    }
  }

  const commonEmojis = ['😊', '😂', '❤️', '👍', '👎', '😢', '😮', '😡', '🔥', '💯', '🎉', '👏']

  const insertEmoji = (emoji) => {
    setMessage(prev => prev + emoji)
    setIsEmojiOpen(false)
    textareaRef.current?.focus()
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="flex items-end gap-3">
        {/* Attachment Button */}
        <motion.button
          type="button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="social-button p-3 mb-1"
        >
          <ApperIcon name="Paperclip" className="w-5 h-5" />
        </motion.button>

        {/* Message Input Area */}
        <div className="flex-1 relative">
          <div className="flex items-end bg-surface-100 dark:bg-surface-700 rounded-2xl border border-surface-200 dark:border-surface-600 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all duration-200">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={handleTextareaChange}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="flex-1 resize-none bg-transparent px-4 py-3 focus:outline-none text-surface-900 dark:text-white placeholder-surface-500 dark:placeholder-surface-400 min-h-[48px] max-h-[120px]"
              rows={1}
            />
            
            <div className="flex items-center gap-1 px-2 pb-3">
              {/* Emoji Button */}
              <div className="relative">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsEmojiOpen(!isEmojiOpen)}
                  className="p-1.5 rounded-lg hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
                >
                  <ApperIcon name="Smile" className="w-5 h-5 text-surface-500 dark:text-surface-400" />
                </motion.button>

                {/* Emoji Picker */}
                {isEmojiOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    className="absolute bottom-full right-0 mb-2 bg-white dark:bg-surface-800 rounded-xl shadow-lg border border-surface-200 dark:border-surface-700 p-3 z-10"
                  >
                    <div className="grid grid-cols-6 gap-2">
                      {commonEmojis.map((emoji, index) => (
                        <motion.button
                          key={index}
                          type="button"
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => insertEmoji(emoji)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-surface-100 dark:hover:bg-surface-700 rounded-lg transition-colors text-lg"
                        >
                          {emoji}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Camera Button */}
              <motion.button
                type="button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-1.5 rounded-lg hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
              >
                <ApperIcon name="Camera" className="w-5 h-5 text-surface-500 dark:text-surface-400" />
              </motion.button>

              {/* Microphone Button */}
              <motion.button
                type="button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-1.5 rounded-lg hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
              >
                <ApperIcon name="Mic" className="w-5 h-5 text-surface-500 dark:text-surface-400" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Send Button */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={!message.trim()}
          className={`p-3 rounded-xl transition-all duration-200 ${
            message.trim()
              ? 'bg-primary hover:bg-primary-dark text-white shadow-soft'
              : 'bg-surface-200 dark:bg-surface-700 text-surface-400 dark:text-surface-500 cursor-not-allowed'
          }`}
        >
          <ApperIcon name="Send" className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Click outside to close emoji picker */}
      {isEmojiOpen && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setIsEmojiOpen(false)}
        />
      )}
    </form>
  )
}