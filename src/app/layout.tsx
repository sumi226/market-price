import type { Metadata } from "next";
import { Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ToastProvider from "@/components/ToastProvider";
import { CartProvider } from "@/components/CartProvider";

const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ["latin", "bengali"],
});

export const metadata: Metadata = {
  title: "বাজার দর | নিত্যপণ্যের আজকের দাম",
  description: "প্রয়োজনীয় পণ্যের বর্তমান বাজারদর এক নজরে দেখুন।",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="bn"
      className={`${notoSerifBengali.className} h-full antialiased`}
    >
      <body className="flex min-h-screen flex-col">
        <CartProvider>
          <ToastProvider />
          <Navbar />
          <div className="flex flex-1 flex-col">{children}</div>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
