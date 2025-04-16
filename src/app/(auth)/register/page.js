'use client';
import { useState } from 'react';
import Link from 'next/link';
import { validateEmail, validateFirstName, validateLastName, validatePassword, validateTelephone } from '@/constants/utils';
import Input from '@/components/ui/input';

export default function RegisterPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({email : '' , password :'', firstName : '' , lastName :'' , telephone:''})


  const handleSubmit = (e) => {
    e.preventDefault();

    const firstNameError = validateFirstName(firstName);
    const lastNameError = validateLastName(lastName);
    const telephoneError = validateTelephone(telephone);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);


    if (firstNameError || lastNameError || telephoneError  || emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      return;
    }

    // Clear errors and proceed with login
    setErrors({});
    console.log('Login attempt:', { email, password ,firstNameError,lastNameError, telephoneError, });
    // Add your registration logic here (e.g., API call to create a new user)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Register</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label='First Name'
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            onBlur={() => setErrors({ ...errors, firstName: validateFirstName(firstName) })}
            error={errors.firstName}
            placeholder="Enter your email"
            required
          />
          <Input
            label='Last Name'
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            onBlur={() => setErrors({ ...errors, lastName: validateLastName(lastName) })}
            error={errors.lastName}
            placeholder="Enter your email"
            required
          />
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
              label='Telephone'
              type="tel"
              id="telephone"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              onBlur={() => setErrors({ ...errors, telephone: validateTelephone(telephone) })}
              placeholder="Enter your password"
              required
              error={errors.telephone}
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
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Register
            </button>
          </div>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-500 hover:text-blue-600">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}