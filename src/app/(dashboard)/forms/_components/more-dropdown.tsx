import { Button } from "@/components/ui/button";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { Prompt } from "@/components/ui/prompt";
import { allowedFormStatusTransitions } from "@/features/form/utils";
import { ROUTE } from "@/lib/route";
import { useDeleteFormMutation, useUpdateFormStatusMutation } from "@/services/dashboard/form";
import { Form } from "@prisma/client";
import { noop } from "es-toolkit";
import { SquarePenIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { overlay } from "overlay-kit";
import { Fragment } from "react";

type MoreDropdownProps = {
  trigger: React.ReactElement<Record<string, unknown>>;
  form: {
    id: Form["id"];
    status: Form["status"];
  };
  onDeleted?: () => void;
};

export const MoreDropdown = ({ trigger, form, onDeleted = noop }: MoreDropdownProps) => {
  const deleteForm = useDeleteFormMutation();

  const updateFormStatus = useUpdateFormStatusMutation();

  const onDeleteButtonClick = () => {
    overlay.open(({ isOpen, close }) => {
      const onDelete = () => {
        if (deleteForm.isPending) return;

        deleteForm.mutate(
          { id: form.id },
          {
            onSuccess: () => {
              close();
              onDeleted();
            },
          },
        );
      };

      return (
        <Prompt open={isOpen} onOpenChange={(open) => !open && close()}>
          <Prompt.Content>
            <Prompt.Header>
              <Prompt.Title>설문을 삭제할까요?</Prompt.Title>
              <Prompt.Description>삭제한 설문은 복구할 수 없어요.</Prompt.Description>
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

  const onCloseFormButtonClick = () => {
    overlay.open(({ isOpen, close }) => {
      const onCloseForm = () => {
        if (updateFormStatus.isPending) return;

        updateFormStatus.mutate(
          { id: form.id, body: { status: "CLOSED" } },
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
              <Prompt.Title>설문을 마감할까요?</Prompt.Title>
              <Prompt.Description>한 번 마감하면 다시 열 수 없어요.</Prompt.Description>
            </Prompt.Header>
            <Prompt.Footer>
              <Prompt.Cancel>취소</Prompt.Cancel>
              <Button className="w-full" size="large" onClick={onCloseForm}>
                마감하기
              </Button>
            </Prompt.Footer>
          </Prompt.Content>
        </Prompt>
      );
    });
  };

  const menuByStatus: Record<Form["status"], React.ReactNode> = {
    PENDING: null,
    ACTIVE: (
      <DropdownMenu.Item
        onClick={() => {
          if (updateFormStatus.isPending) return;

          updateFormStatus.mutate({ id: form.id, body: { status: "ACTIVE" } });
        }}
      >
        게시하기
      </DropdownMenu.Item>
    ),
    PAUSED: (
      <DropdownMenu.Item
        onClick={() => {
          if (updateFormStatus.isPending) return;

          updateFormStatus.mutate({ id: form.id, body: { status: "PAUSED" } });
        }}
      >
        중지하기
      </DropdownMenu.Item>
    ),
    CLOSED: <DropdownMenu.Item onClick={onCloseFormButtonClick}>마감하기</DropdownMenu.Item>,
  };

  return (
    <DropdownMenu>
      <DropdownMenu.Trigger render={trigger} />
      <DropdownMenu.Content align="end">
        <DropdownMenu.Item
          render={<Link className="ring-0" href={ROUTE.DASHBOARD.FORM.EDIT({ id: form.id })} />}
        >
          <SquarePenIcon className="size-4" />
          편집하기
        </DropdownMenu.Item>
        {allowedFormStatusTransitions[form.status].map((status) => (
          <Fragment key={status}>{menuByStatus[status]}</Fragment>
        ))}
        <DropdownMenu.Item variant="danger" onClick={onDeleteButtonClick}>
          <Trash2Icon className="size-4" />
          삭제하기
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu>
  );
};
