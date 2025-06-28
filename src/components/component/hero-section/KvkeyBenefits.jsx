
import Image from 'next/image';
import { CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { benefits } from '@/constants/data';

export default function KvkeyBenefits() {
  return (
    <section className="mt-10">
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-12  items-center">
        {/* Left: Heading + Cards */}
        <div className="flex flex-col">
          <h5 className="text-2xl md:text-4xl font-bold text-primary-dark mb-5">
            Почему выбирают <span className="text-primary">kvkey.com?</span>
          </h5>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {benefits.map((item, idx) => (
              <Card
                key={idx}
                className="flex h-full flex-col border border-gray-200 rounded-xl bg-white shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:ring-2 hover:ring-primary-dark"
              >
                <CardContent className="flex-1 p-5 flex items-start gap-4">
                  <CheckCircle className="w-5 h-5 text-primary-dark flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-base font-semibold text-primary-dark mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-primary-dark/80 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Right: Image with absolute effects */}
        <div className="hidden md:block relative w-full h-80 md:h-[80%] rounded-xl overflow-hidden shadow-lg order-1 md:order-2 group">
          {/* Background image */}
          <Image
            src="/images/hero/contactUs.jpg"
            alt="Пользователи выбирают kvkey.com"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            priority
          />

          {/* Overlay badge */}
          <div className="absolute top-6 right-6 backdrop-blur-md bg-white/80 border border-white/60 rounded-xl px-4 py-2 shadow-lg flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-primary-default" />
            <span className="text-xs font-medium text-primary-default">
              10 000+ довольных гостей
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
