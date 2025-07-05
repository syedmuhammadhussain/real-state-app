import { Poppins } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import SocialLinks from "@/components/component/social-links/SocialLinks";
import { AuthProvider } from "../../context/AuthContext";
import { ApartmentProvider } from "../../context/ApartmentContext";
import "./globals.css";
import Navbar from "@/layout/header/NavBar";
import Footer from "@/layout/footer/Footer";
import CookieConsent from "@/components/component/coockies/CookieConsent";
import NextTopLoader from 'nextjs-toploader';

const roboto = Poppins({
  subsets: ["latin"],
  weight: ["400", "500"],
  preload: true,
});

export const metadata = {
  title: "x real state ",
  description: "Your one-stop shop for the latest fashion trends.",
};

// // Метаданные для SEO
// export const metadata = {
//   title: 'X Real Estate | Найдите недвижимость мечты',
//   description: 'Ищете квартиру, дом или инвестиционную недвижимость? X Real Estate предлагает лучшие предложения в топовых районах. Покупка, аренда, продажа — всё в одном месте.',
//   keywords: 'недвижимость, купить квартиру, аренда дома, элитная недвижимость, инвестиции в недвижимость, квартиры на продажу, дома в аренду',
//   openGraph: {
//     title: 'X Real Estate | Элитные квартиры, дома и инвестиционные объекты',
//     description: 'Просматривайте актуальные предложения от X Real Estate. Мы подберем идеальную недвижимость для жизни или инвестиций.',
//     images: [
//       {
//         url: '/images/home-og.jpg',
//         width: 1200,
//         height: 630,
//         alt: 'Недвижимость от X Real Estate — квартиры и дома',
//       },
//     ],
//     type: 'website',
//     locale: 'ru_RU',
//     url: 'https://www.xrealestate.com', // Замените на реальный URL
//   },
//   twitter: {
//     card: 'summary_large_image',
//     title: 'X Real Estate | Лучшие предложения недвижимости',
//     description: 'Ищете жильё или объект под инвестиции? Мы предлагаем только проверенные объекты в надёжных районах.',
//     images: ['/images/home-og.jpg'],
//   },
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
      <NextTopLoader color="#3B678C" />
        <AuthProvider>
          <ApartmentProvider>
          <Navbar/>
            <main>
              {children}
              <CookieConsent/>
            </main>
          {/* <SocialLinks/> */}
          <Footer />
          </ApartmentProvider>
        </AuthProvider>
        <Toaster/>
      </body>
    </html>
  );
}
