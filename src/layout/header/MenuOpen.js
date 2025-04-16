import NextLink from '@/components/ui/NextLink';
import {  ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';

export default function MenuOpen({isSubLinksVisible, links , subLinks, toggleSubLinks, setIsMenuOpen}) {

    const handleSub = ()=>{
        toggleSubLinks()
    }
    const HandleClose = () =>{
        setIsMenuOpen(false)
    } 
  return (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-lg">
            <div className='flex items-center justify-center'>
                <NextLink href="/" aria-label="Home page" title="Go to Home page">
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
                </NextLink>
            </div>
            <ul className="flex flex-col gap-4 p-4">
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
                {link.name === 'all' && isSubLinksVisible && (
                    <ul className="pl-4 mt-2 space-y-2">
                    {subLinks.map((subLink, subIndex) => (
                        <li key={subIndex}>
                        <NextLink href={`/${subLink}`} className=" text-primary-dark hover:text-primary-hover">
                            {subLink}
                        </NextLink>
                        </li>
                    ))}
                    </ul>
                )}
                </li>
            ))}
            </ul>
        </div>
  )
}
