import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SunCart - Summer Essentials Store",
  description:
    "Sun-soaked summer essentials: sunglasses, linen, skincare, beach gear and more. Curated for golden hour.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme="suncart"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        <Toaster position="top-center" />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
