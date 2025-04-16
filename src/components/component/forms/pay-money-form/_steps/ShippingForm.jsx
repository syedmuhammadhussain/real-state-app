import { Button } from '@/components/ui/button';
import Input from '@/components/ui/input';
import { MapPin, CreditCard } from 'lucide-react'; 

const ShippingForm = ({ handleShippingSubmit, shipping, setShipping }) => {
  return (
    <form onSubmit={handleShippingSubmit} className="bg-background-light p-6 rounded-lg shadow-md">
      
      {/* Title */}
      <h2 className="text-xl font-bold text-textColor-dark mb-4 flex items-center">
        <MapPin className="w-5 h-5 mr-2 text-primary-default" /> Shipping Address
      </h2>

      {/* Input Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Country/Region"
            type="text"
            id="region"
            value={shipping.country}
            onChange={(e) => setShipping({ ...shipping, country: e.target.value })}
            placeholder="United States"
            required
            className="pl-10"
          />
          <Input
            label="Address"
            type="text"
            id="address"
            value={shipping.address}
            onChange={(e) => setShipping({ ...shipping, address: e.target.value })}
            placeholder="Street address"
            required
            className="pl-10"
          />
          <Input
            label="Apartment, suite, etc. (Optional)"
            type="text"
            id="apartment"
            value={shipping.apartment}
            onChange={(e) => setShipping({ ...shipping, apartment: e.target.value })}
            placeholder="Apt, Suite, etc."
            className="pl-10"
          />
          <Input
            label="City"
            type="text"
            id="city"
            value={shipping.city}
            onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
            placeholder="City"
            required
            className="pl-10"
          />
          <Input
            label="State"
            type="text"
            id="state"
            value={shipping.state}
            onChange={(e) => setShipping({ ...shipping, state: e.target.value })}
            placeholder="State"
            required
            className="pl-10"
          />

          <Input
            label="ZIP Code"
            type="text"
            id="zip"
            value={shipping.zip}
            onChange={(e) => setShipping({ ...shipping, zip: e.target.value })}
            placeholder="ZIP Code"
            required
            className="pl-10"
          />
      </div>

      {/* Continue Button */}
      <Button type="submit" variant="primary" size="md" className=" mt-4">
        <CreditCard size={20}/>Continue to Payment
      </Button>
      
    </form>
  );
};

export default ShippingForm;
