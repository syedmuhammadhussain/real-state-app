'use client';
import { useState } from 'react';
import Link from 'next/link';
import { validateEmail, validateFirstName, validateLastName, validatePassword, validateTelephone } from '@/constants/utils';
import Input from '@/components/ui/input';
import { useAuth } from '../../../../context/AuthContext';
import { Button } from '@/components/ui/button';

export default function ResetPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const [errors, setErrors] = useState({ 
    password: '', 
    passwordConfirmation: '', 
  });
  
  const { resetPassword, error: authError, loading, success } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {
      email: validatePassword(password),
      password: validatePassword(passwordConfirmation)
    };

    // if (Object.values(validationErrors).some(error => error !== '')) {
    //   setErrors(validationErrors);
    //   return;
    // }
    await resetPassword(password,passwordConfirmation);
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Register</h1>
        {success && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
            Registration successful! Please check your email to verify your account.
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label='Email'
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setErrors({ ...errors, email: validateEmail(email) })}
            error={errors.email}
            placeholder="Enter your email"
            required
          />
          <Input 
              label='Password'
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => setErrors({ ...errors, password: validatePassword(password) })}
              placeholder="Enter your password"
              required
              error={errors.password}
            />
        <Input 
            label='Password'
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => setErrors({ ...errors, password: validatePassword(passwordConfirmation) })}
            placeholder="Enter your password"
            required
            error={errors.password}
            />
          <div>
            <Button
              type="submit" 
              size='md'
              variant="primary"
              disabled={loading}
            >  
             {loading ? 'Processing...' : 'Reset Password'}
            </Button>
          </div>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="text-primary-default hover:text-primary-dark">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}