'use client'
import React from 'react'
import { useApartment } from '../../../../context/ApartmentContext';
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

const Helper = ({citySlug}) => {

     const {cities}  = useApartment()
    
        const city = cities?.find(( c ) => c.slug === citySlug);
        const cityRussian = city ? city.name : '';
  return (
    <div> 
        <Breadcrumbs
              items={[
                { key: "home", label: "Главная", href: "/" },
                { key: "city", label:  cityRussian  //cityRussian
                 },
              ]}
            />
            </div>
  )
}

export default Helper