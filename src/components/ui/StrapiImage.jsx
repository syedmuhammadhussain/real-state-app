'use client'
import Image from "next/image";
import { getStrapiMedia } from "@/lib/utils";
import { useApartment } from "../../../context/ApartmentContext";

export function StrapiImage({ src, alt, height, width, className,   needUrl = true }) {
  const {editMode} =  useApartment();

  const imageUrl =   needUrl ? getStrapiMedia(`https://admin.kvkey.ru${src}`)  : src ;
  if (!imageUrl) return null;



  return (
    <img
      src={imageUrl}
      alt={alt}
    //   fill
    //   height={height}
    //   width={width}
      className={className}
    />
  );
}