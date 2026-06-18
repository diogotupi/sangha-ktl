export default function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6 font-sans text-[15px] leading-relaxed antialiased">
      {children}
    </div>
  );
}
