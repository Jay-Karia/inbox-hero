import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inbox Hero | Dashboard",
};

export default function DashboardPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="border-2 border-blue-500 h-full">{children}</main>;
}
