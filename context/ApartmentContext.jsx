// contexts/ApartmentContext.jsx
'use client'

import { createContext, useContext, useState } from 'react';
// import { useRouter } from 'next/router';
import { api } from '@/lib/api';
import { toast } from '@/hooks/use-toast';

const ApartmentContext = createContext();

export const ApartmentProvider = ({ children }) => {
    
//   const router = useRouter();
  const [apartments, setApartments] = useState([]);
  const [currentApartment, setCurrentApartment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const initialApartmentData = {
    title: '',
    price: 0,
    bedrooms: 1,
    bathrooms: 1,
    size: 0,
    propertyType: 'APARTMENT',
    images: [],
    location: null,
    features: [],
    city: null,
    amenities: [],
    infrastructures: [],
    kitchens: [],
    owner: null
  };

  // Получить все квартиры
  const fetchApartments = async () => {
    setLoading(true);
    try {
      const response = await api.get(`${apiUrl}/products`);
      const data = await response.json();
      setApartments(data);
      setError(null);
    } catch (err) {
      console.error('Ошибка при загрузке:', err);
      setError('Не удалось загрузить список квартир');
      toast({
        variant: 'destructive',
        title: 'Ошибка загрузки',
        description: 'Не удалось получить список квартир.'
      });
    } finally {
      setLoading(false);
    }
  };

  // Получить квартиры по ID города
  const fetchApartmentsByCity = async (cityId) => {
    setLoading(true);
    try {
      const response = await api.get(`${apiUrl}/apartments?filters[city][id]=${cityId}`);
      const data = await response.json();
      setApartments(data);
      setError(null);
    } catch (err) {
      console.error('Ошибка при загрузке по городу:', err);
      setError('Не удалось получить квартиры по городу');
      toast({
        variant: 'destructive',
        title: 'Ошибка загрузки',
        description: 'Не удалось получить квартиры в указанном городе.'
      });
    } finally {
      setLoading(false);
    }
  };

  // Получить конкретную квартиру по ID
  const fetchApartmentById = async (id) => {
    setLoading(true);
    try {
      const response = await api.get(`${apiUrl}/apartments/${id}`);
      const apartment = await response.json();
      setCurrentApartment(apartment);
      return apartment;
    } catch (err) {
      console.error('Ошибка при получении квартиры:', err);
      setError('Не удалось получить данные квартиры');
      toast({
        variant: 'destructive',
        title: 'Ошибка получения',
        description: 'Не удалось загрузить информацию о квартире.'
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createApartment = async (apartmentData) => {
    setLoading(true);
    try {
      const response = await api.post(`${apiUrl}/apartments`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({ data: apartmentData })
      });

      if (!response.ok) throw new Error('Не удалось создать квартиру');

      const newApartment = await response.json();
      setApartments(prev => [...prev, newApartment]);

      toast({
        variant: 'success',
        title: 'Квартира создана',
        description: 'Новая квартира успешно добавлена.'
      });

    //   router.push('/apartments');
      return newApartment;
    } catch (err) {
      console.error('Ошибка создания:', err);
      setError(err.message || 'Ошибка при создании квартиры');
      toast({
        variant: 'destructive',
        title: 'Ошибка создания',
        description: err.message || 'Не удалось создать квартиру.'
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateApartment = async (id, apartmentData) => {
    setLoading(true);
    try {
      const response = await api.put(`${process.env.NEXT_PUBLIC_API_URL}/apartments/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({ data: apartmentData })
      });

      if (!response.ok) throw new Error('Не удалось обновить данные квартиры');

      const updatedApartment = await response.json();
      setApartments(prev => prev.map(apt => apt.id === id ? updatedApartment : apt));
      setCurrentApartment(updatedApartment);

      toast({
        variant: 'success',
        title: 'Квартира обновлена',
        description: 'Информация о квартире успешно обновлена.'
      });

      return updatedApartment;
    } catch (err) {
      console.error('Ошибка обновления:', err);
      setError(err.message || 'Ошибка при обновлении');
      toast({
        variant: 'destructive',
        title: 'Ошибка обновления',
        description: err.message || 'Не удалось обновить данные.'
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteApartment = async (id) => {
    setLoading(true);
    try {
      const response = await api.delete(`${process.env.NEXT_PUBLIC_API_URL}/apartments/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      if (!response.ok) throw new Error('Не удалось удалить квартиру');

      setApartments(prev => prev.filter(apt => apt.id !== id));

      toast({
        variant: 'success',
        title: 'Квартира удалена',
        description: 'Квартира была успешно удалена.'
      });

      return true;
    } catch (err) {
      console.error('Ошибка удаления:', err);
      setError(err.message || 'Ошибка при удалении квартиры');
      toast({
        variant: 'destructive',
        title: 'Ошибка удаления',
        description: err.message || 'Не удалось удалить квартиру.'
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const setApartmentForEdit = (apartment) => {
    setCurrentApartment(apartment);
  };

  const clearCurrentApartment = () => {
    setCurrentApartment(null);
  };

  return (
    <ApartmentContext.Provider
      value={{
        apartments,
        currentApartment,
        initialApartmentData,
        loading,
        error,
        fetchApartments,
        fetchApartmentsByCity,
        fetchApartmentById,
        createApartment,
        updateApartment,
        deleteApartment,
        setApartmentForEdit,
        clearCurrentApartment
      }}
    >
      {children}
    </ApartmentContext.Provider>
  );
};

export const useApartment = () => useContext(ApartmentContext);
