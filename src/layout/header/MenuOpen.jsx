import NextLink from '@/components/ui/NextLink';
import {  ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';

export default function MenuOpen({isSubLinksVisible, links, toggleSubLinks, setIsMenuOpen, isMenuOpen}) {

    const handleSub = ()=>{
        toggleSubLinks()
    }
    
    const HandleClose = () =>{
        setIsMenuOpen(false)
    } 

    return (
        <div className="md:hidden absolute  top-16 left-0 w-full bg-white shadow-lg">
            <div className='flex items-center justify-center'>
                {/* <NextLink href="/" aria-label="Home page" title="Go to Home page">
                  <Image
                    onClick={HandleClose}
                    src={'/images/logo-icon.svg'}
                    alt={'Brand Logo'}
                    width={50}
                    height={50}
                    // fill
                    className="mt-4 object-cover transform hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={true}
                  />
                </NextLink> */}
            </div>
            <div className={`absolute  bg-white  w-56 origin-top-right transition-all duration-200 ${
                isMenuOpen
                  ? 'opacity-100 scale-100'
                  : 'opacity-0 scale-95 pointer-events-none'
              }`}>
            <ul className="flex flex-col gap-4 p-4">
                <li className="flex items-center justify-between">
                    <NextLink href="/" className="text-primary-dark hover:text-primary-hover" onClick={HandleClose}>
                        <span className="text-lg font-semibold">KVKEY</span>
                    </NextLink>
                </li>
                {links.map((link, index) => (
                <li key={index}>
                    <div className="flex items-center gap-1">
                        <NextLink href={link.link} className=" text-primary-dark hover:text-primary-hover" 
                        onClick={HandleClose}>
                            {link.name}
                        </NextLink>
                        {link.name === 'all' && (
                        <button onClick={handleSub} className=" text-primary-dark hover:text-primary-hover">
                            {isSubLinksVisible ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        )}
                    </div>
                </li>
            ))}
            </ul>
            </div>
        </div>
    )
}

