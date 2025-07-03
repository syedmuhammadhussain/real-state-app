"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function CookieConsent() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setShowPopup(true);
    }
  }, []);

  const handleConsent = (choice) => {
    localStorage.setItem("cookieConsent", choice);
    setShowPopup(false);
  };

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-end sm:items-center justify-center">
      <div className="bg-white w-full sm:max-w-md mx-auto rounded-t-2xl sm:rounded-xl p-6 shadow-lg animate-slide-up">
        <h2 className="text-xl text-primary-dark font-semibold mb-2">
          Мы используем файлы cookie  🍪
        </h2>
        <p className="text-sm text-primary-dark mb-4">
          Этот сайт использует файлы cookie, чтобы обеспечить вам наилучший опыт работы с нашей платформой недвижимости.
        </p>
        <div className="flex justify-end space-x-3">
          <Button
            size="md"
            variant="outline"
            onClick={() => handleConsent("refused")}
            className=""
          >
            Отказаться
          </Button>
          <Button
            size="md"
            variant="primary"
            onClick={() => handleConsent("accepted")}
          >
            Принять
          </Button>
        </div>
      </div>
    </div>
  );
}
