import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/Home'
import Home from './pages/Home'
import MessagesList from './components/MessagesList'
import NotFound from './pages/NotFound'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 via-white to-primary/5 dark:from-surface-900 dark:via-surface-800 dark:to-primary-dark/10">
      <Routes>
        <Route path="/" element={<Home />} />
<Route path="/" element={<Home />} />
        <Route path="/messages" element={<MessagesList />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="z-50"
        toastClassName="bg-white dark:bg-surface-800 text-surface-900 dark:text-white shadow-lg border border-surface-200 dark:border-surface-700"
      />
    </div>
  )
}

export default App