"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, User, Home, NotebookIcon, HomeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "../../../../context/AuthContext";
import { useApartment } from "../../../../context/ApartmentContext";
import Notification from "./_related/Notification";
import ProfileInfo from "./_related/ProfileInfo";
import ApartmentOwnerComponenet from "./_related/ApartmentOwnerComponenet";
import { StrapiImage } from "@/components/ui/StrapiImage";

export default function ProfilePage() {
  const [selectedTab, setSelectedTab] = useState("properties");
  const { user } = useAuth();
  const router = useRouter();

  const {
    notifications,
    handleNotification,
    fetchApartmentsByOwner,
    setEditMode,
  } = useApartment();

  // handle not not exist user
  useEffect(() => {  if (user?.id) fetchApartmentsByOwner(user.id) }, []);

  // handle navigate add
  const handleNavigate = async () => {
    await setEditMode(false);
    localStorage.removeItem("apartmentForEdit");
    await router.push("/add-apartment");
  };

  // fetch notifications if not exist
  const handleNotificationPart = async () => {
    if (notifications === null || notifications.length === 0)
      await handleNotification();
  };

  // if(user == null ) return router.push('login')

  return (
    <div className="min-h-screen max-w-7xl pt-10 mx-auto">
      <div className="mx-auto w-full  px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex flex-wrap items-end justify-between rounded-xl bg-white p-6 shadow">
          <div className="flex items-center gap-6">
            <div className="flex h-24 w-24 items-center justify-center rounded-full  border border-primary-default shadow-lg overflow-hidden">
              <StrapiImage
                needUrl={false}
                src={
                  user?.image !== null
                    ?   `https://admin.kvkey.ru${user?.image?.formats?.thumbnail?.url}`
                    : "/images/avat.webp"
                }
                alt={`Превью `}
                className="object-cover"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary-dark uppercase">
                {user?.username ?? "Неизвестно"}
              </h1>
              <p className="text-muted-primary">
                {user?.role?.name ?? "Неизвестно"}
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="mb-8 grid w-full grid-cols-3">
            <TabsTrigger value="properties">
              <Home className="mr-2 h-5 w-5" />
              <span className="hidden md:block ">Объекты</span>
            </TabsTrigger>
            <TabsTrigger value="profile">
              <User className="mr-2 h-5 w-5" />
              <span className="hidden md:block ">Профиль</span>
            </TabsTrigger>
            <TabsTrigger value="notification" onClick={handleNotificationPart}>
              <NotebookIcon className="mr-2 h-5 w-5" />
              <span className="hidden md:block ">Уведомление</span>
            </TabsTrigger>
          </TabsList>

          {/* Объекты */}
          <TabsContent value="properties">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold flex text-primary-dark items-center">
                <HomeIcon className="w-5 h-5 mr-2  text-primary-dark" /> Мои
                объявления{" "}
              </h2>
              <Button
                variant="outline"
                size="md"
                className="flex items-center justify-center gap-3 border-2 border-solid"
                onClick={handleNavigate}
              >
                <PlusCircle className=" h-5 w-5 text-primary-dark" />
                {!useIsMobile() && (
                  <span className=" text-primary-dark">Добавить квартиру </span>
                )}
              </Button>
            </div>
            <ApartmentOwnerComponenet />
          </TabsContent>

          {/* Профиль */}
          <TabsContent value="profile">
            <ProfileInfo />
          </TabsContent>

          {/*  notification */}
          <TabsContent value="notification" className="space-y-4">
            <Notification />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
