import { Home } from 'lucide-react';
import EmblaCarousel from '../product-slider/EmblaCarousel';
import NextLink from '@/components/ui/NextLink';

export default function RentalSection() {

    const data = [
            {   
                link:'/',
                key:1,
                img: '/images/cities/omsk.jpg',
                ru: 'Аренда жилья посуточно',
                description :' Если вы запланировали путешествие, командировку или поездку к друзьям, просто выберите  напрямую без посредников.',
            },
            { 
                link:'/',
                key:2,
                img:'/images/cities/omsk.jpg',
                ru:'Для путешественников',
                description:' Если вы запланировали путешествие, командировку или поездку к друзьям, просто выберите подходящее предложение и свяжитесь с хозяином! Все квартиры и коттеджи на сайте сдаются  напрямую без посредников.',
                },
            { 
                link:'/',
                key:3,
                img:'/images/cities/omsk.jpg',
                ru:'Для владельце',
                description:'Если вы владелец квартиры или коттеджа, размещайте объявление и получайте заявки на аренду. Мы обеспечиваем простой и удобный процесс публикации вашего предложения.',

            },
            { 
                link:'/',
                key:4,
                img:'/images/cities/omsk.jpg',
                ru:'Для владельце',
                description:'Если вы владелец квартиры или коттеджа, размещайте объявление и получайте заявки на аренду. Мы обеспечиваем простой и удобный процесс публикации вашего предложения.',

            },
            { 
                link:'/',
                key:5,
                img:'/images/cities/omsk.jpg',
                ru:'Для владельце',
                description:'Если вы владелец квартиры или коттеджа, размещайте объявление и получайте заявки на аренду. Мы обеспечиваем простой и удобный процесс публикации вашего предложения.',

            },
        ]
  return (
    <div className="mt-10">
      <div className="">
        {/* Hero Section */}
        <div className="">
          <h1 className="text-2xl lg:text-3xl font-bold text-primary-dark "> Аренда жилья посуточно</h1>
          {/* <p className="">
            Сайт «X-real-state» открывает большие возможности для посуточной аренды жилья в России и других странах. 
            На сегодняшний день каталог сайта содержит более 40 тысяч объявлений от арендодателей.
          </p> */}
        </div>

        <EmblaCarousel categories = {false} slides={data} />

        {/* Features Grid
        <NextLink
           href={'/checkout'}
           className="flex items-center max-h-[47px] justify-center gap-3 px-8 py-4 bg-primary-default hover:bg-primary-dark text-white font-semibold rounded-md shadow-lg shadow-primary-default/20 transition-all transform active:scale-95" >
           <Home className="w-5 h-5" />
           Сдать жильё
        </NextLink> */}

       
      </div>
    </div>
  );
}