import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Product Photo Studio | NexeraHive",
  description:
    "Transform your product photos with AI-powered background removal and lifestyle scene placement. Built for e-commerce photography.",
  keywords:
    "AI, product photography, e-commerce, background removal, photo editing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} gradient-bg`}>{children}</body>
    </html>
  );
}
