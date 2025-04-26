"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { cn } from "@/lib/utils"


const Slider = React.forwardRef(
  (
    {
      className,
      trackClassName,
      rangeClassName,
      thumbClassName,
      showThumbOutline = true,
      ariaLabels = [],
      ...props
    },
    ref
  ) => (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        "transition-colors duration-150 ease-in-out",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track
        className={cn(
          "relative h-2 w-full grow overflow-hidden rounded-full bg-primary-dark/20",
          "group-hover:bg-primary-dark/30 transition-colors duration-300",
          trackClassName
        )}
      >
        <SliderPrimitive.Range
          className={cn(
            "absolute h-full bg-green-700",
            "group-hover:bg-secondary-hover transition-colors duration-300",
            rangeClassName
          )}
        />
      </SliderPrimitive.Track>

      {props.value?.map((_, index) => (
        <SliderPrimitive.Thumb
          key={index}
          aria-label={ariaLabels[index] || `Slider handle ${index + 1}`}
          className={cn(
            "block h-4 w-4 rounded-full border-2 border-background bg-primary-default",
            "shadow-lg transition-all duration-200 focus-visible:outline-none",
            "focus-visible:ring-2 focus-visible:ring-primary/50",
            "hover:scale-110 hover:shadow-xl active:scale-105",
            showThumbOutline && "ring-2 ring-primary/20",
            thumbClassName
          )}
        />
      ))}
    </SliderPrimitive.Root>
  )
)

Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }