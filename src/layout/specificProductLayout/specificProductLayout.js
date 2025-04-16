'use client';

import { hoodies, jeans, products, shirts, shoes } from '@/constants/data';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';
// import { addItem } from '@/redux/cartSlice';
import { useDispatch } from 'react-redux';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart, CheckCircle } from "lucide-react"; // Import Icons
import { Button } from '@/components/ui/button';

const getProductData = (productId) => {
  const allProducts = [...products, ...shirts, ...hoodies, ...jeans, ...shoes];
  return allProducts.find((product) => product.handlerName === productId);
};

export default function SpecificProductLayout() {
  const pathname = usePathname();
  const specificHandler = pathname.split('/look/')[1];
  const product = getProductData(specificHandler);
  
  const [selectedImage, setSelectedImage] = useState(product.images[0].url);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  // const dispatch = useDispatch();
  // const { toast } = useToast();

  if (!product) {
    return <div className="text-center text-lg font-semibold text-red-500">Product not found</div>;
  }

  // Handle adding an item to the cart
  // const handleAddToCart = () => {
  //   if (!selectedColor || !selectedSize) {
  //     toast({ variant: 'destructive', title: 'Please select a color and size' });
  //     return;
  //   }

  //   const updatedProduct = {
  //     ...product,
  //     selectedProduct: { color: selectedColor, size: selectedSize },
  //   };

  //   dispatch(addItem(updatedProduct));
  //   toast({ variant: 'success', title: 'Product successfully added to cart' });
  // };

  return (
    <div className="container min-h-[90vh] mt-20 mx-auto p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="w-full">
          <Image
            src={selectedImage}
            alt={product.name}
            width={800}
            height={600}
            className="w-full h-auto rounded-lg shadow-lg"
            priority={true}
            sizes="(max-width: 768px) 100vw, 50vw"
          />

          {/* Thumbnail Images */}
          <div className="flex space-x-2 mt-4">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(image.url)}
                className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                  selectedImage === image.url ? 'border-primary-default scale-105' : 'border-gray-300 hover:border-primary-light'
                }`}
              >
                <Image src={image.url} alt={product.name} width={64} height={64} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          {/* Product Name */}
          <h1 className="text-3xl font-bold text-primary-dark">{product.name}</h1>
          <h2 className="text-lg font-bold text-primary-dark">Description of Pucts and  material / quality bla bla Description of Pucts and  material / quality bla bla</h2>


          {/* Product Price */}
          <p className="text-2xl font-bold  text-primary-dark">${product.price}</p>

          {/* Color Options */}
          <div>
            <p className="text-sm font-medium text-textColor-muted mb-2">COLOR</p>
            <div className="flex space-x-2">
              {product.images.map((image, index) => ( 
                <button
                  key={index}
                  onClick={() => {
                    setSelectedColor(image.color);
                    setSelectedImage(image.url);
                  }}
                  className={`w-10 h-10 rounded-full border-2 transition-all ${
                    selectedColor === image.color ? 'border-primary-default scale-110' : 'border-gray-300 hover:border-primary-light'
                  }`}
                  style={{ backgroundColor: image.color.toLowerCase() }}
                  aria-label={`Select ${image.color} color`}
                ></button>
              ))}
            </div>
          </div>

          {/* Size Options */}
          <div>
            <p className="text-sm font-medium text-textColor-muted mb-2">SIZE</p>
            <div className="flex space-x-2">
              {product.sizes.map((size, index) => (
                <Button
                  key={index}
                  onClick={() => setSelectedSize(size)}
                  variant={selectedSize === size ? 'outline' : 'ghost'}//outline
                  size="md"
                  className=" text-primary-dark transition-all"
                >
                  {selectedSize === size ? <CheckCircle size={16} className="mr-1 text-green-500" /> : null} {size}
                </Button>
              ))}
            </div>
          </div>

          {/* Product Description */}
          <p className="text-sm text-textColor-muted">{product.description}</p>

          {/* Add to Cart Button */}
          <Button
            // onClick={handleAddToCart}
            disabled={!selectedColor || !selectedSize} 
            variant='primary' 
            size='md'
          >
            <ShoppingCart size={20} /> Add To Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
