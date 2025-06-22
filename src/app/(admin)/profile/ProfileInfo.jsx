'use client';

import { useState, FormEvent, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HomeIcon } from "lucide-react";
import { useAuth } from "../../../../context/AuthContext";

export default function ProfileInfo() {
  const { user, editUser } = useAuth();

  const [lastName, setLastName] = useState(user?.username ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [telephone, setTelephone] = useState(user?.phone ?? '');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data  = {
        username: lastName,
        phone: telephone,
      }
      await editUser(data);

      // Успешно обновлено (опционально: показать toast)
      console.log("Данные профиля успешно обновлены.");
    } catch (error) {
      // Ошибка обновления (опционально: показать toast)
      console.error("Ошибка при обновлении профиля:", error);
    }
  };

  const handleTelephoneChange = (e) => {
    setTelephone(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  return (
    <div className="bg-white ">
       <h2 className="text-2xl font-bold flex text-primary-dark items-center">
              <HomeIcon className="w-5 h-5 mr-2  text-primary-dark" />
              Персональные данные
            </h2>
      <form onSubmit={handleSubmit} className="space-y-5  rounded-xl shadow-md p-8">
        <div>
          <Label htmlFor="lastName">ФИО</Label>
          <Input
            id="lastName"
            name="lastName"
            placeholder="Введите полное имя"
            value={lastName}
            onChange={handleLastNameChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="email">Электронная почта</Label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(email)}
            readOnly
            disabled // предполагаем, что email не редактируется
          />
        </div>
        <div>
          <Label htmlFor="telephone">Телефон</Label>
          <Input
            id="telephone"
            name="telephone"
            placeholder="+7 (999) 123-45-67"
            value={telephone}
            onChange={handleTelephoneChange}
            required
          />
        </div>
        <div className="pt-4">
          <Button type="submit" className="w-full md:w-auto">
            Сохранить изменения
          </Button>
        </div>
      </form>
    </div>
  );
}
