"use client";

import {
  CheckCircle,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import Input from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useApartment } from "../../../../../context/ApartmentContext";

/**
 * Presentational component – no Strapi calls here; all state is lifted up in Sidebar.
 */
export function FilterContent({
  /* state */
  priceRange,
  selectedRooms,
  selectedBeds,
  selectedBedrooms,
  selectedBathrooms,
  selectedMetro,
  selectedDistrict,
  selectedAmenities,
  selectedFeature,
  isCottage,
  /* data lists */
  metro = [],
  district = [],
  /* callbacks */
  onPriceChange,
  onRoomSelect,
  onBedSelect,
  onBedroomSelect,
  onBathroomSelect,
  onMetroSelect,
  onDistrictSelect,
  onAmenityToggle,
  onFeatureSelect,
  onCottageToggle,
}) {
  /* pull amenity / feature lists from global context */
  const { amenities, features, kitchens } = useApartment();
  
  


  return (
    <div className="space-y-6 ">
      {/* -------- Price -------- */}
      <div className="space-y-4">
        <p className="text-sm lg:text-base font-semibold text-primary-dark">Цена за сутки (₽)</p>
        <div className="flex items-center  gap-3">
          <Input
            label="from (₽)"
            type="number"
            value={priceRange[0]}
            onChange={(e) => onPriceChange([+e.target.value, priceRange[1]])}
            className="text-center"
            min={0}
          />
          <span className="text-muted-foreground">–</span>
          <Input
            label="to (₽)"

            type="number"
            value={priceRange[1]}
            onChange={(e) => onPriceChange([priceRange[0], +e.target.value])}
            className="text-center"
            min={priceRange[0]}
          />
        </div>
        <Slider
          value={priceRange}
          onValueChange={onPriceChange}
          min={0}
          max={30000}
          step={100}
        />
      </div>
      {/* -------- Rooms / Beds / Bedrooms / Bathrooms -------- */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Apartment type (rooms) */}
        <div className="space-y-2">
          <p className="text-sm lg:text-base font-semibold text-primary-dark">
            Комнаты
          </p>
          <div className="flex flex-wrap gap-2">
            {["1", "2", "3", "4", "5+"].map((r) => (
              <Button
                key={r}
                size="sm"
                variant={selectedRooms === r ? "default" : "outline"}
                onClick={() => onRoomSelect(r)}
                className={cn(
                  "gap-1 text-primary-dark",
                  selectedRooms === r && "bg-primary-default text-white"
                )}
              >
                {selectedRooms === r && (
                  <CheckCircle className="h-5 w-5 text-green-400" />
                )}{" "}
                {r}
              </Button>
            ))}
          </div>
        </div>

        {/* Beds */}
        <div className="space-y-2">
          <p className="text-sm lg:text-base font-semibold text-primary-dark">
            Спальные места
          </p>
          <div className="flex flex-wrap gap-2">
            {["1", "2", "3", "4+"].map((b) => (
              <Button
                key={b}
                size="sm"
                variant={selectedBeds === b ? "default" : "outline"}
                onClick={() => onBedSelect(b)}
                className={cn(
                  "gap-1 text-primary-dark",
                  selectedBeds === b && "bg-primary-default text-white"
                )}
              >
                {selectedBeds === b && (
                  <CheckCircle className="h-5 w-5 text-green-400" />
                )}{" "}
                {b}
              </Button>
            ))}
          </div>
        </div>

        {/* Bedrooms */}
        <div className="space-y-2">
         <p className="text-sm lg:text-base font-semibold text-primary-dark">
            Спальни
          </p>
          <div className="flex flex-wrap gap-2">
            {["1", "2", "3", "4"].map((n) => (
              <Button
                key={n}
                size="sm"
                variant={selectedBedrooms === n ? "default" : "outline"}
                onClick={() => onBedroomSelect(n)}
                className={cn(
                  "gap-1 text-primary-dark",
                  selectedBedrooms === n && "bg-primary-default text-white"
                )}
              >
                {selectedBedrooms === n && (
                  <CheckCircle className="h-5 w-5 text-green-400" />
                )}{" "}
                {n}
              </Button>
            ))}
          </div>
        </div>

        {/* Bathrooms */}
        <div className="space-y-2">
         <p className="text-sm lg:text-base font-semibold text-primary-dark">
            Ванные комнаты
          </p>
          <div className="flex flex-wrap gap-2">
            {["1", "2", "3", "4"].map((b) => (
              <Button
                key={b}
                size="sm"
                variant={selectedBathrooms === b ? "default" : "outline"}
                onClick={() => onBathroomSelect(b)}
                className={cn(
                  "gap-1 text-primary-dark",
                  selectedBathrooms === b && "bg-primary-default text-white"
                )}
              >
                {selectedBathrooms === b && (
                  <CheckCircle className="h-5 w-5 text-green-400" />
                )}{" "}
                {b}
              </Button>
            ))}
          </div>
        </div>
      </div>
      {/* -------- Property Type -------- */}
      <div className="space-y-2">
        <p className="text-sm lg:text-base font-semibold text-primary-dark">Тип жилья</p>
        <label className="flex cursor-pointer items-center gap-3 text-sm text-primary-dark">
          <Checkbox checked={isCottage} onCheckedChange={onCottageToggle} />{" "}
          Коттедж
        </label>
      </div>
      {/* -------- Metro -------- */}
      {metro.length > 0 && (
        <div className="space-y-2">
          <label className="text-sm lg:text-base font-semibold text-primary-dark">
            Метро
          </label>
          <select
            value={selectedMetro}
            onChange={(e) => onMetroSelect(e.target.value)}
            className="flex h-10 w-full rounded-xl border px-3 py-2 text-sm ring-offset-background focus:outline-primary-light"
          >
            <option value="">Выберите станцию</option>
            {metro?.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
        </div>
      )}
      {/* -------- District -------- */}
      {district.length > 0 && (
        <div className="space-y-2">
          <label className="ttext-sm lg:text-base font-semibold text-primary-dark">
            Округ
          </label>
          <select
            value={selectedDistrict}
            onChange={(e) => onDistrictSelect(e.target.value)}
            className="flex h-10 w-full rounded-xl border px-3 py-2 text-sm ring-offset-background focus:outline-primary-light"
          >
            <option value="">Выберите округ</option>
            {district?.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
        </div>
      )}
      {/* -------- Feature (single select) -------- */}
      {features.length > 0 && (
        <div className="space-y-2">
          <label className="text-sm lg:text-base font-semibold text-primary-dark">
            Доп. особенность
          </label>
          <select
            value={selectedFeature}
            onChange={(e) => onFeatureSelect(e.target.value)}
            className="flex h-10 w-full rounded-xl border px-3 py-2 text-sm ring-offset-background focus:outline-primary-light"
          >
            {/* <option value=\"\">Не выбрано</option> */}
            {features.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name}
              </option>
            ))}
          </select>
        </div>
      )}
      {/* -------- Amenities (checkbox grid) -------- */}
      <div>
        <label className="text-sm lg:text-base font-semibold text-primary-dark">
          Удобства
        </label>
        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
          {amenities.map((am) => (
            <label
              key={am.id}
              className="flex cursor-pointer items-center gap-3 text-sm text-primary-dark"
            >
              <Checkbox
                checked={selectedAmenities.includes(am)}
                onCheckedChange={() => onAmenityToggle(am)}
              />
              {am.name}
            </label>
          ))}
        </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {kitchens.map((am) => (
            <label
              key={am.id}
              className="flex cursor-pointer items-center gap-3 text-sm text-primary-dark"
            >
              <Checkbox
                checked={selectedAmenities.includes(am)}
                onCheckedChange={() => onAmenityToggle(am)}
              />
              {am.name}
            </label>
          ))}
        </div>
      </div>
      
       
    </div>
  )
}
