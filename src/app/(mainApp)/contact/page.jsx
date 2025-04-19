import { Home, Search, Shield, Phone, MapPin, Send } from 'lucide-react';
import Image from 'next/image';

export const metadata = {
  title: 'Контакты - XRAL State',
  description: 'Свяжитесь с нами для консультации по недвижимости, подбора объекта и юридической поддержки',
  keywords: 'контакты риелтора, подбор недвижимости, юридическая поддержка, консультация по недвижимости',
  openGraph: {
    title: 'Контакты - XRAL State',
    description: 'Профессиональные консультации по недвижимости',
    images: [{ url: '/images/contact-bg.jpg' }],
  },
};

export default function ContactUs() {
  return (
    <div className=" ">
      {/* Заголовок */}

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
            Нужна консультация по недвижимости? Наши эксперты готовы помочь 
          </h1>
        </div>
      </div>
     
      {/* Введение */}
     

      {/* Способы связи */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
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
          <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-all duration-300">
            {item.icon}
            <h3 className="text-xl font-bold mb-2 text-primary-dark">{item.title}</h3>
            <p className="text-textColor-muted mb-4">{item.text}</p>
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
        <form className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {[
              { label: "Имя", type: "text", id: "name", placeholder: "Ваше имя" },
              { label: "Email", type: "email", id: "email", placeholder: "Ваш email" },
            ].map((input, index) => (
              <div key={index}>
                <label htmlFor={input.id} className="block text-sm font-medium text-textColor-muted mb-2">
                  {input.label}
                </label>
                <input
                  type={input.type}
                  id={input.id}
                  name={input.id}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-default"
                  placeholder={input.placeholder}
                  required
                />
              </div>
            ))}
          </div>
          <div className="mb-6">
            <label htmlFor="subject" className="block text-sm font-medium text-textColor-muted mb-2">
              Тема обращения
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-default"
              placeholder="Тема сообщения"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="block text-sm font-medium text-textColor-muted mb-2">
              Сообщение
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-default"
              placeholder="Опишите ваши пожелания"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-primary-default text-white px-6 py-3 rounded-lg hover:bg-primary-hover transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Send className="w-5 h-5" /> Отправить сообщение
          </button>
        </form>
      </section>

      {/* Офис и контакты */}
      <section className="text-center">
        <h2 className="text-2xl font-bold mb-6 text-textColor-dark flex items-center justify-center">
          <MapPin className="w-6 h-6 mr-2 text-primary-dark" /> Наш офис
        </h2>
        <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto mb-8">
          <p className="text-textColor-muted mb-4">
            <strong>📍 Адрес:</strong> Москва, Пресненская наб., 12, офис 234
          </p>
          <p className="text-textColor-muted mb-4">
            <strong>📞 Телефон:</strong> +7 (495) 123-45-67
          </p>
        </div>
      </section>
    </div>
  );
}