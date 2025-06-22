"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, User, Home, NotebookIcon, BellIcon, HomeIcon } from "lucide-react";
import ProfileInfo from "./ProfileInfo";
import { Button } from "@/components/ui/button";
import ApartmentCard from "@/components/component/card/ApartmentCard";
import { useIsMobile } from "@/hooks/use-mobile";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { EmptyState, LoadingState } from "@/components/component/handle-event-loading/HandleEvents";
import { notifications } from "@/constants/data";
import { useAuth } from "../../../../context/AuthContext";
import { useApartment } from "../../../../context/ApartmentContext";

export default function ProfilePage() {
  const [selectedTab, setSelectedTab] = useState("properties");
  const { user } = useAuth();
  const router = useRouter();
  const { apartments, loading,  error, deleteApartment, fetchApartmentsByOwner, setApartmentForEdit, setEditMode } = useApartment();

  // console.log('apartments',apartments)
  // console.log('apartments',apartments)
  // console.log('user ',user)

  useEffect(() => {
    if (user?.id) fetchApartmentsByOwner(user.id);
  }, [user?.id]);

  // =====================
  // Handlers
  // =====================
  const handleEdit = async (apartment) => {
    setApartmentForEdit(apartment);
    router.push("/edit-apartment");
  };

  const handleDelete = async (id) => await deleteApartment(id);
  
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
            <TabsTrigger value="notification">
              <NotebookIcon className="mr-2 h-4 w-4" /> 
              <span className="hidden md:block text-sm">Уведомление</span> 
            </TabsTrigger> 
          </TabsList>

          {/* Объекты */}
          <TabsContent value="properties">
            <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold flex text-primary-dark items-center">
              <HomeIcon className="w-5 h-5 mr-2  text-primary-dark" />
              Мои объявления
            </h2>
              <Button
              variant="ghost"
              // size = "md"
                className="flex items-center justify-center gap-3 border-2 border-solid"
                onClick={() => { 
                  setEditMode(false)
                  router.push("/add-apartment")

                }}
              >
                <PlusCircle className="mr-2 h-4 w-4" /> {!useIsMobile()  &&  'Добавить квартиру' }
                 {/* //недвижимость */}
              </Button>
            </div>

            {/* Состояния данных */}
            {/* {error && !loading && <ErrorState message={error} />} */}

            {/* Список объявлений */}
            <div className="mt-4 grid gap-4">
              {!loading &&
                !error &&
                apartments.map((apartment, index) => (
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
            {!loading && !error && apartments.length === 0 && <EmptyState />}

          </TabsContent>

          {/* Профиль */}
          <TabsContent value="profile">
            <ProfileInfo />
          </TabsContent>

          {/*  notification */}
          <TabsContent value="notification" className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex text-primary-dark items-center">
          <BellIcon className="w-5 h-5 mr-2  text-primary-dark" />
          Уведомление
        </h2>
        {/* <Button variant="ghost" size="sm">
          Mark all as read
        </Button> */}
      </div>

      <div className="space-y-4">
        {notifications?.map((notification) => (
          <Card
            key={notification.id} 
            className={cn(
              "border-l-4 transition-all",
              notification.read 
                ? "border-l-transparent opacity-80" 
                : "border-l-primary shadow-sm"
            )}
          >
            <CardHeader className="pb-3">
              <div className="flex justify-between">
                <CardTitle className="text-base flex items-center">
                  {!notification.read && (
                    <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                  )}
                  {notification.apartment}
                </CardTitle>
                <CardDescription className="text-xs">
                  {/* {formatDate(notification.date)} */}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{notification.message}</p>
            </CardContent>
          </Card>
        ))}
      </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
