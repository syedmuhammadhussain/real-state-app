"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, MapPin, ListOrdered } from "lucide-react";
import { Sidebar } from "./_related/SideBar";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import PageLink from "./_related/PageLink";
import { cityOptions } from "@/constants/data";
import { api } from "@/lib/api";
import { useApartment } from "../../../../context/ApartmentContext";
import ApartmentCard from "@/components/component/card/ApartmentCard";

/* --------------------------------- UTILS ------------------------ */
const ITEMS_PER_PAGE = 5; // == pagination[pageSize]
const getRussianCity = (slug) =>
  cityOptions.find(
    (c) => c.key.toLowerCase() === decodeURIComponent(slug).toLowerCase(),
  ) ?? { key: slug, name: `Unknown City (${slug})`, ru: slug };

/* ------------------------------------------------------------------
 * CityPage component
 * -----------------------------------------------------------------*/
export default function CityPage({ params }) {
  /* 1️⃣ unwrap dynamic segment */
  const { city: citySlug = "" } = React.use(params);
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const [view, setView] = useState("list"); // «list» | «map»

  if (!citySlug) return <p className="p-10 text-center">Loading…</p>;

  /* 2️⃣ city label */
  const cityRussian = getRussianCity(citySlug);

  /* 3️⃣ local state */
  const { apartments, setApartments } = useApartment();
  const [meta, setMeta] = useState({ pagination: { pageCount: 1 } });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* 4️⃣ extract filters from URL */
  const filters = {
    rooms: searchParams.get("rooms"),
    priceMin: searchParams.get("priceMin"),
    priceMax: searchParams.get("priceMax"),
    beds: searchParams.get("beds"),
    metro: searchParams.get("metro"),
    amenities: searchParams.get("amenities")?.split(",") || [],
    cottage: searchParams.get("cottage"),
    district: searchParams.get("district"),
  };

  /* 5️⃣ Strapi URL builder - UPDATED TO MATCH PROVIDED QUERY */
  const buildApiUrl = () => {
    const q = new URLSearchParams();
    
    // Base filters
    q.set("filters[city][name][$eq]", citySlug);
    q.set("sort", "sequence_order:asc");
    q.set("pagination[page]", currentPage.toString());
    q.set("pagination[pageSize]", ITEMS_PER_PAGE.toString());

    // Populate parameters
    q.set("populate[images][populate]", "*");
    q.set("populate[owner][populate]", "*");
    q.set("populate[district][populate]", "*");
    q.set("populate[city][populate][area][fields][0]", "name");
    q.set("populate[location][populate]", "*");
    q.set("populate[features][populate]", "*");
    q.set("populate[kitchens][populate]", "*");
    q.set("populate[amenities][populate]", "*");
    q.set("populate[infrastructures][populate]", "*");

    // Field selections
    [
      "title",
      "bathrooms",
      "bedrooms",
      "description",
      "propertyType",
      "size",
      "price",
    ].forEach((f) => q.append("fields", f));

    /* dynamic filters */
    if (filters.rooms)
      q.set("filters[apartmentParameters][apartmentType][$eq]", filters.rooms);
    if (filters.beds)
      q.set("filters[apartmentParameters][singleBeds][$eq]", filters.beds);
    if (filters.priceMin) q.set("filters[price][$gte]", filters.priceMin);
    if (filters.priceMax) q.set("filters[price][$lte]", filters.priceMax);
    if (filters.metro) q.set("filters[metro][$eq]", filters.metro);
    if (filters.district) q.set("filters[district][$eq]", filters.district);
    if (filters.amenities.length)
      q.set("filters[amenities][name][$in]", filters.amenities.join(","));

    return `/products?${q.toString()}`;
  };

  /* 6️⃣ fetch whenever slug / page / filters change */
  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      setError("");
      try {
        const apiUrl = buildApiUrl();
        const { data } = await api.get(apiUrl);
        setApartments(data?.data || []);
        setMeta(data?.meta || { pagination: { pageCount: 1 } });
      } catch (err) {
        console.error(err);
        setError("Не удалось загрузить данные. Попробуйте позже.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [citySlug, currentPage, searchParams.toString()]);

  /* 7️⃣ pagination helpers */
  const totalPages = meta.pagination.pageCount ?? 1;
  const buildLink = (page) => {
    const q = new URLSearchParams(searchParams.toString());
    page === 1 ? q.delete("page") : q.set("page", page);
    return `/${citySlug}?${q.toString()}`;
  };

  /* 8️⃣ JSX */
  return (
    <>
      {/* Hero banner (desktop only) */}
      <section className="hidden md:block mb-6 relative h-[240px] lg:h-[260px]">
        <Image
          src="/images/aboutUs.jpg"
          alt="Недвижимость премиум-класса"
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

      <div className=" mx-auto flex min-h-screen lg:flex-row flex-col">
        {/* ──────────────── SIDEBAR (lg≥)────────────── */}
        <aside className="hidden lg:block lg:w-1/4 lg:min-w-[260px] border-r bg-slate-50 p-4 overflow-y-auto">
          <Sidebar
            defaultValues={filters}
            onApply={(vals) => {
              const q = new URLSearchParams();
              Object.entries(vals).forEach(([k, v]) => v && q.set(k, v));
              router.push(`/${citySlug}?${q.toString()}`);
            }}
            metro={[]}
            district={[]}
          />
        </aside>

        {/* ──────────────── MAIN ────────────────────── */}
        <main className="flex-1 w-full px-4 lg:px-8 pt-4 pb-10">
          <div className="mb-3 flex flex-wrap items-start justify-between gap-4">
            <Breadcrumbs
              items={[
                { key: "home", label: "Главная", href: "/" },
                { key: "city", label: cityRussian.ru },
              ]}
            />
            <p className="text-primary-default text-sm">
              Страница{" "}
              <span className="text-primary-dark">
                {currentPage} из {totalPages}
              </span>
            </p>
          </div>

          <Tabs value={view} onValueChange={setView} className="w-full ">
            <TabsList className="grid w-full grid-cols-2  sm:inline-flex items-end justify-end">
              <TabsTrigger value="list" className="flex items-center gap-1">
                <ListOrdered className="h-4 w-4" /> Список
              </TabsTrigger>
              <TabsTrigger value="map" className="flex items-center gap-1">
                <MapPin className="h-4 w-4" /> Карта
              </TabsTrigger>
            </TabsList>

            <TabsContent value="list">
              {loading && (
                <div className="flex items-center justify-center py-10 gap-4">
                  <Loader2 className="h-10 w-10 animate-spin text-primary-hover" />
                </div>
              )}
              {error && (
                <p className="py-20 text-center text-primary-hover">{error}</p>
              )}

              {!loading && !error && apartments.length > 0 && (
                <>
                  <div className="grid grid-cols-1 gap-3">
                    {apartments?.map((p) => (
                      <ApartmentCard key={p.id} data={p} city={citySlug} />
                    ))}
                  </div>

                  <nav className="mt-12 flex items-center justify-center gap-2">
                    <PageLink
                      href={buildLink(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      Prev
                    </PageLink>
                    {Array.from({ length: totalPages }, (_, i) => (
                      <PageLink
                        key={i}
                        href={buildLink(i + 1)}
                        active={currentPage === i + 1}
                      >
                        {i + 1}
                      </PageLink>
                    ))}
                    <PageLink
                      href={buildLink(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </PageLink>
                  </nav>
                </>
              )}
            </TabsContent>

            <TabsContent value="map">
              <div className="w-full h-[600px] bg-gray-200 flex items-center justify-center rounded-lg">
                <p className="text-gray-600">
                  Здесь будет интерактивная карта с объектами.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </>
  );
}
  
  // // /* ------------------------------------------------------------------
  // //  * CityPage – server‑side (Next.js App Router) with **safe** URL manipulation
  // //  * ------------------------------------------------------------------*/
  // import "server-only";
  // import Image from "next/image";
  // import Link from "next/link";
  // import {
  //   Tabs,
  //   TabsContent,
  //   TabsList,
  //   TabsTrigger,
  // } from "@/components/ui/tabs";
  // import { MapPin, ListOrdered } from "lucide-react";
  // import { Sidebar } from "./_related/SideBar"; // ← client component
  // import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
  // import ApartmentCard from "@/components/component/card/ApartmentCard";
  // import PageLink from "./_related/PageLink";
  // import { cityOptions } from "@/constants/data";
  
  // /* --------------------------------- CONSTS ----------------------- */
  // const ITEMS_PER_PAGE = 10; // Strapi page size
  
  // /* --------------------------------- HELPERS ---------------------- */
  // const getRussianCity = (slug) =>
  //   cityOptions.find(
  //     (c) => c.key.toLowerCase() === decodeURIComponent(slug).toLowerCase(),
  //   ) ?? { key: slug, name: `Unknown City (${slug})`, ru: slug };
  
  // function buildApiPath({ citySlug, page, filters }) {
  //   const q = new URLSearchParams();
  //   q.set("filters[city][name][$eq]", citySlug);
  //   [
  //     "images",
  //     "features",
  //     "kitchens",
  //     "amenities",
  //     "infrastructures",
  //   ].forEach((p) => q.append("populate", p));
  //   [
  //     "title",
  //     "bathrooms",
  //     "bedrooms",
  //     "description",
  //     "propertyType",
  //     "size",
  //     "price",
  //   ].forEach((f) => q.append("fields", f));
  
  //   q.set("pagination[page]", page.toString());
  //   q.set("pagination[pageSize]", ITEMS_PER_PAGE.toString());
  
  //   if (filters.rooms)
  //     q.set("filters[apartmentParameters][apartmentType][$eq]", filters.rooms);
  //   if (filters.beds)
  //     q.set("filters[apartmentParameters][singleBeds][$eq]", filters.beds);
  //   if (filters.priceMin) q.set("filters[price][$gte]", filters.priceMin);
  //   if (filters.priceMax) q.set("filters[price][$lte]", filters.priceMax);
  //   if (filters.metro) q.set("filters[metro][$eq]", filters.metro);
  //   if (filters.district) q.set("filters[district][$eq]", filters.district);
  //   if (filters.amenities?.length)
  //     q.set("filters[amenities][name][$in]", filters.amenities.join(","));
  
  //   return `/products?${q.toString()}`;
  // }
  
  // /**
  //  * Safely copy query params to URLSearchParams (ignores Symbol keys).
  //  */
  // function copyParamsSafe(obj) {
  //   const q = new URLSearchParams();
  //   if (!obj) return q;
  //   Object.keys(obj).forEach((k) => {
  //     const v = obj[k];
  //     if (v === undefined || v === null || v === "") return;
  //     q.set(k, Array.isArray(v) ? v.join(",") : String(v));
  //   });
  //   return q;
  // }
  
  // /**
  //  * Build link switching the `view` param.
  //  */
  // function buildViewLink({ citySlug, currentSearchParams, nextView }) {
  //   const q = copyParamsSafe(currentSearchParams);
  //   q.set("view", nextView);
  //   return `/${citySlug}?${q.toString()}`;
  // }
  
  // /* ------------------------------------------------------------------
  //  * Server Component – runs on every request
  //  * -----------------------------------------------------------------*/
  // export default async function CityPage({ params, searchParams = {} }) {
  //   const citySlug = params.city ?? "";
  //   if (!citySlug) {
  //     return <p className="p-10 text-center">Loading…</p>;
  //   }
  
  //   /* ───── derive state from URL ───── */
  //   const currentPage = parseInt(searchParams.page ?? "1", 10);
  //   const view = searchParams.view === "map" ? "map" : "list";
  //   const filters = {
  //     rooms: searchParams.rooms ?? "",
  //     priceMin: searchParams.priceMin ?? "",
  //     priceMax: searchParams.priceMax ?? "",
  //     beds: searchParams.beds ?? "",
  //     metro: searchParams.metro ?? "",
  //     amenities: searchParams.amenities?.split(",") ?? [],
  //     cottage: searchParams.cottage ?? "",
  //     district: searchParams.district ?? "",
  //   };
  
  //   /* ───── fetch data ───── */
  //   const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;
  //   const apiPath = buildApiPath({ citySlug, page: currentPage, filters });
  //   let apartments = [];
  //   let meta = { pagination: { pageCount: 1 } };
  //   let error = "";
  //   try {
  //     const res = await fetch(`${apiBase}${apiPath}`, { cache: "no-store" });
  //     if (!res.ok) throw new Error("API error");
  //     const json = await res.json();
  //     apartments = json.data ?? [];
  //     meta = json.meta ?? meta;
  //   } catch (e) {
  //     console.error(e);
  //     error = "Не удалось загрузить данные. Попробуйте позже.";
  //   }
  
  //   /* pagination link builder (safe) */
  //   const buildPageLink = (page) => {
  //     const q = copyParamsSafe(searchParams);
  //     if (page === 1) {
  //       q.delete("page");
  //     } else {
  //       q.set("page", page.toString());
  //     }
  //     return `/${citySlug}?${q.toString()}`;
  //   };
  
  //   const totalPages = meta.pagination.pageCount ?? 1;
  //   const cityRussian = getRussianCity(citySlug);
  
  //   /* ------------------------------ RENDER ------------------------- */
  //   return (
  
  //     <>
  //       {/* Hero (desktop) */}
  //       <section className="hidden md:block  relative h-[260px] lg:h-[320px]">
  //           <Image
  //             src="/images/aboutUs.jpg"
  //             alt="Недвижимость премиум‑класса"
  //             fill
  //             className="object-cover"
  //             priority
  //           />
  //           <div className="absolute inset-0 bg-primary-dark/80 flex flex-col items-center justify-center text-center px-2">
  //             <h1 className="font-bold text-white text-2xl lg:text-3xl max-w-4xl">
  //               Квартиры посуточно в {cityRussian.ru}
  //             </h1>
  //             <p className="text-white mt-2 max-w-3xl">
  //               На нашем сайте вы можете найти подходящий вариант посуточной аренды квартиры в городе {cityRussian.ru}. Мы публикуем объявления от собственников, что позволяет выбрать нужную вам квартиру по выгодной цене.
  //             </p>
  //           </div>
  //         </section>
  
  // <div className="flex min-h-screen flex-col lg:flex-row">
  //       {/* ───── Sidebar (desktop) ───── */}
  //       <aside className="hidden lg:block lg:w-1/4 lg:min-w-[260px] border-r bg-slate-50 p-4 overflow-y-auto">
  //         <Sidebar
  //           defaultValues={filters}
  //           onApply={undefined /* handled in client sidebar */}
  //           metro={[]}
  //           district={[]}
  //         />
  //       </aside>
  
  //       {/* ───── Main content ───── */}
  //       <main className="flex-1 w-full px-4 lg:px-8 pt-4 pb-10">
         
  //         {/* Header row: breadcrumbs + view‑tabs */}
  //         <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
  //           <Breadcrumbs
  //             items={[{ key: "home", label: "Главная", href: "/" }, { key: "city", label: cityRussian.ru }]}
  //           />
  
  //           <div className="flex items-center gap-2">
  //             <Link
  //               href={buildViewLink({ citySlug, currentSearchParams: searchParams, nextView: "list" })}
  //               className={`inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
  //                 view === "list" ? "bg-primary-dark text-white" : "bg-muted hover:bg-muted/70"
  //               }`}
  //             >
  //               <ListOrdered className="h-4 w-4" /> Список
  //             </Link>
  //             <Link
  //               href={buildViewLink({ citySlug, currentSearchParams: searchParams, nextView: "map" })}
  //               className={`inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
  //                 view === "map" ? "bg-primary-dark text-white" : "bg-muted hover:bg-muted/70"
  //               }`}
  //             >
  //               <MapPin className="h-4 w-4" /> Карта
  //             </Link>
  //           </div>
  //         </div>
  
  //         {/* Info row */}
  //         {/* <div className="flex items-center justify-between flex-wrap gap-2 mb-6">
  //           <h2 className="text-primary-dark text-xl lg:text-2xl font-semibold">
  //             Квартиры в {cityRussian.ru}
  //           </h2>
  //           <p className="text-primary-default text-sm">
  //             Страница <span className="text-primary-dark">{currentPage}</span> из {totalPages}
  //           </p>
  //         </div> */}
  
  //         {/* Content */}
  
  //         {/* Content */}
  //         {error && <p className="py-20 text-center text-primary-hover">{error}</p>}
  
  //         {view === "list" && !error && (
  //           <>
  //             {apartments.length ? (
  //               <>
  //                 <div className="grid grid-cols-1 gap-3">
  //                     {apartments.map((p) => (
  //                       <ApartmentCard key={p.id} data={p} city={citySlug} />
  //                     ))}
  //                   </div>
  
  //                 {/* Pagination */}
  //                 <nav className="mt-12 flex items-center justify-center gap-2">
  //                   <PageLink href={buildPageLink(currentPage - 1)} disabled={currentPage === 1}>
  //                     Prev
  //                   </PageLink>
  //                   {Array.from({ length: totalPages }, (_, i) => (
  //                     <PageLink key={i} href={buildPageLink(i + 1)} active={currentPage === i + 1}>
  //                       {i + 1}
  //                     </PageLink>
  //                   ))}
  //                   <PageLink href={buildPageLink(currentPage + 1)} disabled={currentPage === totalPages}>
  //                     Next
  //                   </PageLink>
  //                 </nav>
  //               </>
  //             ) : (
  //               <div className="py-20 text-center">
  //                 <h2 className="text-2xl text-gray-600">Ничего не найдено</h2>
  //                 <Link href={`/${citySlug}`} className="mt-4 inline-block text-primary-dark hover:text-primary-light">
  //                   Просмотреть все объекты недвижимости
  //                 </Link>
  //               </div>
  //             )}
  //           </>
  //         )}
  
  //         {view === "map" && !error && (
  //           <div className="w-full h-[600px] bg-gray-200 flex items-center justify-center rounded-lg">
  //             {/* TODO: replace with actual interactive map */}
  //             <p className="text-gray-600">Здесь будет интерактивная карта с объектами.</p>
  //           </div>
  //         )}
  //       </main>
  //     </div>
  //     </>
    
  //   );
  // }
  
  