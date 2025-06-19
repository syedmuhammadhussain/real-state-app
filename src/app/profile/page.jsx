"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, User, Home, Loader2, AlertTriangle, NotebookIcon, CheckCircle2, XCircle, BellIcon, HomeIcon } from "lucide-react";
import ProfileInfo from "./ProfileInfo";
import { Button } from "@/components/ui/button";
import ApartmentCard from "@/components/component/card/ApartmentCard";
import { useAuth } from "../../../context/AuthContext";
import { useApartment } from "../../../context/ApartmentContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function ProfilePage() {
  const [selectedTab, setSelectedTab] = useState("properties");
  const { user } = useAuth();
  const router = useRouter();

  const { apartments, loading, setLoading, error, deleteApartment, fetchApartmentsByOwner, setApartmentForEdit,currentApartment ,setCurrentApartment } = useApartment();
  

  console.log('currentApartment',currentApartment)
  useEffect(() => {
    if (user?.id) fetchApartmentsByOwner(user.id);
  }, [user?.id]);

  // =====================
  // Handlers
  // =====================
  const handleEdit = async (apartment) => {
    setApartmentForEdit(apartment);
    router.push("/add-edit-apartment");
  };


  const handleDelete = async (id) => {

    try {
      console.log('id',id)
      await deleteApartment(id);
      // setLoading(true)
    } catch (err) {
      /* eslint-disable no-console */
      console.error("Ошибка при удалении квартиры:", err);
      /* eslint-enable no-console */
    }
    finally{
      // setLoading(false)
    }
  };

  const ErrorState = ({ message }) => (
    <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
      <AlertTriangle className="h-12 w-12 text-destructive" />
      <p className="text-lg font-medium text-destructive">{message}</p>
    </div>
  );

  const LoadingState = () => (
    <div className="flex items-center justify-center py-20">
      <Loader2 className="h-10 w-10 animate-spin text-primary-hover" />
    </div>
  );

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
      <Home className="h-12 w-12 text-muted-foreground" />
      <p className="text-lg font-medium text-muted-foreground">
        У вас пока нет объявлений
      </p>
    </div>
  );
  
  const [notifications, setNotifications] = useState([
    {
      id: 2,
      apartment: "Апартаменты №456",
      message: "Запрос на обслуживание: Протечка кухонной раковины",
      date: "2023-10-14T09:15:00Z",
      read: true
    },
    {
      id: 3,
      apartment: "Апартаменты №789",
      message: "Получена оплата за аренду в октябре",
      date: "2023-10-13T16:45:00Z",
      read: true
    }
  ]);


  // const handleAction = (id, action) => {
  //   setNotifications(notifications.map(notif => 
  //     notif.id === id ? { ...notif, read: true } : notif
  //   ));
    
  //   console.log(`${action} action for notification ${id}`);
  //   // Add your API call or state update logic here
  // };

  // const formatDate = (dateString) => {
  //   const date = new Date(dateString);
  //   return date.toLocaleDateString('en-US', { 
  //     month: 'short', 
  //     day: 'numeric',
  //     hour: '2-digit',
  //     minute: '2-digit'
  //   });
  // };
  return (
    <div className="min-h-screen bg-gray-50 pt-10 mx-auto">
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
              <Home className="mr-2 h-4 w-4" /> Объекты
            </TabsTrigger>
            <TabsTrigger value="profile">
              <User className="mr-2 h-4 w-4" /> Профиль
            </TabsTrigger>
            <TabsTrigger value="notification">
              <NotebookIcon className="mr-2 h-4 w-4" /> Уведомление
            
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
                className="max-w-[80px] md:max-w-[200px] flex items-center justify-center gap-3"
                onClick={() => router.push("/add-edit-apartment")}
              >
                <PlusCircle className="mr-2 h-4 w-4" /> {!useIsMobile()  &&  'Добавить новую ' }
                 {/* //недвижимость */}
              </Button>
            </div>

            {/* Состояния данных */}
            {loading && <LoadingState />}
            {/* {error && !loading && <ErrorState message={error} />}
            {!loading && !error && apartments.length === 0 && <EmptyState />} */}

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
          </TabsContent>

          {/* Профиль */}
          <TabsContent value="profile">
            <ProfileInfo />
          </TabsContent>


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
        {notifications.map((notification) => (
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
              
              {/* {notification.apartment === "Apartment #123" && !notification.read && (
                <div className="flex space-x-3">
                  <Button 
                    size="sm" 
                    className="flex-1 bg-green-600 hover:bg-green-700"
                    onClick={() => handleAction(notification.id, 'accept')}
                  >
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Accept
                  </Button>
                  <Button 
                    size="sm" 
                    variant="destructive"
                    className="flex-1"
                    onClick={() => handleAction(notification.id, 'reject')}
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Reject
                  </Button>
                </div>
              )} */}
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
