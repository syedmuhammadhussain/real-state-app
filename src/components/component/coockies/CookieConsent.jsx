"use client";

import { useEffect, useState } from "react";
import { ConfirmEditDialog } from "../dialog-popups/ConfirmEditDialog";

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
  return <ConfirmEditDialog
              handleSubmit = {() => handleConsent("accepted")}
              handlePopDown = {() => handleConsent("refused")}
              title='Мы используем файлы cookie  🍪'
              description='Этот сайт использует файлы cookie, чтобы обеспечить вам наилучший опыт работы с нашей платформой недвижимости.' 
              buttonText = 'Принять'
              />  

}
