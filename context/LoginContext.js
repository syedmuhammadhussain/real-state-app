const { createContext, Children, useState, useEffect, useRef } = require("react");

const LoginContext = createContext()

export const useLoginContext = () => {
    return useContext(LoginContext);
  };


export const LoginContextProvider = ({children})=>{
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [isAvatarMenuOpen, setIsAvatarMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSubLinksVisible, setIsSubLinksVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const avatarRef = useRef(null);
  
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
  
    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };
  
    const pathname = usePathname(); // Get the current route
  
    // Hide Navbar on auth and checkout pages
    if (
      pathname.startsWith('/login') ||
      pathname.startsWith('/register') ||
      pathname.startsWith('/forgot-password') ||
      pathname.startsWith('/checkout')
    ) {
      return null;
    }
  
    const handleLogout = () => {
      setIsLoggedIn(false);
      setIsAvatarMenuOpen(false);
      // Add actual logout logic here
    };
    
  


    return(
    <LoginContext.Provider value={{isLoggedIn,setIsLoggedIn, }}>
        {children}
    </LoginContext.Provider>)
}