'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PaymentSuccess() {
  const [countdown, setCountdown] = useState(5);
  const router = useRouter();

  useEffect(() => {
    if (countdown === 0) {
      router.push('/profile');
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6">
      <div className="max-w-md w-full bg-green-50 border border-green-200 rounded-lg shadow p-6 text-center">
        <h1 className="text-2xl font-bold text-green-700 mb-4">Payment Successful 🎉</h1>
        <p className="text-sm text-green-800 mb-2">
          Thank you! Your payment has been processed successfully.
        </p>
        <p className="text-sm text-gray-700">
          You will be redirected to your dashboard in <span className="font-semibold">{countdown}</span> seconds.
        </p>
      </div>
    </div>
  );
}
