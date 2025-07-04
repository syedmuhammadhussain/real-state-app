// contexts/ApartmentContext.jsx
"use client";

import { createContext, useContext, useState, useEffect } from "react";
// import { useRouter } from 'next/router';
import { api, uploadImages } from "../src/lib/api";
import { toast } from "../src/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthContext";
import { cityOptions } from "../src/constants/data";

const ApartmentContext = createContext();

export const ApartmentProvider = ({ children }) => {
  const [cities, setCities] = useState([]);
  const [apartments, setApartments] = useState([]);
  const [apartmentsForOwner, setApartmentsForOwner] = useState([]);
  const [features, setFeature] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [infrastructures, setInfrastructures] = useState([]);
  const [kitchens, setKitchen] = useState([]);
  const [currentApartment, setCurrentApartment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingPosition, setLoadingPosition] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);
  const [selectedApartment, setSelectedApartment] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [position, setPosition] = useState(null);

  // console.log('features', features)
  // hero section and select Option City selector
  const [selectedCityKey, setSelectedCityKey] = useState(cityOptions[0].ru);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const selectedCity = cityOptions.find((city) => city.ru === selectedCityKey);

  // City selection
  const handleCitySelect = (cityKey) => {
    setSelectedCityKey(cityKey);
    setIsPopoverOpen(false);
  };

  // const [loader, setLoader] = useState(false)

  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const router = useRouter();

  const { user } = useAuth();

  const initialApartmentData = {
    title: "",
    price: 0,
    bedrooms: 1,
    bathrooms: 1,
    size: 0,
    propertyType: "APARTMENT",
    images: [],
    location: null,
    features: [],
    city: null,
    amenities: [],
    infrastructures: [],
    kitchens: [],
    owner: null,
  };

  useEffect(() => {
    fetchFeature();
    fetchAmenities();
    fetchInfrastructures();
    fetchKitchen();
    fetchCities();
  }, []);

  // Получить все FEATURE
  const handlePositionByCity = async (id) => {
    setLoadingPosition(true);
    try {
      const response = await api.get(
        `${apiUrl}/positions?filters[city][id][$eq]=${id}`
      );
      const data = await response.data.data;
      console.log("position", data);
      setPosition(data);
      setError(null);
    } catch (err) {
      console.error("Ошибка при загрузке:", err);
      toast({
        variant: "destructive",
        title: "Ошибка загрузки",
        description: "Не удалось получить список позиции.",
      });
    } finally {
      setLoadingPosition(false);
    }
  };

  // Получить все FEATURE
  const fetchFeature = async () => {
    setLoading(true);
    try {
      const response = await api.get(`${apiUrl}/features`);
      const data = await response.data.data;
      setFeature(data);
      setError(null);
    } catch (err) {
      console.error("Ошибка при загрузке:", err);
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
      console.error("Ошибка при загрузке:", err);
      setError("Не удалось загрузить список квартир");
      toast({
        variant: "destructive",
        title: "Ошибка загрузки",
        description: "Не удалось получить список квартир.",
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
      console.error("Ошибка при загрузке:", err);
      setError("Не удалось загрузить список квартир");
      toast({
        variant: "destructive",
        title: "Ошибка загрузки",
        description: "Не удалось получить список квартир.",
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
      console.error("Ошибка при загрузке:", err);
      setError("Не удалось загрузить список квартир");
      toast({
        variant: "destructive",
        title: "Ошибка загрузки",
        description: "Не удалось получить список квартир.",
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
      console.error("Ошибка при загрузке:", err);
      setError("Не удалось загрузить список квартир");
      toast({
        variant: "destructive",
        title: "Ошибка загрузки",
        description: "Не удалось получить список квартир.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Получить все city
  const fetchCities = async () => {
    setLoading(true);
    try {
      const response = await api.get(
        `${apiUrl}/cities?populate=districts&populate=metro_stations`
      );
      const data = await response.data.data;
      setCities(data);
      setError(null);
    } catch (err) {
      console.error("Ошибка при загрузке:", err);
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
      const response = await api.get(
        `${apiUrl}/products?filters[owner][id][$eq]=${userId}&populate[images][fields]=formats&populate[owner][populate]=role&populate[district][populate][fields]=name&populate[metro_station][populate][fields]=name&populate[city][populate][area][fields]=name&populate[location][populate][fields]=name&populate[features][populate][fields]=name&populate[kitchens][populate][fields]=name&populate[amenities][populate][fields]=name&populate[infrastructures][populate][fields]=name&pagination[page]=1&pagination[pageSize]=10`
      );
      const data = await response.data.data;
      setApartmentsForOwner(data);
      setError(null);
    } catch (err) {
      console.error("Ошибка при загрузке по городу:", err);
      setError("Не удалось получить квартиры по городу");
      toast({
        variant: "destructive",
        title: "Ошибка загрузки",
        description: "Не удалось получить квартиры в указанном городе.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Получить конкретную квартиру по ID
  const fetchApartmentById = async (id) => {
    setLoading(true);
    try {
      const response = await api.get(
        `${apiUrl}/products/${id}?populate[images][populate]=*&populate[owner][populate]=*&populate[district][populate]=*&populate[city][populate][area][fields][0]=name&populate[location][populate]=*&populate[features][populate]=*&populate[kitchens][populate]=*&populate[amenities][populate]=*&populate[infrastructures][populate]=*`
      );
      const apartment = await response.data.data;
      setCurrentApartment(apartment);
      return apartment;
    } catch (err) {
      console.error("Ошибка при получении квартиры:", err);
      setError("Не удалось получить данные квартиры");
      toast({
        variant: "destructive",
        title: "Ошибка получения",
        description: "Не удалось загрузить информацию о квартире.",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  //edit apartment for edit
  const setApartmentForEdit = (apartment) => {
    setCurrentApartment(apartment);
    setEditMode(true);
  };
  // repve selected a[artment ]
  const clearCurrentApartment = () => {
    setCurrentApartment(null);
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
        amenities: apartmentData.amenities.map((amenity) => amenity.id),
        // city: apartmentData.city.id,
        features: apartmentData.features.map((feature) => feature.id),
        kitchens: apartmentData.kitchens.map((kitchen) => kitchen.id),
        infrastructures: apartmentData.infrastructures.map(
          (infrastructure) => infrastructure.id
        ),
        images: uploadedImages.map((img) => img.id),
      };

      // Step 3: Send create request
      const response = await fetch(`${apiUrl}/products`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: preparedData }),
      });
      if (!response.ok) throw new Error("Не удалось создать квартиру");
      const newApartment = await response.data;
      // setApartmentsForOwner((prev) => [...prev, newApartment]);
      if (user?.id) await fetchApartmentsByOwner(user?.id);
      toast({
        variant: "success",
        title: "Квартира создана",
        description: "Новая квартира успешно добавлена.",
      });
      await router.push("/profile");
    } catch (err) {
      console.error("Ошибка создания:", err);
      setError(err.message || "Ошибка при создании квартиры");
      toast({
        variant: "destructive",
        title: "Ошибка создания",
        description: err.message || "Не удалось создать квартиру.",
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // edit apartment
  const updateApartment = async (apartmentData, toUpload) => {
    // debugger;
    setLoading(true);
    try {
      // Step 1: Upload images if any
      let uploadedImages = [];
      if (toUpload.length > 0) {
        uploadedImages = await uploadImages(toUpload);
      }

      const newImages = uploadedImages.map((img) => img.id);
      const oldImages = apartmentData.images.map((img) => img.id);

      // Step 2: Integrate uploaded image info into apartmentData
      const preparedData = {
        ...apartmentData,
        amenities: apartmentData.amenities.map((amenity) => amenity.id),
        city: apartmentData.city.id,
        features: apartmentData.features.map((feature) => feature.id),
        kitchens: apartmentData.kitchens.map((kitchen) => kitchen.id),
        district:
          apartmentData.district && typeof apartmentData.district === "object"
            ? apartmentData.district?.id
            : apartmentData.district,
        metro_station:
          apartmentData.metro_station && typeof apartmentData.metro_station === "object"
            ? apartmentData.metro_station?.id
            : apartmentData.metro_station,
        city:
          typeof apartmentData.city === "number"
            ? apartmentData.city
            : apartmentData.city?.id,

        // city: apartmentData.city.id,
        infrastructures: apartmentData.infrastructures.map(
          (infrastructure) => infrastructure.id
        ),
        images: toUpload.length > 0 ? [...newImages, ...oldImages] : oldImages,
      };

      delete preparedData.id;
      delete preparedData.documentId;
      delete preparedData.sequence_order;
      delete preparedData.publishedAt;
      delete preparedData.createdAt;
      delete preparedData.updatedAt;

      // Step 3: Send create request
      const response = await fetch(
        `${apiUrl}/products/${apartmentData.documentId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: preparedData }),
        }
      );
      // console.log('preparedData', preparedData)

      if (!response.ok) throw new Error("Не удалось обновить квартиру");
      const updatedApartment = await response.json();
      setApartmentsForOwner((prev) =>
        prev.map((apt) =>
          apt.documentId === apartmentData.documentId ? updatedApartment : apt
        )
      );
      if (user?.id) await fetchApartmentsByOwner(user?.id);
      localStorage.removeItem("apartmentForEdit");
      // setCurrentApartment(updatedApartment);
      router.push("/profile");
      toast({
        variant: "success",
        title: "Квартира обновлена",
        description: "Информация о квартире успешно обновлена.",
      });
      setEditMode(false);
      return updatedApartment;
    } catch (err) {
      console.error("Ошибка обновления:", err);
      setError(err.message || "Ошибка при обновлении");
      toast({
        variant: "destructive",
        title: "Ошибка обновления",
        description: err.message || "Не удалось обновить данные.",
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
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      // if (!response.ok) throw new Error('Не удалось удалить квартиру');
      setApartmentsForOwner((prev) =>
        prev.filter((apt) => apt.documentId !== id)
      );
      if (user?.id) await fetchApartmentsByOwner(user?.id);
      // if (user) await fetchApartmentsByOwner(user?.id)
      toast({
        variant: "success",
        title: "Квартира удалена",
        description: "Квартира была успешно удалена.",
      });
      return true;
    } catch (err) {
      console.error("Ошибка удаления:", err);
      setError(err.message || "Ошибка при удалении квартиры");
      toast({
        variant: "destructive",
        title: "Ошибка удаления",
        description: err.message || "Не удалось удалить квартиру.",
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // handle fetch notification
  const handleNotification = async () => {
    setLoading(true);
    try {
      const response = await api.get(
        `${apiUrl}/notifications?filters[recipient][id]   [$eq]=${user?.id}&pagination[limit]=10&sort=createdAt:desc&populate=booking_form`
      );
      const data = await response.data.data;
      setNotifications(data);
      setError(null);
    } catch (err) {
      console.error("Ошибка при загрузке:", err);
      toast({
        variant: "destructive",
        title: "Ошибка загрузки",
        description: "Не удалось получить список позиции.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ApartmentContext.Provider
      value={{
        apartments,
        setApartments,
        apartmentsForOwner,
        setApartmentsForOwner,
        currentApartment,
        initialApartmentData,
        loading,
        setLoading,
        notifications,
        setNotifications,
        loadingPosition,
        error,
        features,
        amenities,
        infrastructures,
        kitchens,
        cities,
        selectedApartment,
        editMode,
        setEditMode,
        selectedCityKey,
        setSelectedCityKey,
        isPopoverOpen,
        setIsPopoverOpen,
        selectedCity,
        position,
        handleNotification,
        handlePositionByCity,
        handleCitySelect,
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
        createApartment,
      }}
    >
      {children}
    </ApartmentContext.Provider>
  );
};

export const useApartment = () => useContext(ApartmentContext);
