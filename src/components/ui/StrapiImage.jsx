import Image from "next/image";
import { getStrapiMedia } from "@/lib/utils";

export function StrapiImage({ src, alt, height, width, className }) {
  const imageUrl = getStrapiMedia(src);
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