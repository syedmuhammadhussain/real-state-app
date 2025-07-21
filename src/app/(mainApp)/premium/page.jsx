import { Button } from '@/components/ui/button';
import { Check, Crown, Home, Shield, Star, BoxSelect } from 'lucide-react'; // Fixed i

export const metadata = {
  title: 'Премиум объявления | KVKEY',
  description: 'Поднимите своё объявление в выдаче! Получите больше просмотров и бронирований с премиум-размещением.',
  keywords: ['премиум аренда', 'повысить объявление', 'продвижение KVKEY', 'платное размещение'],
  openGraph: {
    title: 'Премиум-размещение на KVKEY',
    description: 'Больше просмотров, больше бронирований — премиум-объявления от KVKEY.',
    url: 'https://kvkey.com/premium',
    images: [
      {
        url: '/og-cover.jpg',
        width: 1200,
        height: 630,
        alt: 'Премиум объявления на KVKEY',
      },
    ],
  },
};

const PremiumPage = () => {
  const plans = [
    {
      name: 'Золотой Тариф',
      price: '₽14900',
      features: [
        'Премиум-размещение объявлений',
        'Приоритет в поисковой выдаче',
        'Неограниченное количество фото',
        'Виртуальные 3D туры',
        'Персональный менеджер'
      ],
      popular: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-default via-slate-900 to-amber-00/10">
      <div className="pt-24 mx-auto px-4 py-16">
        {/* Заголовок */}
        <div className="text-center mb-16">
          <h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className=" font-bold text-white mb-6"
          >
            Премиум Подписка для Недвижимости
          </h1>
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 text-amber-400">
              <Star className="w-6 h-6" />
              <span className="">Топ-позиции в поиске</span>
            </div>
            <div className="h-8 w-px bg-gray-600" />
            <div className="flex items-center gap-2 text-amber-400">
              <Shield className="w-6 h-6" />
              <span className="">Гарантия безопасности</span>
            </div>
          </div>
        </div>

        {/* Карточка тарифа */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-8 max-w-2xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="relative bg-slate-800/50 backdrop-blur-lg rounded-xl p-8 border border-amber-400/50 shadow-2xl shadow-amber-400/20 hover:border-amber-400/80 transition-all duration-300"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-500 text-white px-4 py-1 rounded-full flex items-center gap-2">
                <Crown className="w-4 h-4" />
                <span className="text-sm font-medium">Рекомендуем</span>
              </div>
              
              <div className="mb-6 text-center">
                <h3 className="font-bold text-amber-400">
                  {plan.name}
                </h3>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-400">/месяц</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-gray-300">
                    <Check className="w-5 h-5 text-amber-400" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
              // onClick ={ (()=>{
              //   // if(user) 1 -registragtion if use not exist  

              // })}
              size='lg'
              variant="primary"
              className="font-semibold bg-amber-600 hover:bg-amber-700 text-white transition-all">  
               Подключить Тариф
            </Button>
            </div>
          ))}
        </div>

        {/* Дополнительные преимущества */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-slate-800/30 rounded-xl">
            <Home className="w-12 h-12 mx-auto text-amber-400 mb-4" />
            <h4 className="text-xl font-semibold text-white mb-2">6000+ Объявлений</h4>
            <p className="text-gray-400">Самая большая база недвижимости</p>
          </div>
          <div className="p-6 bg-slate-800/30 rounded-xl">
            <BoxSelect className="w-12 h-12 mx-auto text-amber-400 mb-4" />
            <h4 className="text-xl font-semibold text-white mb-2">Виртуальные Туры</h4>
            <p className="text-gray-400">Технологии 360° просмотра</p>
          </div>
          <div className="p-6 bg-slate-800/30 rounded-xl">
            <Shield className="w-12 h-12 mx-auto text-amber-400 mb-4" />
            <h4 className="text-xl font-semibold text-white mb-2">Юридическая Проверка</h4>
            <p className="text-gray-400">Гарантия чистоты сделок</p>
          </div>
        </div>

        {/* Гарантия */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800/50 rounded-full">
            <span className="text-amber-400">★</span>
            <span className="text-gray-300">Возврат средств в течение 14 дней</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumPage;