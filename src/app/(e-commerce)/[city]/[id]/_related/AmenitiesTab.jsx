import { Check } from 'lucide-react'

export const AmenitiesTab = ({ amenities }) => (

  <>
     <h3 className="text-xl font-semibold text-primary-dark ">Удобства</h3>
     <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
    {amenities?.map((amenity, idx) => (
      <div key={idx} className="flex items-center gap-2">
        <Check className="w-5 h-5 text-green-600" />
        <span>{amenity.name}</span>
      </div>
    ))}
  </div>
  </>
  
)