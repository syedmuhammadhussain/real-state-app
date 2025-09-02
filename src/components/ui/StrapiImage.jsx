"use client";

import { useState, useEffect } from "react";
import { getStrapiMedia } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function StrapiImage({ src, alt, className }) {
  const [imageUrl, setImageUrl] = useState(null);

  const pathname = usePathname() ?? "/";
  const segment =
    pathname.replace(/\/+$/, "").split("/").filter(Boolean).pop() ?? "";

  useEffect(() => {
    if (segment === "add-apartment") {
      setImageUrl(src);
    } else if (src && src?.includes("/uploads/")) {
      setImageUrl(getStrapiMedia(`http://localhost:1337${src}`));
    } else setImageUrl(src);
  }, [segment]);

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
