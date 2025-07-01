export default function CleanPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="border h-full antialiased">{children}</main>;
}
