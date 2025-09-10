import { Button } from "@/components/ui/button";
import { CircleAlertIcon } from "lucide-react";

type ErrorStateProps = {
  onRetry: () => void;
};

export const ErrorState = ({ onRetry }: ErrorStateProps) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <CircleAlertIcon className="text-subtle size-12" />
      <p className="mt-3 text-lg font-semibold">에러가 발생했어요.</p>
      <p className="text-subtle mt-2 font-medium">잠시 후 다시 시도해주세요.</p>
      <Button className="mt-4" onClick={onRetry}>
        다시 시도
      </Button>
    </div>
  );
};
