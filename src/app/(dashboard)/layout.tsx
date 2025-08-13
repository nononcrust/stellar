import { Header } from "@/components/layouts/header";
import { UserProfile } from "@/components/shared/user-profile";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header className="justify-end">
        <UserProfile />
      </Header>
      {children}
    </>
  );
}
