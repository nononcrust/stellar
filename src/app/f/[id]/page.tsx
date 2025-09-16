import { siteConfig } from "@/configs/site";
import { prisma } from "@/lib/prisma";
import { ClipboardListIcon, ClipboardXIcon } from "lucide-react";
import { Form } from "./_components/form";

export const dynamic = "force-dynamic";

export const generateMetadata = async ({ params }: { params: { id: string } }) => {
  const form = await prisma.form.findUnique({
    where: { id: params.id },
    select: { title: true },
  });

  if (form === null) {
    return {
      title: siteConfig.title,
    };
  }

  return {
    title: `${form.title} - ${siteConfig.title}`,
  };
};

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function FormResponsePage(props: PageProps) {
  const params = await props.params;

  const form = await prisma.form.findUnique({
    where: { id: params.id },
  });

  if (form === null) {
    return <main>삭제되었거나 존재하지 않는 설문이에요.</main>;
  }

  if (form.status === "PENDING") {
    return <Fallback title="곧 시작될 예정이에요." description="잠시 후 다시 방문해주세요" />;
  }

  if (form.status === "PAUSED") {
    return (
      <Fallback
        title="해당 설문은 진행이 중단되었어요.
    "
        description="잠시 후 다시 방문해주세요"
      />
    );
  }

  if (form.status === "CLOSED") {
    return (
      <main className="flex h-dvh flex-col items-center justify-center">
        <ClipboardXIcon className="text-subtle size-12" />
        <h1 className="text-sub mt-4 font-semibold">해당 설문은 마감되었어요.</h1>
      </main>
    );
  }

  return (
    <div className="bg-background-100">
      <div className="bg-background mx-auto min-h-dvh max-w-[640px]">
        <main className="mx-auto max-w-xl px-6 py-12">
          <Form form={form} />
        </main>
      </div>
    </div>
  );
}

type FallbackProps = {
  title: string;
  description: string;
};

const Fallback = ({ title, description }: FallbackProps) => {
  return (
    <main className="flex h-dvh flex-col items-center justify-center">
      <ClipboardListIcon className="text-subtle size-14" />
      <h1 className="mt-4 text-lg font-medium">{title}</h1>
      <p className="text-sub mt-1 text-[15px]">{description}</p>
    </main>
  );
};
