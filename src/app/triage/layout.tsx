export default function CleanPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="h-full antialiased">{children}</main>;
}
