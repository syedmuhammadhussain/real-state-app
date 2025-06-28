
// import NextLink from '@/components/ui/NextLink'
import EmblaCarousel from '../product-slider/EmblaCarousel'
import { cityOptions } from '@/constants/data'

const Categories = () => {
  return (
   <div className="">
      <h3 className="text-2xl md:text-4xl font-bold text-primary-dark text-left">Список России</h3>
      <EmblaCarousel categories = {true} slides={cityOptions} />
  </div>
  )
}

export default Categories