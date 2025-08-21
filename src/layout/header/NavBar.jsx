"use client";

import { useState, useEffect, useRef } from "react";
import {
  ChevronDown,
  User,
  LogOut,
  Headset,
  Newspaper,
  Star,
  BookmarkCheck,
} from "lucide-react";
import { usePathname } from "next/navigation";
import NextLink from "@/components/ui/NextLink";
import { links } from "@/constants/data";
import { useAuth } from "../../../context/AuthContext";
import { StrapiImage } from "@/components/ui/StrapiImage";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Navbar() {
  const [isAvatarMenuOpen, setIsAvatarMenuOpen] = useState(false);
  const avatarRef = useRef(null);
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const [hidden, setHidden] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  // get user  and logout and success
  const { logout, user, success } = useAuth();

  // handle show and hide nav bar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const visible = prevScrollPos > currentScrollPos || currentScrollPos < 10;
      setHidden(!visible);
      setPrevScrollPos(currentScrollPos);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  // close menu when
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (avatarRef.current && !avatarRef.current.contains(event.target))
        setIsAvatarMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => await logout();

  // Hide Navbar on auth and checkout pages
  if (
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/forgot-password") ||
    pathname.startsWith("/add-apartment") ||
    pathname.startsWith("/edit-apartment")
  ) {
    return null;
  }

  return (
    <header
      className={`
      max-w-[400px]
      fixed 
      top-2
      left-1/2          
      -translate-x-1/2  
      w-full           
      md:max-w-7xl        
      rounded-xl 
      bg-background-default 
      opacity-95 
      shadow-md  border border-primary-light
      z-50 
      transition-all
    ${hidden ? "-translate-y-full" : "translate-y-0 shadow-md"}
  `}
    >
      <div className="px-4">
        <div className="flex justify-between items-center h-14">
          {/* Left side - Logo and menu */}
          <div className="flex items-center">
            <NextLink href="/">
              <span className="text-2xl font-semibold text-primary-dark">
                {" "}
                KVKEY{" "}
              </span>
            </NextLink>
          </div>

          {/* Middle - Navigation links */}
          <div className="flex items-center gap-4">
            <nav className="md:flex items-center space-x-6 hidden">
              <ul className="flex gap-4 md:gap-6">
                {links.map((link, index) => (
                  <li key={index} className="responsive-appbar-button">
                    <NextLink href={link.link}>
                      <span className="text-primary-dark text-sm font-semibold">
                        {link.name}
                      </span>
                    </NextLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Right side - Search and Avatar */}
          <div className="flex items-center gap-4">
            {
              <div className="relative" ref={avatarRef}>
                <button
                  onClick={() => setIsAvatarMenuOpen((prev) => !prev)}
                  className="flex flex-col items-center group"
                  aria-label="User menu"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 overflow-hidden">
                    <StrapiImage
                      needUrl={false}
                      src={
                        user === null || user?.image === null
                          ? "/images/avat.webp"
                          : `${user?.image?.formats?.thumbnail?.url}`
                      }
                      alt={`Превью `}
                      className="object-cover"
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
                    />
                  </div>
                  <ChevronDown
                    className={`text-primary-dark transition-transform ${
                      isAvatarMenuOpen ? "rotate-180" : ""
                    }`}
                    size={10}
                  />
                </button>

                {/* Dropdown Menu */}
                <div
                  className={`absolute right-[-14px]  w-56 origin-top-right transition-all duration-200 ${
                    isAvatarMenuOpen
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95 pointer-events-none"
                  }`}
                >
                  <div className="bg-white rounded-b-xl shadow-xl  ring-black/5 py-2">
                    {user && (
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">
                          {user?.username}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {user?.email}
                        </p>
                      </div>
                    )}

                    <div className="space-y-1">
                      {success ? (
                        <NextLink
                          href="/profile"
                          className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 group"
                          onClick={() => setIsAvatarMenuOpen(false)}
                        >
                          <User className="w-4 h-4 mr-3 text-gray-400 group-hover:text-primary-dark" />
                          Профиль
                        </NextLink>
                      ) : (
                        <NextLink
                          href="/login"
                          className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 group"
                          onClick={() => setIsAvatarMenuOpen(false)}
                        >
                          <User className="w-4 h-4 mr-3 text-gray-400 group-hover:text-primary-dark" />
                          Вход
                        </NextLink>
                      )}

                      {isMobile && (
                        <>
                          <NextLink
                            href="/about"
                            className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 group"
                            onClick={() => setIsAvatarMenuOpen(false)}
                          >
                            <Newspaper className="w-4 h-4 mr-3 text-gray-400 group-hover:text-primary-dark" />
                            О нас
                          </NextLink>
                          <NextLink
                            href="/contact"
                            className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 group"
                            onClick={() => setIsAvatarMenuOpen(false)}
                          >
                            <Headset className="w-4 h-4 mr-3 text-gray-400 group-hover:text-primary-dark" />
                            Контакт
                          </NextLink>
                          <NextLink
                            href="/premium"
                            className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 group"
                            onClick={() => setIsAvatarMenuOpen(false)}
                          >
                            <Star className="w-4 h-4 mr-3  text-yellow-500 group-hover:text-yellow-600" />
                            <span className="flex items-center text-sm gap-2">
                              Премиум
                              <span className="px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                                PRO
                              </span>
                            </span>
                          </NextLink>
                          <NextLink
                            href="/faq"
                            className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 group"
                            onClick={() => setIsAvatarMenuOpen(false)}
                          >
                            <BookmarkCheck className="w-4 h-4 mr-3 text-gray-400 group-hover:text-primary-dark" />
                            Вопросы
                          </NextLink>
                        </>
                      )}
                      {success && (
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center px-4 py-2.5 text-sm text-red-600 hover:bg-gray-50 group border-t border-gray-100"
                        >
                          <LogOut className="w-4 h-4 mr-3 text-red-500 group-hover:text-red-600" />
                          Выйти
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </header>
  );
}
