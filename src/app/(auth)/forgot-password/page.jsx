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

  // AFTER TRUE
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const {  forgetPassword, resetPassword, error: authError, loading, success } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailError = validateEmail(email);
    if (emailError) {
      setErrors({ email: emailError });
      return;
    }
    await forgetPassword(email)    
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
    await resetPassword(password,passwordConfirmation,code);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {!success ?   
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
      :
        <div className="w-full flex items-center justify-center bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            {/* <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Enter your code which you get in your email </h1> */}
            <form onSubmit={handleSubmitNewPassword} className="space-y-6">
              <Input
                label='Code'
                type="text"
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                // onBlur={() => setErrors({ ...errors, email: validate(code) })}
                error={errors.email}
                placeholder="Enter Your Code"
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
                label='Comfirmation Password'
                type="password"
                id="password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                onBlur={() => setErrors({ ...errors, password: validateConfirmationPassword(passwordConfirmation,password) })}
                placeholder="Rewrite the same password"
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
                Remember password my account?{' '}
                <Link href="/login" className="text-primary-default hover:text-primary-dark">
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </div>
      }
    </div>
  );
}