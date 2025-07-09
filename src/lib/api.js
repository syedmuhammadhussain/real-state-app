import axios from "axios";
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const api = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically attach Bearer token from localStorage before each request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken"); // Replace 'authToken' if you're using a different key
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export { api };

// get single apartment finction
export async function getApartment(id) {
  const url = `${apiUrl}/products/${id}?populate[images][populate]=*&populate[owner][populate]=*&populate[district][populate]=*&populate[city][populate][area][fields][0]=name&populate[location][populate]=*&populate[features][populate]=*&populate[kitchens]    [populate]=*&populate[amenities][populate]=*&populate[infrastructures][populate]=*`;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) return null;
  const { data } = await res.json();
  return data;
}

// uploader image endPoint

// handle uploading image
export const uploadImages = async (images, endPoint = "/upload") => {
  if (!images || images.length === 0) return [];

  const formData = new FormData();
  images.forEach((image) => {
    formData.append("files", image);
  });

  try {
    const response = await api.post(`${apiUrl}${endPoint}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      // onUploadProgress: (progressEvent) => {},
    });

    return response.data;
  } catch (error) {
    console.error("Upload failed:", error);
    throw new Error("Image upload failed.");
  }
};

// lib/strapi-utils.ts

const API_BASE = "http://localhost:1337";

export const ITEMS_PER_PAGE = 10;

// build endpoit
export function buildEndpoint({ citySlug, page = 1, filters = {} }) {
  const url = new URL("/api/products", API_BASE);

  url.searchParams.set("filters[city][name][$eq]", citySlug);
  url.searchParams.set("sort", "sequence_order:asc");
  url.searchParams.set("pagination[page]", String(page));
  url.searchParams.set("pagination[pageSize]", String(ITEMS_PER_PAGE));

  // populate
  url.searchParams.set("populate[images][fields]", "formats");
  url.searchParams.set("populate[owner][populate]", "role");
  url.searchParams.set("populate[district][populate][fields]", "name");
  url.searchParams.set("populate[city][populate][area][fields]", "name");
  url.searchParams.set("populate[location][populate][fields]", "name");

  ["features", "kitchens", "amenities", "infrastructures"].forEach((rel) =>
    url.searchParams.set(`populate[${rel}][populate][fields]`, "name")
  );

  // filters
  const {
    priceMin,
    priceMax,
    rooms,
    beds,
    bedrooms,
    bathrooms,
    metro,
    district,
    amenities,
    feature,
    cottage,
  } = filters;

  if (priceMin !== undefined || priceMax !== undefined) {
    url.searchParams.set("filters[price][$between][0]", priceMin ?? "0");
    url.searchParams.set("filters[price][$between][1]", priceMax ?? "1000000");
  }

  if (feature) url.searchParams.set("filters[features][id]", feature);
  if (rooms) url.searchParams.set("filters[apartmentType][$eq]", rooms);
  if (beds) url.searchParams.set("filters[beds][$eq]", beds);
  if (bedrooms) url.searchParams.set("filters[bedrooms][$eq]", bedrooms);
  if (bathrooms) url.searchParams.set("filters[bathrooms][$eq]", bathrooms);
  if (metro) url.searchParams.set("filters[metro][$eq]", metro);
  if (district) url.searchParams.set("filters[district][$eq]", district);
  if (amenities?.length)
    url.searchParams.set("filters[amenities][name][$in]", amenities.join(","));
  if (cottage) url.searchParams.set("filters[propertyType][$eq]", "cottage");

  return url.toString();
}
