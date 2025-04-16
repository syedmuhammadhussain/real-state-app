'use client';
import { useState } from 'react';
import Link from 'next/link';
import { validateEmail, validatePassword } from '@/constants/utils';
import Input from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({email : '' , password :''})
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      return;
    }

    // Clear errors and proceed with login
    setErrors({});
    console.log('Login attempt:', { email, password });
    router.push('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-6 max-w-92">
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
          <div>
             <Button 
              type="submit" 
              size='md'
              variant="primary">  
                Login
              </Button> 
              {/* <Button variant="secondary">Sign Up</Button>
              <Button variant="outline">More Info</Button>
              <Button variant="destructive">Delete</Button>
              <Button variant="ghost">Skip</Button>
              <Button variant="line">Learn More</Button> */}
        
          </div>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Do not have an account?{' '}
            <Link href="/register" className="text-blue-500 hover:text-blue-600">
              Register here
            </Link>
          </p>

          <p className="text-sm text-gray-600 mt-2">
            Forgot your password?{' '}
            <Link href="/forgot-password" className="text-blue-500 hover:text-blue-600">
              Reset it here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}