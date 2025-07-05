"use client";

import React, { useEffect, useState } from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/input";
import { useApartment } from "../../../../../../context/ApartmentContext";

export default function BasicInfoForm({
  apartment,
  setApartment,
  errors = {},
  handleSubmit,
}) {
  const { cities = [] } = useApartment();
  const [isEditingApartment, setIsEditingApartment] = useState(false);

  console.log("apartment", apartment);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsEditingApartment(Boolean(localStorage.getItem("apartmentForEdit")));
    }
  }, []);

  const normalizeOption = (item, idx) => {
    if (typeof item === "string") return { key: item, label: item };
    if (item && typeof item === "object") {
      return {
        key: item.id !== undefined ? item.id : `${item.name}-${idx}`,
        label: item.name ?? String(item),
      };
    }
    return { key: idx, label: String(item) };
  };

  const selectedCityId =
    typeof apartment.city === "object" ? apartment.city?.id : apartment.city;
  const selectedCity = cities.find((c) => c.id == selectedCityId);

  const districtOptions = (selectedCity?.districts ?? []).map(normalizeOption);
  const metroOptions = (selectedCity?.metro_stations ?? []).map(
    normalizeOption
  );

  const handleChange = (field) => (e) => {
    const value = ["rooms", "district", "metro_station", "price"].includes(
      field
    )
      ? +e.target.value
      : e.target.value;
    setApartment({ ...apartment, [field]: value });
  };

  const handleCityChange = (e) => {
    setApartment({
      ...apartment,
      city: +e.target.value,
      district: null,
      metro_station: null,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white shadow-md rounded-xl p-6"
    >
      <h2 className="text-xl font-semibold flex items-center gap-2 text-primary-dark">
        <Mail className="w-7 h-7 text-primary-dark" />
        Основная информация
      </h2>

      <Input
        label="Название объявления"
        id="title"
        value={apartment.title || ""}
        onChange={handleChange("title")}
        placeholder="Просторная квартира в центре города"
        required
        error={errors.title}
      />

      <div className="space-y-1">
        <label
          htmlFor="description"
          className="block mb-1 text-sm text-primary-dark"
        >
          Описание
        </label>
        <textarea
          id="description"
          className="border p-2 w-full rounded-xl bg-background-default focus:ring-2 focus:ring-primary-default focus:outline-none transition-all duration-300 ease-in-out"
          value={apartment.description || ""}
          onChange={handleChange("description")}
          placeholder="Опишите преимущества и особенности жилья"
          required
        />
        {errors.description && (
          <p className="text-sm text-destructive">{errors.description}</p>
        )}
      </div>

      <Input
        label="Цена (₽ / ночь)"
        type="number"
        id="price"
        min="0"
        value={apartment.price || ""}
        onChange={handleChange("price")}
        placeholder="5000"
        required
        error={errors.price}
      />

      <Input
        label="Количество комнат"
        type="number"
        id="rooms"
        min="0"
        value={apartment.rooms || ""}
        onChange={handleChange("rooms")}
        placeholder="1"
        required
        error={errors.room}
      />

      <div>
        <label
          htmlFor="propertyType"
          className="block mb-1 text-sm text-primary-dark"
        >
          Тип недвижимости
        </label>
        <select
          id="propertyType"
          className="w-full p-2 rounded-xl border px-4 py-2 text-textColor-dark bg-background-default focus:ring-2 focus:ring-primary-default focus:outline-none transition-all duration-300 ease-in-out"
          value={apartment.propertyType || "APARTMENT"}
          onChange={handleChange("propertyType")}
          required
        >
          <option value="APARTMENT">Квартира</option>
          <option value="VILLA">Вилла</option>
        </select>
      </div>

      <Input
        label="Адрес"
        id="address"
        value={apartment.address ?? ""}
        onChange={handleChange("address")}
        placeholder="ул. Ленина 15, Москва"
      />

      <div>
        <label htmlFor="city" className="block text-sm text-primary-dark mb-1">
          Город
        </label>
        <select
          id="city"
          className="w-full p-2 rounded-xl border px-4 py-2 text-textColor-dark bg-background-default focus:ring-2 focus:ring-primary-default focus:outline-none transition-all duration-300 ease-in-out"
          value={isEditingApartment ? apartment.city?.id : apartment.city || ""}
          onChange={handleCityChange}
          required
        >
          <option value="" disabled>
            Выберите город
          </option>
          {cities.map((c, idx) => (
            <option key={c.name || idx} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        {errors.city && (
          <p className="text-sm text-destructive">{errors.city}</p>
        )}
      </div>

      {districtOptions.length > 0 && (
        <div>
          <label
            htmlFor="district"
            className="block text-sm text-primary-dark mb-1"
          >
            Район
          </label>
          <select
            id="district"
            className="w-full p-2 rounded-xl border px-4 py-2 text-textColor-dark bg-background-default focus:ring-2 focus:ring-primary-default focus:outline-none transition-all duration-300 ease-in-out"
            value={
              isEditingApartment
                ? apartment.district?.id
                : apartment.district || ""
            }
            onChange={handleChange("district")}
            required
          >
            <option value={null}>Выберите район</option>
            {districtOptions.map(({ key, label }) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
          {errors.district && (
            <p className="text-sm text-destructive">{errors.district}</p>
          )}
        </div>
      )}

      {metroOptions.length > 0 && (
        <div>
          <label
            htmlFor="metro_station"
            className="block text-sm text-primary-dark mb-1"
          >
            Станция метро
          </label>
          <select
            id="metro_station"
            className="w-full p-2 rounded-xl border px-4 py-2 text-textColor-dark bg-background-default focus:ring-2 focus:ring-primary-default focus:outline-none transition-all duration-300 ease-in-out"
            value={
              isEditingApartment
                ? apartment.metro_station?.id
                : apartment.metro_station || ""
            }
            onChange={handleChange("metro_station")}
            required
          >
            <option value={null}>Выберите станцию метро</option>
            {metroOptions.map(({ key, label }) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
          {errors.metro && (
            <p className="text-sm text-destructive">{errors.metro}</p>
          )}
        </div>
      )}

      <Button type="submit" variant="primary" className="mt-4 w-full sm:w-auto">
        Продолжить к деталям
      </Button>
    </form>
  );
}
