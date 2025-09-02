import { Poppins } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import SocialLinks from "@/components/component/social-links/SocialLinks";
import { AuthProvider } from "../../context/AuthContext";
import { ApartmentProvider } from "../../context/ApartmentContext";
import "./globals.css";
import { ScrollToTopButton } from "../components/component/handle-event-loading/HandleEvents";
import Navbar from "@/layout/header/NavBar";
import Footer from "@/layout/footer/Footer";
import CookieConsent from "@/components/component/coockies/CookieConsent";
import NextTopLoader from "nextjs-toploader";
const roboto = Poppins({
  subsets: ["latin"],
  weight: ["400", "500"],
  preload: true,
});

export const metadata = {
  title: "KVKEY — аренда квартир и домов по всей России",
  description:
    "Ищете квартиру или коттедж для краткосрочной аренды? KVKEY — ваша доска объявлений по всей России. Комфортное жильё на любой срок.",
  keywords: [
    "аренда квартир",
    "аренда коттеджей",
    "жильё посуточно",
    "аренда недвижимости",
    "KVKEY",
    "аренда в России",
    "найти квартиру",
    "снять дом",
  ],
  metadataBase: new URL("https://kvkey.ru"),
  openGraph: {
    title: "KVKEY — ключ в один клик",
    description:
      "Поиск и бронирование посуточного жилья по всей России. Квартиры, дома, коттеджи — легко, быстро, надёжно.",
    url: "https://kvkey.ru",
    siteName: "KVKEY",
    type: "website",
    locale: "ru_RU",
    images: [
      {
        url: "/public/hero/hero.jpg",
        width: 1200,
        height: 630,
        alt: "KVKEY — аренда квартир и домов по всей России",
      },
    ],
  },
  // twitter: {
  //   card: 'summary_large_image',
  //   site: '@kvkey_rus',
  //   title: 'KVKEY — аренда жилья по всей России',
  //   description: 'Арендуйте квартиры, коттеджи и дома с KVKEY — быстро, удобно, безопасно.',
  //   images: ['/og-cover.jpg'],
  // },
  robots: "index, follow",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <NextTopLoader
          color="#2E4C6D"
          crawlSpeed={200}
          height={4}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 20px 7px #A5672E, 0 0 5px black"
          template='<div class="bar" role="bar"><div class="peg"></div></div> 
        <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
          zIndex={1600}
          showAtBottom={false}
        />
        <AuthProvider>
          <ApartmentProvider>
            <Navbar />
            <main>
              {children}
              <CookieConsent />
              <ScrollToTopButton />
            </main>
            {/* <SocialLinks/> */}
            <Footer />
          </ApartmentProvider>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
