"use client";
import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva } from "class-variance-authority";
import { X, CheckCircle2, AlertTriangle, Info, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

// Proper named exports for all components
export const ToastProvider = ToastPrimitives.Provider;

export const ToastViewport = React.forwardRef(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      " fixed max-w-[320px] top-14 right-0 z-[9999] flex max-h-screen w-full flex-col-reverse p-4 sm:flex-col md:max-w-[420px]",
      className
    )}
    {...props}
  />
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-start space-x-3 overflow-hidden rounded-xl border p-4 pr-8 shadow-2xl transition-all backdrop-blur-sm data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-90 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full duration-300",
  {
    variants: {
      variant: {
        default: "bg-primary-light text-white border-border ",
        destructive: "bg-red-700 text-white  ",
        success: "bg-green-700 text-white ",
        info: "bg-primary-dark text-white ",
        warning: "bg-warning text-white ",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export const Toast = React.forwardRef(({ className, variant, ...props }, ref) => {
  const iconMap = {
    default: <Info className="h-5 w-5" />,
    destructive: <XCircle className="h-5 w-5" />,
    success: <CheckCircle2 className="h-5 w-5" />,
    info: <Info className="h-5 w-5" />,
    warning: <AlertTriangle className="h-5 w-5" />,
  };

  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    >
      <div className="flex-shrink-0 rounded-full p-1.5 backdrop-blur-md bg-white/10">
        {iconMap[variant] || iconMap.default}
      </div>
      <div className="grid flex-1 gap-1.5">
        {props.children}
      </div>
      <ToastPrimitives.Close className="absolute right-2 top-2 rounded-full p-1 opacity-0 transition-opacity  hover:bg-black/10 focus:opacity-100 focus:outline-none group-hover:opacity-100">
        <X className="h-4 w-4 rounded-full" />
      </ToastPrimitives.Close>
    </ToastPrimitives.Root>
  );
});
Toast.displayName = ToastPrimitives.Root.displayName;

export const ToastClose = React.forwardRef(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "absolute right-2 top-2 rounded-sm p-1 opacity-0 transition-opacity hover:bg-black/10 focus:opacity-100 focus:outline-none group-hover:opacity-100",
      className
    )}
    toast-close=""
    {...props}>
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
));
ToastClose.displayName = ToastPrimitives.Close.displayName;

export const ToastTitle = React.forwardRef(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn("text-sm font-semibold [&+div]:text-xs", className)}
    {...props} />
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;

export const ToastDescription = React.forwardRef(({ className, ...props }, ref) => (
  <ToastPrimitives.Description 
    ref={ref} 
    className={cn("text-sm opacity-90", className)} 
    {...props} />
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

export const ToastAction = React.forwardRef(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-xl border bg-transparent px-3 text-sm font-medium transition-colors hover:bg-secondary focus:outline-none focus:ring-1 focus:ring-ring disabled:pointer-events-none disabled:opacity-50",
      className
    )}
    {...props} />
));
ToastAction.displayName = ToastPrimitives.Action.displayName;