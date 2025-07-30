'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Phone, Eye, EyeClosed, MessageCircle } from 'lucide-react';
import {Collapsible,CollapsibleTrigger,CollapsibleContent, } from '@/components/ui/collapsible';
import { toast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export const ContactInfo = ({ contact, initialOpen = false }) => {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const [copied, setCopied] = useState(false);

  const router = useRouter();
  const isMobile = useIsMobile();

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast({
        variant: 'success',
        title: 'Номер скопирован в буфер обмена',
        description: 'Позвоните, пока кто-то другой не позвонил',
      });
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Не удалось скопировать номер',
      });
    }
  };

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="border-t border-primary-light/20 pt-2"
    >
      {/* flex-col md:flex-row */}
      <div className="flex   justify-between items-center gap-2 mb-2 ">
        <span className="hidden md:block text-base md:text-lg font-bold text-primary-dark">Связаться :</span>

        {/* ↓ asChild убирает внешний <button>, человек кликает по обычному <div> */}
        <CollapsibleTrigger asChild>
          <div className="flex items-center gap-2 cursor-pointer">
            {/* Блок с иконками (виден только когда открыт) */}
            {isOpen && (
              <div className="flex  items-center gap-2">
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => handleCopy(contact.phone)}
                >
                  <Phone className="h-4 w-4 text-primary-dark" />
                </Button>

                <Button
                  variant="outline"
                  size="md"
                  onClick={() => router.push(`https://wa.me/${contact.whatsapp}`)}
                  // className="bg-transparent p-0 m-0 "
                >
                  {/* <Image
                    src="/images/wp.webp"
                    alt="WhatsApp"
                    width={110}
                    height={110}
                  /> */}
                  <MessageCircle className="h-4 w-4 text-green-400" />
                
                </Button>
              </div>
            )}

            {/* Кнопка «показать/скрыть» */}
            <Button
              variant="primary"
              size="md"
              className="group  "
            >
              {!isOpen ? (
                <div className="flex items-center gap-2 transition-all">
                  {/* показать */}
                  <span className="text-white  text-sm md:text-base "> номер показать</span>
                  <Eye className="h-5 w-5 group-hover:text-green-400 transition-colors" />
                </div>
              ) : (
                <div className="flex items-center gap-1 animate-in fade-in">
                  <span className="text-white  text-sm md:text-base  ">{contact.phone}</span>
                  <EyeClosed className="h-5 w-5 group-hover:text-green-400 transition-colors" />
                </div>
              )}
            </Button>
          </div>
        </CollapsibleTrigger>
      </div>

      <CollapsibleContent className="mt-2 animate-in slide-in-from-top-5 fade-in duration-300">
        {/* можно добавить дополнительную информацию здесь */}
      </CollapsibleContent>
    </Collapsible>
  );
};
