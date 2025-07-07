import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Navbar from "@/components/navbar";
import { dark } from "@clerk/themes";
import localFont from "next/font/local";
import { JotaiProvider } from "@/providers/jotai";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Inbox Hero",
  description: "✉️ Clean your inbox like a hero ",
  icons: [
    {
      rel: "icon",
      url: "/large-logo.png",
    },
  ],
};

const robotoCondensed = localFont({
  src: "../fonts/Roboto_Condensed/static/RobotoCondensed-Regular.ttf",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        cssLayerName: "clerk",
        baseTheme: dark,
      }}
    >
      <JotaiProvider>
        <html lang="en" className="dark">
          <body className={`${robotoCondensed.className} antialiased h-full`}>
            <Toaster />
            <Navbar />
            {children}
          </body>
        </html>
      </JotaiProvider>
    </ClerkProvider>
  );
}
