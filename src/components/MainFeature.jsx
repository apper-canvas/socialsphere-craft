import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import { formatDistanceToNow } from 'date-fns'
import ApperIcon from './ApperIcon'

export default function MainFeature() {
  const [posts, setPosts] = useState([
    {
      id: '1',
      author: {
        name: 'Alex Rivera',
        username: '@alexrivera',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        verified: true
      },
      content: 'Just shipped a new feature for our React app! The performance improvements are incredible. Sometimes the smallest optimizations make the biggest difference. 🚀',
      mediaUrls: ['https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop'],
      likes: ['user1', 'user2', 'user3'],
      comments: [
        {
          id: 'c1',
          author: { name: 'Sarah', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b68b12af?w=50&h=50&fit=crop&crop=face' },
          content: 'This looks amazing! Would love to learn more about the optimizations.',
          createdAt: new Date(Date.now() - 30 * 60 * 1000)
        }
      ],
      shares: 12,
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: '2',
      author: {
        name: 'Maya Chen',
        username: '@mayachen',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
        verified: false
      },
      content: 'Beautiful sunset from my weekend hike! Nature always puts things in perspective. Sometimes disconnecting is the best way to reconnect with yourself. 🌅',
      mediaUrls: ['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop'],
      likes: ['user1', 'user4'],
      comments: [],
      shares: 8,
      createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000)
    }
  ])

  const [newPost, setNewPost] = useState('')
  const [selectedImage, setSelectedImage] = useState(null)
  const [showComments, setShowComments] = useState({})
  const [newComment, setNewComment] = useState({})
  const fileInputRef = useRef(null)

  const handleCreatePost = (e) => {
    e.preventDefault()
    if (!newPost.trim() && !selectedImage) {
      toast.error('Please add some content to your post')
      return
    }

    const post = {
      id: Date.now().toString(),
      author: {
        name: 'You',
        username: '@you',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face',
        verified: false
      },
      content: newPost,
      mediaUrls: selectedImage ? [URL.createObjectURL(selectedImage)] : [],
      likes: [],
      comments: [],
      shares: 0,
      createdAt: new Date()
    }

    setPosts([post, ...posts])
    setNewPost('')
    setSelectedImage(null)
    toast.success('Post created successfully!')
  }

  const handleLike = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const isLiked = post.likes.includes('currentUser')
        return {
          ...post,
          likes: isLiked 
            ? post.likes.filter(id => id !== 'currentUser')
            : [...post.likes, 'currentUser']
        }
      }
      return post
    }))
  }

  const handleComment = (postId) => {
    const comment = newComment[postId]
    if (!comment?.trim()) return

    const newCommentObj = {
      id: Date.now().toString(),
      author: { 
        name: 'You', 
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop&crop=face' 
      },
      content: comment,
      createdAt: new Date()
    }

    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, newCommentObj]
        }
      }
      return post
    }))

    setNewComment({ ...newComment, [postId]: '' })
    toast.success('Comment added!')
  }

  const handleImageSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB')
        return
      }
      setSelectedImage(file)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Create Post */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="card p-6"
      >
        <div className="flex gap-4">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face"
            alt="Your avatar"
            className="w-12 h-12 rounded-xl object-cover"
          />
          <div className="flex-1">
            <form onSubmit={handleCreatePost} className="space-y-4">
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="What's happening in your world?"
                className="w-full p-4 bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                rows="3"
              />
              
              {selectedImage && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="relative"
                >
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="Selected"
                    className="w-full h-48 object-cover rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-2 right-2 w-8 h-8 bg-surface-900/80 text-white rounded-full flex items-center justify-center hover:bg-surface-900 transition-colors"
                  >
                    <ApperIcon name="X" className="w-4 h-4" />
                  </button>
                </motion.div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => fileInputRef.current?.click()}
                    className="social-button text-primary"
                  >
                    <ApperIcon name="Image" className="w-5 h-5" />
                    <span className="hidden sm:inline">Photo</span>
                  </motion.button>
                  
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="social-button text-primary"
                  >
                    <ApperIcon name="Smile" className="w-5 h-5" />
                    <span className="hidden sm:inline">Emoji</span>
                  </motion.button>
                  
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="social-button text-primary"
                  >
                    <ApperIcon name="MapPin" className="w-5 h-5" />
                    <span className="hidden sm:inline">Location</span>
                  </motion.button>
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={!newPost.trim() && !selectedImage}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ApperIcon name="Send" className="w-4 h-4 mr-2" />
                  Post
                </motion.button>
              </div>
            </form>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
            />
          </div>
        </div>
      </motion.div>

      {/* Posts Feed */}
      <AnimatePresence>
        {posts.map((post, index) => (
          <motion.article
            key={post.id}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ delay: index * 0.1 }}
            className="post-card"
          >
            {/* Post Header */}
            <div className="flex items-start gap-3 mb-4">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-12 h-12 rounded-xl object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-surface-900 dark:text-white">
                    {post.author.name}
                  </h3>
                  {post.author.verified && (
                    <ApperIcon name="BadgeCheck" className="w-5 h-5 text-primary" />
                  )}
                  <span className="text-surface-500 text-sm">{post.author.username}</span>
                  <span className="text-surface-400 text-sm">·</span>
                  <span className="text-surface-400 text-sm">
                    {formatDistanceToNow(post.createdAt, { addSuffix: true })}
                  </span>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="social-button p-2"
              >
                <ApperIcon name="MoreHorizontal" className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Post Content */}
            <div className="mb-4">
              <p className="text-surface-900 dark:text-white mb-3 leading-relaxed">
                {post.content}
              </p>
              {post.mediaUrls.length > 0 && (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="rounded-xl overflow-hidden shadow-soft"
                >
                  <img
                    src={post.mediaUrls[0]}
                    alt="Post media"
                    className="w-full h-64 sm:h-80 object-cover"
                  />
                </motion.div>
              )}
            </div>

            {/* Post Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-surface-100 dark:border-surface-700">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleLike(post.id)}
                className={`interaction-button ${
                  post.likes.includes('currentUser') ? 'text-secondary' : ''
                }`}
              >
                <ApperIcon 
                  name={post.likes.includes('currentUser') ? 'Heart' : 'Heart'} 
                  className={`w-5 h-5 ${post.likes.includes('currentUser') ? 'fill-current' : ''}`} 
                />
                <span>{post.likes.length}</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowComments({
                  ...showComments,
                  [post.id]: !showComments[post.id]
                })}
                className="interaction-button"
              >
                <ApperIcon name="MessageCircle" className="w-5 h-5" />
                <span>{post.comments.length}</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="interaction-button"
              >
                <ApperIcon name="Repeat2" className="w-5 h-5" />
                <span>{post.shares}</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="interaction-button"
              >
                <ApperIcon name="Share" className="w-5 h-5" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="interaction-button"
              >
                <ApperIcon name="Bookmark" className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Comments Section */}
            <AnimatePresence>
              {showComments[post.id] && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mt-4 pt-4 border-t border-surface-100 dark:border-surface-700"
                >
                  {/* Add Comment */}
                  <div className="flex gap-3 mb-4">
                    <img
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop&crop=face"
                      alt="Your avatar"
                      className="w-8 h-8 rounded-lg object-cover"
                    />
                    <div className="flex-1 flex gap-2">
                      <input
                        type="text"
                        value={newComment[post.id] || ''}
                        onChange={(e) => setNewComment({
                          ...newComment,
                          [post.id]: e.target.value
                        })}
                        placeholder="Write a comment..."
                        className="flex-1 px-3 py-2 bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleComment(post.id)
                          }
                        }}
                      />
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleComment(post.id)}
                        className="social-button px-3 py-2 text-primary"
                      >
                        <ApperIcon name="Send" className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>

                  {/* Comments List */}
                  <div className="space-y-3">
                    {post.comments.map((comment) => (
                      <motion.div
                        key={comment.id}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="flex gap-3"
                      >
                        <img
                          src={comment.author.avatar}
                          alt={comment.author.name}
                          className="w-8 h-8 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <div className="bg-surface-50 dark:bg-surface-700 rounded-lg px-3 py-2">
                            <p className="font-medium text-surface-900 dark:text-white text-sm">
                              {comment.author.name}
                            </p>
                            <p className="text-surface-700 dark:text-surface-300 text-sm">
                              {comment.content}
                            </p>
                          </div>
                          <div className="flex items-center gap-4 mt-1 text-xs text-surface-500">
                            <span>{formatDistanceToNow(comment.createdAt, { addSuffix: true })}</span>
                            <button className="hover:text-primary transition-colors">Like</button>
                            <button className="hover:text-primary transition-colors">Reply</button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.article>
        ))}
      </AnimatePresence>

      {/* Load More */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center py-8"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-secondary"
        >
          <ApperIcon name="RefreshCw" className="w-4 h-4 mr-2" />
          Load More Posts
        </motion.button>
      </motion.div>
    </div>
  )
}