import { Trash2 } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ProductCart = ({ item, handleUpdateQuantity, handleRemoveItem, editable = true }) => {
  const [isRemoving, setIsRemoving] = useState(false);

  // Handle Quantity Update
  const handleQuantity = (id, quantity) => {
    handleUpdateQuantity(id, quantity);
  };

  // Handle Item Removal with Animation
  const handleRemove = (id) => {
    setIsRemoving(true);
    setTimeout(() => {
      handleRemoveItem(id);
    }, 300); 
  };

  return (
    <AnimatePresence>
      {!isRemoving && (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, x: 50, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex items-center gap-4 border-b border-gray-300 pb-4 last:border-b-0"
        >
          {/* Product Image */}
          {item.images && item.images.length > 0 && (
            <motion.img
              src={item.images[0].url}
              alt={item.name}
              className="w-20 h-20 object-cover rounded-lg shadow-md border border-gray-200"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            />
          )}

          {/* Product Details */}
          <div className="flex-1">
            <h3 className="font-semibold text-xl text-primary-dark">{item.name}</h3>
            <h4 className="text-sm text-primary-hover">
              {item.selectedProduct.color} / {item.selectedProduct.size}
            </h4>

            {/* Quantity Controls and Remove Button */}
            <div className="flex items-center justify-between mt-2">
              {!editable ? (
                <>
                  <h5 className="text-primary-hover">{item.quantity}</h5>
                  <span className="text-primary-dark font-semibold">
                    $ {(item.price * item.quantity).toFixed(2)}
                  </span>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  {/* Decrease Quantity Button */}
                  <motion.button
                    onClick={() => handleQuantity(item.id, item.quantity - 1)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-8 h-8 flex items-center justify-center bg-background-light rounded-lg hover:bg-accent-default hover:text-white transition-all"
                  >
                    <span className="text-lg font-semibold">−</span>
                  </motion.button>

                  {/* Quantity Display */}
                  <span className="w-8 text-center text-primary-dark font-semibold">
                    {item.quantity}
                  </span>

                  {/* Increase Quantity Button */}
                  <motion.button
                    onClick={() => handleQuantity(item.id, item.quantity + 1)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-8 h-8 flex items-center justify-center bg-background-light rounded-lg hover:bg-accent-default hover:text-white transition-all"
                  >
                    <span className="text-lg font-semibold">+</span>
                  </motion.button>
                </div>
              )}

              {/* Remove Button with Icon */}
              {editable && (
                <motion.button
                  onClick={() => handleRemove(item.id)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-errorColor-light hover:text-errorColor-default transition-all"
                >
                  <Trash2 size={23} />
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProductCart;