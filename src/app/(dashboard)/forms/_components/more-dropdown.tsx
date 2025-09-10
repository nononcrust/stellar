import { Button } from "@/components/ui/button";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { Prompt } from "@/components/ui/prompt";
import { ROUTE } from "@/lib/route";
import { useDeleteFormMutation } from "@/services/dashboard/form";
import { Form } from "@prisma/client";
import { noop } from "es-toolkit";
import { SquarePenIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { overlay } from "overlay-kit";

type MoreDropdownProps = {
  trigger: React.ReactElement<Record<string, unknown>>;
  formId: Form["id"];
  onDeleted?: () => void;
};

export const MoreDropdown = ({ trigger, formId, onDeleted = noop }: MoreDropdownProps) => {
  const deleteForm = useDeleteFormMutation();

  const onDeleteButtonClick = () => {
    overlay.open(({ isOpen, close }) => {
      const onDelete = () => {
        if (deleteForm.isPending) return;

        deleteForm.mutate(
          { id: formId },
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
    <DropdownMenu>
      <DropdownMenu.Trigger render={trigger} />
      <DropdownMenu.Content align="end">
        <DropdownMenu.Item render={<Link href={ROUTE.DASHBOARD.FORM.EDIT({ id: formId })} />}>
          <SquarePenIcon className="size-4" />
          편집하기
        </DropdownMenu.Item>
        <DropdownMenu.Item variant="danger" onClick={onDeleteButtonClick}>
          <Trash2Icon className="size-4" />
          삭제하기
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu>
  );
};
