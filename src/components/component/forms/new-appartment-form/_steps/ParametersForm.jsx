"use client";

import { Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useApartment } from "../../../../../../context/ApartmentContext";
import { cn } from "@/lib/utils";

export default function ParametersForm({
  apartment,
  setApartment,
  handleSubmit,
  editMode,
}) {
  const toggleItem = (field, id) => {
    const selected = apartment[field] ?? [];
    const isSelected = selected.some((item) => item.id === id);

    let next;
    if (isSelected) {
      next = selected.filter((item) => item.id !== id);
    } else {
      // Find the full option from context
      const option = getOptionFromContext(field, id);
      if (option) {
        next = [...selected, option];
      } else {
        // If not found in context, use just the ID (fallback)
        next = [...selected, { id }];
      }
    }

    setApartment({ ...apartment, [field]: next });
  };

  // Helper to find option in context data
  const getOptionFromContext = (field, id) => {
    switch (field) {
      case "features":
        return features.find((opt) => opt.id === id);
      case "amenities":
        return amenities.find((opt) => opt.id === id);
      case "kitchens":
        return kitchens.find((opt) => opt.id === id);
      case "infrastructures":
        return infrastructures.find((opt) => opt.id === id);
      default:
        return null;
    }
  };

  const handleChange = (field, value) =>
    setApartment({ ...apartment, [field]: value });

  const {
    amenities = [],
    features = [],
    kitchens = [],
    infrastructures = [],
  } = useApartment();

  // Utility to render an options group
  const renderGroup = (label, field, options) => (
    <div className="mt-4 p-4 border rounded-xl">
      <h3 className="text-2xl font-bold mb-2 text-primary-dark">{label}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {options.map((opt) => (
          <label key={opt.id} className="inline-flex items-center gap-2">
            <Checkbox
              checked={(apartment[field] ?? []).some(
                (item) => item.id === opt.id
              )}
              onCheckedChange={() => toggleItem(field, opt.id)}
            />
            <span>{opt.name ?? opt.label ?? opt.id}</span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white shadow-md rounded-xl p-6"
    >
      <h2 className="text-xl font-bold mb-4 flex items-center text-primary-dark">
        <Package className="w-7 h-7 mr-2 text-primary-dark" /> Параметры
        квартиры
      </h2>

      {/* Numeric details */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Input
          label="Количество спален"
          type="number"
          min="0"
          value={apartment.bedrooms ?? ""}
          onChange={(e) => handleChange("bedrooms", +e.target.value)}
          required
        />
        <Input
          label="Количество ванных"
          type="number"
          min="0"
          value={apartment.bathrooms ?? ""}
          onChange={(e) => handleChange("bathrooms", +e.target.value)}
          required
        />
        {/* <div className="relative w-full">
          <label
            htmlFor="size_area"
            className="block text-sm mb-2 font-medium text-primary-dark"
          >
            Площадь (м²)
          </label>
          <input
            id="size_area"
            type="text"
            value={apartment.size ?? ""}
            onChange={(e) => handleChange("size", e.target.value)}
            className={cn(
              "w-full rounded-xl border !pr-9 px-4 py-2 text-primary-dark bg-background-default focus:ring-2 focus:ring-primary-default focus:outline-none transition-all duration-300 ease-in-out border-gray-300 hover:border-primary-default"
            )}
          />
        </div> */}
        <Input
          label="Площадь (м²)"
          type="number"
          min="0"
          value={apartment.size ?? ""}
          onChange={(e) => handleChange("size", e.target.value)}
          required
        />
      </div>

      {/* Always pass full options from context */}
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
