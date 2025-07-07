    'use client'

    import { Home, Loader2, AlertTriangle } from "lucide-react";
    import { useEffect, useState } from 'react';
    import { ArrowUp } from 'lucide-react';


    export const ErrorState = ({ message }) => (
        <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
        <AlertTriangle className="h-12 w-12 text-destructive" />
        <p className="text-lg font-medium text-destructive">{message}</p>
        </div>
    );

    export const LoadingState = () => (
        <div className="flex items-center justify-center">
         <Loader2 className="h-10 w-10 animate-spin text-primary-hover" />
        </div>
    );

    export const EmptyState = () => (
        <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
        <Home className="h-12 w-12 text-muted-foreground" />
        <p className="text-lg font-medium text-muted-foreground">
            У вас пока нет объявлений
        </p>
        </div>
    );


    export const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isScrolling, setIsScrolling] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
        setIsScrolling(true);
        setIsVisible(window.scrollY > 300);
        
        // Clear scrolling state after 150ms of no scrolling
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => setIsScrolling(false), 150);
        };

        let scrollTimeout;
        window.addEventListener('scroll', handleScroll);
        return () => {
        window.removeEventListener('scroll', handleScroll);
        clearTimeout(scrollTimeout);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
        top: 0,
        behavior: 'smooth'
        });
    };

    return (
        <button
        onClick={scrollToTop}
        className={`fixed z-50 p-3 rounded-full shadow-xl transition-all duration-500 ease-out ${
            isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-20 pointer-events-none'
        } ${
            isScrolling ? 'scale-100' : 'scale-90'
        } bg-gradient-to-br from-black/10  to-primary-dark  hover:to-primary-dark text-white`}
        style={{
            bottom: '1.5rem',
            right: '1.5rem',
            boxShadow: '0 4px 20px rgba(79, 70, 229, 0.5)',
            transform: isScrolling ? 'scale(1)' : 'scale(0.9)',
            transition: 'transform 0.3s ease, opacity 0.5s ease, bottom 0.5s ease'
        }}
        aria-label="Scroll to top"
        >
        <div className={`transition-transform ${isScrolling ? 'animate-bounce-slow' : ''}`}>
            <ArrowUp className="h-5 w-5" />
        </div>
        
        {/* Floating animation effect */}
        <div className="absolute inset-0 rounded-full bg-white opacity-0 animate-ping-slow" />
        
        {/* Custom animation styles */}
        <style jsx>{`
            @keyframes bounce-slow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
            }
            @keyframes ping-slow {
            0% { transform: scale(0.8); opacity: 1; }
            75%, 100% { transform: scale(2); opacity: 0; }
            }
            .animate-bounce-slow {
            animation: bounce-slow 2s infinite;
            }
            .animate-ping-slow {
            animation: ping-slow 2s cubic-bezier(0,0,0.2,1) infinite;
            }
        `}</style>
        </button>
    );
    };
