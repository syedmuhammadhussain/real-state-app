export  function Param({ icon: Icon, label }) {
  return (
    <div className="flex items-center gap-1 text-xs sm:text-sm text-primary-dark truncate">
      {Icon && <Icon className="w-4 h-4 shrink-0 text-primary-dark" />}
      <span className="text-xs sm:text-sm">{label}</span>
    </div>
  );
}