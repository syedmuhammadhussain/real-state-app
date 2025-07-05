'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle} from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useApartment } from '../../../../context/ApartmentContext';
import { LoadingState } from '../handle-event-loading/HandleEvents';

export default function ReklamaPaymentDialog({isOpen, setIsOpen, data }) {
  const [activeTab, setActiveTab] = useState('reklama');
  const [paymentUnlocked, setPaymentUnlocked] = useState(false);


    const { loadingPosition , position } = useApartment();
  
  const mockData = Array.from({ length: 25 }, (_, i) => ({
    name: `Item ${i + 1}`,
    place: `Place ${i + 1}`,
    terms: `Terms ${i + 1}`,
  }));

  

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {/* <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>Open Dialog</Button>
      </DialogTrigger> */}
      {/* <DialogTitle> hamad yel3a </DialogTitle> */}

      <DialogContent className="max-h-[80vh] rounded-xl bg-white max-w-4xl overflow-auto">
      <DialogHeader  className="text-xl text-primary-dark ">
      <DialogTitle className="text-3xl">Рекламировать </DialogTitle>
    </DialogHeader>

    
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full ">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="reklama">Рекламировать </TabsTrigger>
            <TabsTrigger value="payment" disabled={!paymentUnlocked}> Оплата </TabsTrigger>
          </TabsList>

          {/* Tab 1: Reklama */}
          {loadingPosition ?  <LoadingState/>  :    
          <TabsContent value="reklama">
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full border border-gray-300 rounded-xl text-sm">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="px-4 py-2 border">Место</th>
                    <th className="px-4 py-2 border">Имя</th>
                    <th className="px-4 py-2 border">Условия</th>
                    <th className="px-4 py-2 border">действие</th>
                  </tr>
                </thead>
                <tbody>
                  {position?.map((item, index) => (
                    <tr key={index} className="border-t">
                      <td className="px-4 py-2 border text-center">{item.order}</td>
                      <td className="px-4 py-2 text-center border">{item.title}</td>
                      <td className="px-4 py-2 text-center border">{item.price} /  {item.is_booked === null ? '$' :   `busy until ${item.is_booked}`}</td>
                      <td className="px-4 py-2 text-center border">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => {
                            if(item.is_booked === null) {
                            setPaymentUnlocked(true);
                            setActiveTab('payment');

                            } else {
                              Router.push(`/${data?.city.slug}`)
                            }
                          
                          }}
                        >
                          { item.is_booked === null  ? 'Buy'  : 'look' }
                        </Button>
                      </td>
                    </tr>
                    
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent> 
          }

          {/* Tab 2: Payment */}
          <TabsContent value="payment">
            <div className="mt-4">
              <h2 className="text-lg font-bold mb-2">Payment Details</h2>
              <p className="text-sm text-gray-600">You are now in the payment section.</p>
              <Button className="mt-4" onClick={() => setIsOpen(false)}>
                Complete Payment & Close
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
