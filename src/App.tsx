import { Routes, Route, useLocation } from 'react-router-dom'
import Layout from './Layout'
import ProtectedRoute from './components/ProtectedRoute'
import Home from '../Pages/Home'
import About from '../Pages/About'
import Projects from '../Pages/Projects'
import Questionnaire from '../Pages/Questionnaire'
import Donate from '../Pages/Donate'
import Contact from '../Pages/Contact'
import AdminDashboard from '../Pages/AdminDashboard'
import Login from '../Pages/Login'
import Signup from '../Pages/Signup'
import ForgotPassword from '../Pages/ForgotPassword'
import Profile from '../Pages/Profile'
import Terms from '../Pages/Terms'
import Privacy from '../Pages/Privacy'
import NotFound from '../Pages/NotFound'

function App() {
  const location = useLocation()
  
  // Get current page name from pathname
  const getPageName = (pathname: string): string => {
    if (pathname === '/') return 'Home'
    if (pathname === '/admin') return 'AdminDashboard'
    if (pathname === '/login' || pathname === '/signup' || pathname === '/forgot-password' || pathname === '/profile') {
      return pathname.slice(1).charAt(0).toUpperCase() + pathname.slice(2).replace(/-/g, ' ')
    }
    return pathname.slice(1).charAt(0).toUpperCase() + pathname.slice(2)
  }

  const currentPageName = getPageName(location.pathname)

  return (
    <Layout currentPageName={currentPageName}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/questionnaire" element={<Questionnaire />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  )
}

export default App

