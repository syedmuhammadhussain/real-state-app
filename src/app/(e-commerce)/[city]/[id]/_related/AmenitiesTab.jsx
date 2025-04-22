import { Check } from 'lucide-react'

export const AmenitiesTab = ({ amenities }) => (
  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
    {amenities.map((amenity, idx) => (
      <div key={idx} className="flex items-center gap-2">
        <Check className="w-5 h-5 text-green-600" />
        <span>{amenity}</span>
      </div>
    ))}
  </div>
)