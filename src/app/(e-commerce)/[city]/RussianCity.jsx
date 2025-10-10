'use client'
import React from 'react'
import { useApartment } from '../../../../context/ApartmentContext'
import Image from 'next/image'

const RussianCity = ({citySlug }) => {

    const {cities}  = useApartment()

    const city = cities?.find(( c ) => c.slug === citySlug);
    const cityRussian = city ? city.name : '';

  return (
     <section className=" hidden md:block relative h-[260px] lg:h-[320px]">
        <Image
          src="/images/aboutUs.jpg"
          alt="Недвижимость премиум‑класса"
          fill
          className="object-cover"
          // priority
          loading="lazy"
        />
        <div className="absolute inset-0 bg-primary-dark/65 flex flex-col items-center justify-center text-center px-2">
          <h1 className=" mt-12 font-bold text-white text-2xl lg:text-3xl max-w-4xl">
            Квартиры посуточно в {cityRussian}

             {/* {citySlug}  */}
          </h1>
          <p className="text-white mt-2 max-w-3xl">
            На нашем сайте вы можете найти подходящий вариант посуточной аренды
            квартиры в городе {cityRussian}. Мы публикуем объявления от
            собственников, что позволяет выбрать нужную вам квартиру по выгодной
            цене.
          </p>
        </div>
      </section>
  )
}

export default RussianCity