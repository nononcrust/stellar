import { PageHeader } from "@/components/layouts/page-header";
import { Button } from "@/components/ui/button";

export default function AccountPage() {
  return (
    <main className="container">
      <PageHeader>
        <PageHeader.Title>계정 관리</PageHeader.Title>
      </PageHeader>
      <Button className="mt-8 w-fit" variant="error">
        회원탈퇴
      </Button>
    </main>
  );
}
