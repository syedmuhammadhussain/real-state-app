'use client';

import Link from "next/link";
import Image from "next/image";
import { Bell, Send, Instagram, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/input";
import { usePathname } from 'next/navigation';

const VKIcon = ({ className }) => (


  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12.374 17.943h1.606c.485 0 .654-.348.9-.715.252-.373.63-.883 1.265-.883h1.209c.475 0 .701-.09.845-.444.13-.323.018-.588-.248-.904l-.464-.55a10.922 10.922 0 0 1-1.028-1.419c-.214-.38-.016-.557.328-.557h.987c.387 0 .533-.124.592-.435.064-.328-.047-.573-.271-.888l-.452-.604c-.598-.788-1.221-1.603-2.022-1.603h-1.156c-.364 0-.529.174-.634.452-.204.537-.47 1.09-.72 1.559-.11.21-.227.418-.36.613-.134.196-.282.386-.472.375-.19-.01-.294-.201-.369-.383a8.414 8.414 0 0 1-.506-1.574c-.093-.392-.24-.508-.658-.508H9.209c-.331 0-.538.154-.538.452 0 .421.622 3.44 2.909 5.441.398.337.79.489.794.785.004.24-.185.282-.44.282h-.727c-.411 0-.723-.048-1.067-.17-.345-.123-.465-.12-.605.207-.136.317-.503 1.046-.702 1.466-.215.451-.048.735.457.735h2.09z" />
  </svg>
);

export default function Footer() {
  const pathname = usePathname(); 
  
 if (
    pathname.startsWith('/login') ||
    pathname.startsWith('/register') ||
    pathname.startsWith('/forgot-password') ||
    pathname.startsWith('/checkout') ||
    pathname.startsWith('/add-apartment')  || 
    pathname.startsWith('/edit-apartment')  || 
    pathname.startsWith('/profile') 
  ) {
    return null;
  }

  const links = [
    { name: "Главная", href: "/" },
    { name: "О нас", href: "/about" },
    { name: "Контакты", href: "/contact" },
    { name: "Премиум", href: "/premium" },
  ];

  const customerSupport = [
    { name: "Политика конфиденциальности", href: "/legal/privacy" },
    { name: "Условия использования", href: "/legal/oferta" },
    { name: "Частые вопросы", href: "/faq" },
  ];

  const socialMedia = [
    {
      icon: <MessageCircle size={20} />,
      href: "https://wa.me/79091818242",
    },
    {
      icon: <Send size={20} />,
      href: "https://t.me/your_telegram_username",
    },
    {
      icon: <Instagram size={20} />,
      href: "https://instagram.com/your_profile",
    },
    {
      icon: <VKIcon className="w-5 h-5" />,
      href: "https://vk.com/id1024184393",
    },
  ];

  return (
    <footer className="bg-background-dark text-white py-10 ">
      <div className="  max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-end justify-between border-b border-gray-700 pb-8">
          <div className="text-center md:text-left">
            <Link href="/" aria-label="Главная страница">
              <Image
                src="/images/logo-icon.svg"
                alt="X Real Estate"
                width={50}
                height={50}
                className="object-cover mb-4 hover:scale-105 transition-transform duration-300"
              />
            </Link>
            <p className="text-gray-400 text-sm max-w-sm">
              X Real Estate — платформа для аренды недвижимости в России. Посуточно, напрямую, без посредников.
            </p>
          </div>
           <p  className='text-sm  text-gray-400' >Индивидуальный предприниматель Шевелёва Татьяна Николаевна
            <br/>ОГРНИП: 324723200031395, ИНН: 860235365698, 
            <br/>адрес регистрации: 628004, Тюменская обл., г. Тюмень, ул. Кольцевая, д.392
          </p>
      
        </div>

        {/* Middle Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left mt-8">
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Навигация</h3>
            <ul className="space-y-2">
              {links.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-accent-default transition-all duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Поддержка</h3>
            <ul className="space-y-2">
              {customerSupport.map((support, index) => (
                <li key={index}>
                  <Link
                    href={support.href}
                    className="text-gray-400 hover:text-accent-default transition-all duration-300"
                  >
                    {support.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold  rounded-xl mb-4">Подпишитесь</h3>
            <p className="text-sm text-gray-400 mb-4">
              Получайте новости, предложения и советы напрямую на почту.
            </p>
            {/* <form className="flex  mx-auto md:mx-0">
              <Input
                type="email"
                placeholder="Ваш e-mail"
                className="w-full "
              />
              <Button
                type="submit"
                size="md"
                variant="primary"
                className="group !max-w-[200px] rounded-l-md bg-primary-default hover:bg-primary-hover transition"
              >
                <Bell size={20} className="mr-1 group-hover:animate-pulse" /> Подписаться
              </Button>
            </form> */}
          <div className="mt-6 md:mt-0 flex space-x-4">
            {socialMedia.map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="p-3 rounded-full bg-primary-default hover:bg-gradient-to-r from-secondary-light to-accent-default text-white transition-all duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                {social.icon}
              </a>
            ))}
          </div>
           <p  className='mt-4 text-sm  text-gray-400' >  почта : email </p>
           {/* <p  className=' text-sm  text-gray-400' >  Telephone : email </p> */}
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} X Real Estate. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
}
