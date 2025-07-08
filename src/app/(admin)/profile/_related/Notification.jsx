import { useState } from "react";
import { BellIcon, CheckIcon, TrashIcon, ChevronDownIcon, ChevronUpIcon, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn, formatDate } from "@/lib/utils";
import { useApartment } from "../../../../../context/ApartmentContext";
import { LoadingState,EmptyState } from "@/components/component/handle-event-loading/HandleEvents";

const Notification = () => {
  const { notifications ,setNotifications , loading } = useApartment();
  
  const [expandedId, setExpandedId] = useState(null);

  // Пометить все как прочитанные
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, read: true }))
  );
  }
  // Удалить уведомление
  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    if (expandedId === id) setExpandedId(null);
  };

  // Пометить как прочитанное
  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  // Переключить детали
  const toggleDetails = (id) => {
    setExpandedId(prev => prev === id ? null : id);
  };


  return (
    <div className="">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
          <h2 className="text-2xl font-bold flex text-primary-dark items-center">
          <BellIcon className="w-5 h-5 mr-2 " />  Уведомления  </h2>
        <Button 
          variant="outline" 
          size="md"
          onClick={markAllAsRead}
          disabled={ notifications?.length === 0 ||  notifications }
          className="transition-colors hover:bg-accent text-primary-dark"
        >
          Пометить все как прочитанные
        </Button>
      </div>

      {notifications  === null &&   <LoadingState />}
      {notifications && notifications?.length === 0 ? ( <EmptyState/> ) 
      : (
        <div className="space-y-4">
          {notifications?.map(notification => (
            <Card 
              key={notification.id}
              className={cn(
                "border-l-4 transition-all shadow-sm overflow-hidden",
                notification.read 
                  ? "bg-black/20 border-l-transparent opacity-75" 
                  : "border-l-primary"
              )}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start gap-2">
                  <div className="flex items-baseline gap-2">
                    {!notification.read && (
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    )}
                    <CardTitle className="text-base font-medium ">
                      <p className="mb-3 text-md text-primary-dark">{notification.message}</p>
                    </CardTitle>
                  </div>
                  
                  <div className="flex gap-1">
                      <Button variant="outline" size="md" onClick={() => markAsRead(notification.id)}>
                        <CheckIcon className="h-4 w-4 text-primary-default" />
                      </Button>
                      <Button variant="destructive" size="md" onClick={() => deleteNotification(notification.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                  </div>

                </div>

                <div className="flex justify-between items-center pt-1">
                  <CardDescription className="text-xs">
                    {/* {formatDate(notification.date)} */}
                  </CardDescription>
                  
                  {notification.booking_form && (
                    <Button 
                      variant="outline" 
                      size="lg"
                      className="h-auto py-2 text-md max-w-[300px]"
                      onClick={() => toggleDetails(notification.id)}
                    >
                      {expandedId === notification.id ? (
                        <>
                          <span className="hidden md:block text-primary-dark"> Свернуть </span> 
                          <ChevronUpIcon className=" h-4 w-4" />
                        </>
                      ) : (
                        <>
                         <span className="hidden md:block text-primary-dark"> Подробнее </span> 
                           <ChevronDownIcon className=" h-4 w-4" />
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </CardHeader>

              <CardContent className="pt-20">
                {notification.booking_form && expandedId === notification.id && (
                  <div className="bg-muted/50 rounded-xl p-4 animate-in fade-in">
                    <h3 className="font-medium mb-4 text-xl   text-primary-dark">Данные о бронировании:</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-primary-dark">
                      <li className="flex">
                        <span className="w-24 text-primary-dark">Имя:</span>
                        <span>{notification.booking_form.name}</span>
                      </li>
                      <li className="flex">
                        <span className=" text-primary-dark">Email:</span>
                        <span>{notification.booking_form.email}</span>
                      </li>
                      <li className="flex">
                        <span className=" text-primary-dark">Телефон:</span>
                        <span>{notification.booking_form.phone}</span>
                      </li>
                      <li className="flex">
                        <span className=" text-primary-dark">Дата брони:</span>
                        <span>{formatDate(notification.booking_form.booking_date)}</span>
                      </li>
                      <li className="flex">
                        <span className=" text-primary-dark">Заезд:</span>
                        <span>{formatDate(notification.booking_form.arrival)}</span>
                      </li>
                      <li className="flex">
                        <span className=" text-primary-dark">Выезд:</span>
                        <span>{formatDate(notification.booking_form.departure)}</span>
                      </li>
                      <li className="flex">
                        <span className=" text-primary-dark">Гости:</span>
                        <span>{notification.booking_form.guest}</span>
                      </li>
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
export default Notification;