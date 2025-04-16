"use client";

import { useState } from "react";
import { SlidersHorizontal, X, Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import Input from "@/components/ui/input";
import { useIsMobile } from "@/hooks/use-mobile";

const Sidebar = () => {
  const isMobile = useIsMobile();
  
  // Controls for sidebar on desktop
  const [isExpanded, setIsExpanded] = useState(true);

  // Mobile sheet open/close
  const [isOpen, setIsOpen] = useState(false);

  // Filter states
  const [priceRange, setPriceRange] = useState([900, 22100]);
  const [selectedRooms, setSelectedRooms] = useState("");
  const [selectedBeds, setSelectedBeds] = useState("");
  const [selectedMetro, setSelectedMetro] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const amenities = [
    "Wi-Fi интернет",
    "Кондиционер",
    "Телевизор",
    "Стиральная машина",
    "Микроволновка",
  ];

  const toggleAmenity = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  // Apply & reset filters
  const applyFilters = () => {
    console.log("Applying filters =>", {
      priceRange,
      selectedRooms,
      selectedBeds,
      selectedMetro,
      selectedAmenities,
    });
    if (isMobile) setIsOpen(false);
  };

  const resetFilters = () => {
    setPriceRange([900, 22100]);
    setSelectedRooms("");
    setSelectedBeds("");
    setSelectedMetro("");
    setSelectedAmenities([]);
  };

  // Shared filter form content
  const FilterContent = () => (
    <div className="p-4 space-y-6">
      {/* Price Range */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Цена за сутки (₽)</h3>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
            className="text-center w-24"
            placeholder="От"
          />
          <span className="text-gray-400">—</span>
          <Input
            type="number"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
            className="text-center w-24"
            placeholder="До"
          />
        </div>
      </div>

      {/* Rooms & Beds */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <h3 className="text-sm font-semibold">Комнаты</h3>
          <div className="flex flex-wrap gap-2">
            {["1", "2", "3+"].map((room) => {
              const isSelected = selectedRooms === room;
              return (
                <Button
                  key={room}
                  variant={isSelected ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedRooms((prev) => (prev === room ? "" : room))}
                  className="flex items-center gap-1"
                >
                  {room}
                  {isSelected && <Check className="w-4 h-4" />}
                </Button>
              );
            })}
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-semibold">Спальные места</h3>
          <div className="flex flex-wrap gap-2">
            {["2", "3", "4", "5+"].map((bed) => {
              const isSelected = selectedBeds === bed;
              return (
                <Button
                  key={bed}
                  variant={isSelected ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedBeds((prev) => (prev === bed ? "" : bed))}
                  className="flex items-center gap-1"
                >
                  {bed}
                  {isSelected && <Check className="w-4 h-4" />}
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Metro */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Метро</h3>
        <select
          value={selectedMetro}
          onChange={(e) => setSelectedMetro(e.target.value)}
          className="
            w-full h-10
            rounded-md border border-input
            bg-background
            px-3 py-2 text-sm
            focus:outline-none focus:ring-2 focus:ring-ring
          "
        >
          <option value="">Выберите станцию</option>
          <option value="Центральная">Центральная</option>
          <option value="Заречная">Заречная</option>
          <option value="Восточная">Восточная</option>
        </select>
      </div>

      {/* Amenities */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Удобства</h3>
        <div className="grid grid-cols-2 gap-2">
          {amenities.map((amenity) => {
            const isChecked = selectedAmenities.includes(amenity);
            return (
              <label
                key={amenity}
                className="flex items-center gap-2 text-sm cursor-pointer"
              >
                <Checkbox
                  checked={isChecked}
                  onCheckedChange={() => toggleAmenity(amenity)}
                />
                <span className="flex items-center gap-1">
                  {amenity}
                  {isChecked && <Check className="w-4 h-4" />}
                </span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <aside
        className={cn(
          "hidden lg:flex flex-col items-stretch sticky top-4 bg-white border border-gray-200 shadow-sm overflow-hidden transition-all duration-300",
          isExpanded ? "w-[300px]" : "w-[70px]"
        )}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between bg-gray-100 px-3 py-2 border-b">
          {isExpanded && (
            <h2 className="text-base font-bold text-gray-700">Фильтры</h2>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-600 hover:text-gray-800"
          >
            {isExpanded ? <X size={18} /> : <SlidersHorizontal size={18} className="text-primary-default"/>}
          </Button>
        </div>

        {/* Content + Apply/Reset */}
        {isExpanded && (
          <>
            <FilterContent />
            <div className="px-4 pb-4 flex gap-2">
              <Button className="w-full" onClick={applyFilters}>
                Применить
              </Button>
              <Button variant="outline" className="w-full" onClick={resetFilters}>
                Сбросить
              </Button>
            </div>
          </>
        )}
      </aside>

      {/* MOBILE FILTER BUTTON */}
      {isMobile && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 lg:hidden">
          <Button
            size="lg"
            className="rounded-full shadow-lg px-6 gap-2"
            onClick={() => setIsOpen(true)}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Фильтры
          </Button>
        </div>
      )}

      {/* MOBILE SHEET */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="bottom" className="rounded-t-2xl h-[90vh] bg-white">
          <SheetHeader>
            <SheetTitle className="text-xl font-bold">Фильтры</SheetTitle>
          </SheetHeader>

          <div className="overflow-y-auto pb-24">
            <FilterContent />
          </div>

          <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t">
            <div className="flex gap-2">
              <Button className="w-full" onClick={applyFilters}>
                Применить
              </Button>
              <Button variant="outline" className="w-full" onClick={resetFilters}>
                Сбросить
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Sidebar;
