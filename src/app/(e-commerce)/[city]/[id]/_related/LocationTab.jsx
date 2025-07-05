import { Check } from 'lucide-react'

export const LocationTab = ({ address, infrastructure }) => (
  <div className="">
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-primary-dark">Адрес</h3>
        <p>{address.name}</p>
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-primary-dark">Рядом есть</h3>
        <div className="flex  flex-col gap-2">
          {infrastructure.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
            <Check className="w-5 h-5 text-primary-default" />
            <span className=" text-primary-dark">  {item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
)