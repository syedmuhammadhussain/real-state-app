import { ArrowLeft, ChevronDown } from 'lucide-react'
import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"

export const BreadcrumbNav = ({ product }) => (
  <Breadcrumb className="mb-10">
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink  href='/'> Главная </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator>
        <ChevronDown className="w-4 h-4 rotate-90" />
      </BreadcrumbSeparator>
      <BreadcrumbItem>
        <BreadcrumbLink  href={`/city=${product.city}`}> {product.city === 'moscow' ? 'Москва' : 'Тюмень'} </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator>
        <ChevronDown className="w-4 h-4 rotate-90" />
      </BreadcrumbSeparator>
      <BreadcrumbItem>
        <BreadcrumbPage className="text-sm">
        {product.mapInfo.district},  {product.mapInfo.address}
        </BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
)