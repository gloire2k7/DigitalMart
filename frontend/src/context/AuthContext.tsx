import { createContext, useState, useContext, ReactNode } from 'react';
import axios from 'axios';

interface AuthContextType {
  user: any | null;
  login: (formData: any) => Promise<void>;
  signup: (formData: any) => Promise<void>;
  logout: () => void;
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
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      console.log('Login successful:', userData);
    } catch (error) {
      console.error('Login error:', error);
      throw error; // Re-throw to be caught by the component
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
      // Optionally, handle success like showing a message or redirecting
    } catch (error) {
      console.error('Signup error:', error);
      throw error; // Re-throw to be caught by the component
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    console.log('User logged out');
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