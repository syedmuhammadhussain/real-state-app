import { Check } from 'lucide-react'

export const AmenitiesTab = ({ amenities }) => (

  <>
   <h3 className="text-lg font-semibold text-primary-dark mb-6">Удобства</h3>
     <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
    {amenities?.map((amenity, idx) => (
      <div key={idx} className="flex items-center gap-2">
        <Check className="w-5 h-5 text-primary-default" />
        <span className=" text-primary-dark">{amenity.name}</span>
      </div>
    ))}
  </div>
  </>
  
)