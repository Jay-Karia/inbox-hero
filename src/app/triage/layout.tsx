import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inbox Hero | Triage",
};

export default function TriagePageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="h-full antialiased">{children}</main>;
}
