import { Home, Heart, Shield, Users, Building, BadgeCheck } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'О компании XRAL State',
  description: 'Профессиональные риелторские услуги премиум-класса',
  openGraph: {
    images: [{ url: '/images/og-about.jpg' }]
  },
};

export default function AboutUs() {
  return (
    <div className="">
      {/* Hero Section */}
      <div className="relative h-96 md:h-[500px]">
        <Image
          src="/images/about-hero.jpg"
          alt="Недвижимость премиум-класса"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="font-bold text-white text-center px-4">
            <span className="text-primary-default">XRAL State</span> — 
            Ваш эксперт в мире элитной недвижимости
          </h1>
        </div>
      </div>

      <div className="mx-auto px-4 py-16">
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { number: '13+', label: 'Лет на рынке' },
            { number: '50K+', label: 'Успешных сделок' },
            { number: '15', label: 'Городов присутствия' },
            { number: '98%', label: 'Довольных клиентов' }
          ].map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-default mb-2">
                {stat.number}
              </div>
              <div className="text-textColor-muted">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Values Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">
            <BadgeCheck className="inline-block mr-3 text-primary-default" />
            Наши принципы работы
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative h-96 rounded-lg overflow-hidden">
              <Image
                src="/images/bag.png"
                alt="Наши ценности"
                fill
                className="object-cover"
              />
            </div>

            <div className="grid grid-cols-1 gap-6">
              {[
                { icon: <Shield size={32} />, title: "Полная безопасность", 
                  text: "Юридическое сопровождение каждой сделки" },
                { icon: <Users size={32} />, title: "Индивидуальный подход",
                  text: "Персональный менеджер для каждого клиента" },
                { icon: <Building size={32} />, title: "Экспертная оценка",
                  text: "Анализ рынка и прогнозирование стоимости" },
                { icon: <Heart size={32} />, title: "Конфиденциальность",
                  text: "Гарантия приватности всех условий сделки" }
              ].map((value, index) => (
                <div key={index} className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="text-primary-default">{value.icon}</div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                      <p className="text-textColor-muted">{value.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">
            <Users className="inline-block mr-3 text-primary-default" />
            Наша команда
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1,2,3,4].map((_, index) => (
              <div key={index} className="group relative overflow-hidden rounded-2xl">
                <div className="aspect-square bg-gray-200 animate-pulse">
                  {/* Заменить на реальные изображения */}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent p-6 flex flex-col justify-end">
                  <h3 className="text-white text-xl font-bold mb-2">Иван Петров</h3>
                  <p className="text-gray-300">Старший риелтор</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary-default/10 rounded-2xl p-8 md:p-16 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Готовы найти свой идеальный дом?
          </h2>
          <p className="text-textColor-muted mb-8 max-w-2xl mx-auto">
            Оставьте заявку и получите персональную подборку объектов 
            уже через 24 часа
          </p>
          <Link
            href="/contact"
            className="bg-primary-default text-white px-8 py-4 rounded-lg hover:bg-primary-hover transition-all text-lg font-medium inline-flex items-center gap-2"
          >
            <Home className="w-6 h-6" />
            Получить консультацию
          </Link>
        </section>
      </div>
    </div>
  );
}