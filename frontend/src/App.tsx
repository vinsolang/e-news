import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { useTheme } from './context/ThemeContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import NewsDetail from './pages/NewsDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLogin from './pages/admin/AdminLogin';
import CategoryNews from './pages/CategoryNews';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const { user, loading } = useAuth();
  const { isDark } = useTheme();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <Routes>
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
          <Route path="/*" element={
            <ProtectedRoute>
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/news/:id" element={<NewsDetail />} />
                  <Route path="/category/:category" element={<CategoryNews />} />
                  {/* <Route path="/movies" element={<Movies />} /> */}
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </Layout>
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </div>
  );
}

export default App;