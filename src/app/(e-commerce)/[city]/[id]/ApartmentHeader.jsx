import { Share2, Heart, Star, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const ApartmentHeader = ({ product }) => (
  <div className="mb-6">
    <div className="flex items-start justify-between mb-4">
      <h1 className="text-3xl font-bold">{product.title}</h1>
      <div className="flex gap-2">
        <Button variant="ghost" size="icon">
          <Share2 className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Heart className="w-5 h-5" />
        </Button>
      </div>
    </div>

    <div className="flex items-center gap-4 mb-6">
      <div className="flex items-center gap-1 text-muted-foreground">
        <MapPin className="w-5 h-5" />
        <span>{product.mapInfo.district}</span>
      </div>
      <div className="flex items-center gap-1">
        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
        <span className="font-semibold">4.8</span>
        <span className="text-muted-foreground">(124 отзыва)</span>
      </div>
    </div>
  </div>
)