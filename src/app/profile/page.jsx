// app/profile/page.tsx
'use client';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlusCircle, User, Settings, Home } from 'lucide-react';
// import ApartmentCard from '@/components/ApartmentCard';
import ProfileInfo from './ProfileInfo';
import AddApartmentModal from './AddApartmentModal';

import { products } from '@/constants/data';
import ApartmentCard from '@/components/component/card/ShownProductCard';
import { Button } from '@/components/ui/button';

export default function ProfilePage() {
  const [apartments, setApartments] = useState(products);
  const [selectedTab, setSelectedTab] = useState('properties');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedApartment, setSelectedApartment] = useState(null);

  const handleDelete = (id) => {
    setApartments(apartments.filter(apt => apt.id !== id));
  };

  const handleEdit = (apartment) => {
    setSelectedApartment(apartment);
    setIsModalOpen(true);
  };

  const handleSubmit = (data) => {
    if (selectedApartment) {
      setApartments(apartments.map(apt => apt.id === data.id ? data : apt));
    } else {
      setApartments([...apartments, { ...data, id: Date.now() }]);
    }
    setIsModalOpen(false);
    setSelectedApartment(null);
  };

  return (
    <div className="pt-20 min-h-screen  bg-gray-50">
      <div className=" w-full  mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-white flex justify-center  rounded-lg shadow p-6 mb-8">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="w-12 h-12 text-gray-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">John Doe</h1>
              <p className="text-gray-600">Real Estate Agent</p>
              <div className="flex gap-2 mt-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  10 Properties
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  Verified
                </span>
                <span className="px-3 py-1 bg-primary-default text-accent-default rounded-full text-sm">
                  premium
                </span>
              </div>
            </div>
          </div>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid grid-cols-3 w-full mb-8">
            <TabsTrigger value="properties">
              <Home className="w-4 h-4 mr-2" />
              Properties
            </TabsTrigger>
            <TabsTrigger value="profile">
              <User className="w-4 h-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="properties">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl w-1/4 font-semibold">My Listings</h2>
              <Button className onClick={() => setIsModalOpen(true)}>
                <PlusCircle className="w-4 h-4 mr-2" />
                Add New Property
              </Button>
            </div>

            <div >
              {apartments.map(apartment => (
                <ApartmentCard className="mt-2"
                  key={apartment.id}
                  apartment={apartment}
                  onEdit={() => handleEdit(apartment)}
                  onDelete={() => handleDelete(apartment.id)}
                  showButtonEdit= {true}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="profile">
            <ProfileInfo />
          </TabsContent>
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