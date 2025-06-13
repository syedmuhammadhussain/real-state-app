// contexts/ApartmentContext.jsx
'use client'

import { createContext, useContext, useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
import { api } from '@/lib/api';
import { toast } from '@/hooks/use-toast';

const ApartmentContext = createContext();

export const ApartmentProvider = ({ children }) => {

  const [cities, setCities] = useState([]);
  const [apartments, setApartments] = useState([]);
  const [features, setFeature] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [infrastructures, setInfrastructures] = useState([]); 
  const [kitchens, setKitchen] = useState([]); 
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

    useEffect(()=>{
      fetchFeature()
      fetchAmenities()
      fetchInfrastructures()
      fetchKitchen()
      fetchApartments()
      fetchCities()
    },[])

    // Получить все FEATURE
    const fetchFeature = async () => {
      setLoading(true);
      try {
        const response = await api.get(`${apiUrl}/features`);
        const data = await response.data.data;
        setFeature(data);
        setError(null);
      } catch (err) {
        console.error('Ошибка при загрузке:', err);
        // setError('Не удалось загрузить список квартир');
        // toast({
        //   variant: 'destructive',
        //   title: 'Ошибка загрузки',
        //   description: 'Не удалось получить список квартир.'
        // });
      } finally {
        setLoading(false);
      }
    };

    // Получить все infrastructures
    const fetchAmenities = async () => {
      setLoading(true);
      try {
        const response = await api.get(`${apiUrl}/amenities`);
        const data = await response.data.data;

        setAmenities(data);
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
    
    // Получить все infrastructures
    const fetchInfrastructures = async () => {
      setLoading(true);
      try {
        const response = await api.get(`${apiUrl}/infrastructures`);
        const data = await response.data.data;
        setInfrastructures(data);
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

    // Получить все kitchen
    const fetchKitchen = async () => {
          setLoading(true);
          try {
            const response = await api.get(`${apiUrl}/kitchens`);
            const data = await response.data.data;
            setKitchen(data);
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

    // Получить все квартиры
    const fetchApartments = async () => {
      setLoading(true);
      try {
        const response = await api.get(`${apiUrl}/products`);
        const data = await response.data.data;

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

     // Получить все city
     const fetchCities = async () => {
      setLoading(true);
      try {
        const response = await api.get(`${apiUrl}/cities?populate=*`);
        const data = await response.data.data;
        setCities(data);
        setError(null);
      } catch (err) {
        console.error('Ошибка при загрузке:', err);
        // setError('Не удалось загрузить список квартир');
        // toast({
        //   variant: 'destructive',
        //   title: 'Ошибка загрузки',
        //   description: 'Не удалось получить список квартир.'
        // });
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

    // create new
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

    // edit apartment
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

    // delete apartment
    const deleteApartment = async (id) => {
      setLoading(true);
      try {
        const response = await api.delete(`${apiUrl}/products/${id}`, {
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

    //edit apartment for edit 
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
        features,
        amenities,
        infrastructures,
        kitchens,
        cities,
        fetchApartments,
        fetchApartmentsByCity,
        fetchApartmentById,
        createApartment,
        updateApartment,
        deleteApartment,
        setApartmentForEdit,
        clearCurrentApartment,
        fetchFeature,
        fetchAmenities,
        fetchInfrastructures,
        fetchKitchen,
        fetchCities
      }}
    >
      {children}
    </ApartmentContext.Provider>
  );
};

export const useApartment = () => useContext(ApartmentContext);
