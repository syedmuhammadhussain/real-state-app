'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Phone, MessageCircle, ChevronDown, Check, Eye, EyeClosed } from "lucide-react"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"
import { toast } from '@/hooks/use-toast'
import { useIsMobile } from '@/hooks/use-mobile'

export const ContactInfo = ({ contact, initialOpen = false }) => {
  const [isOpen, setIsOpen] = useState(initialOpen)
  const [copied, setCopied] = useState(false)

  const isMobile = useIsMobile()
  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)         
      toast({
        variant: 'success',
        title: 'Номер скопирован в буфер обмена',
        description: 'call him before some bbody else cal him'
      });
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Не удалось скопировать номер',
      });
    }
  }

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="border-t border-primary-light/20 pt-3">

      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-primary-dark"> Связаться с владельцем: </span>
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="text-primary-dark hover:text-primary-dark/80 group"
          >
            {!isOpen ? (
              <div className="flex items-center gap-2 transition-all">
                 {!isMobile && <span className="hidden md:block text-primary-default text-sm"> {contact.hiddenPhone} </span>} 
                  <Eye className="w-5 h-5 transition-transform duration-300 " />
              </div>
            ) : (
              <div className="flex items-center gap-1 animate-in fade-in">
                {!isMobile && <span className=" text-primary-default text-sm">
                  Скрыть номер
                </span> } 
                <EyeClosed className="w-5 h-5 transition-transform duration-300 " />
              </div>
            )}
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="mt-2 animate-in slide-in-from-top-5 fade-in duration-300">
        <div className="flex flex-col sm:flex-row justify-center items-start sm:items-center gap-4 pb-2">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleCopy(contact.phone)}
              className= "group border-primary-light/30 hover:bg-primary-dark  group-hover:"
            >
              <Phone className="w-4 h-4 mr-2 text-primary-dark text group-hover:text-green-500 " />
              <span className="text-primary-dark text-sm group-hover:text-white">
                {contact.phone}
              </span>
            </Button>

            <div className="h-6 w-px bg-primary-light/30 hidden sm:block" />
          </div>
          <a
            href={`https://wa.me/${contact.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center  gap-2 px-4 py-2 bg-green-100/80 hover:bg-green-100/60 border hover:border-primary-light rounded-md transition-colors group"
          >
            <MessageCircle className="w-4 h-4 text-green-700 group-hover:text-green-800" />
            <span className="text-green-500 text-sm group-hover:text-green-800 font-medium">
              Написать в WhatsApp
            </span>
          </a>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}