import { Home } from 'lucide-react';
import EmblaCarousel from '../product-slider/EmblaCarousel';
import NextLink from '@/components/ui/NextLink';

export default function RentalSection() {

    const data = [
            {   
                link:'/',
                key:1,
                img: '/images/takeRest.jpg',
                ru: 'Аренда жилья посуточно',
                description :' Если вы запланировали путешествие, командировку или поездку к друзьям, просто выберите  напрямую без посредников.',
            },
            { 
                link:'/',
                key:2,
                img:'/images/trveller.jpg',
                ru:'Для путешественников',
                description:' Если вы запланировали путешествие, командировку или поездку к друзьям, просто выберите подходящее предложение и свяжитесь с хозяином! Все квартиры и коттеджи на сайте сдаются  напрямую без посредников.',
                },
            { 
                link:'/',
                key:3,
                img:'/images/owner.jpg',
                ru:'Для владельце',
                description:'Если вы владелец квартиры или коттеджа, размещайте объявление и получайте заявки на аренду. Мы обеспечиваем простой и удобный процесс публикации вашего предложения.',

            },
            {
              key: 4,
              link: '/',
              img: '/images/party.jpg', // <-- Make sure this image exists!
              ru: 'Для вечеринок и отдыха',
              description:
                'Ищете место для праздника, встречи с друзьями или отдыха на выходных? У нас вы найдёте идеальные варианты посуточной аренды!',
            },
   
        ]
  return (
    <div className="mt-10">
      <div className="">
        {/* Hero Section */}
        <div className="">
          <h1 className="text-2xl lg:text-3xl font-bold text-primary-dark "> Аренда жилья посуточно</h1>
        </div>
        <EmblaCarousel categories = {false} slides={data} />

      </div>
    </div>
  );
}