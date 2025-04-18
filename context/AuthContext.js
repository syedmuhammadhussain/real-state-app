// context/AuthContext.tsx
'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(!!false);
  const [error, setError] = useState(null);
  const [success , setSuccess]= useState(false)
  const router = useRouter();
  // const token = localStorage.getItem('authToken');
 console.log('usercontext' , user)
  // initialize
  // const initializeAuth = async () => {
  //   if (token) {
  //     try {
  //       // Verify token validity with backend
  //       const { data } = await api.get('/users/me');
  //       setUser({ ...data, jwt: token });
  //     } catch (err) {
  //       localStorage.removeItem('authToken');
  //     }
  //   }
  //   setLoading(false);
  // };
  
  // initialize authentication 
  // useEffect(() => { initializeAuth() } ,[]);

  // login
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.post('/auth/local', { identifier: email, password });
      localStorage.setItem('authToken', data.jwt);
      // api.defaults.headers.common['Authorization'] = `Bearer ${data.jwt}`;
      setUser({
        userInfo : data.user,
        jwt:data.jwt
      });
      setSuccess(true)
      router.push('/');
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Login failed. Please check your credentials');
    } finally {
      setLoading(false);
    }
  };

  // registration
  const register = async (firstName, lastName, email, password) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.post('/auth/local/register', {
        username: `${firstName}_${lastName}`,
        email,
        password
      });
      localStorage.setItem('authToken', data.jwt);
      // api.defaults.headers.common['Authorization'] = `Bearer ${data.jwt}`;
      setUser({
        userInfo : data.user,
        jwt:data.jwt
      });
      setSuccess(true)
      router.push('/');
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Registration failed. Please try again');
    } finally {
      setLoading(false);
    }
  };

  const forgetPassword = async (email) => {
    try {
      await api.post('/auth/forgot-password', { email });
      setSuccess(true);
    } catch (error) {
      setError(prev => ({
        ...prev,
        server: error.response?.data?.message || 'Password reset failed. Please try again.'
      }));
    }
  }
  // logout
  const logout = () => {
    localStorage.removeItem('authToken');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout, forgetPassword, success }}>
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