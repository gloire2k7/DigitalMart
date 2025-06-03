import { createContext, useState, useContext, ReactNode } from 'react';
import axios from 'axios';

interface AuthContextType {
  user: any | null;
  login: (formData: any) => Promise<void>;
  signup: (formData: any) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<any | null>(() => {
    // Get user from localStorage if available
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = async (formData: any) => {
    try {
      const response = await axios.post('http://localhost:8085/api/auth/signin', formData);
      const userData = response.data;
      
      // Store the token separately
      localStorage.setItem('token', userData.token);
      
      // Remove token from user data before storing
      const { token, ...userWithoutToken } = userData;
      setUser(userWithoutToken);
      localStorage.setItem('user', JSON.stringify(userWithoutToken));
      
      // Set the default authorization header for all future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      console.log('Login successful:', userWithoutToken);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const signup = async (formData: any) => {
    try {
      // Adjust role format for backend
      const signupData = {
        ...formData,
        role: formData.role.toUpperCase(), // Send role as a single uppercase string
      };
      const response = await axios.post('http://localhost:8085/api/auth/signup', signupData);
      console.log('Signup successful:', response.data);
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      // Call the backend signout endpoint
      await axios.post('http://localhost:8085/api/auth/signout');
      
      // Clear local state and storage
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      
      // Clear any auth headers from axios
      delete axios.defaults.headers.common['Authorization'];
      
      console.log('User logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      // Even if the backend call fails, we should still clear the local state
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 