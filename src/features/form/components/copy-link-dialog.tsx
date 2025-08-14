"use client";

import { Dialog } from "@/components/ui/dialog";
import { IconButton } from "@/components/ui/icon-button";
import { Form } from "@prisma/client";
import { CheckIcon, CopyIcon } from "lucide-react";
import { useState } from "react";
import { generateFormUrl } from "../utils";

type CopyLinkDialogProps = {
  formId: Form["id"];
  trigger: React.ReactElement<Record<string, unknown>>;
};

export const CopyLinkDialog = ({ formId, trigger }: CopyLinkDialogProps) => {
  return (
    <Dialog>
      <Dialog.Trigger render={trigger} />
      <Dialog.Content className="w-[360px]">
        <Dialog.Header>
          <Dialog.Title>링크 공유하기</Dialog.Title>
          <div className="bg-background-100 mt-2 mb-2 flex items-center rounded-md p-3">
            <div className="scrollbar-hide flex items-center overflow-x-auto">
              <span className="text-sub text-sm whitespace-nowrap">
                {generateFormUrl({ id: formId })}
              </span>
            </div>
            <CopyToClipboard text={generateFormUrl({ id: formId })} />
          </div>
        </Dialog.Header>
      </Dialog.Content>
    </Dialog>
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
