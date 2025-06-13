import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/layout/footer/Footer";
import Navbar from "@/layout/header/NavBar";
import SocialLinks from "@/components/component/social-links/SocialLinks";
import { AuthProvider } from "../../context/AuthContext";
import { ApartmentProvider } from "../../context/ApartmentContext";

const roboto = Poppins({
  subsets: ["latin"],
  weight: ["400", "500"],
  preload: true,
});

export const metadata = {
  title: "x real state ",
  description: "Your one-stop shop for the latest fashion trends.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
      <Toaster/>
        <AuthProvider>
          <ApartmentProvider>
          
          <Navbar/>
            <main>{children}</main>
          <SocialLinks/>
          <Footer />
          </ApartmentProvider>
        </AuthProvider>

      </body>
    </html>
  );
}
