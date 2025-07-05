'use client';

import { MessageCircle, Send, Facebook } from 'lucide-react';
import Link from 'next/link';

const SocialLinks = () => {
  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col gap-3">
      {/* WhatsApp */}
      {/* <Link
        href="https://wa.me/79091818242"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 p-3 rounded-full shadow-lg hover:bg-green-600 transition-colors"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </Link> */}

      {/* Telegram */}
      {/* <Link
        href="https://t.me/your_telegram_username" // Replace with your username or link
        target="_blank"
        rel="noopener noreferrer"
        className="bg-sky-400 p-3 rounded-full shadow-lg hover:bg-sky-600 transition-colors"
        aria-label="Contact via Telegram"
      >
        <Send className="w-6 h-6 text-white" />
      </Link> */}

      {/* VK (Used Facebook icon here, consider replacing if you have a VK icon SVG) */}
      <Link
        href="https://vk.com/id1024184393"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-500 p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        aria-label="Our VK Page"
      >
        <Facebook className="w-6 h-6 text-white" />
      </Link>
    </div>
  );
};

export default SocialLinks;
