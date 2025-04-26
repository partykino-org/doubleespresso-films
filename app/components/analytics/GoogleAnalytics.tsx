"use client"; // обов'язково

import Script from "next/script";

const GA_MEASUREMENT_ID = "G-DE0PSFR4Y8"; // заміни на свій ID

export const GoogleAnalytics = () => (
  <>
    {/* Завантаження gtag.js */}
    <Script
      src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      strategy="afterInteractive"
    />
    {/* Ініціалізація аналітики */}
    <Script
      id="gtag-init"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `,
      }}
    />
  </>
);
