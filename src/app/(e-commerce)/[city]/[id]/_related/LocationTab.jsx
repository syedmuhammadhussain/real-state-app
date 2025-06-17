import { MapPin } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export const LocationTab = ({ address, infrastructure }) => (
  <div className="space-y-6">
    <div className="aspect-video bg-muted rounded-xl">
      {/* Map integration placeholder */}
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Адрес</h3>
        <p>{address.name}</p>
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Рядом есть</h3>
        <div className="flex flex-wrap gap-2">
          {infrastructure.map((item, idx) => (
            <Badge key={idx} variant="secondary" className="gap-1">
              <MapPin className="w-4 h-4" />
              {item}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  </div>
)