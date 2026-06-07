
import "./globals.css";

import type { Metadata } from "next";
import { AuthProvider } from "@/context/auth-context";

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
  <AuthProvider>
    {children}
  </AuthProvider>
</body>
    </html>
  );
}