"use client";

import { PageHeader } from "@/components/layouts/page-header";
import { Button } from "@/components/ui/button";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { IconButton } from "@/components/ui/icon-button";
import { Sheet } from "@/components/ui/sheet";
import { Table } from "@/components/ui/table";
import { Tabs } from "@/components/ui/tabs";
import { Tag } from "@/components/ui/tag";
import { CopyLinkDialog } from "@/features/form/components/copy-link-dialog";
import { FieldSummary } from "@/features/form/components/field-summary";
import { FormStatusTag } from "@/features/form/components/form-status-tag";
import { generateFormUrl } from "@/features/form/utils";
import { formDetailQueryOptions, formResponseListQueryOptions } from "@/services/dashboard/form";
import { FormResponse } from "@prisma/client";
import { Suspense } from "@suspensive/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Columns3Icon,
  DownloadIcon,
  ExternalLinkIcon,
  Link2Icon,
  MoreVerticalIcon,
  UsersRoundIcon,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { overlay } from "overlay-kit";
import { useMemo, useState } from "react";

const INITIAL_VISIBLE_COLUMNS = 4;

const columnHelper = createColumnHelper<FormResponse["answers"]>();

const FormDetailPage = Suspense.with({ fallback: null, clientOnly: true }, () => {
  const params = useParams() as { id: string };

  const { data: form } = useSuspenseQuery(formDetailQueryOptions({ id: params.id }));
  const { data: formResponses } = useSuspenseQuery(
    formResponseListQueryOptions({
      id: params.id,
      query: {
        page: 1,
        limit: 1000,
      },
    }),
  );

  return (
    <main className="mx-auto mb-16 flex max-w-4xl flex-col px-4">
      <PageHeader>
        <FormStatusTag className="w-fit" status={form.status} />
        <div className="flex justify-between gap-16">
          <PageHeader.Title className="items-center">
            {form.title}
            <Tag variant="outlined" className="ml-3 w-fit gap-1 align-middle">
              <UsersRoundIcon className="text-primary size-3" />
              {formResponses.total}
            </Tag>
          </PageHeader.Title>
          <div className="mt-0.5 flex shrink-0 items-center">
            <CopyLinkDialog
              formId={form.id}
              trigger={
                <IconButton variant="ghost" aria-label="링크 공유하기">
                  <Link2Icon className="size-4" />
                </IconButton>
              }
            />
            <IconButton
              variant="ghost"
              aria-label="폼 링크 열기"
              render={
                <Link
                  href={generateFormUrl({ id: form.id })}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLinkIcon className="size-4" />
                </Link>
              }
            />
            <IconButton variant="ghost" aria-label="메뉴">
              <MoreVerticalIcon className="size-4" />
            </IconButton>
          </div>
        </div>
      </PageHeader>
      <Tabs className="mt-4" defaultValue="summary">
        <Tabs.List className="w-full justify-start">
          <Tabs.Tab value="summary">필드별 요약</Tabs.Tab>
          <Tabs.Tab value="table">모든 응답</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="summary">
          <SummarySection />
        </Tabs.Panel>
        <Tabs.Panel value="table">
          <TableSection />
        </Tabs.Panel>
      </Tabs>
    </main>
  );
});

const SummarySection = () => {
  const params = useParams() as { id: string };

  const { data: form } = useSuspenseQuery(formDetailQueryOptions({ id: params.id }));
  const { data: formResponses } = useSuspenseQuery(
    formResponseListQueryOptions({
      id: params.id,
      query: {
        page: 1,
        limit: 1000,
      },
    }),
  );

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold">필드별 요약</h2>
      <div className="mt-6 flex flex-col gap-10">
        {form.fields.map((field, index) => (
          <FieldSummary
            number={index + 1}
            key={field.id}
            field={field}
            responses={formResponses.data.filter((response) => response.answers[field.id])}
          />
        ))}
      </div>
    </div>
  );
};

const TableSection = () => {
  const params = useParams() as { id: string };

  const { data: form } = useSuspenseQuery(formDetailQueryOptions({ id: params.id }));
  const { data: formResponses } = useSuspenseQuery(
    formResponseListQueryOptions({
      id: params.id,
      query: {
        page: 1,
        limit: 1000,
      },
    }),
  );

  const columns = useMemo(
    () => [
      columnHelper.display({
        id: "번호",
        header: "번호",
        cell: (info) => (
          <span className="border-border bg-background flex h-5 w-fit items-center justify-center rounded-[6px] border px-1.5 text-[0.8125rem]">
            {info.row.index + 1}
          </span>
        ),
        size: 40,
      }),
      ...form.fields.map((field) =>
        columnHelper.accessor(field.id, {
          header: field.label,
          cell: (info) => {
            const answer = info.getValue();

            if (Array.isArray(answer)) {
              return answer.join(", ");
            } else {
              return answer?.toString() || "-";
            }
          },
          size: 80,
        }),
      ),
    ],
    [form.fields],
  );

  const [columnVisibility, setColumnVisibility] = useState(() =>
    Object.fromEntries(
      form.fields.map((field, index) => [field.id, index < INITIAL_VISIBLE_COLUMNS]),
    ),
  );

  const data = useMemo(
    () => formResponses.data.map((response) => response.answers),
    [formResponses.data],
  );

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    rowCount: formResponses.total,
    state: {
      columnVisibility,
    },
    onColumnVisibilityChange: setColumnVisibility,
  });

  const onRowClick = () => {
    overlay.open(({ isOpen, close }) => (
      <Sheet open={isOpen} onOpenChange={(open) => !open && close()}>
        <Sheet.Content className="max-w-[480px]">hi</Sheet.Content>
      </Sheet>
    ));
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold">모든 응답</h2>
      <div className="mt-2 flex justify-end gap-1.5">
        <DropdownMenu>
          <DropdownMenu.Trigger
            render={
              <Button size="small" variant="outlined">
                <Columns3Icon className="size-3.5" />
                필드 설정
              </Button>
            }
          />
          <DropdownMenu.Content>
            <DropdownMenu.Group>
              <DropdownMenu.GroupLabel>표시할 필드</DropdownMenu.GroupLabel>
              {table.getAllColumns().map((column) => (
                <DropdownMenu.CheckboxItem
                  checked={column.getIsVisible()}
                  onCheckedChange={column.toggleVisibility}
                  key={column.id}
                >
                  {column.columnDef.header?.toString()}
                </DropdownMenu.CheckboxItem>
              ))}
            </DropdownMenu.Group>
          </DropdownMenu.Content>
        </DropdownMenu>
        <Button size="small" variant="outlined">
          <DownloadIcon className="size-3.5" />
          CSV로 다운로드
        </Button>
      </div>
      <div className="scrollbar-hide mt-2 overflow-x-auto">
        <Table>
          <Table.Header>
            {table.getHeaderGroups().map((headerGroup) => (
              <Table.Row key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Table.Head
                    className="whitespace-nowrap"
                    key={header.id}
                    colSpan={header.colSpan}
                    style={{
                      width: `${header.getSize()}px`,
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </Table.Head>
                ))}
              </Table.Row>
            ))}
          </Table.Header>
          <Table.Body>
            {table.getRowModel().rows.map((row) => (
              <Table.Row key={row.id} className="cursor-pointer" onClick={() => onRowClick()}>
                {row.getVisibleCells().map((cell) => (
                  <Table.Cell className="whitespace-nowrap" key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Cell>
                ))}
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default FormDetailPage;
