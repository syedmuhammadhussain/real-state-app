"use client";

import { useEffect, useState } from "react";
import { notFound, useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, User, Home, NotebookIcon, BellIcon, HomeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import ApartmentCard from "@/components/component/card/ApartmentCard";
import { useIsMobile } from "@/hooks/use-mobile";
import { EmptyState, LoadingState } from "@/components/component/handle-event-loading/HandleEvents";
import { useAuth } from "../../../../context/AuthContext";
import { useApartment } from "../../../../context/ApartmentContext";
import Notification from "./_related/Notification"
import ProfileInfo from "./_related/ProfileInfo";

export default function ProfilePage() {
  
  const [selectedTab, setSelectedTab] = useState("properties");
  const { user } = useAuth();
  const router = useRouter();
 
  const { apartmentsForOwner, loading,handleNotification ,  error, deleteApartment, fetchApartmentsByOwner, setApartmentForEdit, setEditMode } = useApartment();

  // useEffect(()=>{
  //   if(!user?.id)  router.push('/register')
  // },[])

  // handle not not exist user
  useEffect(() => {
    if (user?.id &&  apartmentsForOwner.length === 0 ) fetchApartmentsByOwner(user.id)
      //  else if (user !== undefined && !user?.id) {
      //   notFound()
      // }
  }, [user?.id]); 

  // Handlers edit 
  const handleEdit = async (apartment) => {
    setApartmentForEdit(apartment);
    router.push("/edit-apartment");
  };

  // handle edit 
  const handleDelete = async (id) => await deleteApartment(id);
  
  // handle navigate add 
  const handleNavigate  = async () => { 
     await setEditMode(false)
     await router.push("/add-apartment")
    }
  
const handleNotificationPart = ()=> handleNotification()

  return (
    <div className="min-h-screen max-w-7xl bg-gray-50 pt-10 mx-auto">
      <div className="mx-auto w-full  px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex flex-wrap items-end justify-between rounded-lg bg-white p-6 shadow">
          <div className="flex items-center gap-6">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-200">
              <User className="h-12 w-12 text-gray-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary-dark">
                {user?.username ?? "Неизвестно"}
              </h1>
              <p className="text-muted-primary">{user?.role?.name ?? "Неизвестно"}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="mb-8 grid w-full grid-cols-3">
            <TabsTrigger value="properties">
              <Home className="mr-2 h-4 w-4" /> 
              <span className="hidden md:block text-sm">Объекты</span>
            </TabsTrigger>
            <TabsTrigger value="profile">
              <User className="mr-2 h-4 w-4" />
              <span className="hidden md:block text-sm">Профиль</span> 
            </TabsTrigger>
            <TabsTrigger value="notification" onClick={handleNotificationPart}>
              <NotebookIcon className="mr-2 h-4 w-4" /> 
              <span className="hidden md:block text-sm" >Уведомление</span> 
            </TabsTrigger> 
          </TabsList>

          {/* Объекты */}
          <TabsContent value="properties">
            <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold flex text-primary-dark items-center"> <HomeIcon className="w-5 h-5 mr-2  text-primary-dark" /> Мои объявления </h2>
              <Button  variant="ghost" // size = "md"
                className="flex items-center justify-center gap-3 border-2 border-solid"
                onClick={handleNavigate}
              >
                <PlusCircle className="mr-2 h-4 w-4" /> {!useIsMobile()  &&  'Добавить квартиру' }
              </Button>
            </div>

            {/* Состояния данных */}
            {/* {error && !loading && <ErrorState message={error} />} */}

            {/* Список объявлений */}
            <div className="mt-4 grid gap-4">
              {!loading &&
                !error &&
                apartmentsForOwner.map((apartment, index) => (
                  <ApartmentCard
                    key={apartment.id ?? `apt-${index}`}
                    data={apartment}
                    onEdit={() => handleEdit(apartment)}
                    onDelete={() => handleDelete(apartment.documentId)}
                    showButtonEdit
                  />
                ))}
            </div>
            {loading && <LoadingState />}
            {!loading && !error && apartmentsForOwner.length === 0 && <EmptyState />}

          </TabsContent>

          {/* Профиль */}
          <TabsContent value="profile">
            <ProfileInfo />
          </TabsContent>

          {/*  notification */}
          <TabsContent value="notification" className="space-y-4">
            <Notification/>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
