"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import Input from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { api } from "@/lib/api"
import { apiUrl } from "@/lib/utils"
import { validateEmail, validateTelephone } from "@/constants/utils"
import { toast } from "@/hooks/use-toast"

export function SimpleBookingForm({ id = 5 }) {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    arrival: '',
    departure: '',
    guests: '',
    name: '',
    email: '',
    phone: ''
  })
  const [errors, setErrors] = useState({
    arrival: '',
    departure: '',
    guests: '',
    name: '',
    email: '',
    phone: ''
  });


  // Reset form when dialog opens
  useEffect(() => {
    if (open) {
      setFormData({
        arrival: '',
        departure: '',
        guests: '',
        name: '',
        email: '',
        phone: ''
      })
      setErrors({})
    }
  }, [open])

  // const validateForm = () => {
  //   const newErrors = {}
  //   if (!formData.arrival) newErrors.arrival = 'Required'
  //   if (!formData.departure) newErrors.departure = 'Required'
  //   if (!formData.name) newErrors.name = 'Required'
  //   if (!formData.email) {
  //     newErrors.email = 'Required'
  //   } else if (!formData.email.includes('@')) {
  //     newErrors.email = 'Invalid email'
  //   }
  //   if (!formData.phone) newErrors.phone = 'Required'
  //   if (!formData.guests || parseInt(formData.guests) < 1) {
  //     newErrors.guests = 'At least 1 guest required'
  //   }
    
  //   setErrors(newErrors)
  //   return Object.keys(newErrors).length === 0
  // }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // if (!validateForm()) return

    setIsLoading(true)
    try {
      const payload = {
          product: id,
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          booking_date: new Date().toISOString(),
          guest: parseInt(formData.guests),
          arrival: new Date(formData.arrival).toISOString(),
          departure: new Date(formData.departure).toISOString(),
          description: "",
          address: ""
        }
      
      // console.log('data : ',payload)

      // Step 3: Send create request
        const response = await fetch(`${apiUrl}/booking-forms`, {
          method: 'POST',
          headers: {
            // 'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ data: payload }),
        });
      if (!response.ok) {
        throw new Error('Failed to submit booking')
      }

      const result = await response.json()

      console.log('Booking successful:', result)
           // Show success toast
      toast({
        variant: "success",
        title: "Заявка отправлена",
        description: "Ваша заявка на бронирование успешно отправлена!"
      })
      
      setOpen(false)
    } catch (error) {
      console.error('Booking error:', error)
         toast({
        variant: "destructive",
        title: "Ошибка отправки",
        description: "Не удалось отправить заявку. Пожалуйста, попробуйте позже."
      })
      // Show error toast
   
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-primary-dark hover:bg-primary-dark/90">
          Отправить заявку
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-[95%] md:max-w-[500px] rounded-xl bg-white">
        <DialogHeader>
          <DialogTitle className="text-primary-dark">Форма бронирования</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Input
                label="Прибытие"
                type="date"
                value={formData.arrival}
                onChange={(e) => setFormData({...formData, arrival: e.target.value})}
                className={errors.arrival ? 'border-red-500' : ''}
                required
              />
              {errors.arrival && <p className="text-red-500 text-xs">{errors.arrival}</p>}
            </div>
            <div className="space-y-2">
              <Input
                label="Выезд"
                type="date"
                value={formData.departure}
                onChange={(e) => setFormData({...formData, departure: e.target.value})}
               required
                error={errors.departure}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Input
              label="Количество гостей"
              type="number"
              id="firstName"
              min="1"
              value={formData.guests}
              onChange={(e) => setFormData({...formData, guests: e.target.value})}
               required
              error={errors.guests}
            />
          </div>
          <div className="space-y-2">
            <Input
              label="Имя"
              type="text"
              id="firstName"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>
          <div className="space-y-2">
            <Input
              label="Email"
              type="email"
              id="email"
              value={formData.email}
              required
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              // className={errors.email ? 'border-red-500' : ''}
              onBlur={() =>
                  setErrors((prev) => ({
                    ...prev,
                    email: validateEmail(formData.email)
                  }))
                    }
               error={errors.email}

            />
            {/* {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>} */}
          </div>

          <div className="space-y-2">
            <Input
              label="Телефон"
              type="tel"
              id="telephone"
              placeholder="+7 (999) 999-99-99"
              value={formData.phone}
                  required
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
               onBlur={() =>
                  setErrors((prev) => ({
                    ...prev,
                    phone: validateTelephone(formData.phone)
                  }))
            }
               error={errors.phone}
            />
          </div>

          <p className="text-xs text-muted-foreground">
            Нажимая на кнопку "Отправить заявку", вы даете согласие на обработку 
            своих персональных данных и принимаете условия пользовательского соглашения.
          </p>

          <Button 
            type="submit"
            className="w-full bg-primary-dark hover:bg-primary-dark/90"
            disabled={isLoading}
          >
            {isLoading ? 'Отправка...' : 'Отправить заявку'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}