"use client";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ListOrdered, MapPin } from "lucide-react";
import ApartmentCard from "@/components/component/card/ApartmentCard";
import PageLink from "./PageLink";

const HandleTabAndList = ({
  apartments,
  citySlug,
  pageLinks,
  prevPageLink,
  nextPageLink
}) => {
  const [selectedTab, setSelectedTab] = useState("list");

  return (
    <Tabs value={selectedTab} onValueChange={setSelectedTab}>
      <TabsList className="mb-8 grid w-full grid-cols-3">
        <TabsTrigger value="map">
          <MapPin className="mr-2 h-4 w-4" /> 
          <span className="hidden md:block text-sm">Карта</span>
        </TabsTrigger>
        <TabsTrigger value="list">
          <ListOrdered className="mr-2 h-4 w-4" />
          <span className="hidden md:block text-sm">Список</span> 
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="list">
        {apartments.length ? (
          <>
            <div className="grid grid-cols-1 gap-3">
              {apartments.map((p) => (
                <ApartmentCard key={p.id} data={p} city={citySlug} />
              ))}
            </div>
            
            {/* 4. استخدام الروابط الجاهزة */}
            <nav className="mt-12 flex items-center justify-center gap-2">
              <PageLink href={prevPageLink} disabled={!prevPageLink}>
                Prev
              </PageLink>
              {pageLinks.map((link) => (
                <PageLink 
                  key={link.page} 
                  href={link.href} 
                  active={link.isActive}
                >
                  {link.page}
                </PageLink>
              ))}
              <PageLink href={nextPageLink} disabled={!nextPageLink}>
                Next
              </PageLink>
            </nav>
          </>
        ) : (
          <div className="py-20 text-center">
            <h2 className="text-2xl text-gray-600">Ничего не найдено</h2>
            <Link href={`/${citySlug}`} className="...">
              Просмотреть все объекты недвижимости
            </Link>
          </div>
        )}
      </TabsContent>

      <TabsContent value="map">  
        <div>Map View Placeholder</div>
      </TabsContent>
    </Tabs>
  );
};

export default HandleTabAndList;