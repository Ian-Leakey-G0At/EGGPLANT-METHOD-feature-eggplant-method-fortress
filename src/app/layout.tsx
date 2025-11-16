import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ConditionalHeader from "@/components/layout/ConditionalHeader";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Viral Self-Improvement Method",
  description: "The Simple 2-Step Method to Naturally Boost Length & Girth",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${inter.variable} font-sans bg-background-dark text-gray-300 antialiased`}
      >
        <div className="max-w-md mx-auto">
          <ConditionalHeader />
          {children}
        </div>
      </body>
    </html>
  );
}
