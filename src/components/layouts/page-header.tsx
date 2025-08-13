import { cn } from "@/lib/utils";

type PageHeaderProps = React.ComponentPropsWithRef<"div">;

const PageHeader = ({ className, children, ...props }: PageHeaderProps) => {
  return (
    <div className={cn("mt-16 flex flex-col gap-2", className)} {...props}>
      {children}
    </div>
  );
};

type PageHeaderTitleProps = React.ComponentPropsWithRef<"h1">;

const PageHeaderTitle = ({ className, children, ...props }: PageHeaderTitleProps) => {
  return (
    <h1 className={cn("text-2xl font-bold", className)} {...props}>
      {children}
    </h1>
  );
};

type PageHeaderDescriptionProps = React.ComponentPropsWithRef<"p">;

const PageHeaderDescription = ({ className, children, ...props }: PageHeaderDescriptionProps) => {
  return (
    <p className={cn("text-subtle", className)} {...props}>
      {children}
    </p>
  );
};

PageHeader.Title = PageHeaderTitle;
PageHeader.Description = PageHeaderDescription;

export { PageHeader };
