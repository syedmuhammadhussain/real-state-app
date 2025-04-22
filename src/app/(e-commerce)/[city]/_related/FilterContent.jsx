"use client";

import {  Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import Input from "@/components/ui/input";

const AMENITIES = [
    "Wi-Fi",
    "Смарт-ТВ",
    "Кондиционер",
    "Стиральная машина",
    "Кабельное ТВ",
    "Посудомоечная машина",
    "Сушилка",
    "Микроволновка",
    "Кофеварка",
    "Игровая приставка",
    "Детская кроватка",
    "Высокий стул",
    "Рабочий стол",
    "Принтер",
    "Сканер",
    "Аудиосистема",
    "Проигрыватель пластинок",
    "Арт-коллекция",
    "Умный дом",
    "Робот-пылесос",
    "Светомузыка",
    "Домашний кинотеатр",
    "Джакузи",
    "Сауна",
    "Оборудование для барбекю",
    "Уличная мебель",
    "Место для костра",
    "Винтажная мебель",
    "Библиотека",
    "Камин"
  ]

export function FilterContent({
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
  }) {
    return (
      <div className="space-y-6 p-4">
        {/* Price */}
        <div className="space-y-4">
          <Label className="text-sm font-semibold">Цена за сутки (₽)</Label>
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
            <Label className="text-sm font-semibold">Комнаты</Label>
            <div className="flex flex-wrap gap-2">
              {["1", "2", "3+"].map(r => (
                <Button
                  key={r}
                  size="sm"
                  variant={selectedRooms === r ? "default" : "outline"}
                  onClick={() => onRoomSelect(r)}
                  className="gap-1"
                >
                  {selectedRooms === r && <Check className="h-4 w-4" />} {r}
                </Button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Спальные места</Label>
            <div className="flex flex-wrap gap-2">
              {["2", "3", "4", "5+"].map(b => (
                <Button
                  key={b}
                  size="sm"
                  variant={selectedBeds === b ? "default" : "outline"}
                  onClick={() => onBedSelect(b)}
                  className="gap-1"
                >
                  {selectedBeds === b && <Check className="h-4 w-4" />} {b}
                </Button>
              ))}
            </div>
          </div>
        </div>
  
        {/* Cottage */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold">Тип жилья</Label>
          <label className="flex cursor-pointer items-center gap-3 text-sm">
            <Checkbox checked={isCottage} onCheckedChange={onCottageToggle} /> Коттедж
          </label>
        </div>
  
        {/* Metro */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold">Метро</Label>
          <select
            value={selectedMetro}
            onChange={e => onMetroSelect(e.target.value)}
            className={cn(
              "flex h-10 w-full rounded-md border px-3 py-2 text-sm ring-offset-background",
              "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            )}
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
            {AMENITIES.map(a => (
              <label key={a} className="flex cursor-pointer items-center gap-3 text-sm">
                <Checkbox checked={selectedAmenities.includes(a)} onCheckedChange={() => onAmenityToggle(a)} />
                {a}
              </label>
            ))}
          </div>
        </div>
      </div>
    );
  }
  