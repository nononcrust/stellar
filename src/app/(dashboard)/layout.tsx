import { Sidebar } from "@/components/layouts/sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar />
      <div className="ml-[260px]">{children}</div>
    </>
  );
}
