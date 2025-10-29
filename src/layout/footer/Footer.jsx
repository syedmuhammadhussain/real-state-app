"use client";

import Link from "next/link";
import { Send, MessageCircle } from "lucide-react";

import { usePathname } from "next/navigation";
import NextLink from "@/components/ui/NextLink";
import Image from "next/image";
import vk from '../../../public/vk.png'
import wp from '../../../public/whats.png'



export default function Footer() {
  const pathname = usePathname();

  if (
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/forgot-password") ||
    pathname.startsWith("/add-apartment") ||
    pathname.startsWith("/edit-apartment") ||
    pathname.startsWith("/profile")
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
      // icon: <MessageCircle size={20} />,
      icon:   <Image alt="whats icon" src={wp} width={20} height={20} className="rounded-full" />,
      href: "https://wa.me/79091818242",
    },
    {
      icon: <Send size={20} />,
      href: "https://t.me/your_telegram_username",
    },
    // {
    //   icon: <Instagram size={20} />,
    //   href: "https://instagram.com/your_profile",
    // },
    {
      icon:  <Image alt="vk icon" src={vk} width={20} height={20} className="rounded-full" />,
      href: "https://vk.com/id1024184393",
    },
  ];

  return (
    <footer className="bg-background-dark text-white py-10 px-4 md:px-0r">
      <div className="  max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row   justify-between border-b border-gray-700 pb-8">
          <div className="text-center md:text-left">
            <NextLink href="/" className="">
              <span className="text-2xl font-semibold text-white"> KVKEY </span>
            </NextLink>
            <p className="text-gray-400 text-sm max-w-sm mt-6">
              KVKEY — платформа для аренды недвижимости в России.
              Посуточно, напрямую, без посредников.
            </p>
          </div>
           <p className='text-sm  text-gray-400' >Индивидуальный предприниматель Шевелёва Татьяна Николаевна
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
            <h3 className="text-lg font-semibold  rounded-xl mb-4">
              Подпишитесь
            </h3>
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
            <div className="mt-6 md:mt-0 flex justify-center md:justify-start space-x-4">
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
            <p className=" mt-4 text-sm  text-gray-400"> почта : kvkey.ru@gmail.com </p>
            {/* <p  className=' text-sm  text-gray-400' >  Telephone : email </p> */}
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} KVKEY. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
}
