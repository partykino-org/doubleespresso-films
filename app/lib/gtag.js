export const GA_MEASUREMENT_ID = "G-DE0PSFR4Y8"; // твій ID

export const pageview = (url) => {
  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: url,
  });
};
