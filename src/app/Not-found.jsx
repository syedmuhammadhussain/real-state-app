import { AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12 text-center bg-white dark:bg-background">
      <AlertTriangle className="w-20 h-20 text-primary-dark mb-6" />

      <h1 className="text-4xl md:text-5xl font-bold text-primary-dark">
        404 – Не найдено
      </h1>

      <p className="mt-4 text-lg text-primary-default max-w-md">
        Извините, мы не смогли найти запрошенный город. Пожалуйста, проверьте адрес или вернитесь на главную страницу.
      </p>

         <Link
        href="/"
        className="mt-8 inline-flex items-center px-6 py-3 bg-primary-default hover:bg-primary-dark text-white text-sm font-semibold rounded-xl shadow  transition"
      >
        На главную
      </Link>
    </div>
  );
}
