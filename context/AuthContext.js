// context/AuthContext.tsx
'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { ToastProvider } from '@/components/ui/toast';
import { toast } from '@/hooks/use-toast';

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(!!false);
  const [error, setError] = useState(null);
  const [success , setSuccess]= useState(false)
  
  const router = useRouter();
  // const token = localStorage.getItem('authToken');
// toast 


 console.log('usercontext' , user)
  // initialize
  const initializeAuth = async () => {
    if (token) {
      try {
        // Verify token validity with backend
        const { data } = await api.get('/users/me');
        setUser({ ...data, jwt: token });
      } catch (err) {
        localStorage.removeItem('authToken');
      }
    }
    setLoading(false);
  };
  
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
      toast({
        variant: 'success',
        title: 'Успешный вход',
        description: 'Вы успешно вошли в систему'
      });
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Login failed. Please check your credentials');
      toast({
        variant: 'destructive',
        title: 'Ошибка входа',
        description: 'Неверный email или пароль',
        // action: (
        //   <button 
        //     onClick={() => router.push('/login')}
        //     className="text-white underline"
        //   >
        //     Relogin
        //   </button>
        // )
      });
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
      toast({
        variant: 'success',
        title: 'Успешная регистрация',
        description: 'Аккаунт успешно создан'

      });
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Registration failed. Please try again');
      
      // toast 
      toast({
        variant: 'destructive',
        title: 'Ошибка регистрации',
        description: 'Не удалось создать аккаунт'
      });
    } finally {
      setLoading(false);
    }
  };

  // forget password 
  const forgetPassword = async (email) => {
    try {
      await api.post('/auth/forgot-password', { email });
      setSuccess(true);
      toast({
        variant: 'success',
        title: 'Запрос на сброс пароля',
        description: 'Инструкции отправлены на вашу почту'
      });
    } catch (error) {
      setError(prev => ({
        ...prev,
        server: error.response?.data?.message || 'Password reset failed. Please try again.'
      }));
      toast({
        variant: 'destructive',
        title: 'Ошибка отправки',
        description: 'Не удалось отправить инструкции на вашу почту'
      });
    }
  }
  
  // registration
   const resetPassword = async ( password, passwordConfirmation, code) => {
    setLoading(true);
    setError(null);
    if (password !== passwordConfirmation ) return 
    try {
      const { data } = await api.post('/auth/local/register', {
        password,
        passwordConfirmation,
        code
      });
      localStorage.setItem('authToken', data.jwt);
      // api.defaults.headers.common['Authorization'] = `Bearer ${data.jwt}`;
      setUser({
        userInfo : data.user,
        jwt:data.jwt
      });
      setSuccess(true)
      router.push('/');
      toast({
        variant: 'success',
        title: 'Пароль изменен',
        description: 'Пароль успешно обновлен'
      });
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Registration failed. Please try again');
      toast({
        variant: 'destructive',
        title: 'Ошибка изменения пароля',
        description: 'Произошла ошибка при изменении пароля'
      });
    } finally {
      setLoading(false);
      router.push('/');

    }
  };

  // logout
  const logout = () => {
    localStorage.removeItem('authToken');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
    window.location.href = '/login';
    toast({
      variant: 'success',
      title: 'Выход выполнен',
      description: 'Вы успешно вышли из системы'
    });
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register , resetPassword, logout, forgetPassword, success }}>
      <ToastProvider>
      {children}

      </ToastProvider>
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