'use client';

import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
// import ReduxProvider from '@/redux/ReduxProvider';
import { validateEmail, validateFirstName, validateLastName, validateTelephone } from '@/constants/utils';

import { Button } from '@/components/ui/button';
import ContactForm from './_steps/ContactForm';
import ShippingForm from './_steps/ShippingForm';
import PaymentForm from './_steps/PaymentForm';
import RightSide from './RightSide';

export default function Checkout() {
  const [step, setStep] = useState(1);
  const [contact, setContact] = useState({ email: '', firstName: '', lastName: '', telephone: '', subscribe: false });
  const [shipping, setShipping] = useState({ country: '', address: '', apartment: '', city: '', state: '', zip: '' });
  const [payment, setPayment] = useState({ cardNumber: '', expiration: '', cvv: '', nameOnCard: '' });
  const [errors, setErrors] = useState({ email: '', firstName: '', lastName: '', telephone: '' });

  const firstNameError = validateFirstName(contact.firstName);
  const lastNameError = validateLastName(contact.lastName);
  const telephoneError = validateTelephone(contact.telephone);
  const emailError = validateEmail(contact.email);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (firstNameError || lastNameError || telephoneError || emailError) {
      setErrors({ email: emailError, firstName: firstNameError, lastName: lastNameError, telephone: telephoneError });
      return;
    }

    setErrors({});
    console.log('Contact Info:', contact);
    setStep(2);
  };

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    if (!shipping.country || !shipping.address || !shipping.city || !shipping.state || !shipping.zip) {
      alert('Please fill out all required fields.');
      return;
    }
    setStep(3);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    if (!payment.cardNumber || !payment.expiration || !payment.cvv || !payment.nameOnCard) {
      alert('Please fill out all payment details.');
      return;
    }
    alert('Payment successful!');
  };

  return (
    <>
     <div className="container mt-20 min-h-[90vh] mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Side (Forms) */}
          <div className="md:col-span-2">
            <h1 className="text-3xl font-bold text-textColor-dark mb-6">Checkout</h1>

            {/* Step Navigation */}
            <div className="mb-6 flex space-x-4 text-sm md:text-lg font-semibold">
              <span
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  step >= 1 ? 'bg-primary-default text-white' : 'bg-gray-300 text-gray-700'
                }`}
              >
                {step > 1 ? <CheckCircle size={18} className="text-green-400" /> : null} 1. Contact
              </span>
              <span
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  step >= 2 ? 'bg-primary-default text-white' : 'bg-gray-300 text-gray-700'
                }`}
              >
                {step > 2 ? <CheckCircle size={18} className="text-green-400" /> : null} 2. Shipping
              </span>
              <span
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  step === 3 ? 'bg-primary-default text-white' : 'bg-gray-300 text-gray-700'
                }`}
              >
                3. Payment
              </span>
            </div>

            {/* Forms */}
            <div className="bg-background-light p-6 rounded-lg shadow-md">
              {step === 1 && (
                <ContactForm
                  handleContactSubmit={handleContactSubmit}
                  contact={contact}
                  setContact={setContact}
                  setStep={setStep}
                  errors={errors}
                  setErrors={setErrors}
                />
              )}
              {step === 2 && (
                <ShippingForm
                  handleShippingSubmit={handleShippingSubmit}
                  shipping={shipping}
                  setShipping={setShipping}
                  setStep={setStep}
                />
              )}
              {step === 3 && (
                <PaymentForm
                  handlePaymentSubmit={handlePaymentSubmit}
                  payment={payment}
                  setPayment={setPayment}
                />
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="mt-6 flex justify-between">
              {step > 1 && (
                <Button
                  variant="outline"
                  onClick={() => setStep(step - 1)}
                  size="lg"
                  className="transition-transform hover:scale-105"
                >
                  Back
                </Button>
              )}
              {/* {step < 3 ? (
                <Button
                  variant="primary"
                  onClick={() => setStep(step + 1)}
                  size="lg"
                  className="transition-transform hover:scale-105"
                >
                  Next
                </Button>
              ) : (
                <Button
                  variant="primary"
                  onClick={handlePaymentSubmit}
                  size="lg"
                  className="transition-transform hover:scale-105"
                >
                  Confirm & Pay
                </Button>
              )} */}
            </div>
          </div>

          {/* Right Side Summary */}
          <RightSide />
        </div>
      </div>
      {/* <newAppar */}
    </>
     
  );
}
