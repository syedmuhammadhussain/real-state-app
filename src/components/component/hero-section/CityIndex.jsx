'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useApartment } from '../../../../context/ApartmentContext';

export default function CityIndex() {
  const { cities = [] } = useApartment();

  // Build lookups to resolve "related" references (by id or name)
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

    // Prefer explicit related (ids or names)
    if (Array.isArray(city?.related) && city.related.length > 0) {
      const resolved = city.related
        .map((ref) => byId.get(ref) || byName.get(String(ref)))
        .filter(Boolean);
      if (resolved.length) return resolved;
    }

    // Fallback: same region (excluding itself)
    if (city?.region && byRegion.has(city.region)) {
      return (byRegion.get(city.region) || []).filter((c) => c !== city);
    }

    return [];
  };

  const cityHref = (c) => (c?.slug ? `/${c.slug}` : '#');

  return (
    <div className="mx-auto mt-10">
      <h1 className="text-2xl md:text-4xl text-primary-dark font-bold text-left mb-10">
        Россия
      </h1>

      {/* 3-column grid on large screens */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {cities.map((city, idx) => {
          const related = resolveRelated(city);
          const relatedCount = related.length;

          return (
            <Card
              key={city?.id ?? `${city?.name ?? 'city'}-${idx}`}
              className="group flex h-full flex-col border border-gray-200 rounded-xl bg-white shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:ring-2 hover:ring-primary-dark"
            >
              <CardContent className="flex-1 p-5 flex flex-col gap-4">
                {/* Header row with icon and title */}
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-5 h-5 text-primary-dark flex-shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    {/* City name (single clickable link) */}
                    <h3 className="text-base font-semibold text-primary-dark mb-1">
                      <Link
                        href={cityHref(city)}
                        className="outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 rounded
                                   bg-[linear-gradient(currentColor,currentColor)] bg-no-repeat [background-position:0_100%]
                                   [background-size:0%_2px] transition-[background-size,color] duration-300
                                   group-hover:[background-size:100%_2px] hover:text-primary-hover"
                      >
                        {city?.name || '—'}
                      </Link>
                      {city?.region ? (
                        <span className="ml-2 text-xs text-gray-500 align-middle">
                          ({city.region})
                        </span>
                      ) : null}
                    </h3>

                    {/* Subtext: brief meta description */}
                    <p className="text-sm text-primary-dark/80 leading-relaxed">
                      {relatedCount > 0
                        ? `Связанные города: ${relatedCount}`
                        : 'Нет связанных городов'}
                    </p>
                  </div>
                </div>

                {/* Related cities list */}
                {relatedCount > 0 && (
                  <div className="mt-1">
                    <ul className="flex flex-wrap gap-2">
                      {related.slice(0, 8).map((rc, rIdx) => (
                        <li key={rc?.id ?? `${rc?.name ?? 'rel'}-${rIdx}`}>
                          <Link
                            href={cityHref(rc)}
                            className="inline-flex items-center rounded-full border border-gray-200 px-2.5 py-1 text-xs
                                       text-primary-dark hover:text-primary-hover hover:border-primary-dark
                                       transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                            aria-label={`Перейти к ${rc?.name || 'городу'}`}
                          >
                            {rc?.name || '—'}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    {relatedCount > 8 && (
                      <p className="mt-2 text-xs text-gray-400">
                        + ещё {relatedCount - 8}
                      </p>
                    )}
                  </div>
                )}

                {/* Footer action */}
                <div className="mt-auto pt-2">
                  <Link
                    href={cityHref(city)}
                    className="inline-flex items-center gap-1 text-sm font-medium text-primary-dark hover:text-primary-hover
                               transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary/30 rounded"
                    aria-label={`Открыть ${city?.name || 'город'}`}
                  >
                    Открыть город
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </Link>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
