"use client";

import { useState, useCallback, useEffect, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, } from "@/components/ui/dialog"; 
import { FilterContent } from "./FilterContent";
import { useIsMobile } from "@/hooks/use-mobile";

/* Helper: safely copy params (ignores Symbol keys) */
const copyParamsSafe = (sp) => {
  const q = new URLSearchParams();
  if (!sp) return q;
  for (const [k, v] of sp.entries()) {
    if (!k || v === undefined || v === null || v === "") continue;
    q.set(k, v);
  }
  return q;
};

/* Keys managed by the filter */
const FILTER_KEYS = [ "priceMin", "priceMax", "rooms", "beds", "metro", "district", "amenities", "cottage" ];

export function Sidebar({ citySlug, defaultValues = {}, metro, district,onApply}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const isMobile = useIsMobile()

  /* viewport detection */
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(media.matches);
    const listener = (e) => setIsDesktop(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  /* ---------------- local state ---------------- */
  const [isOpen, setIsOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([
    +defaultValues.priceMin || 900,
    +defaultValues.priceMax || 2000,
  ]);
  const [selectedRooms, setSelectedRooms] = useState(defaultValues.rooms || "");
  const [selectedBeds, setSelectedBeds] = useState(defaultValues.beds || "");
  const [selectedMetro, setSelectedMetro] = useState(defaultValues.metro || "");
  const [selectedDistrict, setSelectedDistrict] = useState(
    defaultValues.district || "",
  );
  const [selectedAmenities, setSelectedAmenities] = useState(
    defaultValues.amenities || [],
  );
  const [isCottage, setIsCottage] = useState(!!defaultValues.cottage);

  /* sync when URL‑driven props change */
  useEffect(() => {
    setPriceRange([
      defaultValues.priceMin ? +defaultValues.priceMin : 900,
      defaultValues.priceMax ? +defaultValues.priceMax : 2000,
    ]);
    setSelectedRooms(defaultValues.rooms || "");
    setSelectedBeds(defaultValues.beds || "");
    setSelectedMetro(defaultValues.metro || "");
    setSelectedDistrict(defaultValues.district || "");
    setSelectedAmenities(defaultValues.amenities || []);
    setIsCottage(!!defaultValues.cottage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(defaultValues)]);

  const toggleAmenity = useCallback((a) => {
    setSelectedAmenities((prev) =>
      prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a],
    );
  }, []);

  /* Build new URL & navigate */
  const applyFiltersAndNavigate = () => {
    const q = copyParamsSafe(searchParams);
    FILTER_KEYS.forEach((k) => q.delete(k));
    q.delete("page"); // reset pagination

    if (priceRange[0]) q.set("priceMin", priceRange[0].toString());
    if (priceRange[1]) q.set("priceMax", priceRange[1].toString());
    if (selectedRooms) q.set("rooms", selectedRooms);
    if (selectedBeds) q.set("beds", selectedBeds);
    if (selectedMetro) q.set("metro", selectedMetro);
    if (selectedDistrict) q.set("district", selectedDistrict);
    if (selectedAmenities.length) q.set("amenities", selectedAmenities.join(","));
    if (isCottage) q.set("cottage", "1");

    startTransition(() => router.push(`/${citySlug}?${q.toString()}`));
    setIsOpen(false);
  };

  const handleReset = () => {
    setPriceRange([900, 2000]);
    setSelectedRooms("");
    setSelectedBeds("");
    setSelectedMetro("");
    setSelectedDistrict("");
    setSelectedAmenities([]);
    setIsCottage(false);
  };

  const filterProps = {
    priceRange,
    selectedRooms,
    selectedBeds,
    selectedMetro,
    selectedDistrict,
    selectedAmenities,
    isCottage,
    metro,
    district,
    onPriceChange: setPriceRange,
    onRoomSelect: setSelectedRooms,
    onBedSelect: setSelectedBeds,
    onMetroSelect: setSelectedMetro,
    onDistrictSelect: setSelectedDistrict,
    onAmenityToggle: toggleAmenity,
    onCottageToggle: () => setIsCottage((p) => !p),
  };

  /* -------------- RENDER -------------- */
  return (
    <>
      {/* Desktop panel */}
      {/* {!isMobile && (
        <div className="hidden  lg:block">
          <FilterContent {...filterProps} />
          <div className="flex gap-2">
            <Button
              className="flex-1"
              onClick={applyFiltersAndNavigate}
              disabled={isPending}
            >
              {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Применить"}
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleReset}
              disabled={isPending}
            >
              Сбросить
            </Button>
          </div>
        </div>
      )}

      {isMobile && 
      ( */}
        <>
          <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 ">
            <Button
              variant="primary"
              onClick={() => setIsOpen(true)}
              className="flex items-center gap-2 rounded-xl px-6 py-4 shadow-2xl"
            >
              Фильтры <SlidersHorizontal className="h-5 w-5" />
            </Button>
          </div>

          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent
              side="bottom"
              className="max-w-[95%] flex h-[85vh] flex-col rounded-xl bg-slate-50"
            >
              <DialogHeader className="border-b">
                <DialogTitle className="flex items-center gap-2 text-lg text-primary-dark">
                  <SlidersHorizontal className="h-5 w-5" /> Фильтры
                </DialogTitle>
              </DialogHeader>

              <div className="flex-1 overflow-y-auto p-4">
                <FilterContent {...filterProps} />
              </div>

              <div className="border-t bg-background p-4">
                <div className="flex gap-2">
                  <Button
                    className="flex-1"
                    onClick={applyFiltersAndNavigate}
                    disabled={isPending}
                  >
                    {isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "Применить"
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={handleReset}
                    disabled={isPending}
                  >
                    Сбросить
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </>
      {/* )} */}
    </>
  );
}
