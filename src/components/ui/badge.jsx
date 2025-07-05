import * as React from "react"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-xl border p-3 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-primary-default flex items-center gap- text-white border border-primary-dark/20 text-xs  rounded-full backdrop-blur-sm",
        secondary:  "bg-green-100/80 flex items-center gap- text-primar-dark border border-primary-dark/20 text-xs  rounded-full backdrop-blur-sm",
        destructive: "bg-red-800 flex items-center gap- text-whtie border border-primary-dark/20 text-xs rounded-full backdrop-blur-sm",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  ...props
}) {
  return (<div className={cn(badgeVariants({ variant }), className)} {...props} />);
}

export { Badge, badgeVariants }
