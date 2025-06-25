export default function CleanPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="border-2 border-red-500 h-full">{children}</main>;
}
