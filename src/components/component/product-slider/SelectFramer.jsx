import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cityOptions } from "@/constants/data"


export function SelectFramer({isPopoverOpen, setIsPopoverOpen, selectedCityKey, selectedCity, handleCitySelect}) {

  return (
    <Popover className="!max-w-[600px]"
      open={isPopoverOpen} 
      onOpenChange={setIsPopoverOpen}  
      // Prevent the automatic focusing of the input
      onOpenAutoFocus={(event) => {
        event.preventDefault()
      }}>
    <PopoverTrigger asChild>
      <Button
        variant="outline"
        role="combobox"
        aria-expanded={isPopoverOpen}
        className="w-[700px] justify-between px-6 py-6 bg-white/90 backdrop-blur-sm hover:bg-white/95 transition-all rounded-xl shadow-lg hover:shadow-xl border-0"
      >
        <span className="truncate font-medium text-gray-900">
          {selectedCity?.ru || "Select city..."}
        </span>
        <ChevronsUpDown className="ml-2 h-5 w-5 text-gray-600" />
      </Button>
    </PopoverTrigger>

    <PopoverContent
      side="bottom"        
      align="center"      
      sideOffset={8}      
      avoidCollisions={false} 
      className="w-[var(--radix-popover-trigger-width)] p-0 overflow-hidden rounded-xl shadow-md bg-white/95 backdrop-blur-sm border border-gray-100"
    >
      <Command className="[&_[cmdk-group]]:px-2 [&_[cmdk-group]]:py-3">
        <CommandInput 
          placeholder="Search cities..."
          className="h-14 text-base border-b border-gray-100 focus:ring-0"
        />
        <CommandList className="max-h-[400px] overflow-auto">
          <CommandEmpty className="py-6 text-center text-gray-500">
            No cities found
          </CommandEmpty>

          <CommandGroup>
            {cityOptions.map((city) => (
              <CommandItem
                key={city.ru}
                value={city.ru}
                onSelect={() => handleCitySelect(city.ru)}
                className="group px-4 py-3 rounded-xl aria-selected:bg-gray-50/50 transition-colors"
              >
                <Check
                  className={cn(
                    "mr-3 h-5 w-5 text-primary",
                    selectedCityKey === city.ru 
                      ? "opacity-100" 
                      : "opacity-0 group-hover:opacity-40"
                  )}
                />
                <div className="flex-1 text-left">
                  <div className="font-medium text-gray-900">
                    {city.ru}
                  </div>
                  <div className="text-sm text-gray-500 line-clamp-1">
                    {city.description}
                  </div>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
  )
}
