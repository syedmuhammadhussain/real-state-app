"use client";

import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import BasicInfoForm from "./_steps/BasicInfoForm";
import ParametersForm from "./_steps/ParametersForm";
import MediaLocationForm from "./_steps/MediaLocationForm";
import { Button } from "@/components/ui/button";
import { useAuth } from "../../../../../context/AuthContext";
import { useApartment } from "../../../../../context/ApartmentContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { initialApartmentData } from "@/constants/data";

export default function NewApartmentForm() {
  // Текущий шаг (1‑3)
  const [step, setStep] = useState(1);
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const { createApartment, editMode, updateApartment } = useApartment();
  const [apartment, setApartment] = useState(initialApartmentData);

  const handleGetEditApartment = async () => {
    if (localStorage.getItem("apartmentForEdit")) {
      const apartmentId = await JSON.parse(
        localStorage.getItem("apartmentForEdit")
      );
      await setApartment(apartmentId);
    } else {
      await setApartment(initialApartmentData);
    }
  };

  useEffect(() => {
    handleGetEditApartment();
  }, []);

  const [errors, setErrors] = useState({});

  // ------------ Обработчики шагов ------------
  const handleBasicSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!apartment.title.trim())
      newErrors.title = "Пожалуйста, укажите заголовок.";
    if (!apartment.price || apartment.price <= 0)
      newErrors.price = "Цена должна быть больше 0.";
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
      alert("Пожалуйста, укажите площадь квартиры.");
      return;
    }
    setStep(3);
  };

  const handleMediaLocationSubmit = (e) => {
    debugger
    e.preventDefault();
    let payload = {
      ...apartment,
      owner: user.id,
      size: apartment.size !== "" ? Number(apartment.size) : apartment.size,
    };
    if (localStorage.getItem("apartmentForEdit")) {
      const withoutId = apartment.images.filter((f) => !f.id);
      updateApartment(payload, withoutId);
    } else {
      createApartment(payload, apartment.images);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto mt-10 mb-10 min-h-screen overflow-auto">
      <div className="flex flex-col gap-4">
        {/* Навигация по шагам */}
        <div className="mb-6  mx-auto  flex space-x-4 text-sm md:text-lg font-semibold text-primary-dark">
          {["Основная информация", "Параметры", "Медиа и адрес"].map(
            (label, i) => {
              const current = i + 1;
              const reached = step >= current;
              return (
                <span
                  key={label}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                    reached
                      ? "bg-primary-default text-white"
                      : "bg-gray-300 text-primary-dark"
                  }`}
                >
                  {/* {step > current ? <CheckCircle size={18} className="text-green-400" /> : null} */}
                  {current}. {isMobile ? "шаг" : label}
                </span>
              );
            }
          )}
        </div>

        {/* Текущий шаг */}
        <div className="bg-background-light  rounded-xl shadow-md border border-grey-500 ">
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
              editMode={editMode}
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

          {/* Кнопка "Назад" */}
          {step > 1 && (
            <div className="mt-4 pl-5 md:pl-0">
              <Button
                variant="outline"
                onClick={() => setStep(step - 1)}
                size="lg"
              >
                Назад
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
