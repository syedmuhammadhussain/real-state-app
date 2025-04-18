export const formatCurrency = (number) => {
  const CURRENCY_FORMATTER = new Intl.NumberFormat('en-US', {
    currency: 'USD',
    style: 'currency',
  });
  return CURRENCY_FORMATTER.format(number);
};

export const categories = [ 'products',  'Hoodies', 'Shirts', 'Jeans' ,'Trendy' , 'Arrival' ];

// hero section data 
export const slides = [
  {
    image: "/images/hero/hero.jpg",
    title: "Идеальная квартира вашей мечты",
    subtitle: "Просторные планировки — престижные районы — привлекательные цены", 
  },
  {
    image: "/images/hero/hero2.jpg",
    title: "Элитная недвижимость в центре города",
    subtitle: "Современные небоскребы с завораживающими видами на город", 
  },
  {
    image: "/images/hero/hero3.jpg",
    title: "Уютные дома для вашей семьи",
    subtitle: "Безопасные районы и благоустроенные территории для детей", 
  },
];

export  const links = [
  { name: 'About', link: '/about' },
  { name: 'Contact', link: '/contact' },
  // { name: 'Support', link: '/support' },
  { name: 'Premium', link: '/premium' },
];

export const subLinks = ['Shirts', 'Jeans', 'Hoodies',   'Trendy' , 'Arrival'];

export const cityOptions = [  
  { en: "Moscow",
    ru: "Москва",
    key: "moscow",
    description: 'Сердце России: элитная недвижимость у Кремля и престижные новостройки с видом на парки',
    link: '/city=moscow',
    img: '/images/cities/moscow.jpg',
    districts: ["Тверской", "Арбат", "Пресненский", "Хамовники", "Замоскворечье"]
  },  
  { en: "Saint Petersburg",
    ru: "Санкт-Петербург",
    key: "saint-petersburg",
    description: 'Северная Венеция: апартаменты с видом на Неву и исторические дворцы в центре города',
    link: '/city=saint-petersburg',
    img: '/images/cities/saint-petersburg.jpg',
    districts: ["Адмиралтейский", "Центральный", "Василеостровский", "Петроградский", "Московский"]
  },  
  { en: "Novosibirsk",
    ru: "Новосибирск",
    key: "novosibirsk",
    description: 'Столица Сибири: современные ЖК у Обского моря и уютные дома в зеленых районах',
    link: '/city=novosibirsk',
    img: '/images/cities/novosibirsk.jpg',
    districts: ["Ленинский", "Октябрьский", "Заельцовский", "Калининский", "Центральный"] 
    },  
    { 
      en: "Yekaterinburg",
      ru: "Екатеринбург",
      key: "yekaterinburg",
      description: 'Город на границе Европы и Азии: лофты в стиле хай-тек и виды на Уральские горы',
      link: '/city=yekaterinburg',
      img: '/images/cities/yekaterinburg.jpg',
      districts: ["Верх-Исетский", "Чкаловский", "Орджоникидзевский", "Кировский", "Ленинский"]
     },  
  { en: "Kazan",
     ru: "Казань",
      key: "kazan",
       description: 'Слияние культур: квартиры с видом на Казанский Кремль и таунхаусы у озера Кабан',
        link: '/city=kazan',
         img: '/images/cities/kazan.jpg',
         districts: ["Вахитовский", "Московский", "Приволжский", "Советский", "Ново-Савиновский"] },  
  { en: "Nizhny Novgorod",
     ru: "Нижний Новгород",
      key: "nizhny-novgorod",
       description: 'Жемчужина Волги: апартаменты в историческом центре и новостройки с панорамой реки',
        link: '/city=nizhny-novgorod',
         img: '/images/cities/nizhny-novgorod.jpg',
         districts: ["Сормовский", "Ленинский", "Автозаводский", "Канавинский", "Советский"] },  
  { en: "Samara",
     ru: "Самара",
      key: "samara",
       description: 'Город-курорт: жилье у самой длинной набережной Европы и современные ЖК с инфраструктурой',
        link: '/city=samara',
         img: '/images/cities/samara.jpg',
         districts: ["Октябрьский", "Ленинский", "Советский", "Кировский", "Самарский"] },  
  { en: "Rostov-on-Don",
     ru: "Ростов-на-Дону",
      key: "rostov-on-don",
      description: 'Южная столица: дома в стиле классицизма и новостройки с видом на Дон', 
      link: '/city=rostov-on-don', 
      img: '/images/cities/rostov.jpg',
      districts: ["Ленинский", "Первомайский", "Пролетарский", "Ворошиловский", "Октябрьский"],
    },  
  { 
    en: "Chelyabinsk",
    ru: "Челябинск", 
    key: "chelyabinsk",
    description: 'Опорный край Урала: квартиры с панорамными окнами и коттеджи у лесных массивов',
    link: '/city=chelyabinsk',
    img: '/images/cities/chelyabinsk.jpg',
    districts: ["Центральный", "Тракторозаводский", "Калининский", "Советский", "Ленинский"] },  
  { 
    en: "Omsk",
    ru: "Омск",
    key: "omsk",
    description: 'Сибирская классика: старинные особняки и современные комплексы у Иртыша',
    link: '/city=omsk',
    img: '/images/cities/omsk.jpg',
    districts: ["Центральный", "Ленинский", "Советский", "Октябрьский", "Кировский"]
    },  
  {  
    en: "Ufa",
    ru: "Уфа",
    key: "ufa",
    description: 'Город у слияния рек: жилье в экологически чистых районах с парками и набережными',
    link: '/city=ufa',
    img: '/images/cities/Ufa.jpg',
    districts: ["Ленинский", "Советский", "Кировский", "Калининский", "Орджоникидзевский"]
  },  
  { en: "Krasnoyarsk",
    ru: "Красноярск",
    key: "krasnoyarsk",
    description: 'Ворота Саян: апартаменты с видом на Енисей и эко-комплексы у заповедника «Столбы»',
    link: '/city=krasnoyarsk',
    img: '/images/cities/krasnoyarsk.jpg',
    districts: ["Свердловский", "Железнодорожный", "Октябрьский", "Ленинский", "Центральный"]
  },  
  { 
    en: "Voronezh",
    ru: "Воронеж",
    key: "voronezh",
    description: 'Колыбель флота: реконструированные сталинки и современные ЖК у Воронежского водохранилища',
    link: '/city=voronezh',
    img: '/images/cities/voronezh.jpg',
    districts: ["Ленинский", "Советский", "Центральный", "Коминтерновский", "Железнодорожный"] },  
  { 
    en: "Perm",
    ru: "Пермь",
    key: "perm",
    description: 'Город на Каме: лофты в индустриальном стиле и жилье с видом на Уральские предгорья',
    link: '/city=perm',
    img: '/images/cities/perm.jpg',
    districts: ["Дзержинский", "Мотовилихинский", "Ленинский", "Индустриальный", "Орджоникидзевский"] },  
  { 
    en: "Volgograd",
    ru: "Волгоград",
    key: "volgograd",
    description: 'Город-герой: квартиры с панорамой Волги и новостройки у Мамаева кургана',
    link: '/city=volgograd',
    img: '/images/cities/volgograd.jpg',
    districts: ["Центральный", "Дзержинский", "Краснооктябрьский", "Советский", "Ворошиловский"]
   },  
  { 
    en: "Tyumen",
    ru: "Тюмень",
    key: "tyumen",
    description: 'Нефтяная столица: элитные комплексы с СПА-зонами и уютные дома в историческом центре',
    link: '/city=tyumen',
    img: '/images/cities/tyumen.jpg',
    districts: ["Центральный", "Ленинский", "Калининский", "Восточный", "Заречный"] },  
];  

// export const products = Array.from({ length: 20 }, (_, i) => ({
//   id: 100 + i,
//   title: [
//     "Modern Studio in City Center",
//     "Luxury 3-Bedroom Penthouse",
//     "Cozy 1-Room Apartment Near Park",
//     "Family-Friendly 4-Room Flat",
//     "Business-Class 2-Room Apartment",
//     "Charming Loft-Style Apartment",
//     "New Renovated 3-Room Flat",
//     "Premium Studio with Panoramic Views",
//     "Comfortable 2-Level Duplex",
//     "Historic District 1-Room Apartment"
//   ][i],
//   descriptionShort: [
//     "Perfect for solo travelers or couples, fully equipped with modern amenities",
//     "Spacious luxury accommodation with premium finishes and city views",
//     "Quiet location ideal for long stays with green park nearby",
//     "Great for large families with children, playground in courtyard",
//     "Ideal for business travelers with fast internet and workspace",
//     "Unique industrial-chic design with exposed brick walls",
//     "Fresh renovation with smart home technology",
//     "High-floor apartment with floor-to-ceiling windows",
//     "Two-level living space with private terrace",
//     "Character apartment in heritage building"
//   ][i],
  
//   checkInConditions: {
//     documents: i % 2 ? "Passport required" : "Digital registration available",
//     checkOutTime: i < 5 ? "11:00" : "12:00",
//     partiesAllowed: i === 3,
//     roundTheClockCheckIn: i % 3 === 0,
//     petsAllowed: i > 7,
//     smokingAllowed: false,
//     prepaymentRequired: i % 4 === 0
//   },

//   apartmentParameters: {
//     apartmentType: ["Studio", "1-room", "2-room", "3-room", "Penthouse"][i % 5],
//     maxGuests: [2, 4, 3, 6, 2, 4, 5, 2, 6, 3][i],
//     singleBeds: [1, 0, 1, 2, 1, 0, 1, 1, 2, 1][i],
//     doubleBeds: [1, 2, 1, 2, 1, 2, 2, 1, 2, 1][i],
//     floorAndTotalFloors: `${i + 2}/${[5, 9, 12, 25, 3, 7, 16, 24, 2, 6][i]}`,
//     area: {
//       total: [35, 85, 42, 110, 45, 55, 75, 40, 90, 38][i],
//       living: [20, 35, 25, 45, 22, 30, 40, 18, 50, 20][i],
//       kitchen: [15, 20, 17, 25, 13, 25, 15, 12, 20, 18][i]
//     },
//     bathroom: i % 2 ? "Combined" : "Separate",
//     buildingType: ["Monolithic", "Brick", "Panel", "Stalin-era", "Modern"][i % 5],
//     windowView: ["Street", "Courtyard", "Park", "City view", "River view"][i % 5],
//     renovation: ["Euro-style", "Modern", "Soviet-era", "Designer", "Luxury"][i % 5],
//     balconyType: i % 3 ? "None" : ["French", "Standard", "Loggia"][i % 3],
//     parkingAvailable: i > 2,
//     parkingType: ["Underground", "Guarded", "Street", "None"][i % 4]
//   },

//   // Удобства
//   amenities: [
//     ["Wi-Fi", "Smart TV", "Air conditioning", "Washing machine"],
//     ["Wi-Fi", "Cable TV", "Dishwasher", "Dryer"],
//     ["Wi-Fi", "Smart TV", "Microwave", "Coffee maker"],
//     ["Wi-Fi", "Game console", "Baby cot", "High chair"],
//     ["Wi-Fi", "Office desk", "Printer", "Scanner"],
//     ["Wi-Fi", "Sound system", "Record player", "Art collection"],
//     ["Wi-Fi", "Smart home system", "Robot vacuum", "Mood lighting"],
//     ["Wi-Fi", "Home theater", "Jacuzzi", "Sauna"],
//     ["Wi-Fi", "BBQ equipment", "Outdoor furniture", "Fire pit"],
//     ["Wi-Fi", "Vintage furniture", "Library", "Fireplace"]
//   ][i],

//   // Описание дома
//   houseDescription: [
//     ["Elevator", "Security", "Playground", "Fitness center"],
//     ["Concierge", "Underground parking", "Pool", "Spa"],
//     ["24/7 security", "Package room", "Bike storage"],
//     ["Green courtyard", "Pet area", "BBQ zone"],
//     ["Business center", "Conference rooms", "Dry cleaning"],
//     ["Art installations", "Roof terrace", "Co-working space"],
//     ["Electric car charging", "Recycling system", "Smart locks"],
//     ["Wine cellar", "Private cinema", "Staff quarters"],
//     ["Vegetable garden", "Compost area", "Rainwater collection"],
//     ["Historical preservation", "Original details", "Museum nearby"]
//   ][i],
//   city: i % 2 === 0 ? "moscow" : "tyumen",

//   mapInfo: {
//     address: [
//       "Lenina 15, Central District",
//       "Sovetskaya 42, Business Quarter",
//       "Parkovaya 8, Green Zone",
//       "Naberezhnaya 3, Riverside",
//       "Promyshlennaya 25, Industrial Area",
//       "Istoricheskaya 7, Old Town",
//       "Novaya 12, New Development",
//       "Vysotnaya 1, Skyscraper District",
//       "Sadovaya 18, Garden Suburb",
//       "Turisticheskaya 5, Hotel Zone"
//     ][i],
//     note: "© Yandex, Terms of Use",
//     approximateDistance: [
//       "300m to metro",
//       "500m to supermarket",
//       "200m to park",
//       "1km to downtown",
//       "50m to bus stop",
//       "700m to museum",
//       "400m to fitness center",
//       "100m to river",
//       "600m to market",
//       "800m to hospital"
//     ][i],
//     district: [
//       "Central", "Business", "Residential", "Historic",
//       "Industrial", "Tourist", "New Development", 
//       "Riverside", "Suburban", "Mixed-use"
//     ][i]
//   },

//   kitchen: [
//     ["Induction stove", "Oven", "Dishwasher", "Coffee machine"],
//     ["Gas stove", "Microwave", "Electric kettle", "Toaster"],
//     ["Mini-kitchen", "Combination oven", "Single burner"],
//     ["Full kitchen", "Pantry", "Wine cooler"],
//     ["Compact kitchen", "Nespresso machine", "Bar setup"],
//     ["Open kitchen", "Pizza oven", "Espresso maker"],
//     ["Smart kitchen", "Voice-controlled appliances"],
//     ["Chef's kitchen", "Professional equipment"],
//     ["Outdoor kitchen", "BBQ grill", "Smoker"],
//     ["Vintage kitchen", "Retro appliances"]
//   ][i],

//   infrastructure: [
//     ["Supermarket", "Pharmacy", "Cafe", "ATM"],
//     ["Mall", "Cinema", "Restaurants", "Fitness club"],
//     ["Park", "Playground", "Bike paths", "Library"],
//     ["School", "Kindergarten", "Clinic", "Post office"],
//     ["Business center", "Coworking", "Print shop"],
//     ["Museum", "Gallery", "Theater", "Antique shops"],
//     ["Yoga studio", "Organic market", "Juice bar"],
//     ["Luxury boutiques", "Fine dining", "Spa"],
//     ["Farmers market", "Craft stores", "Public garden"],
//     ["Tourist info", "Souvenir shops", "Guided tours"]
//   ][i],

//   images: Array.from({ length: 5 }, (_, imgIndex) => ({
//     filename: `apt${100 + i}_img${imgIndex + 1}.jpg`,
//     caption: [
//       ["Living room", "Bedroom", "Kitchen", "Bathroom", "View"],
//       ["Main area", "Master suite", "Dining", "Balcony", "Building"],
//       ["Entrance", "Workspace", "Storage", "Details", "Neighborhood"],
//       ["Daylight", "Night view", "Layout", "Amenities", "Map"],
//       ["Exterior", "Lobby", "Facilities", "Parking", "Security"]
//     ][i % 5][imgIndex],
//     url: `/images/apt${100 + i}/image$/{imgIndex + 1}.jpg`
//   }))
// }));


export const products = Array.from({ length: 20 }, (_, i) => ({
  id: 100 + i,
  title: [
    "Современная студия в центре города",
    "Роскошный пентхаус с 3 спальнями",
    "Уютная однокомнатная квартира рядом с парком",
    "4-комнатная квартира для семьи",
    "2-комнатная квартира бизнес-класса",
    "Очаровательная квартира в стиле лофт",
    "Обновленная 3-комнатная квартира",
    "Премиум-студия с панорамным видом",
    "Уютный двухуровневый дуплекс",
    "Однокомнатная квартира в историческом районе"
  ][i],

  descriptionShort: [
    "Идеально для одиночных путешественников или пар, полностью оснащена современными удобствами",
    "Просторное роскошное жилье с премиальной отделкой и видом на город",
    "Тихое место, идеально для длительного проживания, рядом зеленый парк",
    "Отлично подходит для больших семей с детьми, во дворе есть детская площадка",
    "Идеально для деловых поездок: быстрый интернет и рабочая зона",
    "Уникальный индустриально-шикарный дизайн с открытой кирпичной кладкой",
    "Свежий ремонт с технологией умного дома",
    "Квартира на высоком этаже с панорамными окнами в пол",
    "Двухуровневое жилое пространство с частной террасой",
    "Квартира с особым характером в историческом здании"
  ][i],

  checkInConditions: {
    documents: i % 2 ? "Требуется паспорт" : "Доступна цифровая регистрация",
    checkOutTime: i < 5 ? "11:00" : "12:00",
    partiesAllowed: i === 3,
    roundTheClockCheckIn: i % 3 === 0,
    petsAllowed: i > 7,
    smokingAllowed: false,
    prepaymentRequired: i % 4 === 0
  },

  apartmentParameters: {
    apartmentType: ["Студия", "1-комнатная", "2-комнатная", "3-комнатная", "Пентхаус"][i % 5],
    maxGuests: [2, 4, 3, 6, 2, 4, 5, 2, 6, 3][i],
    singleBeds: [1, 0, 1, 2, 1, 0, 1, 1, 2, 1][i],
    doubleBeds: [1, 2, 1, 2, 1, 2, 2, 1, 2, 1][i],
    floorAndTotalFloors: `${i + 2}/${[5, 9, 12, 25, 3, 7, 16, 24, 2, 6][i]}`,
    area: {
      total: [35, 85, 42, 110, 45, 55, 75, 40, 90, 38][i],
      living: [20, 35, 25, 45, 22, 30, 40, 18, 50, 20][i],
      kitchen: [15, 20, 17, 25, 13, 25, 15, 12, 20, 18][i]
    },
    bathroom: i % 2 ? "Совмещенный" : "Раздельный",
    buildingType: ["Монолитный", "Кирпичный", "Панельный", "Сталинка", "Современный"][i % 5],
    windowView: ["Вид на улицу", "Вид во двор", "Вид на парк", "Вид на город", "Вид на реку"][i % 5],
    renovation: ["Евроремонт", "Современный", "Советский", "Дизайнерский", "Люкс"][i % 5],
    balconyType: i % 3 ? "Нет" : ["Французский", "Стандартный", "Лоджия"][i % 3],
    parkingAvailable: i > 2,
    parkingType: ["Подземная", "Охраняемая", "Уличная", "Нет"][i % 4]
  },

  amenities: [
    ["Wi-Fi", "Смарт-ТВ", "Кондиционер", "Стиральная машина"],
    ["Wi-Fi", "Кабельное ТВ", "Посудомоечная машина", "Сушилка"],
    ["Wi-Fi", "Смарт-ТВ", "Микроволновка", "Кофеварка"],
    ["Wi-Fi", "Игровая приставка", "Детская кроватка", "Высокий стул"],
    ["Wi-Fi", "Рабочий стол", "Принтер", "Сканер"],
    ["Wi-Fi", "Аудиосистема", "Проигрыватель пластинок", "Арт-коллекция"],
    ["Wi-Fi", "Умный дом", "Робот-пылесос", "Светомузыка"],
    ["Wi-Fi", "Домашний кинотеатр", "Джакузи", "Сауна"],
    ["Wi-Fi", "Оборудование для барбекю", "Уличная мебель", "Место для костра"],
    ["Wi-Fi", "Винтажная мебель", "Библиотека", "Камин"]
  ][i],

  houseDescription: [
    ["Лифт", "Охрана", "Детская площадка", "Фитнес-центр"],
    ["Консьерж", "Подземная парковка", "Бассейн", "Спа"],
    ["Круглосуточная охрана", "Комната для посылок", "Хранилище велосипедов"],
    ["Зеленый двор", "Зона для питомцев", "Зона барбекю"],
    ["Бизнес-центр", "Конференц-залы", "Химчистка"],
    ["Арт-инсталляции", "Терраса на крыше", "Коворкинг"],
    ["Зарядка для электромобилей", "Система переработки отходов", "Умные замки"],
    ["Винный погреб", "Частный кинотеатр", "Помещения для персонала"],
    ["Овощной сад", "Зона компоста", "Сбор дождевой воды"],
    ["Историческая сохранность", "Оригинальные детали", "Музей поблизости"]
  ][i],

  city: i % 2 === 0 ? "moscow" : "tyumen",
  
  mapInfo: {
    address: [
      "ул. Ленина 15, Центральный район",
      "ул. Советская 42, Деловой квартал",
      "ул. Парковая 8, Зелёная зона",
      "ул. Набережная 3, Набережный район",
      "ул. Промышленная 25, Промышленный район",
      "ул. Историческая 7, Старый город",
      "ул. Новая 12, Новый район",
      "ул. Высотная 1, Район небоскрёбов",
      "ул. Садовая 18, Садовый пригород",
      "ул. Туристическая 5, Гостиничная зона"
    ][i],
    note: "© Яндекс, Условия использования",
    approximateDistance: [
      "300 м до метро",
      "500 м до супермаркета",
      "200 м до парка",
      "1 км до центра",
      "50 м до автобусной остановки",
      "700 м до музея",
      "400 м до фитнес-центра",
      "100 м до реки",
      "600 м до рынка",
      "800 м до больницы"
    ][i],
    district: [
      "Центральный",
      "Деловой",
      "Жилой",
      "Исторический",
      "Промышленный",
      "Туристический",
      "Новостройка",
      "Набережный",
      "Пригородный",
      "Смешанный"
    ][i]
  },

  kitchen: [
    ["Индукционная плита", "Духовка", "Посудомоечная машина", "Кофемашина"],
    ["Газовая плита", "Микроволновка", "Электрический чайник", "Тостер"],
    ["Мини-кухня", "Комбинированная печь", "Одна конфорка"],
    ["Полноценная кухня", "Кладовая", "Винный шкаф"],
    ["Компактная кухня", "Кофемашина Nespresso", "Барная стойка"],
    ["Открытая кухня", "Печь для пиццы", "Кофеварка эспрессо"],
    ["Умная кухня", "Управляемая голосом техника"],
    ["Кухня шеф-повара", "Профессиональное оборудование"],
    ["Кухня на открытом воздухе", "Гриль", "Коптильня"],
    ["Винтажная кухня", "Ретро-техника"]
  ][i],

  infrastructure: [
    ["Супермаркет", "Аптека", "Кафе", "Банкомат"],
    ["Торговый центр", "Кинотеатр", "Рестораны", "Фитнес-клуб"],
    ["Парк", "Детская площадка", "Велодорожки", "Библиотека"],
    ["Школа", "Детский сад", "Поликлиника", "Почта"],
    ["Бизнес-центр", "Коворкинг", "Типография"],
    ["Музей", "Галерея", "Театр", "Антикварные лавки"],
    ["Йога-студия", "Эко-рынок", "Смузи-бар"],
    ["Бутики класса люкс", "Ресторан высокой кухни", "Спа"],
    ["Фермерский рынок", "Ремесленные магазины", "Общественный сад"],
    ["Туристический центр", "Сувенирные лавки", "Экскурсии"]
  ][i],

  images: Array.from({ length: 5 }, (_, imgIndex) => ({
    filename: `apt${100 + i}_img${imgIndex + 1}.jpg`,
    caption: [
      ["Гостиная", "Спальня", "Кухня", "Ванная", "Вид"],
      ["Главная зона", "Основная спальня", "Столовая", "Балкон", "Здание"],
      ["Прихожая", "Рабочая зона", "Хранилище", "Детали", "Окрестности"],
      ["Дневной свет", "Ночной вид", "Планировка", "Удобства", "Карта"],
      ["Экстерьер", "Холл", "Инфраструктура", "Парковка", "Охрана"]
    ][i % 5][imgIndex],
    url: `/images/apt${100 + i}/image${imgIndex + 1}.jpg`
  }))
}));
