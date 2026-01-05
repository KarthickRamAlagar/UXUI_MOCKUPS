import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";


const appFant = DM_Sans({
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "UXUI Mockup Generator App",
  description: "Generate UX/UI mockups with ease using AI technology.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={appFant.className}>{children}</body>
    </html>
  );
}
