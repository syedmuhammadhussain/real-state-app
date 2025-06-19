import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DescriptionTab } from './DescriptionTab'
import { LocationTab } from './LocationTab'
import { AmenitiesTab } from './AmenitiesTab'

export const ApartmentTabs = ({ product, description, amenities, infrastructure }) => (


  <Tabs defaultValue="description">
    <TabsList className="grid grid-cols-4 w-full ">
      <TabsTrigger value="description">Описание</TabsTrigger>
      <TabsTrigger value="amenities">Удобства</TabsTrigger>
      <TabsTrigger value="location">Локация</TabsTrigger>
      <TabsTrigger value="reviews">Отзывы</TabsTrigger>
    </TabsList>

    <TabsContent value="description" className="w-full  mx-auto">
      <DescriptionTab 
        description={description} 
        params={{ 
          bathroom :  product.bathrooms,
          bedrooms :  product.bedrooms,
          propertyType : product.propertyType
         }
        }
        conditions={true}
      />
    </TabsContent>

    <TabsContent value="amenities" className="pt-6">
      <AmenitiesTab amenities={product.amenities ?? []} />
    </TabsContent>

    <TabsContent value="location" className="pt-6">
      <LocationTab 
        address={product.city} 
        infrastructure={product.infrastructures ?? []}
      />
    </TabsContent>
    <TabsContent value="reviews" className="pt-6">
      <h1>Review</h1>
    </TabsContent>
  </Tabs>
)