

export const metadata = {
  title: "E-Commerce - Clothes Store",
  description: "Browse our product catalog.",
};

export default function CommerceLayout({ children }) {
  return (
      <div className="">
          <main>
            {children}
          </main>
      </div>
  );
}
