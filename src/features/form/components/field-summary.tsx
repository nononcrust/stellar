import { Tag } from "@/components/ui/tag";
import { Progress } from "@base-ui-components/react";
import { FormResponse } from "@prisma/client";
import { StellarFormField } from "../schema";

type FieldSummaryProps = {
  number: number;
  field: StellarFormField;
  responses: {
    id: FormResponse["id"];
    answers: FormResponse["answers"];
  }[];
};

export const FieldSummary = ({ number, field, responses }: FieldSummaryProps) => {
  return (
    <div className="flex flex-col">
      <div className="mb-3 flex items-center gap-2">
        <span className="bg-primary flex h-5 items-center justify-center rounded-[6px] px-1.5 text-xs font-semibold text-white">
          {number}
        </span>
        <span className="font-semibold">{field.label}</span>
        <span className="text-subtle text-[0.8125rem] font-medium">{responses.length}개 답변</span>
      </div>
      {(() => {
        switch (field.type) {
          case "SHORT_TEXT":
          case "LONG_TEXT":
          case "EMAIL":
          case "NUMBER":
          case "PHONE_NUMBER":
            const first10Responses = responses.slice(0, 10);

            return (
              <ul className="flex flex-wrap gap-2">
                {first10Responses.map((response) => (
                  <li
                    key={response.id}
                    className="border-border flex h-7 items-center justify-center rounded-sm border px-2 text-sm"
                  >
                    {response.answers[field.id]?.toString()}
                  </li>
                ))}
              </ul>
            );
          case "DROPDOWN":
          case "SINGLE_CHOICE":
            return (
              <div className="flex flex-col gap-1.5">
                {field.options.map((option) => {
                  const optionCount = responses.filter(
                    (response) => response.answers[field.id] === option.value,
                  ).length;

                  const percentage =
                    responses.length === 0 ? 0 : (optionCount / responses.length) * 100;

                  return (
                    <Progress.Root value={percentage} key={option.value}>
                      <Progress.Track className="border-border relative flex h-11 items-center overflow-hidden rounded-md border">
                        <Progress.Indicator className="bg-neutral-100" />
                        <span className="absolute top-1/2 left-3 -translate-y-1/2 text-sm font-medium">
                          {option.label}
                          <Tag className="ml-3" variant="outlined">
                            {optionCount}
                          </Tag>
                        </span>
                        <span className="text-subtle absolute top-1/2 right-3 -translate-y-1/2 text-[0.8125rem] font-medium">
                          {percentage.toFixed(0)}%
                        </span>
                      </Progress.Track>
                    </Progress.Root>
                  );
                })}
              </div>
            );
        }
      })()}
    </div>
  );
};
