"use client";

import { Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useApartment } from "../../../../../../context/ApartmentContext";

/**
 * Форма параметров квартиры (русская локализация)
 *
 * @param {{
 *   apartment: Record<string, any>,
 *   setApartment: (apartment: any) => void,
 *   handleSubmit: (ev: React.FormEvent) => void,
 * }} props
 */
export default function ParametersForm({ apartment, setApartment, handleSubmit }) {

  const toggleItem = (field, id) => {
    const selected = apartment[field] ?? [];
    const next = selected.includes(id) ? selected.filter((x) => x !== id) : [...selected, id];
    setApartment({ ...apartment, [field]: next });
  };

  const handleChange = (field, value) => setApartment({ ...apartment, [field]: value });

  const {
    amenities = [],
    features = [],
    kitchens = [],
    infrastructures = [],
  } = useApartment();

  // utility to render an options group
  const renderGroup = (label, field, options) => (
    <div className="mt-4 p-4 border rounded-md">
      <h3 className="text-2xl font-bold mb-2 text-primary-dark">{label}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {options.map((opt) => (
          <label key={opt.id} className="inline-flex items-center gap-2">
            <Checkbox
              checked={(apartment[field] ?? []).includes(opt.id)}
              onCheckedChange={() => toggleItem(field, opt.id)}
            />
            <span>{opt.name ?? opt.label ?? opt.id}</span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold mb-4 flex items-center text-primary-dark">
        <Package className="w-7 h-7 mr-2 text-primary-dark" /> Параметры квартиры
      </h2>

      {/* numeric details */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Input
          label="Количество спален"
          type="number"
          min="0"
          value={apartment.bedrooms ?? ""}
          onChange={(e) => handleChange("bedrooms", +e.target.value)}
        />
        <Input
          label="Количество ванных"
          type="number"
          min="0"
          value={apartment.bathrooms ?? ""}
          onChange={(e) => handleChange("bathrooms", +e.target.value)}
        />
        <Input
          label="Площадь (м²)"
          type="number"
          min="0"
          value={apartment.size ?? ""}
          onChange={(e) => handleChange("size", +e.target.value)}
        />
      </div>

      {renderGroup("Характеристики здания", "features", features)}
      {renderGroup("Удобства", "amenities", amenities)}
      {renderGroup("Оснащение кухни", "kitchens", kitchens)}
      {renderGroup("Инфраструктура рядом", "infrastructures", infrastructures)}

      <Button type="submit" variant="primary" className="mt-6 w-full sm:w-auto">
        Продолжить к медиа и локации
      </Button>
    </form>
  );
}
