import Image from 'next/image';
import { Key, Folder, Briefcase } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';


const features = [
  {
    title: 'Ключ в один клик',
    description: 'Мгновенно получите доступ к интересующему объекту.',
    Icon: Key,
    position: 'top-8 left-6',
  },
  {
    title: 'Без лишней бюрократии',
    description: 'Живое общение и личные договоренности упрощают процесс найма.',
    Icon: Folder,
    position: 'bottom-52 left-6',
  },
  {
    title: 'Идеально для бизнеса и отдыха',
    description:
      'Выбирайте подходящий вариант в каждом регионе нашей огромной страны.',
    Icon: Briefcase,
    position: 'bottom-8 left-6',
  },
];

export default function KvkeyHowItWorks() {
  return (
    <section className="py-8 md:py-20 ">
      <div className=" mx-auto grid grid-cols-1 md:grid-cols-2 gap-12  items-center">
        {/* Left: Image with overlay cards */}
        <div className="relative w-full h-80 md:h-[32rem] rounded-3xl overflow-hidden shadow-lg group">
          {/* Replace the src with your real image */}
          <Image
            src="/images/aboutUs.jpg"
            alt="Счастливая пара снимает квартиру через kvkey.ru"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            priority
          />

          {/* Overlay feature cards (hidden on very small screens) */}
          <div className="hidden md:block">
            {features.map(({ title, description, Icon, position }, idx) => (
              <Card
                key={idx}
                className={`absolute ${position} w-64 border border-white/60 backdrop-blur-md bg-white/80 rounded-xl shadow-xl
                  transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-2xl hover:ring-2 hover:ring-primary-dark hover:bg-white/90 cursor-pointer`}
              >
                <CardContent className="p-4 flex items-start  gap-3">
                  {/* <Icon className="w-5 h-5 text-primary-dark mt-1" /> */}
                  <div>
                    <h3 className="text-sm font-semibold text-primary-dark mb-1">
                      {title}
                    </h3>
                    <p className="text-xs text-primary-dark leading-tight">
                      {description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Right: Heading & Intro (plus mobile list) */}
        <div className="flex flex-col gap-8">
          <header>
            <h2 className="text-3xl md:text-7xl font-semibold text-primary-dark mb-4">
              Как работает <span className="text-primary">kvkey.ru?</span>
            </h2>
            <p className="text-primary-dark text-base md:text-lg leading-relaxed max-w-prose">
              Мы предлагаем владельцам недвижимости простой способ размещать
              бесплатные объявления о сдаче своего имущества в аренду. Вы
              размещаете объявление, и оно автоматически попадает в нашу базу
              данных. Затем потенциальные клиенты видят ваше предложение и
              свободно общаются с вами напрямую.
            </p>
          </header>
        </div>
      </div>

    </section>
  );
}
