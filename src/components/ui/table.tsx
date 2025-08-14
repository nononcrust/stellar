import { cn } from "@/lib/utils";

type TableProps = React.ComponentPropsWithRef<"table">;

const Table = ({ className, children, ...props }: TableProps) => {
  return (
    <table className={cn("border-border w-full border-t text-sm", className)} {...props}>
      {children}
    </table>
  );
};

type TableHeaderProps = React.ComponentPropsWithRef<"thead">;

const TableHeader = ({ className, children, ...props }: TableHeaderProps) => {
  return (
    <thead className={cn("bg-background-100", className)} {...props}>
      {children}
    </thead>
  );
};

type TableHeadProps = React.ComponentPropsWithRef<"th">;

const TableHead = ({ className, children, ...props }: TableHeadProps) => {
  return (
    <th className={cn("h-12 px-3 text-left font-medium", className)} {...props}>
      {children}
    </th>
  );
};

type TableRowProps = React.ComponentPropsWithRef<"tr">;

const TableRow = ({ className, children, ...props }: TableRowProps) => {
  return (
    <tr className={cn("border-border h-12 border-b", className)} {...props}>
      {children}
    </tr>
  );
};

type TableBodyProps = React.ComponentPropsWithRef<"tbody">;

const TableBody = ({ className, children, ...props }: TableBodyProps) => {
  return (
    <tbody className={cn("", className)} {...props}>
      {children}
    </tbody>
  );
};

type TableCellProps = React.ComponentPropsWithRef<"td">;

const TableCell = ({ className, children, ...props }: TableCellProps) => {
  return (
    <td className={cn("px-3", className)} {...props}>
      {children}
    </td>
  );
};

type TableCaptionProps = React.ComponentPropsWithRef<"caption">;

const TableCaption = ({ className, children, ...props }: TableCaptionProps) => {
  return (
    <caption className={cn("", className)} {...props}>
      {children}
    </caption>
  );
};

Table.Header = TableHeader;
Table.Head = TableHead;
Table.Row = TableRow;
Table.Body = TableBody;
Table.Cell = TableCell;
Table.Caption = TableCaption;

export { Table };
