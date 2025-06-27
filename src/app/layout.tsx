import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/navbar";
import { dark } from '@clerk/themes'

const robotoCondensed = localFont({
  src: "../fonts/Roboto_Condensed/static/RobotoCondensed-Regular.ttf"
});

export const metadata: Metadata = {
  title: "Inbox Hero",
  description: "✉️ Clean your inbox like a hero ",
  icons: [
    {
      rel: "icon",
      url: "/logo-trans.png",
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
        baseTheme: dark
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
