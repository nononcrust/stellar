import { Tag, TagProps } from "@/components/ui/tag";
import { Form } from "@prisma/client";

const label: Record<FormStatusTagProps["status"], string> = {
  PENDING: "진행 전",
  ACTIVE: "진행 중",
  PAUSED: "중지됨",
  CLOSED: "종료됨",
};

const variant: Record<FormStatusTagProps["status"], TagProps["variant"]> = {
  PENDING: "info",
  ACTIVE: "success",
  PAUSED: "danger",
  CLOSED: "secondary",
};

type FormStatusTagProps = {
  className?: string;
  status: Form["status"];
};

export const FormStatusTag = ({ className, status }: FormStatusTagProps) => {
  return (
    <Tag className={className} variant={variant[status]}>
      {label[status]}
    </Tag>
  );
};
