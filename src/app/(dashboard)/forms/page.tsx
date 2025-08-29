"use client";

import { PageHeader } from "@/components/layouts/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { IconButton } from "@/components/ui/icon-button";
import { Prompt } from "@/components/ui/prompt";
import { CopyLinkDialog } from "@/features/form/components/copy-link-dialog";
import { FormStatusTag } from "@/features/form/components/form-status-tag";
import { generateFormUrl } from "@/features/form/utils";
import { ROUTE } from "@/lib/route";
import { formListQueryOptions, useDeleteFormMutation } from "@/services/dashboard/form";
import { Form } from "@prisma/client";
import { Suspense } from "@suspensive/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import {
  ExternalLinkIcon,
  Link2Icon,
  MoreVerticalIcon,
  PlusIcon,
  SquarePenIcon,
  Trash2Icon,
} from "lucide-react";
import Link from "next/link";
import { overlay } from "overlay-kit";

const FormListPage = Suspense.with({ fallback: null, clientOnly: true }, () => {
  const { data: forms } = useSuspenseQuery(formListQueryOptions());

  return (
    <div className="bg-background-100 min-h-dvh">
      <main className="container">
        <PageHeader>
          <PageHeader.Title>나의 폼 목록</PageHeader.Title>
          <PageHeader.Description>
            내가 만든 폼 목록을 확인하고, 새로 만들거나 기존 폼을 편집할 수 있어요.
          </PageHeader.Description>
        </PageHeader>
        <div className="mt-8 flex items-center justify-end">
          <Button render={<Link href={ROUTE.DASHBOARD.FORM.CREATE} />}>
            <PlusIcon className="size-4" />
            새로 만들기
          </Button>
        </div>
        <ul className="mt-4 grid grid-cols-1 gap-2 md:grid-cols-2">
          {forms.map((form) => (
            <FormListItem key={form.id} form={form} />
          ))}
        </ul>
      </main>
    </div>
  );
});

type FormListItemProps = {
  form: {
    id: Form["id"];
    title: Form["title"];
    status: Form["status"];
    createdAt: string;
  };
};

const FormListItem = ({ form }: FormListItemProps) => {
  const deleteForm = useDeleteFormMutation();

  const onDeleteButtonClick = () => {
    overlay.open(({ isOpen, close }) => {
      const onDelete = () => {
        if (deleteForm.isPending) return;

        deleteForm.mutate(
          { id: form.id },
          {
            onSuccess: () => {
              close();
            },
          },
        );
      };

      return (
        <Prompt open={isOpen} onOpenChange={(open) => !open && close()}>
          <Prompt.Content>
            <Prompt.Header>
              <Prompt.Title>폼을 삭제할까요?</Prompt.Title>
              <Prompt.Description>삭제한 폼은 복구할 수 없어요.</Prompt.Description>
            </Prompt.Header>
            <Prompt.Footer>
              <Prompt.Cancel>취소</Prompt.Cancel>
              <Button className="w-full" size="large" variant="error" onClick={onDelete}>
                삭제하기
              </Button>
            </Prompt.Footer>
          </Prompt.Content>
        </Prompt>
      );
    });
  };

  return (
    <li className="relative flex">
      <Link
        className="flex flex-1 rounded-md transition-shadow"
        href={ROUTE.DASHBOARD.FORM.DETAIL({ id: form.id })}
      >
        <Card className="flex-1 p-6">
          <span className="font-semibold">
            <FormStatusTag className="w-fitZ mr-2" status={form.status} />
            {form.title}
          </span>
          <span className="text-subtle mt-4 text-[13px]">
            마지막 수정 {format(form.createdAt, "yyyy.MM.dd")}
          </span>
        </Card>
      </Link>
      <div className="absolute top-5 right-5 flex items-center gap-1">
        <CopyLinkDialog
          formId={form.id}
          trigger={
            <IconButton aria-label="링크 복사하기" size="xsmall" variant="ghost">
              <Link2Icon className="size-4" />
            </IconButton>
          }
        />
        <IconButton
          size="xsmall"
          variant="ghost"
          aria-label="폼 링크 열기"
          render={
            <Link href={generateFormUrl({ id: form.id })} target="_blank" rel="noopener noreferrer">
              <ExternalLinkIcon className="size-4" />
            </Link>
          }
        />
        <DropdownMenu>
          <DropdownMenu.Trigger
            render={
              <IconButton aria-label="메뉴" size="xsmall" variant="ghost">
                <MoreVerticalIcon className="size-4" />
              </IconButton>
            }
          />
          <DropdownMenu.Content align="end">
            <DropdownMenu.Item render={<Link href={ROUTE.DASHBOARD.FORM.EDIT({ id: form.id })} />}>
              <SquarePenIcon className="size-4" />
              편집하기
            </DropdownMenu.Item>
            <DropdownMenu.Item variant="danger" onClick={onDeleteButtonClick}>
              <Trash2Icon className="size-4" />
              삭제하기
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu>
      </div>
    </li>
  );
};

export default FormListPage;
