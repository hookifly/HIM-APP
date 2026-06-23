
import "./globals.css";

import type { Metadata } from "next";
import { AuthProvider } from "@/context/auth-context";
import Script from "next/script";
import { Barlow_Condensed } from "next/font/google";
import "@/lib/mixpanel";

const barlowCondensed = Barlow_Condensed({ subsets: ["latin"], weight: ["400","700","900"] });

export const metadata: Metadata = {
  title: "Become HIM",
  description: "AI Face Optimization",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Script src="https://live.dodopayments.com/checkouts" />
  <AuthProvider>
    {children}
  </AuthProvider>
</body>
    </html>
  );
}