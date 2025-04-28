import { Geist, Geist_Mono } from "next/font/google";
import AppNavbar from "@/components/ui/AppNavbar";
import "./globals.css";
import { StackedLayout } from "@/components/stacked-layout";
import { Suspense } from "react";
import Loading from "./loading";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "QuickAnalytics",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StackedLayout navbar={<AppNavbar />}>{children}</StackedLayout>
      </body>
    </html>
  );
}
