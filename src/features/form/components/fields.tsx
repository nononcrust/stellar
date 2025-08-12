import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { EMAIL_MAX_LENGTH, LONG_TEXT_MAX_LENGTH, SHORT_TEXT_MAX_LENGTH } from "../config";
import { formatToNumberOnly, formatToPhoneNumber } from "../formatter";

type FieldProps<TValue> = {
  className?: string;
  value?: TValue;
  onChange: (value: TValue) => void;
};

const LongText = ({ value, onChange }: FieldProps<string>) => {
  const onTextareaChange: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    onChange(event.target.value);
  };

  return <Textarea value={value} onChange={onTextareaChange} maxLength={LONG_TEXT_MAX_LENGTH} />;
};

const ShortText = ({ value, onChange }: FieldProps<string>) => {
  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    onChange(event.target.value);
  };

  return <Input value={value} onChange={onInputChange} maxLength={SHORT_TEXT_MAX_LENGTH} />;
};

const Email = ({ value, onChange }: FieldProps<string>) => {
  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    onChange(event.target.value);
  };

  return <Input type="email" value={value} onChange={onInputChange} maxLength={EMAIL_MAX_LENGTH} />;
};

const PhoneNumber = ({ value, onChange }: FieldProps<string>) => {
  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    onChange(formatToPhoneNumber(formatToNumberOnly(event.target.value)));
  };

  return <Input value={value} onChange={onInputChange} />;
};

export const Field = {
  LongText,
  ShortText,
  Email,
  PhoneNumber,
};
