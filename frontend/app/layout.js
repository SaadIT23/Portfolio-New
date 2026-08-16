import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { Suspense } from "react";
import portfolio from "@/data/portfolio.json";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: `${portfolio.site.ownerName} | Portfolio`,
  description: portfolio.site.headline,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <Suspense fallback={<div>Loading...</div>}>
          {children}
        </Suspense>
      </body>

    </html>
  );
}
