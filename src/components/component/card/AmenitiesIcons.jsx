// Amenities Icons Component
export const AmenitiesIcons = ({ amenities }) => (
    <div className="absolute bottom-3 left-2 flex gap-2">
      {amenities.map(({ icon: Icon }, idx) => (
        <div key={idx} className="bg-white/90 p-1.5 rounded-xl shadow-sm">
          <Icon className="w-5 h-5 text-primary-dark" />
        </div>
      ))}
    </div>
  );


// Apartment Parameters Component
export const ApartmentParameters = ({ params, isMobile }) => 
  !isMobile && (
  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 my-4">
    <ParameterItem icon={Icons.building} label={params.apartmentType || "Apartment"} />
    <ParameterItem icon={Icons.users} label={`Up to ${params.maxGuests || 1} guests`} />
    <ParameterItem icon={Icons.bedDouble} label={`${params.doubleBeds || 0} double beds`} />
    <ParameterItem icon="🛏" label={`${params.singleBeds || 0} single beds`} />
    <ParameterItem icon="📏" label={`${params.area?.total || 0} m²`} />
    <ParameterItem icon="🏗" label={params.buildingType || "Modern"} />
    <ParameterItem icon="🏗" label={params.rooms || "Rooms"} />
  </div>
);

// Parameter Item Component
const ParameterItem = ({ icon, label }) => {
  const IconComponent = typeof icon === 'string' 
    ? () => <span>{icon}</span> 
    : icon;

  return (
    <div className="flex items-center gap-1 text-xs sm:text-sm text-primary-default">
      <IconComponent className="w-4 h-4 text-primary-default shrink-0" />
      {label}
    </div>
  );
};

