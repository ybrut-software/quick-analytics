import { StackedLayout } from "@/components/stacked-layout";
import AppNavbar from "@/components/ui/AppNavbar";
import ReactQueryProvider from "@/lib/QueryProvider";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
        <StackedLayout navbar={<AppNavbar />}>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </StackedLayout>
      </body>
    </html>
  );
}
