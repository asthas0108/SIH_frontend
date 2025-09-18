"use client";

import { useState } from "react";

export default function TranslateButton() {
  const [lang, setLang] = useState("en"); 

  const toggleLanguage = () => {
    const nextLang = lang === "en" ? "hi" : "en"; 
    const select = document.querySelector(".goog-te-combo");

    if (select) {
      select.value = nextLang;
      select.dispatchEvent(new Event("change"));
    }

    setLang(nextLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="rounded-lg text-white font-medium cursor-pointer"
    >
      {lang === "en" ? "Hindi" : "English"}
    </button>
  );
}