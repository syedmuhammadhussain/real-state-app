"use client";

import {  Check, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import Input from "@/components/ui/input";
import { useApartment } from "../../../../../context/ApartmentContext";

export function FilterContent({
    metro,
    district,
    priceRange,
    selectedRooms,
    selectedBeds,
    selectedMetro,
    selectedAmenities,
    isCottage,
    onPriceChange,
    onRoomSelect,
    onBedSelect,
    onMetroSelect,
    onAmenityToggle,
    onCottageToggle,
    selectedDistict,
    setSelectedDistict
  }) {

    const { amenities, features, infrastructures, kitchens, cities } = useApartment()

    return (
      <div className="space-y-6 p-4">
        
        {/* Price */}
        <div className="space-y-4">
          <Label className="text-sm font-semibold  text-primary-dark">Цена за сутки (₽)</Label>
          <div className="flex items-center gap-3">
            <Input
              type="number"
              value={priceRange[0]}
              onChange={e => onPriceChange([+e.target.value, priceRange[1]])}
              className="text-center"
              min={0}
            />
            <span className="text-muted-foreground">–</span>
            <Input
              type="number"
              value={priceRange[1]}
              onChange={e => onPriceChange([priceRange[0], +e.target.value])}
              className="text-center"
              min={priceRange[0]}
            />
          </div>
          <Slider value={priceRange} onValueChange={onPriceChange} min={0} max={30000} step={100} />
        </div>
  
        {/* Rooms & Beds */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label className="text-sm font-semibold  text-primary-dark">Комнаты</Label>
            <div className="flex flex-wrap gap-2">
              {["1", "2", "3+"].map(r => (
                <Button
                  key={r}
                  size="sm"
                  variant={selectedRooms === r ? "default" : "outline"}
                  onClick={() => onRoomSelect(r)}
                  className={`gap-1 text-primary-dark ${selectedRooms === r && ' text-white' }`}
                >
                  {selectedRooms === r && <CheckCircle className="h-5  w-5 text-green-500" />} {r}
                </Button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-primary-dark">Спальные места</Label>
            <div className="flex flex-wrap gap-2">
              {["1", "2", "3+"].map(b => (
                <Button
                  key={b}
                  size="sm"
                  variant={selectedBeds === b ? "default" : "outline"}
                  onClick={() => onBedSelect(b)}
                  className={`gap-1 text-primary-dark ${selectedBeds === b && 'bg-primary-default text-white' }`}
                >
                  {selectedBeds === b && <CheckCircle className="h-5  w-5 text-green-400" />} {b}
                </Button>
              ))}
            </div>
          </div>
        </div>
  
        {/* Cottage */}
        <div className="space-y-2">
          <Label className=" font-semibold  text-primary-dark">Тип жилья</Label>
          <label className="flex cursor-pointer items-center gap-3 text-sm text-primary-dark">
            <Checkbox checked={isCottage} onCheckedChange={onCottageToggle} /> Коттедж
          </label>

           <label className="flex cursor-pointer items-center gap-3 text-sm text-primary-dark">
            <Checkbox checked={isCottage} onCheckedChange={onCottageToggle} /> квартира
          </label>
        </div>
  
        {/* Metro */}
        {metro.length >  0 && 
             <div className="space-y-2">
             <Label className="text-sm font-semibold  text-primary-dark ">Метро</Label>
             <select
               value={selectedMetro}
               onChange={e => onMetroSelect(e.target.value)}
               className={cn(
                 "flex h-10 w-full px-2  text-primary-dark  rounded-md border py-3 text-sm ring-offset-background",
                 "focus:outline-primary-light "
               )}
             >
               <option value="">Выберите станцию</option>
               {metro.map((m,idx)=>{
                 return(
                   <option key={idx} value={m}>{m}</option>
                 )
               })}
               {/* <option value="Заречная">Заречная</option>
               <option value="Восточная">Восточная</option> */}
             </select>
           </div> 
           }
   
         {/* district  */}
         <div className="space-y-2">
          <Label className="text-sm font-semibold text-primary-dark  ">Округ</Label>
          <select
            value={selectedDistict}
            onChange={e => setSelectedDistict(e.target.value)}
            className={cn(
              "flex h-10 w-full rounded-md border px-3 py-2 text-sm ring-offset-background",
              "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            )}
          >
            <option value="">Выберите станцию</option>
            {district.map((d,idx)=>{
              return(
                <option key={idx} value={d}>{d}</option>
              )
            })}
      
          </select>
        </div>
  
        {/* Amenities */}
        <div className="">
          <Label className="text-sm font-semibold text-primary-dark ">Удобства</Label>
          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2">
            {amenities.map((amenity) => (
              <label
                key={amenity.id}
                className="flex cursor-pointer items-center gap-3 text-sm text-primary-dark"
              >
                <Checkbox
                  checked={selectedAmenities.includes(amenity)}
                  onCheckedChange={() => onAmenityToggle(amenity)}
                />
                {amenity.name}
              </label>
            ))}
            {features.map((amenity) => (
              <label
                key={amenity.id}
                className="flex cursor-pointer items-center gap-3 text-sm text-primary-dark"
              >
                <Checkbox
                  checked={selectedAmenities.includes(amenity)}
                  onCheckedChange={() => onAmenityToggle(amenity)}
                />
                {amenity.name}
              </label>
            ))}
            {kitchens.map((amenity) => (
              <label
                key={amenity.id}
                className="flex cursor-pointer items-center gap-3 text-sm text-primary-dark"
              >
                <Checkbox
                  checked={selectedAmenities.includes(amenity)}
                  onCheckedChange={() => onAmenityToggle(amenity)}
                />
                {amenity.name}
              </label>
            ))}
          </div>
        </div>
      
      </div>
    );
  }
  