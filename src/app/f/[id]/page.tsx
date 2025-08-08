import { prisma } from "@/lib/prisma";
import { Form } from "./_components/form";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function FormResponsePage(props: PageProps) {
  const params = await props.params;

  const form = await prisma.form.findUnique({
    where: { id: params.id },
  });

  if (form === null) {
    return <div>삭제되었거나 존재하지 않는 폼입니다.</div>;
  }

  return (
    <main className="mx-auto mt-8 max-w-xl px-4">
      <Form form={form} />
    </main>
  );
}
