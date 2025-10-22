import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  isAdmin?: boolean;
  premiumAccess?: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithFacebook: () => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const userData: User = {
        id: '1',
        email,
        name: email.split('@')[0],
        avatar: `https://api.dicebear.com/7.x/avatars/svg?seed=${email}`,
        isAdmin: email === 'admin@enews.com',
        premiumAccess: false
      };
      
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      throw new Error('Login failed');
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const userData: User = {
        id: '2',
        email: 'user@gmail.com',
        name: 'Google User',
        avatar: 'https://api.dicebear.com/7.x/avatars/svg?seed=google',
        premiumAccess: false
      };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } finally {
      setLoading(false);
    }
  };

  const loginWithFacebook = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const userData: User = {
        id: '3',
        email: 'user@facebook.com',
        name: 'Facebook User',
        avatar: 'https://api.dicebear.com/7.x/avatars/svg?seed=facebook',
        premiumAccess: false
      };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const userData: User = {
        id: '4',
        email,
        name,
        avatar: `https://api.dicebear.com/7.x/avatars/svg?seed=${email}`,
        premiumAccess: false
      };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      loginWithGoogle,
      loginWithFacebook,
      register,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};