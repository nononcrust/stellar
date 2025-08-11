import { cn } from "@/lib/utils";

type CardProps = React.ComponentPropsWithRef<"div">;

const Card = ({ className, children, ...props }: CardProps) => {
  return (
    <div
      className={cn("border-border bg-background flex flex-col rounded-lg border p-4", className)}
      {...props}
    >
      {children}
    </div>
  );
};

export { Card };
