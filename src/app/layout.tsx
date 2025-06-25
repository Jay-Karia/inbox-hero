import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Roboto_Condensed } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";

const robotoCondensed = Roboto_Condensed({
  variable: "--font-roboto-condensed",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Inbox Hero",
  description: "✉️ Clean your inbox like a hero ",
  icons: [
    {
      rel: "icon",
      url: "/email.png",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        cssLayerName: "clerk",
      }}
    >
      <html lang="en" className="dark">
        <body className={`${robotoCondensed} antialiased h-full`}>
      <Navbar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
