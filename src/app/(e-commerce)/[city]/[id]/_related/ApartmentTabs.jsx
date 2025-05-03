import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DescriptionTab } from './DescriptionTab'
import { LocationTab } from './LocationTab'
import { AmenitiesTab } from './AmenitiesTab'

export const ApartmentTabs = ({ product, description, amenities, infrastructure }) => (


  <Tabs defaultValue="description">
    <TabsList className="grid grid-cols-4 w-full mb-8">
      <TabsTrigger value="description">Описание</TabsTrigger>
      <TabsTrigger value="amenities">Удобства</TabsTrigger>
      <TabsTrigger value="location">Локация</TabsTrigger>
      <TabsTrigger value="reviews">Отзывы</TabsTrigger>
    </TabsList>

    <TabsContent value="description" className="w-full pt-6 mx-auto">
      <DescriptionTab 
        description={description} 
        params={product.apartmentParameters}
        conditions={product.checkInConditions}
      />
    </TabsContent>

    <TabsContent value="amenities" className="pt-6">
      <AmenitiesTab amenities={amenities} />
    </TabsContent>

    <TabsContent value="location" className="pt-6">
      <LocationTab 
        address={product.mapInfo.address} 
        infrastructure={infrastructure}
      />
    </TabsContent>
    <TabsContent value="reviews" className="pt-6">
      <h1>Review</h1>
    </TabsContent>
  </Tabs>
)