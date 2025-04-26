"use client";

import { useState, useCallback, useEffect } from "react";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { FilterContent } from "./FilterContent";

export function Sidebar({ defaultValues = {}, onApply, metro, district }) {
  const [isOpen, setIsOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([
    +defaultValues.priceMin || 10,
    +defaultValues.priceMax || 1000,
  ]);
  const [selectedRooms, setSelectedRooms] = useState(defaultValues.rooms || "");
  const [selectedBeds,  setSelectedBeds]  = useState(defaultValues.beds  || "");
  const [selectedMetro, setSelectedMetro] = useState(defaultValues.metro || "");
  const [selectedDistict, setSelectedDistict] = useState(defaultValues.district || "");
  const [selectedAmenities, setSelectedAmenities] = useState(defaultValues.amenities || []);
  const [isCottage, setIsCottage] = useState(!!defaultValues.cottage);

  useEffect(() => {
    setPriceRange([
      defaultValues.priceMin ? +defaultValues.priceMin : 900,
      defaultValues.priceMax ? +defaultValues.priceMax : 5000
    ]);
    setSelectedRooms(defaultValues.rooms || "");
    setSelectedBeds(defaultValues.beds || "");
    setSelectedMetro(defaultValues.metro || "");
    setSelectedAmenities(defaultValues.amenities || []);
    setIsCottage(!!defaultValues.cottage);
  }, [JSON.stringify(defaultValues)]);

  const toggleAmenity = useCallback(a => {
    setSelectedAmenities(prev => (prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a]));
  }, []);

  const handleApply = () => {
    const vals = {
      priceMin: priceRange[0].toString(),
      priceMax: priceRange[1].toString(),
      rooms: selectedRooms,
      beds: selectedBeds,
      // metro: selectedMetro,
      // amenities: selectedAmenities,
      // cottage: isCottage,
    };
    console.log('vals', vals)
    onApply?.(vals);
    setIsOpen(false);
  };

  const handleReset = () => {
    setPriceRange([900, 2000]);
    setSelectedRooms("");
    setSelectedBeds("");
    setSelectedMetro("");
    setSelectedAmenities([]);
    setIsCottage(false);
  };

  const filterProps = {
    priceRange,metro, district,
    selectedDistict, setSelectedDistict,
    selectedRooms,
    selectedBeds,
    selectedMetro,
    selectedAmenities,
    isCottage,
    onPriceChange: setPriceRange,
    onRoomSelect: setSelectedRooms,
    onBedSelect: setSelectedBeds,
    onMetroSelect: setSelectedMetro,
    onAmenityToggle: toggleAmenity,
    onCottageToggle: () => setIsCottage(p => !p),
  };

  return (
    <>
      {/* Desktop sidebar */}
      { (
        <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2">
          <Button  variant='primary' onClick={() => setIsOpen(true)} className=" flex  group rounded-lg px-6 shadow-2xl gap-4 lg:min-w-[200px] lg:text-lg lg:py-6 ">
            Фильтры <SlidersHorizontal className="h-5 w-5 group-hover:text-green-500 " />  
          </Button>
        </div>
      )}

      {/* Mobile sheet */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="bottom" className="flex h-[85vh] flex-col rounded-t-lg bg-slate-50">
          <SheetHeader className="border-b ">
            <SheetTitle className="text-lg text-primary-dark flex gap-2 items-center"> 
               <SlidersHorizontal className="h-5 w-5 text-primary-dark" />Фильтры </SheetTitle>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto">
            <FilterContent {...filterProps} />
          </div>
          <div className="bottom-0 border-t bg-background p-4">
            <div className="flex gap-2">
              <Button className="flex-1" onClick={handleApply}>Применить</Button>
              <Button variant="outline" className="flex-1" onClick={handleReset}>
                Сбросить
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
