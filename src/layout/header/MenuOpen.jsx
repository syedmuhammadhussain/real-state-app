import NextLink from '@/components/ui/NextLink';
import {  Headset, Newspaper, Star, BookmarkCheck, Home } from 'lucide-react';
import { useCallback } from 'react';

export default function MenuOpen({ setIsMenuOpen, isMenuOpen , menuRef}) {

    const HandleClose = useCallback(() => setIsMenuOpen(false),[])

    return (
        <div ref= {menuRef} className="md:hidden absolute  top-16 left-0 w-full bg-white shadow-lg">
            <div className='flex items-center justify-center'>
            </div>
              <div
                  className={`absolute left-0 mt-0 w-56 origin-top-right transition-all duration-200 ${
                    isMenuOpen
                      ? 'opacity-100 scale-100'
                      : 'opacity-0 scale-95 pointer-events-none'
                  }`}
                >
                  <div className="bg-white rounded-b-xl shadow-xl ring-1 ring-black/5 py-2">
                    <div className=" py-3 border-b border-gray-100">
                        <NextLink
                        href="/"
                        className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 group"
                        onClick={HandleClose}
                            >
                        <Home className="w-4 h-4 mr-3 text-gray-400 group-hover:text-primary-dark" />
                        KVKEY
                      </NextLink>
                      <NextLink
                        href="/about"
                        className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 group"
                     onClick={HandleClose}
                      >
                        <Newspaper className="w-4 h-4 mr-3 text-gray-400 group-hover:text-primary-dark" />
                        О нас
                      </NextLink>
                           <NextLink
                        href="/contact"
                        className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 group"
                     onClick={HandleClose}
                      >
                       <Headset  className="w-4 h-4 mr-3 text-gray-400 group-hover:text-primary-dark" />
                        Контакт
                      </NextLink>
                      <NextLink
                        href="/premium"
                        className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 group"
                        onClick={HandleClose}
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
                     onClick={HandleClose}
                      >
                     <BookmarkCheck    className="w-4 h-4 mr-3 text-gray-400 group-hover:text-primary-dark" />
                        Вопросы
                      </NextLink>
                    </div>
                  </div>
                </div>
        </div>
    )
}

