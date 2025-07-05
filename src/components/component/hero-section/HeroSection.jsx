import Image from "next/image";
import StepsOverlay from "./StepsOverlay";
import FramerSelectShadcn from "./FramerSelectShadcn";
import { steps } from "@/constants/data";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen w-full">
    {/* shagyy */}
    <StepsOverlay steps = {steps} />

        {/* Background Image */}
        <Image
          src='/images/hero/hero.jpg'
          alt='ПОСУТОЧНАЯ АРЕНДА ЖИЛЬЯ В ГОРОДАХ РОССИИ'
          priority
          quality={100}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-gray-900/30 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl w-full space-y-8">
              <h1 className=" text-4xl md:text-6xl text-white drop-shadow-xl"> 
                 {/* ПОСУТОЧНАЯ АРЕНДА ЖИЛЬЯ<br/> В ГОРОДАХ РОССИИ  */}
                 kvkey.com — ключ в один клик
                 </h1>
              <p className="mt-4 md:mt-6 text-md  md:text-xl text-gray-100  mx-auto leading-relaxed"> 
                {/* Просторные планировки — престижные районы — привлекательные цены  */}
               Добро пожаловать на уникальную доску объявлений по посуточной аренде квартир и коттеджей в любом городе России. Здесь вы найдёте идеальное жильё для отдыха, деловых поездок или кратковременного проживания. 
               {/* Всё просто и удобно: никакой комиссии, посредников и сложных правил бронирования. Только прямые контакты хозяев недвижимости и честные цены. */}

                </p>
                {/* CTA Buttons */}
                <FramerSelectShadcn/>
            </div>
        </div>
    </section>
  );
};

export default HeroSection;
