import "./globals.css";

import type { Metadata } from "next";
import localFont from "next/font/local";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Stellar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning className={pretendard.className}>
      <body className="bg-background-100 antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

const pretendard = localFont({
  src: [
    {
      path: "../assets/fonts/Pretendard-Regular.subset.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/Pretendard-Medium.subset.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/Pretendard-SemiBold.subset.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../assets/fonts/Pretendard-Bold.subset.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../assets/fonts/Pretendard-ExtraBold.subset.woff2",
      weight: "800",
      style: "normal",
    },
  ],
  display: "swap",
});
