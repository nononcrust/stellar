import { cn } from "@/lib/utils";

type HeaderProps = React.ComponentPropsWithRef<"header">;

export const Header = ({ className, children, ...props }: HeaderProps) => {
  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 z-10",
        "h-16 px-3",
        "flex items-center",
        "bg-background/70 border-border border-b backdrop-blur-sm",
        className,
      )}
      {...props}
    >
      {children}
    </header>
  );
};
