import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"
import { api } from "./api";

export const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getStrapiURL() {
  return  process.env.NEXT_PUBLIC_BASE_URL;
}

export function getStrapiMedia(url) {
  if (url == null) return null;
  if (url.startsWith("data:")) return url;
  if (url.startsWith("http") || url.startsWith("//")) return url;
  return `${getStrapiURL()}${url}`;
}


export const formatDate = (dateString) => {
  const date = new Date(dateString);
  // Проверка на валидность даты
  if (isNaN(date.getTime())) {
    return "Неверная дата";
  }
  const day = date.getDate().toString().padStart(2, '0');
  const month = date.toLocaleString('ru-RU', { month: 'long' });
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${day} ${month} ${year}, ${hours}:${minutes}`;
};

// extract image from apartment.images for strapi which contained many format of images
export const extractUrl = (img) => {
  if (img instanceof File) return null; // File has no remote URL
  if (typeof img === 'string') return img;
  return (
    img?.url ??
    img?.formats?.large?.url ??
    img?.formats?.medium?.url ??
    img?.formats?.small?.url ??
    img?.formats?.thumbnail?.url ??
    null
  );
};

// export const  copyParamsSafe = (obj) => {
//   const q = new URLSearchParams();
//   if (!obj) return q;
//   Object.keys(obj).forEach((k) => {
//     const v = obj[k];
//     if (v === undefined || v === null || v === "") return;
//     q.set(k, Array.isArray(v) ? v.join(",") : String(v));
//   });
//   return q;
// }

// export const buildViewLink = ({
//   citySlug,
//   currentSearchParams,
//   nextView,
// }) => {
//   const q = copyParamsSafe(currentSearchParams);
//   q.set("view", nextView);
//   return `/${citySlug}?${q.toString()}`;
// }

//   /* pagination link builder */
//   export const buildPageLink = (page, searchParams) => {
//     const q = copyParamsSafe(searchParams);
//     page === 1 ? q.delete("page") : q.set("page", String(page));
//     return `/${citySlug}?${q.toString()}`;
//   };