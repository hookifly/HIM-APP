
import "./globals.css";

import type { Metadata } from "next";
import { AuthProvider } from "@/context/auth-context";
import Script from "next/script";
import { Barlow_Condensed } from "next/font/google";

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
        <Script src="https://checkout.razorpay.com/v1/checkout.js" />
  <AuthProvider>
    {children}
  </AuthProvider>
</body>
    </html>
  );
}