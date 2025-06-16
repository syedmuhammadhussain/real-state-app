"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  PlusCircle,
  User,
  Home,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import ProfileInfo from "./ProfileInfo";
import { Button } from "@/components/ui/button";
import ApartmentCard from "@/components/component/card/ApartmentCard";
import { useAuth } from "../../../context/AuthContext";
import { useApartment } from "../../../context/ApartmentContext";

/**
 * ProfilePage – страница профиля владельца объявлений
 * --------------------------------------------------
 * • Корректно обрабатывает состояния: загрузка, ошибка, пустой список
 * • Уникальные key‑props для элементов списка
 * • Нет дублирующихся key‑props на разных уровнях дерева
 */

export default function ProfilePage() {
  const [selectedTab, setSelectedTab] = useState("properties");
  const { user } = useAuth();
  const router = useRouter();

  const {
    apartments,
    loading,
    error,
    deleteApartment,
    fetchApartmentsByOwner,
    setApartmentForEdit,
  } = useApartment();

  /**
   * Получаем объявления пользователя при загрузке компонента
   */
  
  useEffect(() => {
    if (user?.id) fetchApartmentsByOwner(user.id);
    // eslint‑disable‑next‑line react-hooks/exhaustive-deps
  }, [user?.id]);

  // =====================
  // Handlers
  // =====================
  const handleEdit = (apartment) => {
    setApartmentForEdit(apartment);
    router.push("/add-edit-apartment");
  };

  const handleDelete = async (id) => {
    try {
      await deleteApartment(id);
    } catch (err) {
      /* eslint-disable no-console */
      console.error("Ошибка при удалении квартиры:", err);
      /* eslint-enable no-console */
    }
  };

  // =====================
  // UI helpers
  // =====================
  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
      <Home className="h-12 w-12 text-muted-foreground" />
      <p className="text-lg font-medium text-muted-foreground">
        У вас пока нет объявлений
      </p>
    </div>
  );

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

  // =====================
  // Render
  // =====================
  return (
    <div className="min-h-screen bg-gray-50 pt-10">
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
          <TabsList className="mb-8 grid w-full grid-cols-2">
            <TabsTrigger value="properties">
              <Home className="mr-2 h-4 w-4" /> Объекты
            </TabsTrigger>
            <TabsTrigger value="profile">
              <User className="mr-2 h-4 w-4" /> Профиль
            </TabsTrigger>
          </TabsList>

          {/* Объекты */}
          <TabsContent value="properties">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="w-2/4 font-semibold text-primary-dark">Мои объявления</h3>
              <Button
                className="w-1/3"
                onClick={() => router.push("/add-edit-apartment")}
              >
                <PlusCircle className="mr-2 h-4 w-4" /> Добавить новую недвижимость
              </Button>
            </div>

            {/* Состояния данных */}
            {loading && <LoadingState />}
            {error && !loading && <ErrorState message={error} />}
            {!loading && !error && apartments.length === 0 && <EmptyState />}

            {/* Список объявлений */}
            <div className="mt-4 grid gap-4">
              {!loading &&
                !error &&
                apartments.map((apartment, index) => (
                  <ApartmentCard
                    /**
                     * apartment.id гарантирует уникальный ключ;
                     * fallback на index, если id отсутствует (не рекомендуется, но безопасно)
                     */
                    key={apartment.id ?? `apt-${index}`}
                    data={apartment}
                    onEdit={() => handleEdit(apartment)}
                    onDelete={() => handleDelete(apartment.id)}
                    showButtonEdit
                  />
                ))}
            </div>
          </TabsContent>

          {/* Профиль */}
          <TabsContent value="profile">
            <ProfileInfo />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
