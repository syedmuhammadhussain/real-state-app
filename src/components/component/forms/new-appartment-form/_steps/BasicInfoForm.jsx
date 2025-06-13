'use client';

import React from 'react';
import { Mail } from 'lucide-react';

import { Button } from '@/components/ui/button';
import Input from '@/components/ui/input';
import { useApartment } from '../../../../../../context/ApartmentContext';

/**
 * Basic apartment information form (JavaScript, Russian locale)
 * Handles cascading selects (city → district → metro) with **unique React keys**
 * even when the source arrays contain objects instead of plain strings.
 *
 * @param {{
 *   apartment: Record<string, any>,
 *   setApartment: (apartment: any) => void,
 *   errors: Record<string, string>,
 *   handleSubmit: (e: React.FormEvent) => void,
 * }} props
 */
export default function BasicInfoForm({ apartment, setApartment, errors = {}, handleSubmit }) {
  const { cities = [] } = useApartment();

  const normalise = (item, idx) => {
    if (typeof item === 'string') return { key: item, label: item };
    if (item && typeof item === 'object') {
      return {
        key: item.id !== undefined ? item.id : `${item.name}-${idx}`,
        label: item.name ?? String(item),
      };
    }
    // Fallback (shouldn't happen): use index
    return { key: idx, label: String(item) };
  };

  const selectedCity = cities.find((c) => c.name === apartment.city);
  const districtOptions = (selectedCity?.districts ?? []).map(normalise);
  const metroOptions = (selectedCity?.matro_stations ?? []).map(normalise);

  const onChange = (field) => (e) => {
    const value = field === 'price' ? +e.target.value : e.target.value;
    setApartment({ ...apartment, [field]: value });
  };

  const handleCityChange = (e) => {
    const city = e.target.value;
    setApartment({ ...apartment, city, district: '', metro: '' });
  };
  const handleChange = (field, value) => {
    setApartment({
      ...apartment,
      location: { ...apartment.location, [field]: value },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow-md rounded-2xl p-6">
      <h2 className="text-xl font-semibold flex items-center gap-2">
        <Mail className="w-5 h-5 text-primary-default" />
        Основная информация
      </h2>

      {/* Название */}
      <Input
        label="Название объявления"
        id="title"
        value={apartment.title || ''}
        onChange={onChange('title')}
        placeholder="Просторная квартира в центре города"
        required
        error={errors.title}
      />

      {/* Описание */}
      <div className="space-y-1">
        <label htmlFor="description" className="block mb-1 text-sm text-primary-dark">
          Описание
        </label>
        <textarea
          id="description"
          className="border p-2 w-full rounded-lg  bg-background-default focus:ring-2 focus:ring-primary-default focus:outline-none transition-all duration-300 ease-in-out"
          value={apartment.description || ''}
          onChange={onChange('description')}
          placeholder="Опишите преимущества и особенности жилья"
          required
        />
        {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
      </div>

      {/* Цена */}
      <Input
        label="Цена (₽ / ночь)"
        type="number"
        id="price"
        min="0"
        value={apartment.price || ''}
        onChange={onChange('price')}
        placeholder="5000"
        required
        error={errors.price}
      />

      {/* Тип недвижимости */}
      <div>
        <label htmlFor="propertyType" className="block  mb-1 text-sm text-primary-dark">
          Тип недвижимости
        </label>
        <select
          id="propertyType"
            className="w-full p-2 rounded-lg border !pr-9 px-4 py-2 text-textColor-dark bg-background-default focus:ring-2 focus:ring-primary-default focus:outline-none transition-all duration-300 ease-in-out"
          value={apartment.propertyType || 'APARTMENT'}
          onChange={onChange('propertyType')}
          required
        >
          <option value="APARTMENT">Квартира</option>
          <option value="VILLA">Вилла</option>
        </select>
      </div>

      <Input
        label="Адрес"
        id="title"
        value={apartment.location.address ?? ''}
        onChange={(e) => handleChange('address', e.target.value)}
        placeholder="ул. Ленина 15, Москва"
      />
        
      {/* Город */}
      <div>
        <label htmlFor="city" className="block text-sm text-primary-dark mb-1">
          Город
        </label>
        <select
          id="city"
          className=" w-full  p-2 rounded-lg border !pr-9 px-4 py-2 text-textColor-dark bg-background-default focus:ring-2 focus:ring-primary-default focus:outline-none transition-all duration-300 ease-in-out"
          value={apartment.city || ''}
          onChange={handleCityChange}
          required
        >
          <option value="" disabled>
            Выберите город
          </option>
          {cities.map((c, idx) => (
            <option key={c.name || idx} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
        {errors.city && <p className="text-sm text-destructive">{errors.city}</p>}
      </div>

      {/* Район */}
      {districtOptions.length > 0 && (
        <div>
          <label htmlFor="district" className="block text-sm text-primary-dark mb-1">
            Район
          </label>
          <select
            id="district"
            className=" w-full  p-2 rounded-lg border !pr-9 px-4 py-2 text-textColor-dark bg-background-default focus:ring-2 focus:ring-primary-default focus:outline-none transition-all duration-300 ease-in-out"
            value={apartment.district || ''}
            onChange={onChange('district')}
            required
          >
            <option value="" disabled>
              Выберите район
            </option>
            {districtOptions.map(({ key, label }) => (
              <option key={key} value={label}>
                {label}
              </option>
            ))}
          </select>
          {errors.district && <p className="text-sm text-destructive">{errors.district}</p>}
        </div>
      )}

      {/* Метро */}
      {metroOptions.length > 0 && (
        <div>
          <label htmlFor="metro" className="block text-sm text-primary-dark mb-1">
            Станция метро
          </label>
          <select
            id="metro"
             className=" w-full p-2 rounded-lg border !pr-9 px-4 py-2 text-textColor-dark bg-background-default focus:ring-2 focus:ring-primary-default focus:outline-none transition-all duration-300 ease-in-out"
            value={apartment.metro || ''}
            onChange={onChange('metro')}
            required
          >
            <option value="" disabled>
              Выберите станцию метро
            </option>
            {metroOptions.map(({ key, label }) => (
              <option key={key} value={label}>
                {label}
              </option>
            ))}
          </select>
          {errors.metro && <p className="text-sm text-destructive">{errors.metro}</p>}
        </div>
      )}

      <Button type="submit" variant="primary" className="mt-4 w-full sm:w-auto">
        Продолжить к деталям
      </Button>
    </form>
  );
}
