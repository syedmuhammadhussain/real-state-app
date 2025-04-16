import ShownProductCard from '@/components/component/card/ShownProductCard';
import Link from 'next/link';
import { products } from '@/constants/data';

// Constants
const ITEMS_PER_PAGE = 6;

// Dynamic metadata generation
export async function generateMetadata({ params }) {
  const city = decodeCityParam(params.city);
  return {
    title: `${city} - Page ${params.page} | Real Estate Listings`,
    description: `Page ${params.page} of premium real estate listings in ${city}. Find your perfect property.`,
    openGraph: {
      images: [{ 
        url: `/images/cities/${params.city}.jpg`,
        alt: `${city} real estate listings`
      }],
    },
  };
}

// Static path generation
export async function generateStaticParams() {
  const cities = [...new Set(products.map(p => p.city.toLowerCase()))];
  
  return cities.flatMap(city => {
    const encodedCity = encodeCityParam(city);
    const cityProducts = products.filter(p => p.city.toLowerCase() === city);
    const pageCount = Math.ceil(cityProducts.length / ITEMS_PER_PAGE);
    
    return Array.from({ length: pageCount }, (_, i) => ({
      city: encodedCity,
      page: (i + 1).toString()
    }));
  });
}

// Main component
export default function CityPage({ params }) {
  const currentCity = decodeCityParam(params.city);
  const currentPage = parseInt(params.page) || 1;
  
  // Filter and paginate products
  const filteredProducts = products.filter(p => 
    p.city.toLowerCase() === currentCity.toLowerCase()
  );
  
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Helper functions
  const getPagePath = (page) => 
    `/${encodeCityParam(currentCity)}/page/${page}`;

  return (
    <div className="container mx-auto p-4 lg:p-8">
      <header className="mb-8 lg:mb-12">
        <h1 className="text-3xl lg:text-4xl font-bold text-primary-dark">
          Properties in {currentCity}
        </h1>
        <p className="text-gray-600 mt-2">
          Page {currentPage} of {totalPages}
        </p>
      </header>

      {paginatedProducts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-1 g:grid-cols-1 gap-6 lg:gap-8">
            {paginatedProducts.map((product) => (
              <div key={product.id} className="group relative">
                <ShownProductCard 
                  apartment={product}
                  city={params.city}
                />
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="mt-12 flex justify-center items-center gap-2">
            <PaginationLink 
              href={getPagePath(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </PaginationLink>

            {Array.from({ length: totalPages }, (_, i) => (
              <PaginationLink
                key={i + 1}
                href={getPagePath(i + 1)}
                active={currentPage === i + 1}
              >
                {i + 1}
              </PaginationLink>
            ))}

            <PaginationLink
              href={getPagePath(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </PaginationLink>
          </div>
        </>
      ) : (
        <div className="text-center py-20">
          <h2 className="text-2xl text-gray-600">No properties found</h2>
          <Link
            href="/"
            className="mt-4 inline-block text-primary hover:text-primary-dark"
          >
            Browse all cities
          </Link>
        </div>
      )}
    </div>
  );
}

// Helper components
const PaginationLink = ({ href, children, disabled = false, active = false }) => (
  <Link
    href={href}
    className={`px-4 py-2 rounded-lg transition-all ${
      active 
        ? 'bg-primary text-white pointer-events-none'
        : disabled 
          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
          : 'bg-white text-gray-700 hover:bg-primary-light hover:text-primary border'
    }`}
    aria-disabled={disabled}
    tabIndex={disabled ? -1 : undefined}
  >
    {children}
  </Link>
);

// Utility functions
const decodeCityParam = (param) => 
  param.replace("city%3D", "").replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

const encodeCityParam = (city) => 
  `city%3D${city.toLowerCase().replace(/ /g, '-')}`;