import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Wifi } from 'lucide-react'

export const BookingCard = ({ price }) => (
  <div className="bg-background border rounded-xl p-6 h-fit sticky top-8">
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-2xl font-bold">{price}₽</p>
          <p className="text-muted-foreground">за сутки</p>
        </div>
        <Badge variant="secondary" className="text-sm">
          <Wifi className="w-4 h-4 mr-1" />
          Бесплатный Wi-Fi
        </Badge>
      </div>

      {/* Date picker and booking logic would go here */}

      <div className="text-center text-sm text-muted-foreground">
        Бесплатная отмена в течение 24 часов
      </div>
    </div>
  </div>
)