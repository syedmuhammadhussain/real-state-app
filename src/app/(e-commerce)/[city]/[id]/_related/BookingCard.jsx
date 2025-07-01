import { Badge } from '@/components/ui/badge'
import {  Wifi } from 'lucide-react'
import { SimpleBookingForm } from './SimpleBookingForm'

export const BookingCard = ({ price, id }) => (
  <div className="p-4 border border-primary-light rounded-xl">
    <div className="space-y-6 ">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xl font-bold text-primary-default">{price}₽  / за сутки</p>
        </div>
        <Badge variant="default" className="text-sm flex items-center justify-center gap-2">
          <Wifi className="w-4 h-4 flex items-center justify-center gap-2" />
           <span className='hidden md:block text-sm'> Бесплатный Wi-Fi  </span>
        </Badge>
      </div>

      <SimpleBookingForm id={id}/>
      {/* Date picker and booking logic would go here */}

      <div className="text-center text-sm  text-primary-default">
        Бесплатная отмена в течение 24 часов
      </div>
    </div>
  </div>
)

