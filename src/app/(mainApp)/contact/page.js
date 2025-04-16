import { Mail, Truck, RefreshCw, Phone, MapPin, Send } from 'lucide-react';

export const metadata = {
  title: 'Contact Us - Waggele Clothing Store',
  description: 'Get in touch with Waggele for support, order tracking, refunds, and more. We’re here to help you with any questions or concerns.',
  keywords: 'contact Waggele, Waggele support, order tracking, refund policy, customer service',
  openGraph: {
    title: 'Contact Us - Waggele Clothing Store',
    description: 'Get in touch with Waggele for support, order tracking, refunds, and more. We’re here to help you with any questions or concerns.',
    images: [
      {
        url: '/images/contact-us.jpg',
        width: 1200,
        height: 630,
        alt: 'Waggele Contact Us',
      },
    ],
  },
};

export default function ContactUs() {
  return (
    <div className="container mt-20 mx-auto p-8 bg-background-light rounded-lg shadow-md">
      
      {/* Headline */}
      <h1 className="text-4xl font-bold text-center mb-8 text-textColor-dark">
        Contact <span className="text-primary-default">Waggele</span>
      </h1>

      {/* Introduction */}
      <section className="mb-12 text-center">
        <p className="text-lg text-textColor-muted max-w-2xl mx-auto">
          Need assistance? Our team is here for you! Whether it’s **support**, **order tracking**, or **refunds**, reach out to us via email, phone, or visit our store.
        </p>
      </section>

      {/* Contact Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {[
          { icon: <Mail className="w-8 h-8 mx-auto text-primary-default" />, title: "Support", text: "Need help? Our support team is here for you.", email: "support@waggele.com" },
          { icon: <Truck className="w-8 h-8 mx-auto text-primary-default" />, title: "Order Tracking", text: "Check your order status anytime.", email: "tracking@waggele.com" },
          { icon: <RefreshCw className="w-8 h-8 mx-auto text-primary-default" />, title: "Refunds", text: "Need a refund? We’ve got you covered.", email: "refunds@waggele.com" },
        ].map((item, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-all duration-300">
            {item.icon}
            <h3 className="text-xl font-bold mb-2 text-textColor-dark">{item.title}</h3>
            <p className="text-textColor-muted mb-4">{item.text}</p>
            <a
              href={`mailto:${item.email}`}
              className="text-primary-default hover:text-primary-hover transition-all duration-300"
            >
              {item.email}
            </a>
          </div>
        ))}
      </div>

      {/* Contact Form */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-textColor-dark flex items-center justify-center">
          <Phone className="w-6 h-6 mr-2 text-primary-default" /> Send Us a Message
        </h2>
        <form className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {[
              { label: "Name", type: "text", id: "name", placeholder: "Your Name" },
              { label: "Email", type: "email", id: "email", placeholder: "Your Email" },
            ].map((input, index) => (
              <div key={index}>
                <label htmlFor={input.id} className="block text-sm font-medium text-textColor-muted mb-2">
                  {input.label}
                </label>
                <input
                  type={input.type}
                  id={input.id}
                  name={input.id}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-default"
                  placeholder={input.placeholder}
                  required
                />
              </div>
            ))}
          </div>
          <div className="mb-6">
            <label htmlFor="subject" className="block text-sm font-medium text-textColor-muted mb-2">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-default"
              placeholder="Subject"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="block text-sm font-medium text-textColor-muted mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-default"
              placeholder="Your Message"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-primary-default text-white px-6 py-3 rounded-lg hover:bg-primary-hover transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Send className="w-5 h-5" /> Send Message
          </button>
        </form>
      </section>

      {/* Store Location */}
      <section className="text-center">
        <h2 className="text-2xl font-bold mb-6 text-textColor-dark flex items-center justify-center">
          <MapPin className="w-6 h-6 mr-2 text-primary-default" /> Visit Us
        </h2>
        <p className="text-textColor-muted mb-6">
          Stop by our store and experience **Waggele** in person.
        </p>
        <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
          <p className="text-textColor-muted">
            <strong>📍 Address:</strong> 123 Fashion Street, New York, NY 10001
          </p>
          <p className="text-textColor-muted">
            <strong>📞 Phone:</strong> +1 (123) 456-7890
          </p>
        </div>
      </section>
    </div>
  );
}
