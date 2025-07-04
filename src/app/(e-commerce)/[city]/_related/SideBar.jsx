"use client";
import { useState, useCallback, useEffect, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {Dialog,DialogContent,DialogHeader,DialogTitle} from "@/components/ui/dialog";
import { useIsMobile } from "@/hooks/use-mobile";
import { FilterContent } from "./FilterContent";
import { useApartment } from "../../../../../context/ApartmentContext";

/* -------------------------------- helpers ------------------------------ */
const copyParamsSafe = (sp) => {
  const q = new URLSearchParams();
  if (!sp) return q;
  for (const [k, v] of sp.entries()) {
    if (!k || v === undefined || v === null || v === "") continue;
    q.set(k, v);
  }
  return q;
};

/* all keys Sidebar manages (used to wipe before applying fresh) */
const FILTER_KEYS = ["priceMin","priceMax","rooms","beds","bedrooms","bathrooms","metro","district","amenities","feature","cottage"];

export default function Sidebar({
  citySlug,
  defaultValues = {},
  // metro = [],
  // district = [],
}) {
  /* --------------------------------------------------------------------- */
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const isMobile = useIsMobile();
  const {cities} = useApartment()

  /* -------------------- local state (mirrors filter UI) ----------------- */
  const [isOpen, setIsOpen] = useState(false);

  const [priceRange, setPriceRange] = useState([
    +defaultValues.priceMin || 0,
    +defaultValues.priceMax || 30000,
  ]);

  const [selectedRooms, setSelectedRooms] = useState(defaultValues.rooms ?? "");
  const [selectedBeds, setSelectedBeds] = useState(defaultValues.beds ?? "");
  const [selectedBedrooms, setSelectedBedrooms] = useState(
    defaultValues.bedrooms ?? ""
  );
  const [selectedBathrooms, setSelectedBathrooms] = useState(
    defaultValues.bathrooms ?? ""
  );
  const [selectedMetro, setSelectedMetro] = useState(defaultValues.metro ?? "");
  const [selectedDistrict, setSelectedDistrict] = useState(
    defaultValues.district ?? ""
  );
  const [selectedAmenities, setSelectedAmenities] = useState(
    defaultValues.amenities ?? []
  );
   const [selectedKitchen, setSelectedKitchen] = useState(
    defaultValues.kitchen ?? []
  );
  const [selectedFeature, setSelectedFeature] = useState(
    defaultValues.feature ?? ""
  );
  const [isCottage, setIsCottage] = useState(!!defaultValues.cottage);
  const [isAparment, setIsApartment] = useState(!!defaultValues.apartment);


  /* ---------- keep local state in-sync when URL-driven defaults change --- */
  useEffect(() => {
    setPriceRange([
      defaultValues.priceMin ? +defaultValues.priceMin : 0,
      defaultValues.priceMax ? +defaultValues.priceMax : 30000,
    ]);
    setSelectedRooms(defaultValues.rooms ?? "");
    setSelectedBeds(defaultValues.beds ?? "");
    setSelectedBedrooms(defaultValues.bedrooms ?? "");
    setSelectedBathrooms(defaultValues.bathrooms ?? "");
    setSelectedMetro(defaultValues.metro ?? "");
    setSelectedDistrict(defaultValues.district ?? "");
    setSelectedAmenities(defaultValues.amenities ?? []);
    setSelectedFeature(defaultValues.feature ?? "");
    setIsCottage(!!defaultValues.cottage);
    setIsApartment(!!defaultValues.apartment);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(defaultValues)]);

  /* amenity toggle helper */
  const toggleAmenity = useCallback((a) => {
    setSelectedAmenities((prev) =>
      prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]
    );
  }, [
  ]);


   /* amenity toggle helper */
  const toggleKitchen = useCallback((a) => {
    setSelectedKitchen((prev) =>
      prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]
    );
  }, [
  ]);


  // feature select
  const onFeatureSelect = useCallback((a) => {
    setSelectedFeature((prev) =>
      prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]
    );
  }, []);

  /* ------------------- apply & navigate ------------------- */
  const applyFiltersAndNavigate = () => {
    const q = copyParamsSafe(searchParams);
    FILTER_KEYS.forEach((k) => q.delete(k));
    q.delete("page");

    // price BETWEEN
    q.set("priceMin", priceRange[0].toString());
    q.set("priceMax", priceRange[1].toString());

    if (selectedRooms) q.set("rooms", selectedRooms);
    if (selectedBeds) q.set("beds", selectedBeds);
    if (selectedBedrooms) q.set("bedrooms", selectedBedrooms);
    if (selectedBathrooms) q.set("bathrooms", selectedBathrooms);
    if (selectedMetro) q.set("metro", selectedMetro);
    if (selectedDistrict) q.set("district", selectedDistrict);
    if (selectedAmenities.length > 0 ) q.set("amenities", selectedAmenities.join(","));
    if (selectedKitchen.length > 0 ) q.set("kitchen", selectedKitchen.join(",")); //new
    if (selectedFeature) q.set("feature", selectedFeature);
    // if (isCottage) q.set("cottage", "1");
    // if (isAparment) q.set("apartment", "1");

    startTransition(() => router.push(`/${citySlug}?${q.toString()}`));
    setIsOpen(false);
  };

  /* eset local UI state  */
  const handleReset = () => {
    setPriceRange([0, 30000]);
    setSelectedRooms("");
    setSelectedBeds("");
    setSelectedBedrooms("");
    setSelectedBathrooms("");
    setSelectedMetro("");
    setSelectedDistrict("");
    setSelectedAmenities("");
    setSelectedKitchen("");
    setSelectedFeature("");
    setIsCottage(false);
    setIsApartment(false)
  };

  const metro=  cities.find(c => c.slug === citySlug)?.metro_stations ?? []
  const district =   cities.find(c => c.slug === citySlug)?.districts ?? []

  // select room 
  const onRoomSelect = (room) => {
    setSelectedRooms((prev) => (prev === room ? null : room));
  };

  // select bedroom 
  const onBedroomSelect  = (bed) =>{
    setSelectedBedrooms((prev) => (prev === bed ? null : bed));
  };

  // selectBathroom
  const onBathroomSelect  = (bt) =>{
    setSelectedBathrooms((prev) => (prev === bt ? null : bt));
  };


  /* props passed to <FilterContent/> */
  const filterProps = {
    priceRange,
    selectedRooms,
    selectedBeds,
    selectedBedrooms,
    selectedBathrooms,
    selectedMetro,
    selectedDistrict,
    selectedAmenities,
    selectedKitchen,
    selectedFeature,
    isCottage,
    isAparment,
    metro  ,
    district,
    // callbacks
    onPriceChange: setPriceRange,
    onRoomSelect: onRoomSelect,
    onBedSelect: setSelectedBeds,
    onBedroomSelect: onBedroomSelect,
    onBathroomSelect: onBathroomSelect,
    onMetroSelect: setSelectedMetro,
    onDistrictSelect: setSelectedDistrict,
    onAmenityToggle: toggleAmenity,
    toggleKitchen:toggleKitchen,
    onFeatureSelect: onFeatureSelect,
    onCottageToggle: () => setIsCottage((p) => !p),
    onApartmentToggle: () => setIsApartment((p) => !p),
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
              className="max-w-[95%] md:max-w-5xl flex h-[85vh] flex-col rounded-xl bg-white overflow-auto"
            >
              <DialogHeader className="border-b">
                <DialogTitle className="flex items-center gap-2 text-lg text-primary-dark">
                  <SlidersHorizontal className="h-5 w-5" /> Фильтры
                </DialogTitle>
              </DialogHeader>

              <div className="">
                <FilterContent {...filterProps} />
              </div>

              <div className="border-t bg-background pt-4">
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
