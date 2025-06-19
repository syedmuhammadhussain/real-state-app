// contexts/ApartmentContext.jsx
'use client'

import { createContext, useContext, useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
import { api } from '@/lib/api';
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useAuth } from './AuthContext';

const ApartmentContext = createContext();

export const ApartmentProvider = ({ children }) => {

  const [cities, setCities] = useState([]);
  const [apartments, setApartments] = useState([]);
  const [singleApartments, setSingleApartments] = useState([]);
  const [features, setFeature] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [infrastructures, setInfrastructures] = useState([]); 
  const [kitchens, setKitchen] = useState([]); 
  const [currentApartment, setCurrentApartment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedApartment, setSelectedApartment] = useState(null);
  const [editMode, setEditModa] = useState(false);

  // const [loader, setLoader] = useState(false)

  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const router = useRouter();

  const { user } = useAuth()
  // console.log('user' ,user)

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
      // fetchApartments()
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
    const fetchApartmentsByOwner = async (userId) => {
      setLoading(true);
      try {
        const response = await api.get(`${apiUrl}/products?filters[owner][id][$eq]=${userId}&populate=owner&populate=images&populate=city&populate=location&populate=features&populate=kitchens&populate=amenities&populate=infrastructures&fields=title&fields=bathrooms&fields=bedrooms&fields=description&fields=propertyType&fields=size&fields=price&pagination[page]=1&pagination[pageSize]=10`);
        const data = await response.data.data;
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
        const response = await api.get(`${apiUrl}/products/${id}?populate=owner&populate=images&populate=city&populate=location&populate=features&populate=kitchens&populate=amenities&populate=infrastructures&fields=title&fields=bathrooms&fields=bedrooms&fields=description&fields=propertyType&fields=size&fields=price`);
        const apartment = await response.data.data;
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

    //edit apartment for edit 
    const setApartmentForEdit = (apartment) => {
      setCurrentApartment(apartment);
      setEditModa(true)
    };
    // repve selected a[artment ]
    const clearCurrentApartment = () => {
      setCurrentApartment(null);
    };

    // handle uploading image
    const uploadImages = async (images) => {
    if (!images || images.length === 0) return [];

    const formData = new FormData();
    images.forEach((image) => {
      formData.append("images", image); // Use the correct key expected by your backend
    });

    try {
      const response =  await api.post(`${apiUrl}/products/upload-images`, 
        formData,
        {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          // Optionally show progress
          console.log(`Upload progress: ${(progressEvent.loaded / progressEvent.total) * 100}%`);
        },
      });

      console.log("Uploaded media:", response.data.files);
      return response.data.files; // Adapt this based on your backend response structure
    } catch (error) {
      console.error("Upload failed:", error);
      throw new Error("Image upload failed.");
    }
    };

    // create new
    const createApartment = async (apartmentData, toUpload = []) => {
      setLoading(true);
      try {
        // Step 1: Upload images if any
        let uploadedImages = [];
        if (toUpload.length > 0) {
          uploadedImages = await uploadImages(toUpload);
        }
        // console.log('uploadedImages', uploadedImages)
        // Step 2: Integrate uploaded image info into apartmentData
        const preparedData = {
          ...apartmentData,
          images:  uploadedImages.map((img) => img), 
        };

        
        // Step 3: Send create request
        const response = await fetch(`${apiUrl}/products`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ data: preparedData }),
        });
        if (!response.ok) throw new Error('Не удалось создать квартиру');
        const newApartment = await response.json();
        setApartments((prev) => [...prev, newApartment]);

        toast({
          variant: 'success',
          title: 'Квартира создана',
          description: 'Новая квартира успешно добавлена.'
        });

        router.push('/profile')
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
    const updateApartment = async (apartmentData, toUpload) => {
          setLoading(true);
          try {
            // Step 1: Upload images if any
            let uploadedImages = [];
            if (toUpload.length > 0) {
              uploadedImages = await uploadImages(toUpload);
            }

            // Step 2: Integrate uploaded image info into apartmentData
            const preparedData = {
              ...apartmentData,
              amenities: apartmentData.amenities.map((amenity) => amenity.id),
              city: apartmentData.city.id,
              features: apartmentData.features.map((feature) => feature.id),
              kitchens: apartmentData.kitchens.map((kitchen) => kitchen.id),
              infrastructures: apartmentData.infrastructures.map((infrastructure) => infrastructure.id),
              images:  uploadedImages.map((img) => img),
            };
            
            delete preparedData.id
            delete preparedData.documentId

            // Step 3: Send create request
            const response = await fetch(`${apiUrl}/products/${apartmentData.documentId}`, {
              method: 'PUT',
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ data: preparedData }),
            });

        console.log('preparedData', preparedData)

            if (!response.ok) throw new Error('Не удалось обновить квартиру');
            const updatedApartment = await response.json();
           
            setApartments(prev => prev.map(apt => apt.documentId === apartmentData.documentId ? updatedApartment : apt));
            // setCurrentApartment(updatedApartment);
            router.push('/profile')
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
          // if (!response.ok) throw new Error('Не удалось удалить квартиру');
          // setApartments(prev => prev.filter(apt => apt.id !== id));
          if (user) await fetchApartmentsByOwner(user?.id)
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

  return (
    <ApartmentContext.Provider
      value={{
        apartments,
        setApartments,
        currentApartment,
        initialApartmentData,
        loading,
        error,
        features,
        amenities,
        infrastructures,
        kitchens,
        cities,
        selectedApartment,
        editMode,
        setEditModa,
        setSelectedApartment,
        fetchApartments,
        fetchApartmentsByOwner,
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
        fetchCities,
        uploadImages,
        createApartment,
      }}
    >
      {children}
    </ApartmentContext.Provider>
  );
};

export const useApartment = () => useContext(ApartmentContext);
