'use client';
import { useState, useEffect, useRef } from 'react';
import { Menu, ChevronDown, User, LogOut, FileText, Star, UserRound } from 'lucide-react';
import Image from 'next/image';
import MenuOpen from './MenuOpen';
import SearchProduct from './SearchProduct';
import { usePathname } from 'next/navigation';
import NextLink from '@/components/ui/NextLink';
import { links, subLinks } from '@/constants/data';
import { useAuth } from '../../../context/AuthContext';

export default function Navbar() {
  
  const [isAvatarMenuOpen, setIsAvatarMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const avatarRef = useRef(null);
  const pathname = usePathname(); 

  // get user  and logout and success
  const { logout , user ,success} = useAuth()

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (avatarRef.current && !avatarRef.current.contains(event.target)) {
        setIsAvatarMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    setIsCartOpen(false);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
    setIsSearchOpen(false);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const handleLogout =  async () => await logout()

  // Hide Navbar on auth and checkout pages
  if (
    pathname.startsWith('/login') ||
    pathname.startsWith('/register') ||
    pathname.startsWith('/forgot-password') ||
    pathname.startsWith('/checkout')
  ) {
    return null;
  }


  // console.log('user', user)
  return (
    <header className="fixed top-0 left-0 w-full bg-background-default opacity-90 shadow-md z-50">
      <div className="px-4">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo and menu */}
          <div className='hidden sm:flex items-center' >
            <NextLink href="/">
              <Image
                src="/images/logo-icon.svg"
                alt="Brand Logo"
                width={50}
                height={50}
                className="object-cover transform hover:scale-105 transition-transform duration-300"
                priority
              />
            </NextLink>
          </div>

          {/* Middle - Navigation links */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleMenu}
              className="md:hidden text-primary-dark hover:text-primary-hover transition-all"
            >
              <Menu size={24} />
            </button>
            <nav className="md:flex items-center space-x-6 hidden">
              <ul className="flex gap-4 md:gap-6">
                {links.map((link, index) => (
                  <li key={index}>
                    <NextLink
                      href={link.link}
                      className="text-primary-dark hover:text-primary-hover transition-colors"
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
            <SearchProduct
              isSearchOpen={isSearchOpen}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              toggleSearch={toggleSearch}
              toggleCart={toggleCart}
            />

            { success ? (
              <div className="relative" ref={avatarRef}>
                <button
                  onClick={() => setIsAvatarMenuOpen(!isAvatarMenuOpen)}
                  className="flex items-center gap-2 group"
                  aria-label="User menu"
                >
                  <div className="relative">
                    <Image
                      src="/images/logo-icon.svg" //avatar
                      alt="User avatar"
                      width={42}
                      height={42}
                      className="rounded-full border-2 border-transparent group-hover:border-primary-dark transition-all"
                    />
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 rounded-full transition-opacity" />
                  </div>
                  <ChevronDown
                    className={`text-primary-dark transition-transform ${
                      isAvatarMenuOpen ? 'rotate-180' : ''
                    }`}
                    size={18}
                  />
                </button>

                {/* Dropdown Menu */}
                <div
                  className={`absolute right-0 mt-2 w-56 origin-top-right transition-all duration-200 ${
                    isAvatarMenuOpen
                      ? 'opacity-100 scale-100'
                      : 'opacity-0 scale-95 pointer-events-none'
                  }`}
                >
                  <div className="bg-white rounded-xl shadow-xl ring-1 ring-black/5 py-2">
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
                        <User className="w-5 h-5 mr-3 text-gray-400 group-hover:text-primary-dark" />
                        Профиль
                      </NextLink>

                      {/* <NextLink
                        href="/posts"
                        className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 group"
                        onClick={() => setIsAvatarMenuOpen(false)}
                      >
                        <FileText className="w-5 h-5 mr-3 text-gray-400 group-hover:text-primary-dark" />
                        My Posts
                      </NextLink> */}

                      <NextLink
                        href="/premium"
                        className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 group"
                        onClick={() => setIsAvatarMenuOpen(false)}
                      >
                        <Star className="w-5 h-5 mr-3  text-yellow-500 group-hover:text-yellow-600" />
                        <span className="flex items-center text-sm gap-2">
                         Премиум
                          <span className="px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                            PRO
                          </span>
                        </span>
                      </NextLink>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-4 py-2.5 text-sm text-red-600 hover:bg-gray-50 group border-t border-gray-100"
                      >
                        <LogOut className="w-5 h-5 mr-3 text-red-500 group-hover:text-red-600" />
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
            links={links}
            subLinks={subLinks}
            setIsMenuOpen={setIsMenuOpen}
            isMenuOpen={isMenuOpen}
          />
        )}
      </div>
    </header>
  );
}