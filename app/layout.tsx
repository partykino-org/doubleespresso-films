import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./common/context/api-context";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Кава дивиться кіно",
  description: "Їмо налисники, дивимось фільми",
  icons: {
    icon: "https://doubleespresso-films.s3.eu-north-1.amazonaws.com/doubleespresso_logo.png",
  },
  openGraph: {
    title: "Кава дивиться кіно",
    description: "Їмо налисники, дивимось фільми",
    url: "https://www.doublekava.watch",
    siteName: "doublekava.watch",
    images: [
      {
        url: "https://doubleespresso-films.s3.eu-north-1.amazonaws.com/doublekava.png",
        width: 1200,
        height: 630,
        alt: "Partykino прев'ю",
      },
    ],
    locale: "uk_UA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
