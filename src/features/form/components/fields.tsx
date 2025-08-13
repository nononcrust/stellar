import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { EMAIL_MAX_LENGTH, LONG_TEXT_MAX_LENGTH, SHORT_TEXT_MAX_LENGTH } from "../config";
import { formatToNumberOnly, formatToPhoneNumber } from "../formatter";

type FieldProps<TValue> = {
  className?: string;
  value?: TValue;
  onChange: (value: TValue) => void;
};

const LongText = ({ value, onChange, ...props }: FieldProps<string>) => {
  const onTextareaChange: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    onChange(event.target.value);
  };

  return (
    <Textarea
      placeholder={`답변을 입력해주세요. (최대 ${LONG_TEXT_MAX_LENGTH}자)`}
      value={value}
      onChange={onTextareaChange}
      maxLength={LONG_TEXT_MAX_LENGTH}
      {...props}
    />
  );
};

const ShortText = ({ value, onChange, ...props }: FieldProps<string>) => {
  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    onChange(event.target.value);
  };

  return (
    <Input
      placeholder="답변을 입력해주세요."
      value={value}
      onChange={onInputChange}
      maxLength={SHORT_TEXT_MAX_LENGTH}
      {...props}
    />
  );
};

const Email = ({ value, onChange, ...props }: FieldProps<string>) => {
  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    onChange(event.target.value);
  };

  return (
    <Input
      placeholder="이메일을 입력해주세요."
      value={value}
      onChange={onInputChange}
      maxLength={EMAIL_MAX_LENGTH}
      {...props}
    />
  );
};

const PhoneNumber = ({ value, onChange, ...props }: FieldProps<string>) => {
  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    onChange(formatToPhoneNumber(formatToNumberOnly(event.target.value)));
  };

  return (
    <Input
      placeholder="전화번호를 입력해주세요."
      value={value}
      onChange={onInputChange}
      {...props}
    />
  );
};

const Number = ({ value, onChange, ...props }: FieldProps<string>) => {
  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    onChange(formatToNumberOnly(event.target.value));
  };

  return (
    <Input placeholder="숫자를 입력해주세요." value={value} onChange={onInputChange} {...props} />
  );
};

type DropdownProps = FieldProps<string> & {
  options: { label: string; value: string }[];
};

const Dropdown = ({ value, onChange, options, ...props }: DropdownProps) => {
  return (
    <Select placeholder="답변을 선택해주세요." value={value} onChange={onChange} {...props}>
      {options.map((option) => (
        <Select.Option key={option.value} value={option.label}>
          {option.label}
        </Select.Option>
      ))}
    </Select>
  );
};

export const Field = {
  LongText,
  ShortText,
  Email,
  PhoneNumber,
  Number,
  Dropdown,
};
