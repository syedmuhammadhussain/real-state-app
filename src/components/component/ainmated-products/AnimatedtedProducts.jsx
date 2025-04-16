import { products } from '@/constants/data';
import ShownProductCard from '../card/ShownProductCard';

const AnimatedtedProducts = () => {
  return (
    <div className="relative overflow-x-auto no-scrollbar">
      {/* Product Cards Container */}
      <div className="flex space-x-4 p-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="transition-transform duration-300 ease-in-out transform " 
          >
            <ShownProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedtedProducts;