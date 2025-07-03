import Categories from '@/components/component/hero-section/Categories';
import CityIndex from '@/components/component/hero-section/CityIndex';
import HeroSection from '@/components/component/hero-section/HeroSection';
import KvkeyBenefits from '@/components/component/hero-section/KvkeyBenefits';
import KvkeyHowItWorks from '@/components/component/hero-section/KvkeyHowItWorks';
import RentalSection from '@/components/component/hero-section/RentalSection';

export default function ProductPage() {
  return (
    <>
      <HeroSection/>
      <div className = "max-w-7xl px-3 lg:px-4 mx-auto">
        <KvkeyHowItWorks/>

        <Categories/>
        <RentalSection/>
        <KvkeyBenefits/>
        <CityIndex/>

      </div>
    </>
  );
}