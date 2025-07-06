"use server";

/**
 * CityPage.jsx – Server Component (JavaScript)
 * Fetch apartments for a given city from Strapi CMS with advanced filters.
 */
import "server-only";

import Image from "next/image";
import Link from "next/link";
import { MapPin, ListOrdered } from "lucide-react";
import { notFound } from "next/navigation";
import qs from "qs";

import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import ApartmentCard from "@/components/component/card/ApartmentCard";
import PageLink from "./_related/PageLink";
import { cityOptions } from "@/constants/data";
import Sidebar from "./_related/SideBar";

/* --------------------------------- CONSTS ----------------------- */
const ITEMS_PER_PAGE = 10;
const API_BASE =
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  "https://lovely-growth-c72512e849.strapiapp.com";

/* --------------------------------- HELPERS ---------------------- */
// find Russian title for breadcrumb etc.
const getRussianCity = (slug) =>
  cityOptions.find(
    (c) => c.key.toLowerCase() === decodeURIComponent(slug).toLowerCase()
  ) ?? { key: slug, name: `Unknown City (${slug})`, ru: slug };

/**
 * Build a Strapi collection endpoint with filters / pagination.
 * @param {Object} params
 * @param {string} params.citySlug – city in EN (e.g. "moscow")
 * @param {number} params.page – page number (1‑based)
 * @param {Object} params.filters – various optional filters from query‑string
 * @returns {string} fully‑qualified URL
 */
function buildEndpoint({ citySlug, page = 1, filters = {} }) {
  // base query object
  const queryObj = {
    filters: {
      city: { name: { $eq: citySlug } },
      price: {},
      rooms: {},
      bedrooms: {},
      bathrooms: {},
      infrastructures: {},
      metro_station: {},
      district: {},
      propertyType: {},
    },
    sort: "sequence_order:asc",
    populate: {
      images: { fields: ["formats"] },
      owner: { populate: ["role"] },
      district: { populate: { fields: ["name"] } },
      metro_station: { populate: { fields: ["name"] } },
      city: { populate: { area: { fields: ["name"] } } },
      location: { populate: { fields: ["name"] } },
      features: { populate: { fields: ["name"] } },
      kitchens: { populate: { fields: ["name"] } },
      amenities: { populate: { fields: ["name"] } },
      infrastructures: { populate: { fields: ["name"] } },
    },
    pagination: {
      page,
      pageSize: ITEMS_PER_PAGE,
    },
  };

  // price range
  if (filters.priceMin != null || filters.priceMax != null) {
    queryObj.filters.price.$between = [
      filters.priceMin ?? 0,
      filters.priceMax ?? Number.MAX_SAFE_INTEGER,
    ];
  }
  ["rooms", "bedrooms", "bathrooms"].forEach((k) => {
    if (filters[k] != null) {
      queryObj.filters[k].$eq = Number(filters[k]);
    }
  });
  // if (filters.cottage) queryObj.filters.propertyType.$eq = "cottage";
  // if (filters.apartment) queryObj.filters.propertyType.$eq = "apartment";
  if (filters.propertyType)
    queryObj.filters.propertyType.$eq = filters.propertyType;

  if (filters.metro) queryObj.filters.metro_station.id = { $eq: filters.metro };
  if (filters.district)
    queryObj.filters.district.id = { $eq: Number(filters.district) };

  // 3) build an $and array for amenities (AND semantics)
  if (Array.isArray(filters.amenities) && filters.amenities.length) {
    queryObj.filters.$and = filters.amenities.map((id) => ({
      amenities: { id: { $eq: Number(id) } },
    }));
  }

  // 4) you can still use $in (OR) for features & kitchens if desired:
  if (Array.isArray(filters.features) && filters.features.length) {
    queryObj.filters.$and = filters.features.map((id) => ({
      features: { id: { $eq: Number(id) } },
    }));
  }
  if (Array.isArray(filters.kitchens) && filters.kitchens.length) {
    queryObj.filters.$and = filters.kitchens.map((id) => ({
      kitchens: { id: { $eq: Number(id) } },
    }));
  }

  // 5) stringify with indexed arrays for $and
  const qsString = qs.stringify(queryObj, {
    encodeValuesOnly: true,
    arrayFormat: "indices", // produces $and[0], $and[1], ...
    skipNulls: true,
  });

  return `${API_BASE}/api/products?${qsString}`;
}

/**
 * Copy plain object to URLSearchParams, skipping empty / undefined values.
 */
const copyParamsSafe = (obj) => {
  const q = new URLSearchParams();
  if (!obj) return q;
  Object.keys(obj).forEach((k) => {
    const v = obj[k];
    if (v === undefined || v === null || v === "") return;
    q.set(k, Array.isArray(v) ? v.join(",") : String(v));
  });
  return q;
};

/**
 * Build a link switching between list / map view without losing params.
 */
const buildViewLink = ({ citySlug, currentSearchParams, nextView }) => {
  const q = copyParamsSafe(currentSearchParams);
  q.set("view", nextView);
  return `/${citySlug}?${q.toString()}`;
};

/* ------------------------------------------------------------------
 * Server Component – runs on every request
 * -----------------------------------------------------------------*/
export default async function CityPage({ params, searchParams = {} }) {
  const citySlug = params?.city ?? "";
  const city = cityOptions.find((c) => c.key === citySlug.toLowerCase());
  if (!city) notFound();

  /* ───── derive state from URL ───── */
  const currentPage = parseInt(searchParams.page ?? "1", 10);
  const view = searchParams.view === "map" ? "map" : "list";

  const filters = {
    priceMin: searchParams.priceMin,
    priceMax: searchParams.priceMax,
    rooms: searchParams.rooms,
    bedrooms: searchParams.bedrooms,
    bathrooms: searchParams.bathrooms,
    metro: searchParams.metro,
    district: searchParams.district,
    amenities: searchParams.amenities?.split(",") ?? [],
    kitchens: searchParams.kitchens?.split(",") ?? [],
    features: searchParams.features?.split(",") ?? [],
    propertyType: searchParams.propertyType,
    // cottage: searchParams.cottage,
    // apartment: searchParams.apartment,
  };

  /* ───── fetch data ───── */
  const endpoint = buildEndpoint({ citySlug, page: currentPage, filters });

  let apartments = [];
  let meta = { pagination: { pageCount: 1 } };
  let error = "";
  try {
    const res = await fetch(endpoint, {
      cache: "no-store",
      next: { revalidate: 60 },
    });

    if (!res.ok) throw new Error(`API error ${res.status}`);
    // debugger

    const json = await res.json();
    apartments = json.data ?? [];

    meta = json.meta ?? meta;
  } catch (e) {
    console.error("Fetch failed", e);
    error = "Не удалось загрузить данные. Попробуйте позже.";
  }

  /* pagination link builder */
  const buildPageLink = (page) => {
    const q = copyParamsSafe(searchParams);
    page === 1 ? q.delete("page") : q.set("page", String(page));
    return `/${citySlug}?${q.toString()}`;
  };

  const totalPages = meta.pagination.pageCount ?? 1;
  const cityRussian = getRussianCity(citySlug);

  /* ------------------------------ RENDER ------------------------- */
  return (
    <div>
      {/* Hero (desktop) */}
      <section className="hidden md:block relative h-[260px] lg:h-[320px]">
        <Image
          src="/images/aboutUs.jpg"
          alt="Недвижимость премиум‑класса"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-primary-dark/80 flex flex-col items-center justify-center text-center px-2">
          <h1 className="font-bold text-white text-2xl lg:text-3xl max-w-4xl">
            Квартиры посуточно в {cityRussian.ru}
          </h1>
          <p className="text-white mt-2 max-w-3xl">
            На нашем сайте вы можете найти подходящий вариант посуточной аренды
            квартиры в городе {cityRussian.ru}. Мы публикуем объявления от
            собственников, что позволяет выбрать нужную вам квартиру по выгодной
            цене.
          </p>
        </div>
      </section>

      <div className="relative flex min-h-screen max-w-7xl mx-auto flex-col lg:flex-row">
        {/* Sidebar */}
        <aside className="overflow-y-auto">
          <Sidebar citySlug={citySlug} defaultValues={filters} />
        </aside>

        {/* Main content */}
        <main className="flex-1 lg:w-3/4 px-4 lg:px-8 pt-4 pb-10">
          <div className="mb-6 flex flex-row items-center justify-between gap-4">
            <Breadcrumbs
              items={[
                { key: "home", label: "Главная", href: "/" },
                { key: "city", label: cityRussian.ru },
              ]}
            />
            <div className="flex items-center gap-2">
              <Link
                href={buildViewLink({
                  citySlug,
                  currentSearchParams: searchParams,
                  nextView: "list",
                })}
                className={`inline-flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
                  view === "list"
                    ? "bg-primary-dark text-white"
                    : "bg-muted hover:bg-muted/70"
                }`}
              >
                <ListOrdered className="h-4 w-4" />
                <span className="hidden md:block text-sm ">Список</span>
              </Link>
              <Link
                href={buildViewLink({
                  citySlug,
                  currentSearchParams: searchParams,
                  nextView: "map",
                })}
                className={`inline-flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
                  view === "map"
                    ? "bg-primary-dark text-white"
                    : "bg-muted hover:bg-muted/70"
                }`}
              >
                <MapPin className="h-4 w-4" />
                <span className="hidden md:block text-sm ">Карта</span>
              </Link>
            </div>
          </div>

          {error && (
            <p className="py-20 text-center text-primary-hover">{error}</p>
          )}

          {view === "list" && !error && (
            <>
              {apartments.length ? (
                <>
                  <div className="grid grid-cols-1 gap-3">
                    {apartments.map((p) => (
                      <ApartmentCard key={p.id} data={p} city={citySlug} />
                    ))}
                  </div>

                  <nav className="mt-12 flex items-center justify-center gap-2">
                    <PageLink
                      href={buildPageLink(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      Prev
                    </PageLink>
                    {Array.from({ length: totalPages }, (_, i) => (
                      <PageLink
                        key={i}
                        href={buildPageLink(i + 1)}
                        active={currentPage === i + 1}
                      >
                        {i + 1}
                      </PageLink>
                    ))}
                    <PageLink
                      href={buildPageLink(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </PageLink>
                  </nav>
                </>
              ) : (
                <div className="py-20 text-center">
                  <h2 className="text-2xl text-gray-600">Ничего не найдено</h2>
                  <Link
                    href={`/${citySlug}`}
                    className="mt-4 inline-block text-primary-dark hover:text-primary-light"
                  >
                    Просмотреть все объекты недвижимости
                  </Link>
                </div>
              )}
            </>
          )}

          {view === "map" && !error && (
            <div className="w-full h-[600px] bg-gray-200 flex items-center justify-center rounded-xl">
              <p className="text-gray-600">
                Здесь будет интерактивная карта с объектами.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
