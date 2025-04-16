
import NextLink from '@/components/ui/NextLink'
import EmblaCarousel from '../product-slider/EmblaCarousel'
import { cityOptions } from '@/constants/data'

const Categories = () => {
  return (
   <div className="mt-5 p-2 lg:p-4">
      <h2 className="text-2xl  lg:text-3xl font-bold text-primary-dark text-left ">Города России
      <span className="text-md lg:text-lg ml-5 text-primary-hover cursor-pointer hover:text-primary-dark underline transition-all delay-100 "> 
        <NextLink href='/city' className='responsive-appbar-button'> Все</NextLink> </span>
      </h2>
      <EmblaCarousel categories = {true} slides={cityOptions} />
  </div>
  )
}

export default Categories