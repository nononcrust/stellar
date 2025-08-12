export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background-100 min-h-dvh">
      <header className="bg-background border-border sticky top-0 right-0 left-0 z-20 flex h-16 items-center border-b px-3" />
      {children}
    </div>
  );
}
