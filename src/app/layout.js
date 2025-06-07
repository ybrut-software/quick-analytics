import Spinner from "@/components/spinner";
import "./globals.css";

import { StackedLayout } from "@/components/stacked-layout";
import AppNavbar from "@/components/ui/AppNavbar";
import ReactQueryProvider from "@/lib/QueryProvider";
import { Suspense } from "react";

export const metadata = {
  title: "QuickAnalytics",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        className={`antialiased`}
      >
        <StackedLayout navbar={<AppNavbar />}>
          <ReactQueryProvider>
            <Suspense fallback={<Spinner />}>{children}</Suspense>
          </ReactQueryProvider>
        </StackedLayout>
      </body>
    </html>
  );
}
