import { steps } from "@/constants/data";

const StepsOverlay = () => {
  return (
    <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 w-full max-w-5xl px-4 hidden md:block">
      <div className="grid grid-cols-3 gap-6 backdrop-blur-sm bg-white/10 p-6 rounded-2xl border border-white/10 shadow-xl">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex items-center gap-4 text-white/90 group"
          >
            <div className="flex items-center justify-center w-12 h-12 bg-white/10 rounded-full group-hover:bg-white/20 transition-all">
              <step.icon className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm text-primary-hi">Шаг {index + 1}</div>
              <div className="font-medium">{step.title}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepsOverlay;