'use client';

import { useState } from 'react';
import { CheckCircle } from 'lucide-react';

import BasicInfoForm from './_steps/BasicInfoForm';
import ParametersForm from './_steps/ParametersForm';
import MediaLocationForm from './_steps/MediaLocationForm';

import { Button } from '@/components/ui/button';
import { useAuth } from '../../../../../context/AuthContext';
import { useApartment } from '../../../../../context/ApartmentContext';
import { useIsMobile } from '@/hooks/use-mobile';

// Начальные данные для квартиры (доступны на всех шагах)
export const initialApartmentData = {
  title: '',
  description: '',
  price: 0,
  bedrooms: 1,
  bathrooms: 1,
  size: 0,
  propertyType: 'APARTMENT',
  images: [],
  rooms: 0,
  features: [],
  address:null,
  district:null,
  matro_station:null,
  city: null,
  amenities: [],
  infrastructures: [],
  kitchens: [],
  owner: null
};

export default function NewApartmentForm() {
  
  // Текущий шаг (1‑3)
  const [step, setStep] = useState(1);
  const {user} = useAuth()
  const isMobile = useIsMobile()
  const { currentApartment, createApartment , editMode, updateApartment } = useApartment()

  // Единый стейт для всей информации о квартире
  const [apartment, setApartment] = useState( editMode ? currentApartment  : initialApartmentData);

  // Контейнер для ошибок валидации
  const [errors, setErrors] = useState({});
  
  // ------------ Обработчики шагов ------------
  const handleBasicSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!apartment.title.trim()) newErrors.title = 'Пожалуйста, укажите заголовок.';
    if (!apartment.price || apartment.price <= 0)
      newErrors.price = 'Цена должна быть больше 0.';
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setStep(2);
  };

  const handleParametersSubmit = (e) => {
    e.preventDefault();
    if (apartment.size <= 0) {
      alert('Пожалуйста, укажите площадь квартиры.');
      return;
    }
    setStep(3);
  };

  // console.log('editmode', editMode)
  const handleMediaLocationSubmit = (e) => {
    e.preventDefault();
    // 👉 Здесь можно вызвать API для сохранения

    let payload  = {...apartment, owner:user.id}
    if (editMode) updateApartment(payload, apartment.images )
    if (!editMode) createApartment(payload, apartment.images )
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex flex-col gap-4">
        {/* Навигация по шагам */}
        <div className="mb-6  mx-auto  flex space-x-4 text-sm md:text-lg font-semibold text-primary-dark">
          {['Основная информация', 'Параметры', 'Медиа и адрес'].map((label, i) => {
            const current = i + 1;
            const reached = step >= current;
            return (
              <span
                key={label}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                  reached ? 'bg-primary-default text-white' : 'bg-gray-300 text-primary-dark'
                }`}
              >
                {step > current ? <CheckCircle size={18} className="text-green-400" /> : null}
                {current}. {isMobile ? 'шаг' : label }  
              </span>
            );
          })}
        </div>

        {/* Текущий шаг */}
        <div className="bg-background-light  rounded-xl shadow-md">
          {step === 1 && (
            <BasicInfoForm
              apartment={apartment}
              setApartment={setApartment}
              errors={errors}
              handleSubmit={handleBasicSubmit}
            />
          )}
          {step === 2 && (
            <ParametersForm
              editMode= {editMode}
              apartment={apartment}
              setApartment={setApartment}
              handleSubmit={handleParametersSubmit}
            />
          )}
          {step === 3 && (
            <MediaLocationForm
              apartment={apartment}
              setApartment={setApartment}
              handleSubmit={handleMediaLocationSubmit}
            />
          )}
        </div>

        {/* Кнопка "Назад" */}
        {step > 1 && (
          <div className="mt-4">
            <Button variant="outline" onClick={() => setStep(step - 1)} size="lg">
              Назад
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
