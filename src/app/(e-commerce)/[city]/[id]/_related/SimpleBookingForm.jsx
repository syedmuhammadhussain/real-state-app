"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog"

import { Label } from "@/components/ui/label"
import Input from "@/components/ui/input"

export function SimpleBookingForm() {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    arrival: '',
    departure: '',
    guests: '1',
    name: 'Татьяна',
    email: 'odvanta@gmail.com',
    phone: '+7 (929) 269-60-73'
  })
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}
    if (!formData.arrival) newErrors.arrival = 'Required'
    if (!formData.departure) newErrors.departure = 'Required'
    if (!formData.name) newErrors.name = 'Required'
    if (!formData.email.includes('@')) newErrors.email = 'Invalid email'
    if (!/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(formData.phone)) newErrors.phone = 'Invalid phone'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      console.log(formData)
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-primary-dark hover:bg-primary-dark/90">
          Отправить заявку
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-[95%] md:max-w-[500px] rounded-md  bg-white">
        <DialogHeader>
          <DialogTitle className="text-primary-dark">Форма бронирования</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Прибытие</Label>
              <Input
              type='date'
                placeholder="дд.мм.гггг"
                value={formData.arrival}
                onChange={(e) => setFormData({...formData, arrival: e.target.value})}
                className={errors.arrival ? 'border-red-500' : ''}
              />
              {errors.arrival && <p className="text-red-500 text-xs">{errors.arrival}</p>}
            </div>
            
            <div className="space-y-2">
              <Label>Выезд</Label>
              <Input
                type='date'
                placeholder="дд.мм.гггг"
                value={formData.departure}
                onChange={(e) => setFormData({...formData, departure: e.target.value})}
                className={errors.departure ? 'border-red-500' : ''}
              />
              {errors.departure && <p className="text-red-500 text-xs">{errors.departure}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Input
               label="Количество гостей"
               id="lastName"
              type="number"
              min="1"
              value={formData.guests}
              onChange={(e) => setFormData({...formData, guests: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Input
               label="Имя"
               type="text"
               id="lastName"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <Input
             label="Email"
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <Input
               label="Телефон"
               id="telephone"
               type="telephone"
              placeholder="+7 (999) 999-99-99"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className={errors.phone ? 'border-red-500' : ''}
            />
            {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
          </div>

          <p className="text-xs text-muted-foreground">
            Нажимая на кнопку "Отправить заявку", вы даете согласие на обработку 
            своих персональных данных и принимаете условия пользовательского соглашения.
          </p>

          <Button 
            type="submit"
            className="w-full bg-primary-dark hover:bg-primary-dark/90"
          >
            Отправить заявку
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}