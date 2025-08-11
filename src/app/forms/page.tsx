"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { IconButton } from "@/components/ui/icon-button";
import { Prompt } from "@/components/ui/prompt";
import { formListQueryOptions, useDeleteFormMutation } from "@/services/dashboard/form";
import { Form } from "@prisma/client";
import { Suspense } from "@suspensive/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { MoreVerticalIcon, PlusIcon, SquarePenIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { overlay } from "overlay-kit";
import { ROUTE } from "../../lib/route";

const FormListPage = Suspense.with({ fallback: null, clientOnly: true }, () => {
  const { data: forms } = useSuspenseQuery(formListQueryOptions());

  return (
    <main className="mx-auto mt-8 max-w-2xl px-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">폼 목록</h1>
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
        className="border-border flex-1 rounded-lg border p-4"
        href={ROUTE.DASHBOARD.FORM.DETAIL({ id: form.id })}
      >
        <span className="font-medium">{form.title || "제목없는 폼"}</span>
      </Link>
      <DropdownMenu>
        <DropdownMenu.Trigger
          render={
            <IconButton
              className="absolute top-1/2 right-3 -translate-y-1/2"
              aria-label="메뉴"
              size="xsmall"
              variant="ghost"
            >
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
    </li>
  );
};

export default FormListPage;
