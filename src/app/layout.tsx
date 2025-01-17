import type { Metadata } from "next";
import { GeistMono, GeistSans } from "@/assets/font";
import "./globals.css";

export const metadata: Metadata = {
  title: "Test Generator"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.className} ${GeistMono.variable} bg-white text-zinc-800`}
      >
        {children}
      </body>
    </html>
  );
}
