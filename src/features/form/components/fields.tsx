import { CheckboxGroup } from "@/components/ui/checkbox-group";
import { Input } from "@/components/ui/input";
import { RadioGroup } from "@/components/ui/radio-group";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { EMAIL_MAX_LENGTH, LONG_TEXT_MAX_LENGTH, SHORT_TEXT_MAX_LENGTH } from "../config";
import { formatToNumberOnly, formatToPhoneNumber } from "../formatter";
import { Option } from "../schema";

type FieldProps<TValue, TElement> = {
  className?: string;
  value?: TValue;
  onChange: (value: TValue) => void;
  ref: React.Ref<TElement>;
};

const LongText = ({ value, onChange, ...props }: FieldProps<string, HTMLTextAreaElement>) => {
  const onTextareaChange: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    onChange(event.target.value);
  };

  return (
    <Textarea
      variant="neutral"
      placeholder={`답변을 입력해주세요. (최대 ${LONG_TEXT_MAX_LENGTH}자)`}
      value={value}
      onChange={onTextareaChange}
      maxLength={LONG_TEXT_MAX_LENGTH}
      {...props}
    />
  );
};

const ShortText = ({ value, onChange, ...props }: FieldProps<string, HTMLInputElement>) => {
  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    onChange(event.target.value);
  };

  return (
    <Input
      variant="neutral"
      placeholder="답변을 입력해주세요."
      value={value}
      onChange={onInputChange}
      maxLength={SHORT_TEXT_MAX_LENGTH}
      {...props}
    />
  );
};

const Email = ({ value, onChange, ...props }: FieldProps<string, HTMLInputElement>) => {
  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    onChange(event.target.value);
  };

  return (
    <Input
      variant="neutral"
      placeholder="이메일을 입력해주세요."
      value={value}
      onChange={onInputChange}
      maxLength={EMAIL_MAX_LENGTH}
      {...props}
    />
  );
};

const PhoneNumber = ({ value, onChange, ...props }: FieldProps<string, HTMLInputElement>) => {
  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    onChange(formatToPhoneNumber(formatToNumberOnly(event.target.value)));
  };

  return (
    <Input
      variant="neutral"
      placeholder="전화번호를 입력해주세요."
      value={value}
      onChange={onInputChange}
      {...props}
    />
  );
};

const Number = ({ value, onChange, ...props }: FieldProps<string, HTMLInputElement>) => {
  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    onChange(formatToNumberOnly(event.target.value));
  };

  return (
    <Input
      variant="neutral"
      placeholder="숫자를 입력해주세요."
      value={value}
      onChange={onInputChange}
      {...props}
    />
  );
};

type DropdownProps = FieldProps<string, HTMLElement> & {
  options: Option[];
};

const Dropdown = ({ value, onChange, options, ...props }: DropdownProps) => {
  return (
    <Select
      variant="neutral"
      placeholder="답변을 선택해주세요."
      value={value}
      onChange={onChange}
      {...props}
    >
      {options.map((option) => (
        <Select.Option key={option.value} value={option.label}>
          {option.label}
        </Select.Option>
      ))}
    </Select>
  );
};

type SingleChoiceEditorProps = FieldProps<string, HTMLElement> & {
  options: Option[];
};

const SingleChoice = ({ value, onChange, options, ...props }: SingleChoiceEditorProps) => {
  return (
    <RadioGroup variant="neutral" className="mb-2" value={value} onChange={onChange} {...props}>
      {options.map((option) => (
        <RadioGroup.Option key={option.value} value={option.label}>
          {option.label}
        </RadioGroup.Option>
      ))}
    </RadioGroup>
  );
};

type MultipleChoiceEditorProps = FieldProps<string[], HTMLElement> & {
  options: Option[];
};

const MultipleChoice = ({ value, onChange, options, ...props }: MultipleChoiceEditorProps) => {
  return (
    <CheckboxGroup
      className="mb-2"
      value={value}
      onChange={onChange as (value: string[] | readonly string[]) => void}
      {...props}
    >
      {options.map((option) => (
        <CheckboxGroup.Option key={option.value} value={option.label} variant="neutral">
          {option.label}
        </CheckboxGroup.Option>
      ))}
    </CheckboxGroup>
  );
};

export const Field = {
  LongText,
  ShortText,
  Email,
  PhoneNumber,
  Number,
  Dropdown,
  SingleChoice,
  MultipleChoice,
};
