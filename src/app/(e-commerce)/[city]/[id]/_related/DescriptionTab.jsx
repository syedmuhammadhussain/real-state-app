import { Building2, Bath, Home, CalendarDays, Dog, Bed } from 'lucide-react'

export const DescriptionTab = ({ description, params, conditions }) => (
  <div className="space-y-6  flex flex-col justify-center h-auto">
    <p className="text-lg mx-auto">{description}</p>
    
    <div className="w-full mx-auto grid grid-cols-2 gap-6">
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-primary-dark ">Особенности</h3>

        {/* bathroom
bedrooms
propertyType */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary-dark " />
            <span className=' text-primary-dark'>{params.propertyType}</span>
          </div>
          <div className="flex items-center gap-2 text-primary-dark">
            <Bath className="w-5 h-5  text-primary-dark"  />
            <span className=' text-primary-dark'>{params.bathroom}</span>
          </div>
          {params.bedrooms  && (
            <div className="flex items-center gap-2">
              <Bed className="w-5 h-5  text-primary-dark" />
              <span className=' text-primary-dark'>{params.bedrooms}</span>
            </div>
          )}
        </div>
      </div>

{/* Правила */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Правила</h3>

        sooon
        {/* <div className="space-y-2">
          <div className="flex items-center gap-2">
            <CalendarDays className="w-5 h-5" />
            <span>Заезд после {conditions.checkOutTime}</span>
          </div>
          {conditions.petsAllowed && (
            <div className="flex items-center gap-2">
              <Dog className="w-5 h-5" />
              <span>Можно с питомцами</span>
            </div>
          )}
        </div> */}
      </div>
    </div>
  </div>
)