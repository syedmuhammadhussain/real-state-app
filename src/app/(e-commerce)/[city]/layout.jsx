

export const metadata = {
  title: "E-Commerce - Clothes Store",
  description: "Browse our product catalog.",
};

export default function CommerceLayout({ children }) {
  return (
      <div className="mx-auto mt-10 py-6">
          <main>
            {children}
          </main>
      </div>
  );
}
