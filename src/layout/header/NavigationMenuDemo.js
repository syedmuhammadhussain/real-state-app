"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, ChevronDown } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const components = [
  {
    title: "Introduction",
    href: "/docs",
    description: "Re-usable components built using Radix UI and Tailwind CSS.",
  },
  {
    title: "Installation",
    href: "/docs/installation",
    description: "How to install dependencies and structure your app.",
  },
  {
    title: "Typography",
    href: "/docs/primitives/typography",
    description: "Styles for headings, paragraphs, lists...etc",
  },
];

export default function NavigationMenuDemo() {
  return (
    <header className="fixed top-0 left-0 w-full bg-black text-white shadow-md z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="text-xl font-bold">
            <Link href="/">Waggle</Link>
          </div>

          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center space-x-6">
            <NavigationMenu>
              <NavigationMenuList className="flex space-x-4">
                {/* Getting Started Dropdown */}
                <NavigationMenuItem className="relative group">
                  <NavigationMenuTrigger className="flex items-center gap-1">
                    Getting Started
                    <ChevronDown size={16} />
                  </NavigationMenuTrigger>

                  {/* Dropdown Content */}
                  <NavigationMenuContent className="absolute h-[500px]left-0 top-full mt-2 w-64 bg-gray-900 text-white shadow-lg rounded-lg opacity-0 scale-95 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100">
                    <ul className="p-4">
                      <li>
                        <Link href="/" className="block px-4 py-2 hover:bg-gray-800 rounded">
                          <h1 className="text-lg font-medium">shadcn/ui</h1>
                          <p className="text-sm text-gray-400">
                            Beautifully designed components built with Radix UI and Tailwind CSS.
                          </p>
                        </Link>
                      </li>
                      {components.map((component, index) => (
                        <ListItem key={index} title={component.title} href={component.href}>
                          {component.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Components Dropdown */}
                <NavigationMenuItem className="relative group">
                  <NavigationMenuTrigger className="flex items-center gap-1">
                    Components
                    <ChevronDown size={16} />
                  </NavigationMenuTrigger>

                  {/* Dropdown Content */}
                  <NavigationMenuContent className="absolute left-0 top-full mt-2 w-64 bg-gray-900 text-white shadow-lg rounded-lg opacity-0 scale-95 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100">
                    <ul className="p-4">
                      {components.map((component, index) => (
                        <ListItem key={index} title={component.title} href={component.href}>
                          {component.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Direct Link */}
                <NavigationMenuItem>
                  <Link href="/docs" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Documentation
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>
        </div>
      </div>
    </header>
  );
}

/* List Item Component */
const ListItem = React.forwardRef(({ title, href, children }, ref) => (
  <li>
    <NavigationMenuLink asChild>
      <Link
        ref={ref}
        href={href}
        className="block px-4 py-2 hover:bg-gray-800 rounded transition-all"
      >
        <div className="text-sm font-medium">{title}</div>
        <p className="text-xs text-gray-400">{children}</p>
      </Link>
    </NavigationMenuLink>
  </li>
));
ListItem.displayName = "ListItem";
