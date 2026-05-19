import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import { Toaster } from "sonner";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  weight: ["300", "400", "600"],
});

export const metadata: Metadata = {
  title: "Next Mountain Circles",
  description:
    "A 90-day founding cohort for senior executives navigating AI's impact on leadership and organizations.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${sourceSerif.variable}`}>
        <SiteHeader />
        {children}
        <SiteFooter />
        <Toaster richColors />
      </body>
    </html>
  );
}
