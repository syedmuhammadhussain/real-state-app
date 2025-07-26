"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../../context/AuthContext";
import { useApartment } from "../../../../context/ApartmentContext";
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
  useEffect(() => {
    if (user?.id) fetchApartmentsByOwner(user.id);
    setTimeout(() => {}, 3000);
  }, []);

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
                src={
                  user?.image !== null
                    ? user?.image?.formats?.thumbnail?.url
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
        Accept payment && Approve 
        
      </div>
    </div>
  );
}
