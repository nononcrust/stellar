import { Header } from "@/components/layouts/header";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh">
      <Header />
      {children}
    </div>
  );
}
