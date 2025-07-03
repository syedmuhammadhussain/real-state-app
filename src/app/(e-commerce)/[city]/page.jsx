import "server-only";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ListOrdered } from "lucide-react";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import ApartmentCard from "@/components/component/card/ApartmentCard";
import PageLink from "./_related/PageLink";
import { cityOptions } from "@/constants/data";
import Sidebar from "./_related/SideBar";

/* --------------------------------- CONSTS ----------------------- */
const ITEMS_PER_PAGE = 10;
const API_BASE =
  // process.env.NEXT_PUBLIC_STRAPI_URL ||
  "https://lovely-growth-c72512e849.strapiapp.com";

/* --------------------------------- HELPERS ---------------------- */
const getRussianCity = (slug) =>
  cityOptions.find(
    (c) => c.key.toLowerCase() === decodeURIComponent(slug).toLowerCase(),
  ) ?? { key: slug, name: `Unknown City (${slug})`, ru: slug };

/**
 * Build a Strapi endpoint from high‑level filters coming from the URL.
 */
function buildEndpoint({
  citySlug,
  page = 1,
  filters = {},
}) {
  const url = new URL("/api/products", API_BASE);
  console.log("Building endpoint for city:", url);
  /* -------  COMMON  ------- */
  url.searchParams.set("filters[city][name][$eq]", citySlug);
  url.searchParams.set("sort", "sequence_order:asc");
  url.searchParams.set("pagination[page]", String(page));
  url.searchParams.set("pagination[pageSize]", String(ITEMS_PER_PAGE));

  // populate (mirrors the reference query)
  url.searchParams.set("populate[images][fields]", "formats");
  url.searchParams.set("populate[owner][populate]", "role");
  url.searchParams.set("populate[district][populate][fields]", "name");
  url.searchParams.set("populate[city][populate][area][fields]", "name");
  url.searchParams.set("populate[location][populate][fields]", "name");
  ["features","kitchens","amenities","infrastructures"].forEach((rel) =>
    url.searchParams.set(`populate[${rel}][populate][fields]`, "name"),
  );

  /* -------  OPTIONAL FILTERS  ------- */
  const { priceMin,priceMax,rooms,beds,bedrooms,bathrooms,metro,district,amenities,feature, cottage } = filters

  // price – Strapi BETWEEN syntax
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

const copyParamsSafe = (obj) => {
  const q = new URLSearchParams();
  if (!obj) return q;
  Object.keys(obj).forEach((k) => {
    const v = obj[k];
    if (v === undefined || v === null || v === "") return;
    q.set(k, Array.isArray(v) ? v.join(",") : String(v));
  });
  return q;
}

const buildViewLink = ({
  citySlug,
  currentSearchParams,
  nextView,
}) => {
  const q = copyParamsSafe(currentSearchParams);
  q.set("view", nextView);
  return `/${citySlug}?${q.toString()}`;
}

/* ------------------------------------------------------------------
 * Server Component – runs on every request
 * -----------------------------------------------------------------*/

export default async function CityPage({
  params,
  searchParams = {},
}) {
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
    beds: searchParams.beds,
    bedrooms: searchParams.bedrooms,
    bathrooms: searchParams.bathrooms,
    metro: searchParams.metro,
    district: searchParams.district,
    amenities: searchParams.amenities?.split(",") ?? [],
    feature: searchParams.feature,
    cottage: searchParams.cottage,
  };

  /* ───── fetch data ───── */
  const endpoint = buildEndpoint({ citySlug, page: currentPage, filters });

  let apartments= [];
  let meta = { pagination: { pageCount: 1 } };
  let error = "";
  try {
    const res = await fetch(endpoint, { next: { revalidate: 60 } },{ cache: "no-store" });
    if (!res.ok) throw new Error("API error");
    const json = await res.json();
    apartments = json.data ?? [];
    meta = json.meta ?? meta;
  } catch (e) {
    console.error(e);
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
          <Sidebar
            citySlug={citySlug}
            defaultValues={filters}
          />
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
              <p className="text-gray-600">Здесь будет интерактивная карта с объектами.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
