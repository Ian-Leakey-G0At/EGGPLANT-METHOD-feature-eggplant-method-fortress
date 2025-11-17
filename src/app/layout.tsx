
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header"; // Import the Header

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The Eggplant Method",
  description: "Unlock the secrets to viral content.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header /> {/* Add the Header here */}
        {children}
      </body>
    </html>
  );
}
