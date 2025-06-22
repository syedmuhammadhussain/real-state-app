import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"
import { api } from "./api";

export const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getStrapiURL() {
  return  "https://supportive-book-28b595a0b7.strapiapp.com";
}

export function getStrapiMedia(url) {
  if (url == null) return null;
  if (url.startsWith("data:")) return url;
  if (url.startsWith("http") || url.startsWith("//")) return url;
  return `${getStrapiURL()}${url}`;
}

// for workin as a sind
export async function getApartmentById(id) {
  try {
    const response =  await api.get(`${apiUrl}/products/${id}?populate[images][populate]=*&populate[owner][populate]=*&populate[district][populate]=*&populate[city][populate][area][fields][0]=name&populate[location][populate]=*&populate[features][populate]=*&populate[kitchens][populate]=*&populate[amenities][populate]=*&populate[infrastructures][populate]=*`,
    );
    if (!response.ok) {
      throw new Error('فشل في جلب بيانات الشقة');
    }
    
    return await response.json();
  } catch (error) {
    console.error('حدث خطأ أثناء جلب بيانات الشقة:', error);
    return null;
  }
}