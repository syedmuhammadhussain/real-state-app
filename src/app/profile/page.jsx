'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlusCircle, User, Settings, Home } from 'lucide-react';
import ProfileInfo from './ProfileInfo';
import AddApartmentModal from './AddApartmentModal';

import { products } from '@/constants/data';
import { Button } from '@/components/ui/button';
import ApartmentCard from '@/components/component/card/ApartmentCard';
import { useAuth } from '../../../context/AuthContext';
import { useApartment } from '../../../context/ApartmentContext';

export default function ProfilePage() {
  const [apartments, setApartments] = useState(products);
  const [selectedTab, setSelectedTab] = useState('properties');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedApartment, setSelectedApartment] = useState(null);

  const { logout, user, success } = useAuth();
  const {
    deleteApartment,
    updateApartment,
    createApartment,
    setApartmentForEdit,
    setCurrentApartment,
  } = useApartment();

  const handleDelete = async (id) => {
    try {
      await deleteApartment(id);
    } catch (err) {
      console.error('Ошибка при удалении квартиры:', err);
    }
  };

  const handleEdit = (apartment) => {
    setApartmentForEdit(apartment);
    setSelectedApartment(apartment);
    setIsModalOpen(true);
  };

  const handleSubmit = async (formData) => {
    try {
      if (selectedApartment) {
        const updated = await updateApartment(selectedApartment.id, formData);
        setApartments((prev) => prev.map((apt) => apt.id === updated.id ? updated : apt));
      } else {
        const created = await createApartment(formData);
        setApartments((prev) => [...prev, created]);
      }

      setIsModalOpen(false);
      setSelectedApartment(null);
    } catch (err) {
      console.error('Ошибка при сохранении данных:', err);
    }
  };

  return (
    <div className="pt-10 min-h-screen bg-gray-50">
      <div className="w-full mx-auto px-4 py-8">
        {/* Заголовок профиля */}
        <div className="w-full bg-white flex justify-between items-end flex-wrap rounded-lg shadow p-6 mb-8">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="w-12 h-12 text-gray-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{user ? user?.username : 'неизвестно'}</h1>
              <p className="text-gray-600">{user ? user?.role.name : 'неизвестно'}</p>
              <p className="text-gray-600">{user ? user?.email : 'неизвестно'}</p>
            </div>
          </div>
          <Button onClick={() => setIsModalOpen(true)} className="w-1/3">
            <PlusCircle className="w-4 h-4 mr-2" />
            Добавить новую недвижимость
          </Button>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid grid-cols-2 w-full mb-8">
            <TabsTrigger value="properties">
              <Home className="w-4 h-4 mr-2" />
              Объекты
            </TabsTrigger>
            <TabsTrigger value="profile">
              <User className="w-4 h-4 mr-2" />
              Профиль
            </TabsTrigger>
            {/* <TabsTrigger value="settings">
              <Settings className="w-4 h-4 mr-2" />
              Настройки
            </TabsTrigger> */}
          </TabsList>

          <TabsContent value="properties">
            <div className="flex justify-between items-center mb-2 mt-2">
              <h3 className="w-2/4 font-semibold">Мои объявления</h3>
            </div>

            <div>
              {user?.products.map((apartment) => (
                <div key={apartment.id} className="mb-4">
                  <ApartmentCard
                    key={apartment.id}
                    apartment={apartment}
                    onEdit={() => handleEdit(apartment)}
                    onDelete={() => handleDelete(apartment.id)}
                    showButtonEdit={true}
                  />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="profile">
            <ProfileInfo />
          </TabsContent>

          {/* <TabsContent value="settings">
            <p className="text-gray-600">Раздел "Настройки" в разработке.</p>
          </TabsContent> */}
        </Tabs>

        <AddApartmentModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedApartment(null);
          }}
          onSubmit={handleSubmit}
          initialData={selectedApartment}
        />
      </div>
    </div>
  );
}
