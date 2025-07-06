'use client';
import { useState, useEffect, useRef } from 'react';
import { ChevronDown, User, LogOut, UserRound, Menu } from 'lucide-react';
import MenuOpen from './MenuOpen';
import { usePathname } from 'next/navigation';
import NextLink from '@/components/ui/NextLink';
import { links  } from '@/constants/data';
import { useAuth } from '../../../context/AuthContext';
import { StrapiImage } from '@/components/ui/StrapiImage';

export default function Navbar() {
  const [isAvatarMenuOpen, setIsAvatarMenuOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const avatarRef = useRef(null);
  const menuRef = useRef(null);
  const pathname = usePathname(); 

  // get user  and logout and success
  const { logout , user ,success} = useAuth()

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (avatarRef.current && !avatarRef.current.contains(event.target)) setIsAvatarMenuOpen(false);
     };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) setIsMenuOpen(false);
     }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const handleLogout =  async () => await logout()

  // Hide Navbar on auth and checkout pages
  if (
    pathname.startsWith('/login') ||
    pathname.startsWith('/register') ||
    pathname.startsWith('/forgot-password') ||
    pathname.startsWith('/checkout') ||
    pathname.startsWith('/add-apartment')  || 
    pathname.startsWith('/edit-apartment')  
  ) {
    return null;
  }


  return (
    <header className="fixed top-0 left-0 w-full bg-background-default opacity-95 shadow-md z-50">
      <div className="px-4">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo and menu */}
          <div className='hidden sm:flex items-center' >
            <NextLink href="/" >
               <span className="text-2xl font-semibold" > KVKEY</span>   
            </NextLink>
          </div>

          {/* Middle - Navigation links */}
          <div className="flex items-center gap-4">
             <button
                  onClick={toggleMenu}
                  className="md:hidden flex items-center gap-2 group"
                  aria-label="User menu"
                >
                  <Menu size={25} />
            </button>
            <nav className="md:flex items-center space-x-6 hidden">
              <ul className="flex gap-4 md:gap-6">
                {links.map((link, index) => (
                  <li key={index} className='responsive-appbar-button text-primary-dark text-base  transition-all cursor-pointer'>
                    <NextLink
                      href={link.link}
                    >
                      {link.name}
                    </NextLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Right side - Search and Avatar */}
          <div className="flex items-center gap-4">
            { success ? (
              <div className="relative" ref={avatarRef}>
                <button
                  onClick={() => setIsAvatarMenuOpen(prev => !prev)}
                  className="flex flex-col items-center group"
                  aria-label="User menu"
                >
                 <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 overflow-hidden">
                <StrapiImage
                      src={user?.image.url}
                      alt={`Превью `}
                      className="object-cover"
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"/>
                  </div>
                  <ChevronDown
                    className={`text-primary-dark transition-transform ${
                      isAvatarMenuOpen ? 'rotate-180' : ''
                    }`}
                    size={10}
                  />
                </button>

                {/* Dropdown Menu */}
                <div
                  className={`absolute right-[-14px]  w-56 origin-top-right transition-all duration-200 ${
                    isAvatarMenuOpen
                      ? 'opacity-100 scale-100'
                      : 'opacity-0 scale-95 pointer-events-none'
                  }`}
                >
                  <div className="bg-white rounded-b-xl shadow-xl  ring-black/5 py-2">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user?.username}</p>
                      <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                    </div>

                    <div className="space-y-1">
                      <NextLink
                        href="/profile"
                        className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 group"
                        onClick={() => setIsAvatarMenuOpen(false)}
                      >
                        <User className="w-4 h-4 mr-3 text-gray-400 group-hover:text-primary-dark" />
                        Профиль
                      </NextLink>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-4 py-2.5 text-sm text-red-600 hover:bg-gray-50 group border-t border-gray-100"
                      >
                        <LogOut className="w-4 h-4 mr-3 text-red-500 group-hover:text-red-600" />
                        Выйти
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
                <NextLink href="/login" aria-label='login page' className="text-gray-800 hover:text-primary-hover  transition-colors duration-300">
                  <UserRound size={20} />
                </NextLink> 
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <MenuOpen
            setIsMenuOpen={setIsMenuOpen}
            isMenuOpen={isMenuOpen}
             menuRef={menuRef}
          />
        )}
      </div>
    </header>
  );
}