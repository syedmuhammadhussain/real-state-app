'use client';
import { useRouter, useSearchParams } from 'next/navigation'; 
import { Search, X } from 'lucide-react';
import Input from '@/components/ui/input';

const SearchProduct = ({ searchQuery, setSearchQuery, toggleSearch, isSearchOpen  }) => {
  
  const router = useRouter(); 
  const searchParams = useSearchParams();

  // console.log('searchParams',searchParams)
  // Handle search submission
  const handleSearchProp = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      
      // Redirect to the search results page with the search query
      router.push(`/cities/?query=${encodeURIComponent(searchQuery)}`);
    }
    toggleSearch(); // Close the search bar
    setSearchQuery(''); // Clear the search input
  };

  const handleToggleSearch = () => {
    toggleSearch();
  };


  return (
    <div className="flex items-center gap-4">
      {/* Search Bar */}
      <div className="relative">
        {/* Search Input */}
        <div
          className={`transition-all duration-300 ease-in-out ${
            isSearchOpen ? 'w-60 sm:w-64  opacity-100 p-8' : 'w-0 opacity-0 p-8'
          }`}
        >
          <form onSubmit={handleSearchProp} className=" flex items-center">
          <Input
            type="text"
            id="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
           placeholder="Search..."
          />
          </form>
        </div>

        {/* Search Icon */}
        <button
          onClick={handleToggleSearch}
          className={`absolute right-0 top-1/2 transform -translate-y-1/2 text-primary-dark  hover:text-primary-hover transition-opacity duration-300 ${
            isSearchOpen ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <Search size={20} className="text-primary-dark hover:text-primary-hover transition-colors duration-300" />
        </button>

        {/* Close or Search Icon */}
        <button
          onClick={searchQuery.length > 0 ? handleSearchProp : handleToggleSearch}
          className={`absolute right-0 top-1/2 transform -translate-y-1/2 text-primary-dark  hover:text-primary-hover transition-opacity duration-300 ${
            isSearchOpen ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {searchQuery.length > 0 ? <Search size={20} className="text-primary-dark hover:text-primary-hover transition-colors duration-300"  /> 
          : <X size={20} className="text-primary-dark hover:text-primary-hover transition-colors duration-300" />}
        </button>
      </div>

    </div>
  );
};

export default SearchProduct;