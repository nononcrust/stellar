"use client";

import { createContextFactory } from "@/lib/context";
import { cn } from "@/lib/utils";
import { AlertDialog as AlertDialogBase } from "@base-ui-components/react/alert-dialog";
import React from "react";
import { Button } from "./button";

type PromptProps = AlertDialogBase.Root.Props;

const Prompt = ({ children, ...props }: PromptProps) => {
  return <AlertDialogBase.Root {...props}>{children}</AlertDialogBase.Root>;
};

type PromptBackdropProps = AlertDialogBase.Backdrop.Props;

const PromptBackdrop = ({ className, children, ...props }: PromptBackdropProps) => {
  const { animation } = usePromptContentContext();

  return (
    <AlertDialogBase.Backdrop
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
    </AlertDialogBase.Backdrop>
  );
};

type PromptAnimation = "pop" | "slide" | "none";

const animationStyle: Record<PromptAnimation, string> = {
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

type PromptContentProps = AlertDialogBase.Popup.Props & {
  animation?: PromptAnimation;
};

const PromptContent = ({
  className,
  children,
  animation = "pop",
  ...props
}: PromptContentProps) => {
  return (
    <PromptContentContext value={{ animation }}>
      <AlertDialogBase.Portal>
        <PromptBackdrop />
        <AlertDialogBase.Popup
          className={cn(
            "fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2",
            "max-h-[calc(100%-4rem)] max-w-[calc(100%-4rem)]",
            "bg-background flex w-[20rem] flex-col overflow-y-auto rounded-[1rem]",
            animationStyle[animation],
            className,
          )}
          {...props}
        >
          {children}
        </AlertDialogBase.Popup>
      </AlertDialogBase.Portal>
    </PromptContentContext>
  );
};

type PromptHeaderProps = React.ComponentPropsWithRef<"div">;

const PromptHeader = ({ className, children, ...props }: PromptHeaderProps) => {
  return (
    <div className={cn("flex flex-col gap-1.5 p-5", className)} {...props}>
      {children}
    </div>
  );
};

type PromptFooterProps = React.ComponentPropsWithRef<"div">;

const PromptFooter = ({ className, children, ...props }: PromptFooterProps) => {
  return (
    <div className={cn("flex justify-end gap-2 p-5 pt-0", className)} {...props}>
      {children}
    </div>
  );
};

type PromptTitleProps = AlertDialogBase.Title.Props;

const PromptTitle = ({ className, children, ...props }: PromptTitleProps) => {
  return (
    <AlertDialogBase.Title
      className={cn("text-lg font-semibold tracking-tight", className)}
      {...props}
    >
      {children}
    </AlertDialogBase.Title>
  );
};

type PromptDescriptionProps = AlertDialogBase.Description.Props;

const PromptDescription = ({ className, children, ...props }: PromptDescriptionProps) => {
  return (
    <AlertDialogBase.Description className={cn("text-sub text-sm", className)} {...props}>
      {children}
    </AlertDialogBase.Description>
  );
};

type PromptCancelProps = React.ComponentPropsWithRef<typeof Button>;

const PromptCancel = ({ className, children, ...props }: PromptCancelProps) => {
  return (
    <AlertDialogBase.Close
      render={
        <Button className={cn("w-full", className)} size="large" variant="outlined" {...props}>
          {children}
        </Button>
      }
    />
  );
};

type PromptActionProps = React.ComponentPropsWithRef<typeof Button>;

const PromptAction = ({ className, children, ...props }: PromptActionProps) => {
  return (
    <AlertDialogBase.Close
      render={
        <Button className={cn("w-full", className)} size="large" {...props}>
          {children}
        </Button>
      }
    />
  );
};

type PromptContentContextValue = {
  animation: PromptContentProps["animation"];
};

const [PromptContentContext, usePromptContentContext] =
  createContextFactory<PromptContentContextValue>("PromptContent");

Prompt.Trigger = AlertDialogBase.Trigger;
Prompt.Close = AlertDialogBase.Close;
Prompt.Content = PromptContent;
Prompt.Header = PromptHeader;
Prompt.Footer = PromptFooter;
Prompt.Title = PromptTitle;
Prompt.Description = PromptDescription;
Prompt.Action = PromptAction;
Prompt.Cancel = PromptCancel;

export { Prompt };
