
import {  MapPin, Search, MessageCircle } from "lucide-react";

export const formatCurrency = (number) => {
  const CURRENCY_FORMATTER = new Intl.NumberFormat('en-US', {
    currency: 'USD',
    style: 'currency',
  });
  return CURRENCY_FORMATTER.format(number);
};
    
export const steps = [
    {
      title: "Укажите город",
      icon: MapPin,
    },
    {
      title: "Найдите лучшее",
      icon: Search,
    },
    {
      title: "Обсудите условия",
      icon: MessageCircle,
    },
];

export  const links = [
  { name: 'О нас', link: '/about' },
  { name: 'Контакт', link: '/contact' },
  { name: 'Премиум', link: '/premium' },
];

export const subLinks = ['Shirts', 'Jeans', 'Hoodies',   'Trendy' , 'Arrival'];

export const cityOptions = [  
  { en: "Moscow",
    ru: "Москва",
    key: "moscow",
    description: 'Сердце России: элитная недвижимость у Кремля и престижные новостройки с видом на парки',
    link: '/moscow',
    img: '/images/cities/moscow.jpg',
    districts: ["Тверской", "Арбат", "Пресненский", "Хамовники", "Замоскворечье"]
  },  
  { en: "Saint Petersburg",
    ru: "Санкт-Петербург",
    key: "saint-petersburg",
    description: 'Северная Венеция: апартаменты с видом на Неву и исторические дворцы в центре города',
    link: '/saint-petersburg',
    img: '/images/cities/saint-petersburg.jpg',
    districts: ["Адмиралтейский", "Центральный", "Василеостровский", "Петроградский", "Московский"]
  },  
  { en: "Novosibirsk",
    ru: "Новосибирск",
    key: "novosibirsk",
    description: 'Столица Сибири: современные ЖК у Обского моря и уютные дома в зеленых районах',
    link: '/novosibirsk',
    img: '/images/cities/novosibirsk.jpg',
    districts: ["Ленинский", "Октябрьский", "Заельцовский", "Калининский", "Центральный"] 
    },  
    { 
      en: "Yekaterinburg",
      ru: "Екатеринбург",
      key: "yekaterinburg",
      description: 'Город на границе Европы и Азии: лофты в стиле хай-тек и виды на Уральские горы',
      link: '/yekaterinburg',
      img: '/images/cities/yekaterinburg.jpg',
      districts: ["Верх-Исетский", "Чкаловский", "Орджоникидзевский", "Кировский", "Ленинский"]
     },  
  { en: "Kazan",
     ru: "Казань",
      key: "kazan",
       description: 'Слияние культур: квартиры с видом на Казанский Кремль и таунхаусы у озера Кабан',
        link: '/kazan',
         img: '/images/cities/kazan.jpg',
         districts: ["Вахитовский", "Московский", "Приволжский", "Советский", "Ново-Савиновский"] },  
  { en: "Nizhny Novgorod",
     ru: "Нижний Новгород",
      key: "nizhny-novgorod",
       description: 'Жемчужина Волги: апартаменты в историческом центре и новостройки с панорамой реки',
        link: '/nizhny-novgorod',
         img: '/images/cities/nizhny-novgorod.jpg',
         districts: ["Сормовский", "Ленинский", "Автозаводский", "Канавинский", "Советский"] },  
  { en: "Samara",
     ru: "Самара",
      key: "samara",
       description: 'Город-курорт: жилье у самой длинной набережной Европы и современные ЖК с инфраструктурой',
        link: '/samara',
         img: '/images/cities/samara.jpg',
         districts: ["Октябрьский", "Ленинский", "Советский", "Кировский", "Самарский"] },  
  { en: "Rostov-on-Don",
     ru: "Ростов-на-Дону",
      key: "rostov-on-don",
      description: 'Южная столица: дома в стиле классицизма и новостройки с видом на Дон', 
      link: '/rostov-on-don', 
      img: '/images/cities/rostov.jpg',
      districts: ["Ленинский", "Первомайский", "Пролетарский", "Ворошиловский", "Октябрьский"],
    },  
  { 
    en: "Chelyabinsk",
    ru: "Челябинск", 
    key: "chelyabinsk",
    description: 'Опорный край Урала: квартиры с панорамными окнами и коттеджи у лесных массивов',
    link: '/chelyabinsk',
    img: '/images/cities/chelyabinsk.jpg',
    districts: ["Центральный", "Тракторозаводский", "Калининский", "Советский", "Ленинский"] },  
  { 
    en: "Omsk",
    ru: "Омск",
    key: "omsk",
    description: 'Сибирская классика: старинные особняки и современные комплексы у Иртыша',
    link: '/omsk',
    img: '/images/cities/omsk.jpg',
    districts: ["Центральный", "Ленинский", "Советский", "Октябрьский", "Кировский"]
    },  
  {  
    en: "Ufa",
    ru: "Уфа",
    key: "ufa",
    description: 'Город у слияния рек: жилье в экологически чистых районах с парками и набережными',
    link: '/ufa',
    img: '/images/cities/Ufa.jpg',
    districts: ["Ленинский", "Советский", "Кировский", "Калининский", "Орджоникидзевский"]
  },  
  { en: "Krasnoyarsk",
    ru: "Красноярск",
    key: "krasnoyarsk",
    description: 'Ворота Саян: апартаменты с видом на Енисей и эко-комплексы у заповедника «Столбы»',
    link: '/krasnoyarsk',
    img: '/images/cities/krasnoyarsk.jpg',
    districts: ["Свердловский", "Железнодорожный", "Октябрьский", "Ленинский", "Центральный"]
  },  
  { 
    en: "Voronezh",
    ru: "Воронеж",
    key: "voronezh",
    description: 'Колыбель флота: реконструированные сталинки и современные ЖК у Воронежского водохранилища',
    link: '/voronezh',
    img: '/images/cities/voronezh.jpg',
    districts: ["Ленинский", "Советский", "Центральный", "Коминтерновский", "Железнодорожный"] },  
  { 
    en: "Perm",
    ru: "Пермь",
    key: "perm",
    description: 'Город на Каме: лофты в индустриальном стиле и жилье с видом на Уральские предгорья',
    link: '/perm',
    img: '/images/cities/perm.jpg',
    districts: ["Дзержинский", "Мотовилихинский", "Ленинский", "Индустриальный", "Орджоникидзевский"] },  
  { 
    en: "Volgograd",
    ru: "Волгоград",
    key: "volgograd",
    description: 'Город-герой: квартиры с панорамой Волги и новостройки у Мамаева кургана',
    link: '/volgograd',
    img: '/images/cities/volgograd.jpg',
    districts: ["Центральный", "Дзержинский", "Краснооктябрьский", "Советский", "Ворошиловский"]
   },  
  { 
    en: "Tyumen",
    ru: "Тюмень",
    key: "tyumen",
    description: 'Нефтяная столица: элитные комплексы с СПА-зонами и уютные дома в историческом центре',
    link: '/tyumen',
    img: '/images/cities/tyumen.jpg',
    districts: ["Центральный", "Ленинский", "Калининский", "Восточный", "Заречный"] },  
];  

export const notifications = [
    {
      id: 2,
      apartment: "Апартаменты №456",
      message: "Запрос на обслуживание: Протечка кухонной раковины",
      date: "2023-10-14T09:15:00Z",
      read: true
    },
    {
      id: 3,
      apartment: "Апартаменты №789",
      message: "Получена оплата за аренду в октябре",
      date: "2023-10-13T16:45:00Z",
      read: true
    }
]