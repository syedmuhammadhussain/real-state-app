'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { ToastProvider } from '@/components/ui/toast';
import { toast } from '@/hooks/use-toast';
import { usePathname } from 'next/navigation'

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(!!false);
  const [error, setError] = useState(null);
  const [success , setSuccess]= useState(false)
 
  const pathname = usePathname()
  const router = useRouter();

  // const token = localStorage.getItem('authToken') ?? '' 
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  // initialize
  const initializeAuth =() => {
  return new Promise(async (resolve, reject) => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const { data } = await api.get(`${apiUrl}/users/me?populate=*`,{
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setUser({ ...data, jwt: token });
          setSuccess(true)
          resolve(true)
        } catch (err) {
          setSuccess(false)
          reject(false)
        }
      }
    
      setAuthLoading(false);
  })};

  // controlling initializeAuth
  const controlAuthIntialize = async () => await  initializeAuth() 
  useEffect(() => {controlAuthIntialize()  }, []);

  // login
  const login = async (email, password) => {
    setAuthLoading(true);
    setError(null);
    try {
      const { data } = await api.post(`${apiUrl}/auth/local`, 
        { identifier: email, password },
     );
      localStorage.setItem('authToken', data.jwt);
      initializeAuth()
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
      setAuthLoading(false);
    }
  };

  // registration
  const register = async (firstName, lastName, email, password, phone) => {
    debugger
    setAuthLoading(true);
    setError(null);
    try {
      const { data } = await api.post(`${apiUrl}/auth/local/register`, {
        username: `${firstName}_${lastName}`,
        email,
        password,
        phone,
        "roleName": "agent"
      });
      localStorage.setItem('authToken', data.jwt);
      // api.defaults.headers.common['Authorization'] = `Bearer ${data.jwt}`;
      initializeAuth()
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
      setAuthLoading(false);
    }
  };

  // forget password 
  const forgetPassword = async (email) => {
    try {
      await api.post(`${apiUrl}/auth/forgot-password`, { email });
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
    setAuthLoading(true);
    setError(null);
    if (password !== passwordConfirmation ) return 
    try {
      const { data } = await api.post(`${apiUrl}/auth/reset-password`, {
        password,
        passwordConfirmation,
        code
      });
      localStorage.setItem('authToken', data.jwt);
      initializeAuth()
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
      setAuthLoading(false);
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

  // editUser editUser 
  const editUser = async (data) => {
    const token = localStorage.getItem('authToken'); 

      try {
        await api.put(
          `${apiUrl}/user/me`,
            data,
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
        );
        setSuccess(true);
      initializeAuth()

        toast({
          variant: 'success',
          title: 'Профиль обновлён',
          description: 'Ваши данные были успешно сохранены'
        });
      } catch (error) {
        setError(prev => ({
          ...prev,
          server: error.response?.data?.message || 'Не удалось обновить данные. Пожалуйста, попробуйте снова.'
        }));
        toast({
          variant: 'destructive',
          title: 'Ошибка обновления',
          description: 'Не удалось сохранить изменения профиля'
        });
      }
  };
    
  return (
    <AuthContext.Provider value={{initializeAuth ,user, authLoading, error, login, register , resetPassword, logout, forgetPassword, success, editUser }}>
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