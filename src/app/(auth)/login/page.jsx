'use client';

import { useState } from 'react';
import Link from 'next/link';
import { validateEmail, validatePassword } from '@/constants/utils';
import Input from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '../../../../context/AuthContext';
import NextLink from '@/components/ui/NextLink';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const { login, error: authError, loading , authLoading} = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      return;
    }
    await login(email, password);
  };

  return (
    <>
    <div className='px-2 mt-5 mb-5'>
     <Breadcrumbs
        items={[
          { key: "home", label: "Главная >", href: "/" },
        ]}
      />
    </div>
  
      <div className="min-h-screen px-3 flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <div className='flex items-center justify-center mb-6'>
            <NextLink href="/" >
               <span className="text-2xl font-semibold text-primary-dark"> Вход в KVKEY </span>   
            </NextLink>
          </div>
        {/* <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Вход</h1> */}

        {errors.server && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-sm">
            {errors.server}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 max-w-92">
          <Input
            label="Электронная почта"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setErrors({ ...errors, email: validateEmail(email) })}
            error={errors.email}
            placeholder="Введите ваш email"
            required
          />
          <Input
            label="Пароль"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => setErrors({ ...errors, password: validatePassword(password) })}
            placeholder="Введите пароль"
            required
            error={errors.password}
          />
          <div>
            <Button
              type="submit"
              size="md"
              variant="primary"
              disabled={authLoading}
            >
              {authLoading ? 'Обработка...' : 'Войти'}
            </Button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Нет аккаунта?{' '}
            <Link href="/register" className="text-primary-default hover:text-primary-dark">
              Зарегистрироваться
            </Link>
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Забыли пароль?{' '}
            <Link href="/forgot-password" className="text-primary-default hover:text-primary-dark">
              Восстановить
            </Link>
          </p>
        </div>
      </div>
    </div>
    </>
 
  );
}
