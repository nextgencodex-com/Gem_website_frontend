"use client";

import { useEffect } from "react";

const GoogleTranslate = () => {
  useEffect(() => {
    // Only add script once
    if (!document.querySelector("#google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);

      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en", // default language
            includedLanguages: "en,it,es,ja,zh-CN", // languages you want
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
          },
          "google_translate_element"
        );
      };
    }
  }, []);

  return <div id="google_translate_element" className="w-full"></div>;
};

export default GoogleTranslate;
