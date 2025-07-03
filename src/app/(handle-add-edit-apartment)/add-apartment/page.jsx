import NewApartmentForm from '@/components/component/forms/new-appartment-form/NewApartmentForm';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

const AddApartmentModal = () => {
  return (

    <div className = 'min-h-screen  mt-10 max-w-7xl mx-auto px-4 md:px-0'>
      
    <Breadcrumbs
      items={[
        { key: "home", label: "Главная", href: "/" },
        { key: "profile",  label: 'Профиль', href: "/profile" },
      ]}
    />
     <NewApartmentForm />
    </div>
  )
}

export default AddApartmentModal