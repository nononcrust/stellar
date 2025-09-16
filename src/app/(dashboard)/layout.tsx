import { Sidebar } from "@/components/layouts/sidebar";
import { SessionProvider } from "@/lib/auth-client";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Sidebar />
      <div className="ml-[260px]">{children}</div>
    </SessionProvider>
  );
}
