import { useEffect } from "react";
import { useRouter } from "next/navigation";
import ApartmentCard from "@/components/component/card/ApartmentCard";
import { EmptyState, LoadingState } from "@/components/component/handle-event-loading/HandleEvents";
import { useApartment } from '../../../../../context/ApartmentContext';
import { useAuth } from '../../../../../context/AuthContext';

const ApartmentOwnerComponenet = () => {

  const { user } = useAuth();
  const router = useRouter();
 
  const { apartmentsForOwner, loading ,error, deleteApartment,
     fetchApartmentsByOwner, setApartmentForEdit, setEditMode } = useApartment();

  // handle not not exist user
  useEffect(() => {
    if (user?.id &&  apartmentsForOwner.length === 0 ) fetchApartmentsByOwner(user.id)
      //  else if (user !== undefined && !user?.id) {
      //   notFound()
      // }
  }, [user?.id]); 

  // Handlers edit 
  const handleEdit = async (apartment) => {
    setApartmentForEdit(apartment);
    router.push("/edit-apartment/");
    await localStorage.setItem("apartmentForEdit", JSON.stringify(apartment));
  };

  // handle edit 
  const handleDelete = async (id) => await deleteApartment(id);

//   if (loading) return ;
  if (error) return <EmptyState message="Ошибка при загрузке квартир" />;


  // console.log('apartmentsForOwner', apartmentsForOwner)
  return (
    <div className="mt-4 grid gap-4">
      {
        loading ?
         <LoadingState /> : 
         apartmentsForOwner?.map((apartment, index) => (
          <ApartmentCard
            key={index}
            data={apartment}
            onEdit={() => handleEdit(apartment)}
            onDelete={() => handleDelete(apartment.documentId)}
            showButtonEdit
          />
        ))
       }
    </div>
  )
}

export default ApartmentOwnerComponenet