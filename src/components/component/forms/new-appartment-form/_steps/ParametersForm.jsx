'use client';

import React from 'react';
import { Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Input from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

const buildingFeatures = [
  'Elite building',
  'Elevator',
  'New construction',
  'Video surveillance',
  'Intercom',
  'Enclosed / gated territory',
];

const kitchenFeatures = [
  'Kitchen furniture',
  'Electric stove',
  'Oven',
  'Water filter',
  'Dishes and utensils',
  'Cutlery',
  'Electric kettle',
];

const infrastructureOptions = [
  'Cinema',
  'Amusement park',
  'Hypermarket',
  'Shopping/Entertainment complex (TRK)',
  'Sports complex',
  'Stadium',
  'Water park',
  'Café',
  'Restaurant',
  'Coffee shop',
];

export default function ParametersForm({ apartment, setApartment, handleSubmit }) {
  const { apartmentParameters, houseDescription, kitchen, infrastructure } = apartment;

  const handleParamChange = (path, value) => {
    setApartment({
      ...apartment,
      apartmentParameters: {
        ...apartmentParameters,
        [path]: value,
      },
    });
  };

  const handleAreaChange = (field, value) => {
    setApartment({
      ...apartment,
      apartmentParameters: {
        ...apartmentParameters,
        area: { ...apartmentParameters.area, [field]: +value },
      },
    });
  };

  const handleCheckboxArray = (field, item) => {
    const currentArray = apartment[field];
    const isChecked = currentArray.includes(item);
    if (isChecked) {
      setApartment({
        ...apartment,
        [field]: currentArray.filter((val) => val !== item),
      });
    } else {
      setApartment({
        ...apartment,
        [field]: [...currentArray, item],
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 px-1 overflow-auto">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <Package className="w-5 h-5 mr-2 text-primary-default" />
        Apartment Parameters
      </h2>

      {/* Basic Fields */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Input
          label="Apartment Type"
          type="text"
          value={apartmentParameters.apartmentType}
          onChange={(e) => handleParamChange('apartmentType', e.target.value)}
        />
        <Input
          label="Max Guests"
          type="number"
          value={apartmentParameters.maxGuests}
          onChange={(e) => handleParamChange('maxGuests', +e.target.value)}
        />
        <Input
          label="Single Beds"
          type="number"
          value={apartmentParameters.singleBeds}
          onChange={(e) => handleParamChange('singleBeds', +e.target.value)}
        />
        <Input
          label="Double Beds"
          type="number"
          value={apartmentParameters.doubleBeds}
          onChange={(e) => handleParamChange('doubleBeds', +e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <Input
          label="Floor / Total Floors"
          type="text"
          value={apartmentParameters.floorAndTotalFloors}
          onChange={(e) => handleParamChange('floorAndTotalFloors', e.target.value)}
        />
        <Input
          label="Bathroom"
          type="text"
          value={apartmentParameters.bathroom}
          onChange={(e) => handleParamChange('bathroom', e.target.value)}
        />
      </div>

      {/* Area */}
      <div className="mt-4">
        <p className="font-medium">Area (m²)</p>
        <div className="flex items-center gap-2 mt-1">
          <Input
            type="number"
            label="Total"
            value={apartmentParameters.area.total}
            onChange={(e) => handleAreaChange('total', e.target.value)}
            className="w-20"
          />
          <Input
            type="number"
            label="Living"
            value={apartmentParameters.area.living}
            onChange={(e) => handleAreaChange('living', e.target.value)}
            className="w-20"
          />
          <Input
            type="number"
            label="Kitchen"
            value={apartmentParameters.area.kitchen}
            onChange={(e) => handleAreaChange('kitchen', e.target.value)}
            className="w-20"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <Input
          label="Building Type"
          type="text"
          value={apartmentParameters.buildingType}
          onChange={(e) => handleParamChange('buildingType', e.target.value)}
        />
        <Input
          label="Window View"
          type="text"
          value={apartmentParameters.windowView}
          onChange={(e) => handleParamChange('windowView', e.target.value)}
        />
        <Input
          label="Renovation"
          type="text"
          value={apartmentParameters.renovation}
          onChange={(e) => handleParamChange('renovation', e.target.value)}
        />
        <Input
          label="Balcony Type"
          type="text"
          value={apartmentParameters.balconyType}
          onChange={(e) => handleParamChange('balconyType', e.target.value)}
        />
      </div>

      {/* Parking */}
      <div className="flex flex-col sm:flex-row gap-4 mt-4 items-center">
        <label className="inline-flex items-center space-x-2">
          <Checkbox
            checked={apartmentParameters.parkingAvailable}
            onCheckedChange={(checked) => handleParamChange('parkingAvailable', checked)}
          />
          <span>Parking Available</span>
        </label>
        <div className="flex-1">
          <label className="block font-medium mb-1">Parking Type</label>
          <input
            type="text"
            className="border p-2 w-full rounded"
            value={apartmentParameters.parkingType}
            onChange={(e) => handleParamChange('parkingType', e.target.value)}
            placeholder="Nearby"
          />
        </div>
      </div>

      {/* House/Building Description */}
      <div className="mt-6 p-4 border rounded-md">
        <h3 className="font-semibold mb-2">House / Building Description</h3>
        {buildingFeatures.map((feature) => (
          <label key={feature} className="block">
            <Checkbox
              checked={houseDescription.includes(feature)}
              onCheckedChange={() => handleCheckboxArray('houseDescription', feature)}
            />
            <span className="ml-2">{feature}</span>
          </label>
        ))}
      </div>

      {/* Kitchen */}
      <div className="mt-6 p-4 border rounded-md">
        <h3 className="font-semibold mb-2">Kitchen Features</h3>
        {kitchenFeatures.map((item) => (
          <label key={item} className="block">
            <Checkbox
              checked={kitchen.includes(item)}
              onCheckedChange={() => handleCheckboxArray('kitchen', item)}
            />
            <span className="ml-2">{item}</span>
          </label>
        ))}
      </div>

      {/* Infrastructure */}
      <div className="mt-6 p-4 border rounded-md">
        <h3 className="font-semibold mb-2">Infrastructure Nearby</h3>
        {infrastructureOptions.map((inf) => (
          <label key={inf} className="block">
            <Checkbox
              checked={infrastructure.includes(inf)}
              onCheckedChange={() => handleCheckboxArray('infrastructure', inf)}
            />
            <span className="ml-2">{inf}</span>
          </label>
        ))}
      </div>

      <Button type="submit" variant="primary" size="md" className="mt-4">
        Continue to Media & Location
      </Button>
    </form>
  );
}
