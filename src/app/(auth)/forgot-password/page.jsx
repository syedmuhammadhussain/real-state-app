'use client';

import { useState } from 'react';
import Link from 'next/link';
import { validateConfirmationPassword, validateEmail, validatePassword } from '@/constants/utils';
import Input from '@/components/ui/input';
import { useAuth } from '../../../../context/AuthContext';
import { Button } from '@/components/ui/button';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({ email: '' });
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const { forgetPassword, resetPassword, error: authError, loading, success } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailError = validateEmail(email);
    if (emailError) {
      setErrors({ email: emailError });
      return;
    }
    await forgetPassword(email);
  };

  const handleSubmitNewPassword = async (e) => {
    e.preventDefault();
    const validationErrors = {
      password: validatePassword(password),
      passwordConfirmation: validateConfirmationPassword(passwordConfirmation)
    };

    // if (Object.values(validationErrors).some(error => error !== '')) {
    //   setErrors(validationErrors);
    //   return;
    // }

    await resetPassword(password, passwordConfirmation, code);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {!success ? (
        <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Забыли пароль</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
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
            <div>
              <Button
                type="submit"
                size="md"
                variant="primary"
                disabled={loading}
              >
                {loading ? 'Обработка...' : 'Сбросить пароль'}
              </Button>
            </div>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Вспомнили пароль?{' '}
              <Link href="/login" className="text-primary-default hover:text-primary-dark">
                Войти
              </Link>
            </p>
          </div>
        </div>
      ) : (
        <div className="w-full flex items-center justify-center bg-gray-100">
          <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
            <form onSubmit={handleSubmitNewPassword} className="space-y-6">
              <Input
                label="Код"
                type="text"
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Введите код из email"
                required
              />
              <Input
                label="Новый пароль"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => setErrors({ ...errors, password: validatePassword(password) })}
                placeholder="Введите новый пароль"
                required
                error={errors.password}
              />
              <Input
                label="Подтверждение пароля"
                type="password"
                id="passwordConfirmation"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                onBlur={() => setErrors({
                  ...errors,
                  passwordConfirmation: validateConfirmationPassword(passwordConfirmation, password)
                })}
                placeholder="Повторите пароль"
                required
                error={errors.password}
              />
              <div>
                <Button
                  type="submit"
                  size="md"
                  variant="primary"
                  disabled={loading}
                >
                  {loading ? 'Обработка...' : 'Сменить пароль'}
                </Button>
              </div>
            </form>
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Вспомнили пароль?{' '}
                <Link href="/login" className="text-primary-default hover:text-primary-dark">
                  Войти
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
