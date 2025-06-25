import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50  font-medium rounded-md shadow-lg shadow-primary-default/20 transition-all transform active:scale-95 ",
  {
    variants: {
      variant: {
        primary:
          "w-full px-4 py-2 bg-primary-default text-white rounded-lg hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary-dark hover:animate-pulse",
        secondary:
          "bg-secondary-default text-white shadow-md hover:bg-secondary-hover hover:scale-105",
        outline:
          "border border-gray-400 text-textColor-dark px-4 py-2 rounded-lg hover:bg-background-hover hover:border-gray-900 hover:shadow-md",
        destructive:
          "bg-errorColor-default text-white shadow-md hover:bg-errorColor-light hover:animate-shake",
        ghost:
          "px-4 py-2 text-textColor-dark hover:bg-background-hover hover:opacity-80",
        line:
          "relative text-textColor-dark hover:text-primary-default transition-all before:content-[''] before:absolute before:left-0 before:bottom-0 before:w-full before:h-[2px] before:bg-primary-default before:transition-all before:duration-300 before:translate-x-[-100%] hover:before:translate-x-0",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-3 text-md",
        lg: "h-12 px-6 text-lg",
        icon: "h-10 w-10 flex items-center justify-center",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});
Button.displayName = "Button";

export { Button, buttonVariants };