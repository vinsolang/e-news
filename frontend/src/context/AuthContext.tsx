import axios from "axios";
import React, { createContext, useContext, useState } from "react"

const axiosClient = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});


// Add token to all requests
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
    return Promise.reject(error);
});

// Define a simple user type
interface UserType {
    id: number;
    name: string;
    email: string;
    // add other user fields as needed
}

interface AuthContextType {
  user: UserType | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  loginWithGoogle: () => void; // Changed to void as it causes a redirect
  loginWithFacebook: () => void; // Changed to void as it causes a redirect
  // NEW: Function to load auth data from URL (for socialite callback)
  loadAuthFromUrl: (token: string, userData: string) => void; 
}

// Initial value for context
const AuthContext = createContext<AuthContextType>(null!);

// Helper function to handle token and user data saving
const saveAuthData = (token: string, user: any) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user)); // Store user object
    return { token, user };
};

// Helper function to clear auth data
const clearAuthData = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return { token: null, user: null };
};

// Helper to get initial user state
const getInitialUser = (): UserType | null => {
    const userJson = localStorage.getItem("user");
    return userJson ? JSON.parse(userJson) : null;
};

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<UserType | null>(getInitialUser);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  // Helper for consistent error message extraction
  const extractErrorMessage = (error: any, defaultMessage: string) => {
    return error?.response?.data?.message ||
      Object.values(error?.response?.data?.errors || {}).flat()[0] ||
      defaultMessage;
  };
  
  // LOGIN (Standard)
  const login = async (email: string, password: string) => {
    try {
        const res = await axiosClient.post("/login", { email, password });
        const { token: newToken, user: newUser } = saveAuthData(res.data.token, res.data.user);
        setToken(newToken);
        setUser(newUser);
    } catch (error: any) {
        throw new Error(extractErrorMessage(error, "Login failed"));
    }
  };

  // REGISTER (Standard)
  const register = async (email: string, password: string, name: string) => {
    try {
        const res = await axiosClient.post("/register", { name, email, password });
        const { token: newToken, user: newUser } = saveAuthData(res.data.token, res.data.user);
        setToken(newToken);
        setUser(newUser);
    } catch (error: any) {
        throw new Error(extractErrorMessage(error, "Registration failed"));
    }
  };


  // LOGOUT
  const logout = async () => {
    try {
        // Send logout request only if token exists (prevents interceptor error)
        if (token) {
            await axiosClient.post("/logout");
        }
    } catch (error) {
        console.error("Logout failed on server, clearing client data anyway:", error);
    } finally {
        const { token: newToken, user: newUser } = clearAuthData();
        setToken(newToken);
        setUser(newUser);
    }
  };

  // NEW: GOOGLE LOGIN (Initiate Redirect)
  const loginWithGoogle = () => {
    // Redirect the user to the Laravel Socialite redirect route
    window.location.href = `${API_BASE_URL}/auth/google/redirect`; 
  };

  // NEW: FACEBOOK LOGIN (Initiate Redirect)
  const loginWithFacebook = () => {
    // Redirect the user to the Laravel Socialite redirect route
    window.location.href = `${API_BASE_URL}/auth/facebook/redirect`;
  };

  // NEW: Function to handle data from Socialite Callback URL
  const loadAuthFromUrl = (newToken: string, userData: string) => {
    try {
        // Parse the user data from the URL and save it
        const newUser = JSON.parse(decodeURIComponent(userData));
        saveAuthData(newToken, newUser);
        setToken(newToken);
        setUser(newUser);
    } catch (e) {
        console.error("Failed to parse user data from social login callback:", e);
        throw new Error("Social login failed: Invalid user data received.");
    }
  };

  return (
    <AuthContext.Provider 
        value={{ 
            user, 
            token, 
            login, 
            register, 
            logout, 
            loginWithGoogle, 
            loginWithFacebook,
            loadAuthFromUrl // Provide the new function
        }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);