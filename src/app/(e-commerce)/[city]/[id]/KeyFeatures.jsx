import { Home, Users, BedDouble, Ruler } from 'lucide-react'

const FeatureItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
    <Icon className="w-5 h-5" />
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  </div>
)

export const KeyFeatures = ({ params }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
    <FeatureItem 
      icon={Home} 
      label="Тип" 
      value={params.apartmentType} 
    />
    <FeatureItem 
      icon={Users} 
      label="Гостей" 
      value={params.maxGuests} 
    />
    <FeatureItem 
      icon={BedDouble} 
      label="Спальных мест" 
      value={params.singleBeds + params.doubleBeds} 
    />
    <FeatureItem 
      icon={Ruler} 
      label="Площадь" 
      value={`${params.area.total} м²`} 
    />
  </div>
)