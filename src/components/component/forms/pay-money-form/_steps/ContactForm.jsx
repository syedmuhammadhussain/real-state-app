import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import Input from '@/components/ui/input';
import { validateEmail, validateFirstName, validateLastName, validateTelephone } from '@/constants/utils';
import { Mail, Package } from 'lucide-react';

const ContactForm = ({ handleContactSubmit, contact, setContact, setStep, errors, setErrors }) => {
  return (
    <form onSubmit={handleContactSubmit} className="bg-background-light p-6 rounded-lg shadow-md">
      
      {/* Title */}
      <h2 className="text-xl font-bold text-textColor-dark mb-4 flex items-center">
        <Mail className="w-5 h-5 mr-2 text-primary-default" /> Contact Information
      </h2>

      {/* Input Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        <Input
          label="First Name"
          type="text"
          id="firstName"
          value={contact.firstName}
          onChange={(e) => setContact({ ...contact, firstName: e.target.value })}
          onBlur={() => setErrors({ ...errors, firstName: validateFirstName(contact.firstName) })}
          error={errors.firstName}
          placeholder="Enter your First Name"
          required
        />

        <Input
          label="Last Name"
          type="text"
          id="lastName"
          value={contact.lastName}
          onChange={(e) => setContact({ ...contact, lastName: e.target.value })}
          onBlur={() => setErrors({ ...errors, lastName: validateLastName(contact.lastName) })}
          error={errors.lastName}
          placeholder="Enter your Last Name"
          required
        />

        <Input
          label="Email"
          type="email"
          id="email"
          value={contact.email}
          onChange={(e) => setContact({ ...contact, email: e.target.value })}
          onBlur={() => setErrors({ ...errors, email: validateEmail(contact.email) })}
          error={errors.email}
          placeholder="Enter your email"
          required
        />

        <Input
          label="Telephone"
          type="tel"
          id="telephone"
          value={contact.telephone}
          onChange={(e) => setContact({ ...contact, telephone: e.target.value })}
          onBlur={() => setErrors({ ...errors, telephone: validateTelephone(contact.telephone) })}
          error={errors.telephone}
          placeholder="Enter your phone number"
          required
        />
      </div>

      {/* Checkbox */}
      <div className="mt-6 mb-4 flex items-center space-x-3">
        <Checkbox id="subscribe" checked={contact.subscribe} onCheckedChange={(checked) => setContact({ ...contact, subscribe: checked })} />
        <label htmlFor="subscribe" className="text-sm font-medium text-textColor-dark">
          Email me with news and offers
        </label>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        size="md"
      >
        
        <Package size={18}/> Continue to Shipping
      </Button>
    </form>
  );
};

export default ContactForm;
