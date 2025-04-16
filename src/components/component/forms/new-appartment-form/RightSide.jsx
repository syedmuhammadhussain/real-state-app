'use client';

import React from 'react';

export default function RightSide({ apartment }) {
  // You can destructure specific fields to show a summary
  const { basic } = apartment;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md min-h-[400px]">
      <h2 className="text-xl font-bold mb-4">Summary / Preview</h2>
      <p className="text-sm mb-2">Title: {basic.title || 'N/A'}</p>
      <p className="text-sm">Description: {basic.descriptionShort || 'N/A'}</p>

      <hr className="my-4" />

      <p className="text-sm text-gray-600">
        Here you can show partial data or extra instructions. Update it to suit your needs.
      </p>
    </div>
  );
}
