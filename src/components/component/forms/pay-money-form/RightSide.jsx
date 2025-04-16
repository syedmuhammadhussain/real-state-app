import ProductCart from '@/components/component/cartProduct/ProductCart';

const RightSide = () => {

  return (
    <div className="md:col-span-1 bg-background-light p-6 rounded-lg shadow-lg">
      
      {/* Order Summary Title */}
      <h2 className=" font-bold text-textColor-dark mb-4">Order Summary</h2>

      {/* Cart Items */}
      <div className="max-h-80 overflow-y-auto no-scrollbar space-y-4 p-2">
        {[].length > 0 ? (
          [].map((item) => (
            <ProductCart key={item.id} item={item} editable={false} />
          ))
        ) : (
          <p className="text-gray-500 text-center">Your cart is empty.</p>
        )}
      </div>

      {/* Order Total */}
      <div className="border-t border-gray-300 mt-4 pt-4">
        <h3 className="text-lg font-semibold text-textColor-dark flex justify-between">
          <span>Total:</span> 
          {/* <span className="text-textColor-dark">${cart.totalPrice.toFixed(2)}</span> */}
        </h3>
      </div>

    
    </div>
  );
};

export default RightSide;
