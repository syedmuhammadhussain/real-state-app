import HeroSection from '@/components/component/hero-section/HeroSection';
import Categories from '@/components/component/categories/Categories';
import RentalSection from '@/components/component/rental-section/RentalSection';
import CityIndex from '@/components/component/city-index/CityIndex';

export default function ProductPage() {
  return (
    <>
      <HeroSection/>
      <div className = "px-3 lg:px-4">
        <Categories/>
        <RentalSection/>
      </div>
      <CityIndex/>
    </>
  );
}