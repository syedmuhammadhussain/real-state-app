import Head from 'next/head';
import EmblaCarousel from '@/components/component/product-slider/EmblaCarousel';
import HeroSection from '@/components/component/hero-section/HeroSection';
import Categories from '@/components/component/categories/Categories';
import NextLink from '@/components/ui/NextLink';

// Метаданные для SEO
export const metadata = {
  title: 'X Real Estate | Найдите недвижимость мечты',
  description: 'Ищете квартиру, дом или инвестиционную недвижимость? X Real Estate предлагает лучшие предложения в топовых районах. Покупка, аренда, продажа — всё в одном месте.',
  keywords: 'недвижимость, купить квартиру, аренда дома, элитная недвижимость, инвестиции в недвижимость, квартиры на продажу, дома в аренду',
  openGraph: {
    title: 'X Real Estate | Элитные квартиры, дома и инвестиционные объекты',
    description: 'Просматривайте актуальные предложения от X Real Estate. Мы подберем идеальную недвижимость для жизни или инвестиций.',
    images: [
      {
        url: '/images/home-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Недвижимость от X Real Estate — квартиры и дома',
      },
    ],
    type: 'website',
    locale: 'ru_RU',
    url: 'https://www.xrealestate.com', // Замените на реальный URL
  },
  twitter: {
    card: 'summary_large_image',
    title: 'X Real Estate | Лучшие предложения недвижимости',
    description: 'Ищете жильё или объект под инвестиции? Мы предлагаем только проверенные объекты в надёжных районах.',
    images: ['/images/home-og.jpg'],
  },
};


export default function ProductPage() {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta property="og:description" content={metadata.openGraph.description} />
        <meta property="og:image" content={metadata.openGraph.images[0].url} />
        <meta property="og:image:width" content={metadata.openGraph.images[0].width} />
        <meta property="og:image:height" content={metadata.openGraph.images[0].height} />
        <meta property="og:image:alt" content={metadata.openGraph.images[0].alt} />
      </Head>
        <HeroSection/>
        <Categories/>

        {/* Animated Products Section */}
        {/* <div className="mt-5 p-6">
          <h2 className="text-3xl text-primary-dark mb-6 font-bold text-left">
            Featured Products 
            <span className="text-xl ml-5 text-primary-hover cursor-pointer hover:text-primary-dark underline transition-all delay-100 "> 
            <NextLink href='/products' className='responsive-appbar-button'> all</NextLink> </span>
          </h2> 
        </div> */}
    </>
  );
}