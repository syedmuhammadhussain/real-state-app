import { Home, Heart, Shield, Users, Building, BadgeCheck } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'О компании | KVKEY',
  description: 'KVKEY — современная платформа для краткосрочной аренды недвижимости. Узнайте, кто мы и почему нам доверяют.',
  keywords: [
    'о компании KVKEY',
    'арендная платформа',
    'кто такие KVKEY',
    'аренда Россия',
    'платформа по аренде',
  ],
  openGraph: {
    title: 'О KVKEY',
    description: 'Мы — команда, которая упрощает аренду жилья по всей России. Платформа, которой доверяют.',
    url: 'https://kvkey.com/about',
    images: [
      {
        url: '/aboutUs.jpg',
        width: 1200,
        height: 630,
        alt: 'О платформе KVKEY',
      },
    ],
  },
};
export default function AboutUs() {
  return (
    <div className="">
      {/* Hero Section */}
      <section className="h-screen relative ">
        <Image
          src="/images/aboutUs.jpg"
          alt="Недвижимость премиум-класса"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/20 flex  flex-col items-center justify-center">
          <h1 className="font-bold text-white text-center px-4 text-3xl">
            <span className="text-primary-dark text-5xl">kvkey</span> — 
            Ваш эксперт в мире элитной недвижимости
          </h1>
          <p className="text-white text-center px-4 text-xl max-w-6xl">
        Поможем приобрести квартиру или дом вашей мечты
          </p>
        </div>
      </section>

      <div className="mx-auto px-4 py-16 max-w-7xl">
        {/* Stats Section */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { number: '13+', label: 'Лет на рынке' },
            { number: '50K+', label: 'Успешных сделок' },
            { number: '15', label: 'Городов присутствия' },
            { number: '98%', label: 'Довольных клиентов' }
          ].map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-dark mb-2">
                {stat.number}
              </div>
              <div className= "text-sm md:text-base text-primary-dark">{stat.label}</div>
            </div>
          ))}
        </section>

        {/* Values Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary-dark">
            <BadgeCheck className="w-12 h-12 inline-block mr-3 text-primary-default" />
            Наши принципы работы
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative aspect-square rounded-xl overflow-hidden">
              <video
                src="/images/vv.mp4"
                autoPlay
                alt="Наши ценности"
                className="object-contain "
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
                      <h3 className="text-xl md:text-3xlfont-bold mb-2 text-primary-dark">{value.title}</h3>
                      <p className="text-sm md:text-base text-primary-dark">{value.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary-dark">
            <Users className=" w-12 h-12  inline-block mr-3 text-primary-default" />
            Наша команда
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1,2,3,4].map((_, index) => (
              <div key={index} className="group relative overflow-hidden rounded-xl">
                <div className="aspect-square bg-gray-200 animate-pulse">
                  {/* Заменить на реальные изображения */}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent p-6 flex flex-col justify-end">
                  <h3 className="text-white text-xl font-bold mb-2">Иван Петров</h3>
                  <p className="text-sm md:text-base text-primary-dark">Старший риелтор</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary-default/10 rounded-xl p-8 md:p-16 text-center">
          <h2 className="text-3xl font-bold mb-6  text-primary-dark">
            Готовы найти свой идеальный дом?
          </h2>
          <p className=" text-primary-dark mb-8 max-w-2xl mx-auto">
            Оставьте заявку и получите персональную подборку объектов 
            уже через 24 часа
          </p>
          <Link
            href="/contact"
            className="bg-primary-default text-white px-4 py-2 rounded-xl hover:bg-primary-hover transition-all text-lg font-medium inline-flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            Получить консультацию
          </Link>
        </section>
      </div>
    </div>
  );
}