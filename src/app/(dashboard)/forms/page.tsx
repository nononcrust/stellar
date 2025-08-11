"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { IconButton } from "@/components/ui/icon-button";
import { Prompt } from "@/components/ui/prompt";
import { FormStatusTag } from "@/features/form/components/form-status-tag";
import { generateFormUrl } from "@/features/form/utils";
import { ROUTE } from "@/lib/route";
import { formListQueryOptions, useDeleteFormMutation } from "@/services/dashboard/form";
import { Form } from "@prisma/client";
import { Suspense } from "@suspensive/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import {
  CheckIcon,
  CopyIcon,
  ExternalLinkIcon,
  MoreVerticalIcon,
  PlusIcon,
  SquarePenIcon,
  Trash2Icon,
} from "lucide-react";
import Link from "next/link";
import { overlay } from "overlay-kit";
import { useState } from "react";

const FormListPage = Suspense.with({ fallback: null, clientOnly: true }, () => {
  const { data: forms } = useSuspenseQuery(formListQueryOptions());

  return (
    <main className="mx-auto flex max-w-4xl flex-col px-4">
      <h1 className="mt-8 text-2xl font-bold">폼 목록</h1>
      <div className="mt-8 flex items-center justify-end">
        <Button render={<Link href={ROUTE.DASHBOARD.FORM.CREATE} />} size="small">
          <PlusIcon className="size-4" />
          새로 만들기
        </Button>
      </div>
      <ul className="mt-4 flex flex-col gap-2">
        {forms.map((form) => (
          <FormListItem key={form.id} form={form} />
        ))}
      </ul>
    </main>
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
      <Link className="flex flex-1 rounded-md" href={ROUTE.DASHBOARD.FORM.DETAIL({ id: form.id })}>
        <Card className="flex-1 flex-row">
          <FormStatusTag className="mr-2" status={form.status} />
          <span className="font-semibold">{form.title}</span>
        </Card>
      </Link>
      <div className="absolute top-1/2 right-3 flex -translate-y-1/2 items-center gap-2">
        <span className="text-subtle mr-2 text-[13px]">
          마지막 수정 {format(form.createdAt, "yyyy.MM.dd")}
        </span>
        <Dialog>
          <Dialog.Trigger
            render={
              <IconButton aria-label="링크 복사하기" size="xsmall" variant="ghost">
                <ExternalLinkIcon className="size-4" />
              </IconButton>
            }
          />
          <Dialog.Content className="w-[360px]">
            <Dialog.Header>
              <Dialog.Title>링크 복사하기</Dialog.Title>
              <div className="bg-background-100 mt-2 mb-2 flex items-center rounded-md p-3">
                <div className="scrollbar-hide flex items-center overflow-x-auto">
                  <span className="text-sub text-sm">{generateFormUrl({ id: form.id })}</span>
                </div>
                <CopyToClipboard text={generateFormUrl({ id: form.id })} />
              </div>
            </Dialog.Header>
          </Dialog.Content>
        </Dialog>
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

type CopyToClipboardProps = {
  text: string;
};

const CopyToClipboard = ({ text }: CopyToClipboardProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const onClick = () => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="ml-3 flex min-h-7 min-w-7 items-center justify-center">
      {isCopied ? (
        <CheckIcon className="text-primary size-5" />
      ) : (
        <IconButton aria-label="링크 복사" variant="ghost" size="xsmall" onClick={onClick}>
          <CopyIcon className="size-4" />
        </IconButton>
      )}
    </div>
  );
};

export default FormListPage;
