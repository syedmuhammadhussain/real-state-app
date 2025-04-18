'use client';
import { useState } from 'react';
import Link from 'next/link';
import { validateEmail } from '@/constants/utils';
import Input from '@/components/ui/input';
import { useAuth } from '../../../../context/AuthContext';
import { Button } from '@/components/ui/button';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({ email: '' });
  const [success, setSuccess] = useState(false);
  const { loading, forgetPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailError = validateEmail(email);
    if (emailError) {
      setErrors({ email: emailError });
      return;
    }
    await forgetPassword(email)
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Forgot Password</h1>
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
            Remember your password?{' '}
            <Link href="/login" className="text-primary-default hover:text-primary-dark">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}