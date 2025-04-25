'use client';

import { useState } from 'react';
import { CheckCircle } from 'lucide-react';

// Child form steps
import BasicInfoForm from './_steps/BasicInfoForm';
import ParametersForm from './_steps/ParametersForm';
import MediaLocationForm from './_steps/MediaLocationForm';

// Example button component – adapt to your own if needed
import { Button } from '@/components/ui/button';

export default function ApartmentForm() {
  // Track current step in the multi-step process (1, 2, or 3)
  const [step, setStep] = useState(1);

  // A single apartment state object, split into sub-sections
  const [apartment, setApartment] = useState({
    basic: {
      title: '',
      descriptionShort: '',
    },
    checkInConditions: {
      documents: '',
      checkOutTime: '12:00',
      partiesAllowed: false,
      roundTheClockCheckIn: true,
      petsAllowed: false,
      smokingAllowed: false,
      prepaymentRequired: false,
    },
    apartmentParameters: {
      apartmentType: '2-room apartment',
      maxGuests: 5,
      singleBeds: 1,
      doubleBeds: 2,
      floorAndTotalFloors: '5/17',
      area: {
        total: 50,
        living: 30,
        kitchen: 20,
      },
      bathroom: 'Combined',
      buildingType: 'Monolithic',
      windowView: 'Courtyard',
      renovation: 'Euro-style',
      balconyType: 'None',
      parkingAvailable: true,
      parkingType: 'Nearby',
    },
    houseDescription: [],
    kitchen: [],
    infrastructure: [],
    images: null, // FileList or array of images
    fullDescription: '',
    location: {
      address: '',
      district: 'Central District',
    },
  });

  // Minimal error state; adapt as needed
  const [errors, setErrors] = useState({});

  // Step 1: Basic info & check-in conditions
  const handleBasicSubmit = (e) => {
    e.preventDefault();
    // Validate at least a title
    if (!apartment.basic.title) {
      setErrors({ ...errors, title: 'Please provide a title.' });
      return;
    }
    setErrors({});
    console.log('Step 1 Submission (Basic Info):', apartment.basic, apartment.checkInConditions);
    setStep(2);
  };

  // Step 2: Apartment parameters, houseDescription, etc.
  const handleParametersSubmit = (e) => {
    e.preventDefault();
    // Minimal check
    if (!apartment.apartmentParameters.apartmentType) {
      alert('Please select an apartment type!');
      return;
    }
    console.log('Step 2 Submission (Parameters):', apartment.apartmentParameters);
    setStep(3);
  };

  // Final Step: images, fullDescription, location
  const handleMediaLocationSubmit = (e) => {
    e.preventDefault();
    // Minimal check
    if (!apartment.location.address) {
      alert('Please provide an address.');
      return;
    }
    console.log('Final Step Submission (Images/Location):', apartment.images, apartment.location);

    // Simulate final POST to backend
    alert('Apartment posted successfully!');
    // console.log('Final apartment object:', apartment);
  };

  return (
    <div className="container mx-auto overflow-auto">
      <div className=" gap-8">
        {/* Left: Forms */}
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-6">Post a New Apartment</h1>

          {/* Step Navigation */}
          <div className="mb-6 flex space-x-4 text-sm md:text-lg font-semibold">
            <span
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300
                ${step >= 1 ? 'bg-primary-default text-white' : 'bg-gray-300 text-gray-700'}
              `}
            >
              {step > 1 ? <CheckCircle size={18} className="text-green-400" /> : null} 1. Basic
            </span>
            <span
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300
                ${step >= 2 ? 'bg-primary-default text-white' : 'bg-gray-300 text-gray-700'}
              `}
            >
              {step > 2 ? <CheckCircle size={18} className="text-green-400" /> : null} 2. Details
            </span>
            <span
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300
                ${step === 3 ? 'bg-primary-default text-white' : 'bg-gray-300 text-gray-700'}
              `}
            >
              3. Media & Location
            </span>
          </div>

          {/* Current Step's Form */}
          <div className="bg-background-light p-6 rounded-lg shadow-md">
            {step === 1 && (
              <BasicInfoForm
                apartment={apartment}
                setApartment={setApartment}
                errors={errors}
                handleSubmit={handleBasicSubmit}
              />
            )}
            {step === 2 && (
              <ParametersForm
                apartment={apartment}
                setApartment={setApartment}
                handleSubmit={handleParametersSubmit}
              />
            )}
            {step === 3 && (
              <MediaLocationForm
                apartment={apartment}
                setApartment={setApartment}
                handleSubmit={handleMediaLocationSubmit}
              />
            )}
          </div>

          {/* Navigation Buttons (Back, Next) */}
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
            {/* For reference, if you wanted next button here: 
                {step < 3 && (
                  <Button variant="primary" onClick={() => setStep(step + 1)}>
                    Next
                  </Button>
                )}
            */}
          </div>
        </div>

        {/* Right Side (Summary or tips) */}
        {/* <RightSide apartment={apartment} /> */}
      </div>
    </div>
  );
}
