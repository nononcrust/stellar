"use client";

import { cn } from "@/lib/utils";
import { Dialog as DialogBase } from "@base-ui-components/react/dialog";
import { XIcon } from "lucide-react";
import { createContextFactory } from "../../lib/context";
import { IconButton } from "./icon-button";

type DialogProps = DialogBase.Root.Props;

const Dialog = ({ children, ...props }: DialogProps) => {
  return <DialogBase.Root {...props}>{children}</DialogBase.Root>;
};

type DialogBackdropProps = DialogBase.Backdrop.Props;

const DialogBackdrop = ({ className, children, ...props }: DialogBackdropProps) => {
  const { animation } = useDialogContentContext();

  return (
    <DialogBase.Backdrop
      className={cn(
        "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm",
        animation !== "none" &&
          "duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0",
        className,
      )}
      data-testid="overlay"
      {...props}
    >
      {children}
    </DialogBase.Backdrop>
  );
};

type DialogAnimation = "pop" | "slide" | "none";

const animationStyle: Record<DialogAnimation, string> = {
  pop: cn(
    "data-starting-style:scale-95 data-ending-style:scale-95",
    "data-starting-style:opacity-0 data-ending-style:opacity-0",
    "duration-150",
  ),
  slide: cn(
    "data-starting-style:opacity-0 data-ending-style:opacity-0",
    "data-starting-style:translate-y-[37.5rem] data-ending-style:translate-y-[37.5rem]",
    "duration-500 ease-out-expo",
  ),
  none: "",
};

type DialogContentProps = DialogBase.Popup.Props & {
  animation?: DialogAnimation;
};

const DialogContent = ({
  className,
  children,
  animation = "pop",
  ...props
}: DialogContentProps) => {
  return (
    <DialogContentContext value={{ animation }}>
      <DialogBase.Portal>
        <DialogBackdrop />
        <DialogBase.Popup
          className={cn(
            "fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 outline-hidden",
            "max-h-[calc(100%-4rem)] max-w-[calc(100%-4rem)]",
            "bg-background flex w-full flex-col overflow-y-auto rounded-[1rem]",
            animationStyle[animation],
            className,
          )}
          {...props}
        >
          {children}
          <DialogBase.Close
            render={
              <IconButton
                className="absolute top-4 right-4"
                variant="ghost"
                aria-label="닫기"
                size="xsmall"
              >
                <XIcon className="size-4" />
              </IconButton>
            }
          />
        </DialogBase.Popup>
      </DialogBase.Portal>
    </DialogContentContext>
  );
};

type DialogHeaderProps = React.ComponentPropsWithRef<"div">;

const DialogHeader = ({ className, children, ...props }: DialogHeaderProps) => {
  return (
    <div className={cn("flex flex-col gap-1.5 p-5", className)} {...props}>
      {children}
    </div>
  );
};

type DialogBodyProps = React.ComponentPropsWithRef<"div">;

const DialogBody = ({ className, children, ...props }: DialogBodyProps) => {
  return (
    <div className={cn("flex flex-1 flex-col overflow-y-auto px-5", className)} {...props}>
      {children}
    </div>
  );
};

type DialogFooterProps = React.ComponentPropsWithRef<"div">;

const DialogFooter = ({ className, children, ...props }: DialogFooterProps) => {
  return (
    <div className={cn("flex justify-end gap-2 p-5", className)} {...props}>
      {children}
    </div>
  );
};

type DialogTitleProps = React.ComponentPropsWithRef<typeof DialogBase.Title>;

const DialogTitle = ({ className, children, ...props }: DialogTitleProps) => {
  return (
    <DialogBase.Title className={cn("text-lg font-semibold tracking-tight", className)} {...props}>
      {children}
    </DialogBase.Title>
  );
};

type DialogDescriptionProps = DialogBase.Description.Props;

const DialogDescription = ({ className, children, ...props }: DialogDescriptionProps) => {
  return (
    <DialogBase.Description className={cn("text-sub text-sm", className)} {...props}>
      {children}
    </DialogBase.Description>
  );
};

type DialogTriggerProps = DialogBase.Trigger.Props;

const DialogTrigger = ({ children, ...props }: DialogTriggerProps) => {
  return <DialogBase.Trigger {...props}>{children}</DialogBase.Trigger>;
};

type DialogContentContextValue = {
  animation: DialogContentProps["animation"];
};

const [DialogContentContext, useDialogContentContext] =
  createContextFactory<DialogContentContextValue>("DialogContent");

Dialog.Trigger = DialogTrigger;
Dialog.Close = DialogBase.Close;
Dialog.Content = DialogContent;
Dialog.Header = DialogHeader;
Dialog.Body = DialogBody;
Dialog.Footer = DialogFooter;
Dialog.Title = DialogTitle;
Dialog.Description = DialogDescription;

export { Dialog };
