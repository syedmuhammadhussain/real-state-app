import { Button } from '@/components/ui/button';
import Input from '@/components/ui/input';
import { Home, Search, Shield, Phone, MapPin, Send } from 'lucide-react';
import Image from 'next/image';

export const metadata = {
  title: 'Контакты - kvkey',
  description: 'Свяжитесь с нами для консультации по недвижимости, подбора объекта и юридической поддержки',
  keywords: 'контакты риелтора, подбор недвижимости, юридическая поддержка, консультация по недвижимости',
  openGraph: {
    title: 'Контакты - kvkey',
    description: 'Профессиональные консультации по недвижимости',
    images: [{ url: '/images/contact-bg.jpg' }],
  },
};

export default function ContactUs() {
  return (
    <>
      {/* Заголовок */}

       {/* Hero Section */}
       <section className="h-screen relative ">
        <Image
          src="/images/contactUs.jpg"
          alt="Недвижимость премиум-класса"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center">
          <h1 className="font-bold text-white text-center text-3xl px-4">
            <span className="text-primary-dark text-5xl">kvkey</span> — 
          Консультация по недвижимости
          </h1>
          <p className="text-white text-center px-4 text-xl max-w-6xl">
        ваш надежный партнер на рынке недвижимости. Наши эксперты с многолетним опытом готовы предоставить комплексные консультации по покупке
          </p>
        </div>
      </section>
     
      {/* Введение */}
     

      {/* Способы связи */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 px-3 lg:px-4 max-w-7xl mx-auto">
        {[
          { 
            icon: <Home className="w-8 h-8 mx-auto text-primary-default" />, 
            title: "Консультация", 
            text: "Персональный подбор недвижимости", 
            email: "info@xralstate.ru" 
          },
          { 
            icon: <Search className="w-8 h-8 mx-auto text-primary-default" />, 
            title: "Подбор объекта", 
            text: "Найдем идеальный вариант по вашим критериям", 
            email: "select@xralstate.ru" 
          },
          { 
            icon: <Shield className="w-8 h-8 mx-auto text-primary-default" />, 
            title: "Юридическая поддержка", 
            text: "Полное сопровождение сделок", 
            email: "legal@xralstate.ru" 
          },
        ].map((item, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-xl transition-all duration-300">
            {item.icon}
            <h3 className="text-xl font-bold mb-2 text-primary-dark">{item.title}</h3>
            <p className="text-sm md:text-base text-primary-dark mb-4">{item.text}</p>
            <a
              href={`mailto:${item.email}`}
              className="text-primary-default hover:text-primary-hover transition-all duration-300"
            >
              {item.email}
            </a>
          </div>
        ))}
      </div>

      {/* Форма обратной связи */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-primary-default flex items-center justify-center">
          <Phone className="w-6 h-6 mr-2 text-primary-dark" /> Написать нам
        </h2>
        <form className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {[
              { label: "Имя", type: "text", id: "firstName", placeholder: "Ваше имя" },
              { label: "Email", type: "email", id: "email", placeholder: "Ваш email" },
            ].map((input, index) => (
              <div key={index}>
                <Input
                  label={input.label}
                  type={input.type}
                  id={input.id}
                  name={input.id}
                  className="w-full p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-default"
                  placeholder={input.placeholder}
                  required
                />
              </div>
            ))}
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="block text-sm font-medium text-primary-dark mb-2">
              Сообщение
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              className="w-full p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-default"
              placeholder="Опишите ваши пожелания"
              required
            ></textarea>
          </div>
          <Button
            size="md" 
            variant='primary'
             type="submit"
            className="w-full bg-primary-default text-white px-6 py-3 rounded-xl hover:bg-primary-hover transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Send className="w-5 h-5" /> Отправить сообщение
          </Button>
        </form>
      </section>
    </>
  );
}