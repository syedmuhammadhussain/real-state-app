

export const metadata = {
  title: "E-Commerce - Clothes Store",
  description: "Browse our product catalog.",
};

export default function CommerceLayout({ children }) {
  return (
      <div className="mx-auto ">
          <main>
            {children}
          </main>
      </div>
  );
}
