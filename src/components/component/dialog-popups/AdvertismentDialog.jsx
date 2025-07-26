"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

export default function AdvertismentDialog({ isOpen, setIsOpen, data }) {
  const [activeTab, setActiveTab] = useState("reklama");
  const [paymentUnlocked, setPaymentUnlocked] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-h-[80vh] rounded-xl bg-white max-w-4xl overflow-auto">
        <DialogHeader className="text-xl text-primary-dark ">
          <DialogTitle className="text-3xl">  Быть золотым счетом </DialogTitle>
        </DialogHeader>
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full "
        >
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="reklama">Быть золотым </TabsTrigger>
            <TabsTrigger value="payment" disabled={!paymentUnlocked}>
              {" "}
              Оплата{" "}
            </TabsTrigger>
          </TabsList>

          {/* Tab 1: Reklama */}
          <TabsContent value="reklama">
            <div className="mt-4 overflow-x-auto">
               <h2 className="text-lg font-bold mb-2 mt-4 text-center">               
                ВАМ НЕОБХОДИМО ЗАПЛАТИТЬ 50 РУБЛЕЙ, ЧТОБЫ ПОВЫСИТЬ ПОЛОЖЕНИЕ ВАШЕЙ КВАРТИРЫ
              </h2>
              <h3>
              </h3>
              <Button className="mt-4" onClick={() =>{
                setActiveTab("payment");
                setPaymentUnlocked(true)}}>
                Платите только 50 р.
            </Button>
            </div>
          </TabsContent>
        
          {/* Tab 2: Payment */}
          <TabsContent value="payment">
            <div className="mt-4">
              <h2 className="text-lg font-bold mb-2">Payment Details</h2>
              <p className="text-sm text-gray-600">
                Сейчас вы находитесь в разделе оплаты.
              </p>
              <Button className="mt-4" onClick={() => setIsOpen(false)}>
                Завершить оплату и закрыть
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
