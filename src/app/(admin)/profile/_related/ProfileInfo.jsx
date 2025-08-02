"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { User, Pencil, Save } from "lucide-react";
import { useAuth } from "../../../../../context/AuthContext";
import HandleProfileImage from "./HandleProfileImage";
import Input from "@/components/ui/input";
import { ConfirmEditDialog } from "@/components/component/dialog-popups/ConfirmEditDialog";

export default function ProfileInfo() {
  const { user, editUser  } = useAuth();
  const [loading, setIsLoading] = useState(false);

  const [showPopup, setShowPopup] = useState(false);
  const [form, setForm] = useState({
    username: user?.username ?? "",
    email: user?.email ?? "",
    phone: user?.phone ?? "",
    image: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user?.id) {
      setForm({
        username: user.username ?? "",
        email: user.email ?? "",
        phone: user.phone ?? "",
        image: "",
      });
    }
  }, [user]);

  const handleChange = (key) => (e) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const handleSubmit = async () => {
    try {
      setIsLoading(true)
      const payload = {
        username: form.username,
        phone: form.phone,
        image: form.image,
      };
      await editUser(payload);
      setIsLoading(false)
      setIsEditing(false);
      setShowPopup(false)
    } catch (error) {
      console.error("Ошибка при обновлении профиля:", error);
    }
  };


  return (
    <section className="space-y-6">
      <h2 className="flex items-center text-2xl font-bold text-primary-dark">
        <User className="mr-2 h-5 w-5 text-primary-dark" />
        Персональные данные
      </h2>

      <form
        onSubmit={(e) => e.preventDefault()} 
        className="space-y-5 rounded-xl "
      >
        {isEditing && (
          <HandleProfileImage
            image={form.image}
            setImage={(img) => setForm((prev) => ({ ...prev, image: img }))}
          />
        )}
        <Input
          label="ФИО"
          id="username"
          name="username"
          placeholder="Введите полное имя"
          value={form.username}
          onChange={handleChange("username")}
          required
          disabled={!isEditing}
        />
        <Input
          label="Электронная почта"
          id="email"
          type="email"
          name="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={handleChange("username")}

          readOnly
          disabled
        />
        <Input
          label="Телефон"
          id="telephone"
          name="telephone"
          placeholder="+7 (999) 123-45-67"
          value={form.phone}
          onChange={handleChange("phone")}
          required
          disabled={!isEditing}
        />
        
        {isEditing ? 
        <div className="flex flex-col md:flex-row gap-3 items-start md:items-center justify-between">
        <Button type="button" className="w-full md:w-auto" 
          onClick={()=>setShowPopup(true)}>
          <Save className="mr-2 h-4 w-4" /> Сохранить изменения
        </Button> 
        <Button
          size="md"
          variant="outline"
          onClick={()=>setIsEditing(false)}
          >
            Отмена
        </Button>
          </div>
        :  
        <Button
          type="button"
          variant="outline"
          onClick={() =>setIsEditing(true)}
          className="w-full md:w-auto"
        >
          <Pencil className="mr-2 h-4 w-4" /> Редактировать
        </Button>
        }

        <div className="pt-4 ">
          {showPopup &&   <ConfirmEditDialog handleSubmit={handleSubmit} loading={loading} handlePopDown = { () => setShowPopup(false) }/>}
        </div>
      </form>
    </section>
  );
}
