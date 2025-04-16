"use client";

import { useState, useCallback } from "react";
import { SlidersHorizontal, X, Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import Input from "@/components/ui/input";


const AMENITIES = [
  "Wi-Fi интернет",
  "Кондиционер",
  "Телевизор",
  "Стиральная машина",
  "Микроволновка",
];

const FilterContent = ({
  priceRange,
  selectedRooms,
  selectedBeds,
  selectedMetro,
  selectedAmenities,
  onPriceChange,
  onRoomSelect,
  onBedSelect,
  onMetroSelect,
  onAmenityToggle,
}) => (
  <div className="p-4 space-y-6">
    {/* Price Range */}
    <div className="space-y-4">
      <Label className="text-sm font-semibold">Цена за сутки (₽)</Label>
      <div className="flex items-center gap-3">
        <Input
          type="number"
          value={priceRange[0]}
          onChange={(e) => onPriceChange([+e.target.value, priceRange[1]])}
          className="text-center"
          min="0"
          aria-label="Минимальная цена"
        />
        <span className="text-muted-foreground">–</span>
        <Input
          type="number"
          value={priceRange[1]}
          onChange={(e) => onPriceChange([priceRange[0], +e.target.value])}
          className="text-center"
          min={priceRange[0]}
          aria-label="Максимальная цена"
        />
      </div>
      <Slider
        value={priceRange}
        onValueChange={onPriceChange}
        min={0}
        max={30000}
        step={100}
        aria-label="Диапазон цен"
      />
    </div>

    {/* Rooms & Beds */}
    <div className="grid gap-4 md:grid-cols-2">
      <div className="space-y-2">
        <Label className="text-sm font-semibold">Комнаты</Label>
        <div className="flex flex-wrap gap-2">
          {["1", "2", "3+"].map((room) => (
            <Button
              key={room}
              variant={selectedRooms === room ? "default" : "outline"}
              size="sm"
              onClick={() => onRoomSelect(room)}
              className="gap-1"
            >
              {selectedRooms === room && <Check className="w-4 h-4" />}
              {room}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-semibold">Спальные места</Label>
        <div className="flex flex-wrap gap-2">
          {["2", "3", "4", "5+"].map((bed) => (
            <Button
              key={bed}
              variant={selectedBeds === bed ? "default" : "outline"}
              size="sm"
              onClick={() => onBedSelect(bed)}
              className="gap-1"
            >
              {selectedBeds === bed && <Check className="w-4 h-4" />}
              {bed}
            </Button>
          ))}
        </div>
      </div>
    </div>

    {/* Metro */}
    <div className="space-y-2">
      <Label className="text-sm font-semibold">Метро</Label>
      <select
        value={selectedMetro}
        onChange={(e) => onMetroSelect(e.target.value)}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
          "ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        )}
        aria-label="Выберите станцию метро"
      >
        <option value="">Выберите станцию</option>
        <option value="Центральная">Центральная</option>
        <option value="Заречная">Заречная</option>
        <option value="Восточная">Восточная</option>
      </select>
    </div>

    {/* Amenities */}
    <div className="space-y-2">
      <Label className="text-sm font-semibold">Удобства</Label>
      <div className="flex flex-col gap-2">
        {AMENITIES.map((amenity) => (
          <label
            key={amenity}
            className="flex items-center gap-3 text-sm cursor-pointer"
          >
            <Checkbox
              checked={selectedAmenities.includes(amenity)}
              onCheckedChange={() => onAmenityToggle(amenity)}
              aria-label={`Выбрать ${amenity}`}
            />
            <span className="text-sm">{amenity}</span>
          </label>
        ))}
      </div>
    </div>
  </div>
);

export const Sidebar = () => {
  const isMobile = useIsMobile();
  const [isExpanded, setIsExpanded] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([900, 22100]);
  const [selectedRooms, setSelectedRooms] = useState("");
  const [selectedBeds, setSelectedBeds] = useState("");
  const [selectedMetro, setSelectedMetro] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const toggleAmenity = useCallback((amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  }, []);

  const applyFilters = useCallback(() => {
    console.log("Applying filters:", {
      priceRange,
      selectedRooms,
      selectedBeds,
      selectedMetro,
      selectedAmenities,
    });
    setIsOpen(false);
  }, [priceRange, selectedRooms, selectedBeds, selectedMetro, selectedAmenities]);

  const resetFilters = useCallback(() => {
    setPriceRange([900, 22100]);
    setSelectedRooms("");
    setSelectedBeds("");
    setSelectedMetro("");
    setSelectedAmenities([]);
  }, []);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden lg:flex  flex-col sticky top-4 bg-background border rounded-lg shadow-sm",
          "transition-all duration-300 overflow-hidden",
          isExpanded ? "max-w-[420px]" : "w-[60px]"
        )}
      >
        <div className="flex items-center justify-between p-3 border-b">
          {isExpanded && <h2 className="text-lg font-semibold">Фильтры</h2>}
          <Button
            variant="primary"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
            className='p-3 h-6 '
            aria-label={isExpanded ? "Свернуть фильтры" : "Развернуть фильтры"}
          >
            {isExpanded ? (
              <X className="h-5 w-5" />
            ) : (
              <SlidersHorizontal className="h-5 w-5" />
            )}
          </Button>
        </div>

        {isExpanded && (
          <>
            <FilterContent
              priceRange={priceRange}
              selectedRooms={selectedRooms}
              selectedBeds={selectedBeds}
              selectedMetro={selectedMetro}
              selectedAmenities={selectedAmenities}
              onPriceChange={setPriceRange}
              onRoomSelect={setSelectedRooms}
              onBedSelect={setSelectedBeds}
              onMetroSelect={setSelectedMetro}
              onAmenityToggle={toggleAmenity}
            />
            <div className=" p-4 border-t flex gap-2 ">
              <Button onClick={applyFilters} className="flex-1">
                Применить
              </Button>
              <Button
                variant="outline"
                onClick={resetFilters}
                className="flex-1"
              >
                Сбросить
              </Button>
            </div>
          </>
        )}
      </aside>

      {/* Mobile Controls */}
      {isMobile && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 lg:hidden">
          <Button
            onClick={() => setIsOpen(true)}
            className="rounded-full shadow-lg gap-2 px-6"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Фильтры
          </Button>
        </div>
      )}

      {/* Mobile Sheet */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent
          side="bottom"
          className="rounded-t-2xl h-[85vh] flex flex-col bg-slate-50"
        >
          <SheetHeader className="border-b">
            <SheetTitle className="text-lg">Фильтры</SheetTitle>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto">
            <FilterContent
              priceRange={priceRange}
              selectedRooms={selectedRooms}
              selectedBeds={selectedBeds}
              selectedMetro={selectedMetro}
              selectedAmenities={selectedAmenities}
              onPriceChange={setPriceRange}
              onRoomSelect={setSelectedRooms}
              onBedSelect={setSelectedBeds}
              onMetroSelect={setSelectedMetro}
              onAmenityToggle={toggleAmenity}
            />
          </div>

          <div className="sticky bottom-0 bg-background border-t p-4">
            <div className="flex gap-2">
              <Button onClick={applyFilters} className="flex-1">
                Применить
              </Button>
              <Button
                variant="outline"
                onClick={resetFilters}
                className="flex-1"
              >
                Сбросить
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};