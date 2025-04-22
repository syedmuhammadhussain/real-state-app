// components/ui/Breadcrumbs.tsx
"use client";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ChevronDown } from "lucide-react";

export const Breadcrumbs = ({ items }) => {
  if (!items?.length) return null;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, index) => (
          <span key={item.label} className="flex items-center gap-2">
            <BreadcrumbItem>
              {item.href ? (
                <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
            {/* Add separator except for last item */}
            {  index < items.length - 1 &&  (
              <BreadcrumbSeparator>
                <ChevronDown className="h-4 w-4 rotate-90" />
              </BreadcrumbSeparator>
            )}
          </span>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};