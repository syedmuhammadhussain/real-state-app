'use client';

import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ProductCart from '@/components/component/cartProduct/ProductCart';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import NextLink from '@/components/ui/NextLink';

const Cart = ({ toggleCart, isCartOpen }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();


  // Handle checkout process
  const handleProceedToCheckout = () => {
    setIsLoading(true);
    setTimeout(() => {
      router.push('/checkouts');
      setIsLoading(false);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {/* {isCartOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="fixed top-0 right-0 w-80 h-full bg-background-default shadow-lg z-50"
        >
          <div className="p-4 flex justify-between items-start bg-primary-default">
            <h2 className="text-2xl text-primary-dark ">Your Cart</h2>
            <motion.button
              onClick={toggleCart}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="hover:text-accent-light transition-all mt-1"
            >
              <X size={20} />
            </motion.button>
          </div>

          <div className="p-4 space-y-4 h-[calc(100%-200px)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
            {cart.items.length === 0 ? (
              <>
               <p className="text-center text-textColor-muted">Your cart is empty.</p>
               <Button 
                type="submit" 
                size='md'
                onClick={ () => toggleCart() }
                variant="primary">  
                  <NextLink href ='/products'> Start Shopping </NextLink>
              </Button> 
              </>
             
            ) : (
              cart.items.map((item, index) => (
                <ProductCart
                  key={index}
                  item={item}
                  handleUpdateQuantity={handleUpdateQuantity}
                  handleRemoveItem={handleRemoveItem}
                />
              ))
            )}
          </div>

          {cart.items.length > 0 && (
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="absolute bottom-0 left-0 w-full bg-background-light border-t border-gray-300 p-4 shadow-md"
            >
              <div className="mb-3">
                <p className="font-semibold text-textColor-dark">Total Items: {cart.totalQuantity}</p>
                <p className="font-semibold text-textColor-hover text-lg">Total: ${cart.totalPrice}</p>
              </div>

              <div className="space-y-3">
                <Button
                  variant="destructive"
                  className="w-full"
                  size="md"
                  onClick={handleClearCart}
                >
                  Clear Cart
                </Button>
                <Button
                  size="md"
                  variant="primary"
                  disabled={cart.items.length === 0 || isLoading}
                  onClick={handleProceedToCheckout}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" /> Processing...
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5" /> Proceed to Checkout
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          )}
        </motion.div>
      )} */}
    </AnimatePresence>
  );
};

export default Cart;