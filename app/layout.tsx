import type { Metadata } from "next";
import "@/app/assets/styles/global.scss";

import { Jost } from "next/font/google";

// import localFont from "next/font/local";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: "normal",
});

export const metadata: Metadata = {
  title: "Coffee Shop",
  description: "Coffee Shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jost.variable}`}>
      <head></head>
      <body>{children}</body>
    </html>
  );
}
