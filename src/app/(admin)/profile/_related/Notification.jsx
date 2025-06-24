
import { notifications } from "@/constants/data"
import { BellIcon } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const Notification = () =>{

 return(
        <>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex text-primary-dark items-center">
              <BellIcon className="w-5 h-5 mr-2  text-primary-dark" />
              Уведомление
            </h2>
            <Button variant="ghost" size="sm">
              Mark all as read
            </Button>
          </div>
            <div className="space-y-4">
              {notifications?.map((notification) => (
                <Card
                  key={notification.id} 
                  className={cn(
                    "border-l-4 transition-all",
                    notification.read 
                      ? "border-l-transparent opacity-80" 
                      : "border-l-primary shadow-sm"
                  )}
                >
                  <CardHeader className="pb-3">
                    <div className="flex justify-between">
                      <CardTitle className="text-base flex items-center">
                        {!notification.read && (
                          <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                        )}
                        {notification.apartment}
                      </CardTitle>
                      <CardDescription className="text-xs">
                        {/* {formatDate(notification.date)} */}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">{notification.message}</p>
                  </CardContent>
                </Card>
              ))}
      </div>
</>
 )   
}

export default  Notification;