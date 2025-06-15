/* ------------------------------------------------------------------
 * CityPage – Next 15.x compliant (async params), Strapi fetch, filters
 * -----------------------------------------------------------------*/
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Sidebar } from './_related/SideBar';
import { cityOptions } from '@/constants/data';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { api } from '@/lib/api';
import ApartmentCard from '@/components/component/card/ApartmentCard';
import PageLink from './_related/PageLink';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';

const ITEMS_PER_PAGE = 10; // == pagination[pageSize]

/* ------------------------------------------------------------------ */
export default function CityPage({ params }) {
  /* ---------------------------------------------------------------
   * 1️⃣  UNWRAP ASYNC PARAMS (React.use)
   * ------------------------------------------------------------- */
  const { city: citySlug = '' } = React.use(params);

  // console.log('citySlug',citySlug)
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  if (!citySlug) return <p className="p-10 text-center">Loading…</p>;

  /* ---------------------------------------------------------------
   * Human-friendly city label
   * ------------------------------------------------------------- */
  const cityRussian =
    cityOptions.find(
      (c) =>
        c.key.toLowerCase() === decodeURIComponent(citySlug).toLowerCase(),
    ) ?? { key: citySlug, name: `Unknown City (${citySlug})` };

  /* ---------------------------------------------------------------
   * Local state
   * ------------------------------------------------------------- */
  const [apartments, setApartments] = useState([]);
  const [meta, setMeta] = useState({ pagination: { pageCount: 1 } });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  /* ---------------------------------------------------------------
   * Sidebar & URL filters
   * ------------------------------------------------------------- */
  const filters = {
    rooms: searchParams.get('rooms'),
    priceMin: searchParams.get('priceMin'),
    priceMax: searchParams.get('priceMax'),
    beds: searchParams.get('beds'),
    metro: searchParams.get('metro'),
    amenities: searchParams.get('amenities')?.split(',') || [],
    cottage: searchParams.get('cottage'),
    district: searchParams.get('district'),
  };

  /* ---------------------------------------------------------------
   * Build Strapi query string
   * ------------------------------------------------------------- */
  const buildApiUrl = () => {
    const q = new URLSearchParams();

    q.set('filters[city][name][$eq]', citySlug);
    ['images', 'features', 'kitchens', 'amenities', 'infrastructures'].forEach(
      (p) => q.append('populate', p),
    );
    ['title', 'bathrooms', 'bedrooms', 'description', 'propertyType', 'size', 'price'].forEach(
      (f) => q.append('fields', f),
    );
    q.set('pagination[page]', currentPage.toString());
    q.set('pagination[pageSize]', ITEMS_PER_PAGE.toString());

    /* dynamic filters */
    if (filters.rooms)
      q.set('filters[apartmentParameters][apartmentType][$eq]', filters.rooms);
    if (filters.beds)
      q.set('filters[apartmentParameters][singleBeds][$eq]', filters.beds);
    if (filters.priceMin) q.set('filters[price][$gte]', filters.priceMin);
    if (filters.priceMax) q.set('filters[price][$lte]', filters.priceMax);
    if (filters.metro) q.set('filters[metro][$eq]', filters.metro);
    if (filters.district) q.set('filters[district][$eq]', filters.district);
    if (filters.amenities.length)
      q.set('filters[amenities][name][$in]', filters.amenities.join(','));

    return `/products?${q.toString()}`;
  };

  /* ---------------------------------------------------------------
   * Fetch on slug / page / filters change
   * ------------------------------------------------------------- */
  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      setError('');
      try {
        const url = buildApiUrl();
        const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        // const { data } = await api.get(`${apiUrl}/products/?filters[city][name][$eq]=${citySlug}&populate=images&populate=features&populate=kitchens&populate=amenities&populate=infrastructures&fields=title&fields=bathrooms&fields=bedrooms&fields=description&fields=propertyType&fields=size&fields=price&pagination[page]=1&pagination[pageSize]=10`); 
        const { data } = await api.get(url); 
        console.log('data', data.data)
        setApartments(data?.data || []);
        setMeta(data?.meta || { pagination: { pageCount: 1 } });
      } catch (err) {
        console.error(err);
        setError('Не удалось загрузить данные. Попробуйте позже.');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [citySlug, currentPage, searchParams.toString()]);

  /* ---------------------------------------------------------------
   * Pagination helpers
   * ------------------------------------------------------------- */
  const totalPages = meta.pagination.pageCount ?? 1;
  const buildLink = (page) => {
    const q = new URLSearchParams(searchParams.toString());
    page === 1 ? q.delete('page') : q.set('page', page);
    return `/${citySlug}?${q.toString()}`;
  };

  return (
    <div className="flex h-screen">
      <Sidebar
        defaultValues={filters}
        onApply={(vals) => {
          const q = new URLSearchParams();
          Object.entries(vals).forEach(([k, v]) => v && q.set(k, v));
          router.push(`/${citySlug}?${q.toString()}`);
        }}
        /* TODO: supply real metro & district arrays once you fetch them */
        metro={[]}
        district={[]}
      />

      <div className="w-full px-4">
        <section className=" hidden md:block mb-6 max-h-[200px] h-screen relative ">
          <Image
            src="/images/aboutUs.jpg"
            alt="Недвижимость премиум-класса"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-primary-dark/80 flex flex-col items-center justify-center">
            <h1 className="font-bold text-white text-center px-4 text-3xl">
              {/* <span className="text-primary-dark text-5xl">XRAL State</span> —  */}
              Квартиры посуточно в  {cityRussian.ru}
            </h1>
            <p className='text-white max-w-7xl text-center'>
            На нашем сайте вы можете найти подходящий вариант посуточной аренды квартиры в городе {cityRussian.ru}. Мы публикуем объявления от собственников, что позволяет выбрать нужную вам квартиру по выгодной цене.
            </p>
          </div>
        </section>

        {/* Header */}
        <div className="mb-6 flex flex-wrap items-start  justify-between gap-4">
          <Breadcrumbs
            items={[
              { key: 'home', label: 'Главная', href: '/' },   // 🔑 add unique keys
              { key: 'city', label: cityRussian.ru },
            ]}
          />

          <div className="flex flex-col items-end">
            <h4 className="text-primary-dark text-2xl">
              Квартиры в {cityRussian.ru}
            </h4>
            <p className="text-primary-default text-md">
              Страница  <span className='text-primary-dark'>{currentPage} из {totalPages}</span> 
            </p>
          </div>
        </div>

        {/* Content */}
        {loading &&
         <div className="flex items-center justify-center py-10 gap-4">
          {/* Загрузка… */}
         <Loader2 className="h-10 w-10 animate-spin text-primary-hover" /> 
       </div>
       }
        {error && <p className="py-20 text-center text-primary-hover">{error}</p>}

        {!loading && !error && apartments.length > 0 && (
          <>
            <div className="grid grid-cols-1 gap-3">
              {apartments.map(({ id, attributes }) => (
                <ApartmentCard key={id} apartment={{ id, ...attributes }} city={citySlug} />
              ))}
            </div>

            {/* Pagination */}
            <nav className="mt-12 flex items-center justify-center gap-2">
              <PageLink href={buildLink(currentPage - 1)} disabled={currentPage === 1}>
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
              <PageLink href={buildLink(currentPage + 1)} disabled={currentPage === totalPages}>
                Next
              </PageLink>
            </nav>
          </>
        )}

        {!loading && !error && apartments.length === 0 && (
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
      </div>
    </div>
  );
}
