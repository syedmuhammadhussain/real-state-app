'use client';

import React, { useState } from 'react';
import { ImagePlus, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

export default function MediaLocationForm({ apartment, setApartment, handleSubmit }) {
  const [previewUrls, setPreviewUrls] = useState([]);

  const handleImageChange = (e) => {
    const files = e.target.files;
    // Convert FileList to array to store in state
    setApartment({ ...apartment, images: files });

    // Create preview URLs
    const previews = [];
    for (let i = 0; i < files.length; i++) {
      previews.push(URL.createObjectURL(files[i]));
    }
    setPreviewUrls(previews);
  };

  const handleDescriptionChange = (value) => {
    setApartment({ ...apartment, fullDescription: value });
  };

  const handleAddressChange = (value) => {
    setApartment({
      ...apartment,
      location: { ...apartment.location, address: value },
    });
  };

  const handleDistrictChange = (value) => {
    setApartment({
      ...apartment,
      location: { ...apartment.location, district: value },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* IMAGES UPLOAD */}
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <ImagePlus className="w-5 h-5 mr-2 text-primary-default" />
        Upload Images
      </h2>
      <div>
        <input type="file" multiple accept="image/*" onChange={handleImageChange} />
      </div>
      {/* Preview selected images */}
      {previewUrls.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-4">
          {previewUrls.map((url, index) => (
            <div key={index} className="w-32 h-32 border rounded overflow-hidden">
              <img src={url} alt={`Preview ${index + 1}`} className="object-cover w-full h-full" />
            </div>
          ))}
        </div>
      )}

      {/* FULL DESCRIPTION */}
      <div className="mt-6">
        <label className="block font-medium mb-1">Full Description</label>
        <textarea
          className="border p-2 w-full rounded"
          rows={6}
          value={apartment.fullDescription}
          onChange={(e) => handleDescriptionChange(e.target.value)}
          placeholder="Provide a detailed description..."
        />
      </div>

      {/* LOCATION / MAP */}
      <div className="mt-6 p-4 border rounded-md">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <MapPin className="w-5 h-5 mr-2 text-primary-default" />
          Location / Map Info
        </h2>

        <div className="mb-4">
          <label className="block font-medium mb-1">Address</label>
          <input
            type="text"
            className="border p-2 w-full rounded"
            value={apartment.location.address}
            onChange={(e) => handleAddressChange(e.target.value)}
            placeholder="Respubliki, 204 bldg. 4, Tyumen..."
          />
        </div>
        <div>
          <label className="block font-medium mb-1">District</label>
          <input
            type="text"
            className="border p-2 w-full rounded"
            value={apartment.location.district}
            onChange={(e) => handleDistrictChange(e.target.value)}
            placeholder="Central District"
          />
        </div>
      </div>

      {/* FINAL BUTTON */}
      <Button type="submit" variant="primary" size="md" className="mt-4 w-full">
        Submit Apartment
      </Button>
    </form>
  );
}
