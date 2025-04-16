import { Leaf, Heart, Shield, Users, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'About Us - Waggele Clothing Store',
  description: 'Discover the story behind Waggele, your go-to destination for stylish and sustainable clothing. Learn about our mission, values, and commitment to quality.',
  keywords: 'about Waggele, Waggele story, sustainable clothing, fashion brand, Waggele mission',
  openGraph: {
    title: 'About Us - Waggele Clothing Store',
    description: 'Discover the story behind Waggele, your go-to destination for stylish and sustainable clothing.',
    images: [
      {
        url: '/images/about-us.jpg',
        width: 1200,
        height: 630,
        alt: 'Waggele Team',
      },
    ],
  },
};

export default function AboutUs() {
  return (
    <div className="container mt-20 mx-auto p-8 bg-background-light rounded-lg shadow-md">
      
      {/* Headline */}
      <h1 className="text-4xl font-bold text-center mb-8 text-textColor-dark">
        About <span className="text-primary-default">Waggele</span>
      </h1>

      {/* Introduction */}
      <section className="mb-12 text-center">
        <p className="text-lg text-textColor-muted max-w-2xl mx-auto">
          Welcome to <strong className="text-primary-default">Waggele</strong>, your go-to destination for stylish, sustainable, and high-quality clothing. 
          We believe that fashion should not only look good but also do good for the planet.
        </p>
      </section>

      {/* Our Story */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-textColor-dark flex items-center justify-center">
          <Leaf className="w-6 h-6 mr-2 text-primary-default" /> Our Story
        </h2>
        <p className="text-textColor-muted text-center max-w-2xl mx-auto">
          Founded in 2023, Waggele was born out of a passion for fashion and a commitment to sustainability. 
          Our journey began with a simple idea: to create clothing that is both trendy and eco-friendly. 
          Today, we are proud to offer a wide range of products that cater to every style while minimizing our environmental impact.
        </p>
      </section>

      {/* Our Values */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-textColor-dark flex items-center justify-center">
          <Heart className="w-6 h-6 mr-2 text-primary-default" /> Our Values
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: <Leaf className="w-8 h-8 mx-auto text-primary-default" />, title: "Sustainability", text: "We use eco-friendly materials and ethical production practices." },
            { icon: <Shield className="w-8 h-8 mx-auto text-primary-default" />, title: "Quality", text: "Every piece is crafted with care to ensure durability and comfort." },
            { icon: <Users className="w-8 h-8 mx-auto text-primary-default" />, title: "Inclusivity", text: "Our collections are designed for everyone, regardless of age, size, or gender." },
            { icon: <Heart className="w-8 h-8 mx-auto text-primary-default" />, title: "Innovation", text: "We constantly explore new ways to reduce waste and improve our processes." },
          ].map((value, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-all duration-300">
              {value.icon}
              <h3 className="text-xl font-bold mb-2 text-textColor-dark">{value.title}</h3>
              <p className="text-textColor-muted">{value.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Meet the Team */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-textColor-dark flex items-center justify-center">
          <Users className="w-6 h-6 mr-2 text-primary-default" /> Meet the Team
        </h2>
        <p className="text-textColor-muted text-center max-w-2xl mx-auto">
          Behind Waggele is a team of passionate individuals who are dedicated to making a difference. 
          From designers to customer service representatives, we work together to bring you the best shopping experience.
        </p>
      </section>

      {/* Call-to-Action */}
      <section className="text-center">
        <h2 className="text-2xl font-bold mb-6 text-textColor-dark flex items-center justify-center">
          <ShoppingBag className="w-6 h-6 mr-2 text-primary-default" /> Join the Waggele Family
        </h2>
        <p className="text-textColor-muted mb-6 max-w-2xl mx-auto">
          Explore our collections and discover the perfect pieces for your wardrobe. Together, we can make fashion sustainable.
        </p>
        <Link
          href="/products"
          className="bg-primary-default text-white px-6 py-3 rounded-lg hover:bg-primary-hover transition-all duration-300 inline-flex items-center shadow-md"
        >
          <ShoppingBag className="w-5 h-5 mr-2" /> Shop Now
        </Link>
      </section>
    </div>
  );
}
