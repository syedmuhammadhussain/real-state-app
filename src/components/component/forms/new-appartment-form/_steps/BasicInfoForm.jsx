'use client';

import React from 'react';
import { Mail } from 'lucide-react'; 
// Example UI components - replace with your own
import { Button } from '@/components/ui/button';
import Input from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

export default function BasicInfoForm({ apartment, setApartment, errors, handleSubmit }) {
  const { basic, checkInConditions } = apartment;

  const handleInputChange = (field, value) => {
    setApartment({
      ...apartment,
      basic: { ...basic, [field]: value },
    });
  };

  const handleCheckInChange = (field, value) => {
    setApartment({
      ...apartment,
      checkInConditions: { ...checkInConditions, [field]: value },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <Mail className="w-5 h-5 mr-2 text-primary-default" />
        Basic Information
      </h2>

      {/* Title */}
      <Input
        label="Title"
        type="text"
        id="title"
        value={basic.title}
        onChange={(e) => handleInputChange('title', e.target.value)}
        placeholder="Spacious 2-Room Apartment in Central Tyumen"
        required
        error={errors.title}
      />

      {/* Short Description */}
      <div>
        <label className="block font-medium mb-1">Short Description</label>
        <textarea
          className="border p-2 w-full rounded"
          rows={3}
          value={basic.descriptionShort}
          onChange={(e) => handleInputChange('descriptionShort', e.target.value)}
          placeholder="Cozy apartment near major attractions..."
        />
      </div>

      {/* Check-in Conditions */}
      <div className="mt-4 border rounded-md p-4">
        <h3 className="font-semibold mb-2">Check-in / Settlement Conditions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Documents (e.g. reporting docs)"
            type="text"
            id="documents"
            value={checkInConditions.documents}
            onChange={(e) => handleCheckInChange('documents', e.target.value)}
            placeholder="Reporting documents available..."
          />
          <Input
            label="Check-out Time"
            type="text"
            id="checkOutTime"
            value={checkInConditions.checkOutTime}
            onChange={(e) => handleCheckInChange('checkOutTime', e.target.value)}
            placeholder="12:00"
          />
        </div>

        <div className="flex flex-wrap gap-4 mt-4">
          {[
            { field: 'partiesAllowed', label: 'Parties Allowed' },
            { field: 'roundTheClockCheckIn', label: '24h Check-In' },
            { field: 'petsAllowed', label: 'Pets Allowed' },
            { field: 'smokingAllowed', label: 'Smoking Allowed' },
            { field: 'prepaymentRequired', label: 'Prepayment Required' },
          ].map((item) => (
            <label key={item.field} className="inline-flex items-center space-x-2">
              <Checkbox
                id={item.field}
                checked={checkInConditions[item.field]}
                onCheckedChange={(checked) => handleCheckInChange(item.field, checked)}
              />
              <span>{item.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Next Button */}
      <Button type="submit" variant="primary" size="md" className="mt-4">
        Continue to Details
      </Button>
    </form>
  );
}
