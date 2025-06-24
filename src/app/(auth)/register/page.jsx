'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  validateEmail,
  validateFirstName,
  validateLastName,
  validatePassword,
  validateTelephone
} from '@/constants/utils';
import Input from '@/components/ui/input';
import { useAuth } from '../../../../context/AuthContext';
import { Button } from '@/components/ui/button';

export default function RegisterPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [telephone, setTelephone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState({
    email: '',
    telephone:'',
    password: '',
    firstName: '',
    lastName: ''
  });

  const { register, error: authError, loading, success } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const validationErrors = {
    //   firstName: validateFirstName(firstName),
    //   lastName: validateLastName(lastName),
    //   telephone:validateTelephone(telephone),
    //   email: validateEmail(email),
    //   password: validatePassword(password)
    // };

    // if (Object.values(validationErrors).some((error) => error !== '')) {
    //   setErrors(validationErrors);
    //   return;
    // }
    await register(firstName, lastName, email, password, telephone);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Зарегистрироваться</h1>

        {success && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
            Регистрация прошла успешно!
          </div>
        )}

        {authError && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {authError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Имя"
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            onBlur={() =>
              setErrors((prev) => ({
                ...prev,
                firstName: validateFirstName(firstName)
              }))
            }
            error={errors.firstName}
            placeholder="Введите ваше имя"
            required
          />

          <Input
            label="Фамилия"
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            onBlur={() =>
              setErrors((prev) => ({
                ...prev,
                lastName: validateLastName(lastName)
              }))
            }
            error={errors.lastName}
            placeholder="Введите вашу фамилию"
            required
          />

          <Input
            label="почта"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() =>
              setErrors((prev) => ({
                ...prev,
                email: validateEmail(email)
              }))
            }
            error={errors.email}
            placeholder="Введите ваш email"
            required
          />

             <Input
            label="Телефон"
            type="tel"
            id="telephone"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
            onBlur={() =>
              setErrors((prev) => ({
                ...prev,
                telephone: validateTelephone(telephone)
              }))
            }
            error={errors.email}
            placeholder="Введите ваш Телефон"
            required
          />

          <Input
            label="Пароль"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() =>
              setErrors((prev) => ({
                ...prev,
                password: validatePassword(password)
              }))
            }
            error={errors.password}
            placeholder="Введите пароль"
            required
          />

          <div>
            <Button type="submit" size="md" variant="primary" disabled={loading}>
              {loading ? 'Регистрация...' : 'Зарегистрироваться'}
            </Button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Уже есть аккаунт?{' '}
            <Link href="/login" className="text-primary-default hover:text-primary-dark">
              Войти
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
