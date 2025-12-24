import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Use useNavigate for a better flow
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react'; 
import { useAuth } from '../context/AuthContext';
import Logo from '../assets/image/eNews.png'; // Assuming this path is correct

// ... (GoogleIcon and FacebookIcon components remain the same) ...
const GoogleIcon = () => (
    <svg fill="currentColor" viewBox="0 0 24 24" className="h-5 w-5 mr-2">
        <path d="M22.56 12.25c0-.62-.05-1.22-.16-1.79H12v3.66h5.8c-.25 1.4-1.12 2.59-2.58 3.37v2.96h3.81c2.23-2.05 3.52-5.02 3.52-8.2z" fill="#4285F4"></path>
        <path d="M12 23c3.2 0 5.86-1.07 7.81-2.91l-3.81-2.96c-1.05.7-2.38 1.11-3.99 1.11-3.07 0-5.69-2.07-6.63-4.85h-3.9v3.05c1.9 3.73 5.7 6.27 10.53 6.27z" fill="#34A853"></path>
        <path d="M5.37 13.91c-.26-.74-.41-1.55-.41-2.37s.15-1.63.41-2.37V5.42h-3.9c-.83 1.64-1.32 3.53-1.32 5.58 0 2.05.49 3.94 1.32 5.58l3.9-3.05z" fill="#FBBC05"></path>
        <path d="M12 4.16c1.78 0 3.39.61 4.67 1.81l3.37-3.37C17.86.87 15.2.25 12 .25c-4.83 0-8.63 2.54-10.53 6.27l3.9 3.05c.94-2.78 3.56-4.85 6.63-4.85z" fill="#EA4335"></path>
    </svg>
);
const FacebookIcon = () => (
    <svg fill="currentColor" viewBox="0 0 24 24" className="h-5 w-5 mr-2">
        <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.0267 5.7201 21.1257 10.5001 21.9351V14.8981H7.9001V12.0001H10.5001V9.7571C10.5001 7.1811 12.0001 5.7531 14.3941 5.7531C15.5171 5.7531 16.7141 5.9521 16.7141 5.9521V8.4731H15.4291C14.1661 8.4731 13.7661 9.2431 13.7661 10.0461V12.0001H16.6341L16.1771 14.8981H13.7661V21.9351C18.5461 21.1257 22.2661 17.0267 22.2661 12.0001H22Z" fill="#1877F2"></path>
    </svg>
);
// ...

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate(); // Hook for navigation

  const { login, register, loginWithGoogle, loginWithFacebook, user } = useAuth();
  
  // Optional: Redirect if already authenticated
  // useEffect(() => {
  //   if (user) {
  //     navigate('/dashboard'); 
  //   }
  // }, [user, navigate]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        await register(formData.email, formData.password, formData.name);
      }
      // On successful login/register, the user state is set, which
      // you can use in a useEffect hook to redirect (e.g., to /dashboard)
    } catch (err) {
      // Assuming your error handling in AuthContext throws an Error object
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider: 'google' | 'facebook') => {
    setLoading(true);
    setError('');
    
    // We don't need a try/catch here because these functions only trigger a redirect
    if (provider === 'google') {
      loginWithGoogle(); 
    } else if (provider === 'facebook') {
      loginWithFacebook(); 
    }
    // Note: The loading state will be lost on redirect. It's only for visual feedback.
    // The actual login success/failure will be handled by the callback component.
  };

  return (
    // ... (rest of the component JSX remains the same) ...
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          {/* ... (Logo and Headings) ... */}
           <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center space-x-2">
              <img src={Logo} alt="eNews Logo" className='w-45 h-45'/>
            </Link>
            <h2 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">
              {isLogin ? 'Welcome back' : 'Create your account'}
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {isLogin ? 'Sign in to access premium content' : 'Join our community of readers'}
            </p>
          </div>
          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label htmlFor="name" className="sr-only">Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required={!isLogin}
                    value={formData.name}
                    onChange={handleChange}
                    className="pl-10 block w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-3 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Full name"
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10 block w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-3 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Email address"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  minLength={8} 
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-10 pr-10 block w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-3 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                isLogin ? 'Sign in' : 'Sign up'
              )}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">Or continue with</span>
              </div>
            </div>
          </div>
          
          {/* Social Login Buttons */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              onClick={() => handleSocialLogin('google')}
              disabled={loading}
              className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600 disabled:opacity-50 transition-colors"
            >
              <GoogleIcon />
              Google
            </button>
            <button
              onClick={() => handleSocialLogin('facebook')}
              disabled={loading}
              className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600 disabled:opacity-50 transition-colors"
            >
              <FacebookIcon />
              Facebook
            </button>
          </div>

          <div className="mt-6 text-center">
            <button
              type="button" 
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
            >
              {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}