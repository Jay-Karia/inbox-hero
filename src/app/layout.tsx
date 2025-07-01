import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Navbar from "@/components/navbar";
import { dark } from "@clerk/themes";
import localFont from "next/font/local";

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
      <html lang="en" className="dark">
        <body className={`${robotoCondensed.className} antialiased h-full`}>
          <Navbar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
