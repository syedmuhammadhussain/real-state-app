'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { CheckCircle, ArrowRight, Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Input, { input } from '@/components/ui/input'; // shadcn/ui
import { useApartment } from '../../../../context/ApartmentContext';

export default function CityIndex() {
  const { cities = [] } = useApartment();
  const [q, setQ] = useState('');

  // --- helpers ---
  const norm = (s) =>
    (s || '')
      .toString()
      .toLowerCase()
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '');

  // Build lookups to resolve "related" refs (by id or name)
  const lookups = useMemo(() => {
    const byId = new Map();
    const byName = new Map();
    const byRegion = new Map();

    cities.forEach((c) => {
      if (c?.id !== undefined && c?.id !== null) byId.set(c.id, c);
      if (c?.name) byName.set(String(c.name), c);
      if (c?.region) {
        const list = byRegion.get(c.region) || [];
        list.push(c);
        byRegion.set(c.region, list);
      }
    });

    return { byId, byName, byRegion };
  }, [cities]);

  const resolveRelated = (city) => {
    const { byId, byName, byRegion } = lookups;
    if (Array.isArray(city?.related) && city.related.length > 0) {
      const resolved = city.related
        .map((ref) => byId.get(ref) || byName.get(String(ref)))
        .filter(Boolean);
      if (resolved.length) return resolved;
    }
    if (city?.region && lookups.byRegion.has(city.region)) {
      return (byRegion.get(city.region) || []).filter((c) => c !== city);
    }
    return [];
  };

  const cityHref = (c) => (c?.slug ? `/${c.slug}` : '#');

  // Filter cities by query (name or region)
  const filtered = useMemo(() => {
    const nq = norm(q);
    if (!nq) return cities;
    return cities.filter((c) => {
      const name = norm(c?.name);
      const region = norm(c?.region);
      return name.includes(nq) || region.includes(nq);
    });
  }, [q, cities]);

  return (
    <div className="mx-auto mt-12 border-t border-black-200 ">
      {/* Search bar + count */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mt-4">
        <div className="relative w-full sm:max-w-md ">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Поиск городовs…"
            className="pl-9 h-10 w-full"
            aria-label="Поиск городов"
          />
        </div>
        <div className="text-sm text-gray-500">
          {filtered.length} результат{filtered.length === 1 ? '' : 's'}
        </div>
      </div>

      {/* Grid (smaller cards, tighter spacing) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
        {filtered.map((city, idx) => {
          const related = resolveRelated(city);
          const relatedCount = related.length;

          return (
            <Card
              key={city?.id ?? `${city?.name ?? 'city'}-${idx}`}
              className="group flex h-full flex-col border border-gray-200 rounded-lg bg-white shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
            >
              <CardContent className="flex-1 p-3 sm:p-4 flex flex-col gap-3">
                {/* Header row with icon and title (smaller) */}
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-primary-dark flex-shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-primary-dark mb-0.5">
                      <Link
                        href={cityHref(city)}
                        className="outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 rounded
                                   bg-[linear-gradient(currentColor,currentColor)] bg-no-repeat [background-position:0_100%]
                                   [background-size:0%_2px] transition-[background-size,color] duration-200
                                   group-hover:[background-size:100%_2px] hover:text-primary-hover"
                      >
                        {city?.name || '—'}
                      </Link>
                      {city?.region ? (
                        <span className="ml-2 text-[10px] text-gray-500 align-middle">
                          ({city.region})
                        </span>
                      ) : null}
                    </h3>

                    {/* Subtext smaller */}
                    <p className="text-xs text-primary-dark/70 leading-relaxed">
                      {relatedCount > 0
                        ? ``
                        : ''}
                    </p>
                  </div>
                </div>

                {/* Related cities pills (tiny) */}
                {relatedCount > 0 && (
                  <div className="mt-0.5">
                    <ul className="flex flex-wrap gap-1.5">
                      {related.slice(0, 6).map((rc, rIdx) => (
                        <li key={rc?.id ?? `${rc?.name ?? 'rel'}-${rIdx}`}>
                          <Link
                            href={cityHref(rc)}
                            className="inline-flex items-center rounded-full border border-gray-200 px-2 py-0.5 text-[11px]
                                       text-primary-dark hover:text-primary-hover hover:border-primary-dark
                                       transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                            aria-label={`Open ${rc?.name || 'city'}`}
                          >
                            {rc?.name || '—'}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    {relatedCount > 6 && (
                      <p className="mt-1 text-[11px] text-gray-400">
                        + {relatedCount - 6} more
                      </p>
                    )}
                  </div>
                )}

                {/* Footer action (smaller) */}
                {/* <div className="mt-auto pt-1"> */}
                  {/* <Link
                    href={cityHref(city)}
                    className="inline-flex items-center gap-1 text-xs font-medium text-primary-dark hover:text-primary-hover
                               transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary/30 rounded"
                    aria-label={`Open ${city?.name || 'city'}`}
                  >
                    Open city
                    <ArrowRight
                      className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </Link> */}
                {/* </div> */}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="text-sm text-gray-500">Ни один город не соответствует вашему запросу.</div>
      )}
    </div>
  );
}
