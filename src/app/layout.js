import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/layout/footer/Footer";
import Navbar from "@/layout/header/NavBar";
import SocialLinks from "@/components/component/social-links/SocialLinks";
// import NavigationMenuDemo from "@/components/component/header/NavigationMenuDemo";

const roboto = Poppins({
  subsets: ["latin"],
  weight: ["400", "500"],
  preload: true,
});

export const metadata = {
  title: "Clothes Store",
  description: "Your one-stop shop for the latest fashion trends.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
      {/* <NavigationMenuDemo/> */}
        <Navbar/>
          <main>{children}</main>
        <Toaster/>
        <SocialLinks/>
        <Footer />
      </body>
    </html>
  );
}
