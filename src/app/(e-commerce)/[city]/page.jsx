"use client";
import React, { useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Sidebar } from "./_related/SideBar";
import { cityOptions, data, products } from "@/constants/data";
import NextLink from "@/components/ui/NextLink";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { api } from "@/lib/api";
import ApartmentCard from "@/components/component/card/ApartmentCard";
import PageLink from "./_related/PageLink";

const ITEMS_PER_PAGE = 5;

export default function CityPage({ params }) {
  
  /* --------------------- Safe access to dynamic slug -------------------- */
    const { city: citySlug = "", page: pageSlug  } = React.use(params);
    console.log('citySlug',citySlug)

  const router = useRouter();
  const searchParams = useSearchParams();

  // If slug is still missing, show loader / fallback
  if (!citySlug) return <p className="p-10 text-center">Loading…</p>;

  const cityParam = decodeCityParam(citySlug);
  const currentPage = parseInt(searchParams.get("page") || params.page || "1", 10);

  // not nessary 
  const cityRussian = cityOptions.find(city => {
    const cleanKey = city.key.toString().trim().toLowerCase();
    const cleanParam = decodeURIComponent(cityParam).toString().trim().toLowerCase(); 
    return cleanKey === cleanParam;   // we founded neeeded 
  }) 
  || { 
    key: cityParam, 
    name: `Unknown City (${cityParam})` 
  };

  /* -------------------- read filters from query string ------------------- */

  // get end points .


  // Get Poperties
  const fetchProperties = async (cityRussian) => {
    setLoading(true);
    try {
      const encodedCity = encodeURIComponent(cityRussian);
      const { data } = await api.get(`https://api.example.com/cities/${encodedCity}/properties`);
      // setData(data)
      return data;
    } catch (error) {
      console.error('Failed to fetch properties:', error.message);
      throw new Error('Unable to retrieve property data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };


  // let's suppose iam getting by end and iam going to pass search parameters
  // i will get data in this data properties and metro and district i have already implemented it 

  // let list = fetchProperties(cityParam)
  let list  = data.moscow.properties  // data comes formm data.js  hard coding
  const metro = data.moscow.metro
  const district = data.moscow.districts

  const filters = {
    rooms: searchParams.get("rooms"),
    priceMin: searchParams.get("priceMin"),
    priceMax: searchParams.get("priceMax"),
    beds: searchParams.get("beds"),
    metro: searchParams.get("metro"),
    amenities: searchParams.get("amenities")?.split(',') || [], // تحويل إلى مصفوفة
    cottage: searchParams.get("cottage"),
    district:searchParams.get("district"),
  };

  /* ---------------------------- filter + page ---------------------------- */

    // Filter products based on search query
    const query = searchParams.get("query") || '';
    const filteredProducts = products.filter((product) => {
    return (
    product.title?.toLowerCase().trim().includes(query?.toLowerCase().trim() || '')||
    product.city?.toLowerCase().trim().includes(query?.toLowerCase().trim() || '')||
    product.descriptionShort?.toLowerCase().trim().includes(query?.toLowerCase().trim() || '')||
    product.mapInfo.address?.toLowerCase().trim().includes(query?.toLowerCase().trim() || '')||
    product.mapInfo.district?.toLowerCase().trim().includes(query?.toLowerCase().trim() || '')
      )
    }
    );
    const factApartment = query.length === 0  ? products : filteredProducts
  
   
    
    const { paginated, totalPages } = useMemo(() => {
    // to show syed how is work
    // let list  factApartment.filter(
    // p => p.city.toLowerCase() === cityParam.toLowerCase()) || 'cities';

    // in real production let list data.propereties which came form end point 
    if (filters?.rooms)     list = list.filter(p => p?.apartmentParameters?.apartmentType === filters.rooms);
    if (filters?.beds)      list = list.filter(p => p.apartmentParameters.singleBeds  === filters.beds);
    if (filters?.priceMin)  list = list.filter(p => +p.price >= +filters.priceMin);
    if (filters?.priceMax)  list = list.filter(p => +p.price <= +filters.priceMax);
    // if (filters?.metro)     list = list.filter(p => p.metro === filters.metro);
    if (filters?.amenities?.length)
      list = list?.filter(p => filters?.amenities.every(a => p?.amenities?.includes(a)));
    // if (filters.cottage)   list = list.filter(p => p.isCottage); // يتوقع وجود هذا الحقل

    const totalPages = Math.max(1, Math.ceil(list.length / ITEMS_PER_PAGE));
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return { paginated: list.slice(start, start + ITEMS_PER_PAGE), totalPages };
  }, [cityParam, currentPage, filters]);

  /* ----------------------- build link with params ------------------------ */
  const buildLink = page => {
    const q = new URLSearchParams(searchParams.toString());
    page === 1 ? q.delete("page") : q.set("page", page);
    return `/${citySlug}?${q.toString()}`;
  };

  /* -------------------------- render component --------------------------- */
  return (
    <div className="flex">
      <Sidebar
        defaultValues={filters}
        onApply={vals => {
          const q = new URLSearchParams();
          Object.entries(vals).forEach(([k, v]) => v && q.set(k, v));
          router.push(`/${citySlug}?${q.toString()}`);
        }}
        metro={metro}
        district={district}
      />

      <div className="mx-auto w-full px-4">
        {/* header */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <Breadcrumbs
        items={[
          { label: "Главная", href: "/" },
          { label: cityRussian?.ru || "Все города" }]}/>

          {/* QUERY */}
          {query &&  <div>SEARCH OF  {query} </div> }
          <div className="flex items-center gap-4">
            <h4 className="text-primary-dark">  Квартиры в {cityRussian?.ru ? cityRussian?.ru : 'России'}</h4>
            <p className="mt-1 text-gray-600">
              Page {currentPage} of {totalPages}
            </p>
          </div>
        </div>

        {paginated.length ? (
          <>
          {/* md:grid-cols-2 lg:grid-cols-3  lg:gap-8 */}
            <div className="grid grid-cols-1 gap-3 ">  
              {paginated.map(item => (
                <ApartmentCard key={item.id} apartment={item} city={citySlug} />
              ))}
            </div>
            {/* pagination */}
            <nav className="mt-12 flex items-center  justify-center gap-2">
              <PageLink href={buildLink(currentPage - 1)} disabled={currentPage === 1}>
                Prev
              </PageLink>
              {Array.from({ length: totalPages }, (_, i) => (
                <PageLink key={i} href={buildLink(i + 1)} active={currentPage === i + 1}>
                  {i + 1}
                </PageLink>
              ))}
              <PageLink href={buildLink(currentPage + 1)} disabled={currentPage === totalPages}
               onClick={(e) => currentPage === totalPages && e.preventDefault()} >
                Next
              </PageLink>
            </nav>
          </>
        ) : (
          <div className="py-20 text-center">
            <h2 className="text-2xl text-gray-600">Ничего не найдено</h2>
            <Link href={`/${citySlug}`} className="mt-4 inline-block text-primary-dark hover:text-primary-light">
               Просмотреть все объекты недвижимости
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}



/* ------------------------------ utils ------------------------------ */
function decodeCityParam(p = "") {
  return p.replace("city%3D", "").replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
}
