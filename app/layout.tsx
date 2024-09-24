import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

import { cn } from '@/lib/utils';
import { ThemeProvider } from "@/components/theme-provider";


const geistSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ['latin'],
  weight: ["300", '400', '500', '600', "700"],
});


export const metadata: Metadata = {
  title: "ZenHealth",
  description: "HealthCare Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body

        className={`${geistSans.variable} ${cn('min-h-screen bg-dark-300 font-sans antialiased', geistSans.variable)} `}
      >          <ThemeProvider
        attribute="class"
        defaultTheme="dark"
      >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
