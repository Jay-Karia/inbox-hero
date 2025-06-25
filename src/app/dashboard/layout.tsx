export default function DashboardPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="border-2 border-blue-500 h-full">{children}</main>;
}
