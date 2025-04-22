import { Building2, Bath, Home, CalendarDays, Dog } from 'lucide-react'

export const DescriptionTab = ({ description, params, conditions }) => (
  <div className="space-y-6">
    <p className="text-lg leading-relaxed">{description}</p>
    
    <div className="grid grid-cols-2 gap-6">
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Особенности</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            <span>{params.buildingType}</span>
          </div>
          <div className="flex items-center gap-2">
            <Bath className="w-5 h-5" />
            <span>{params.bathroom}</span>
          </div>
          {params.balconyType !== 'Нет' && (
            <div className="flex items-center gap-2">
              <Home className="w-5 h-5" />
              <span>{params.balconyType}</span>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Правила</h3>
        <div className="space-y-2">
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
        </div>
      </div>
    </div>
  </div>
)