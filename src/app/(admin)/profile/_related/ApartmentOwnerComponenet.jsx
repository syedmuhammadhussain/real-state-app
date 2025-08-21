import { useEffect } from "react";
import { useRouter } from "next/navigation";
import ApartmentCard from "@/components/component/card/ApartmentCard";
import {
  EmptyState,
  LoadingState,
} from "@/components/component/handle-event-loading/HandleEvents";
import { useApartment } from "../../../../../context/ApartmentContext";
import { useAuth } from "../../../../../context/AuthContext";

const ApartmentOwnerComponenet = () => {
  const { user } = useAuth();
  const router = useRouter();
  const {apartmentsForOwner,deleteApartment,fetchApartmentsByOwner,setApartmentForEdit} = useApartment();

  // handle not not exist user
  useEffect(() => {
    if (user?.id )
      fetchApartmentsByOwner(user.id);
  }, [user?.id]);

  // Handlers edit
  const handleEdit = async (apartment) => {
    
    setApartmentForEdit(apartment);
    router.push("/edit-apartment/");
    await localStorage.setItem("apartmentForEdit", JSON.stringify(apartment));
  };

  // handle edit
  const handleDelete = async (id) => await deleteApartment(id);

  return (
    <div className="mt-4 grid gap-4">
      {apartmentsForOwner  === null &&   <LoadingState />}
      {apartmentsForOwner && apartmentsForOwner?.length === 0  ? (
        <EmptyState />
      ) : (
        apartmentsForOwner?.map((apartment, index) => (
          <ApartmentCard
            key={index}
            data={apartment}
            onEdit={() => handleEdit(apartment)}
            onDelete={() => handleDelete(apartment.documentId)}
            showButtonEdit
            city=""
          />
        ))
      )}
    </div>
  );
};

export default ApartmentOwnerComponenet;
