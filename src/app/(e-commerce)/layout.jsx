
import "../globals.css";
import Sidebar from "./[city]/SlideBar";

export const metadata = {
  title: "E-Commerce - Clothes Store",
  description: "Browse our product catalog.",
};

export default function CommerceLayout({ children }) {
  return (
      <div className="mx-auto mt-10 py-12">
          <main>
            {children}
          </main>
      </div>
  );
}
