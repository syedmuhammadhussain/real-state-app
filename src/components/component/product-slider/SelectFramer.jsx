import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useApartment } from "../../../../context/ApartmentContext"
import { LoadingState } from "../handle-event-loading/HandleEvents"

export function SelectFramer() {
  const { cities, selectedCityKey, isPopoverOpen, setIsPopoverOpen, selectedCity, handleCitySelect } = useApartment()


  // console.log("selectedCityKey:", selectedCityKey);
  
  return (
    <Popover className=""
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
        className="w-4/5 md:w-3/5 justify-between px-6 py-6 bg-white/90 backdrop-blur-sm hover:bg-white/95 transition-all rounded-xl shadow-lg hover:shadow-xl border-0"
      >
        <span className="truncate font-medium text-gray-900">
          {selectedCity?.name || "Выберите город..."}
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
          placeholder="Поиск городов..."
          className="h-14 text-sm md:text-base text-primary-dark border-b border-gray-100 focus:ring-0"
        />
        <CommandList className="max-h-[400px] overflow-auto">
          <CommandEmpty className="py-6 text-center text-gray-500">
            < LoadingState/> 
          </CommandEmpty>
          <CommandGroup>
            {cities.map((city, index) => (
              <CommandItem
                key={index}
                value={city.name}
                onSelect={() => handleCitySelect(city.slug)}
                className="group px-4 py-3 rounded-xl aria-selected:bg-gray-50/50 transition-colors"
              >
                <Check
                  className={cn(
                    "mr-3 h-5 w-5 text-primary-dark",
                    selectedCityKey === city.slug 
                      ? "opacity-100" 
                      : "opacity-0 group-hover:opacity-40"
                  )}
                />
                <div className="flex-1 text-left">
                  <div className="text-sm md:text-base  text-primary-dark">
                    {city.name}
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
