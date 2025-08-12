import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ShortTextEditor = () => {
  return <Input className="text-placeholder" />;
};

const LongTextEditor = () => {
  return <Textarea className="text-placeholder" />;
};

const EmailEditor = () => {
  return <Input className="text-placeholder" />;
};

const PhoneNumberEditor = () => {
  return <Input className="text-placeholder" />;
};

export const FieldEditor = {
  ShortText: ShortTextEditor,
  LongText: LongTextEditor,
  Email: EmailEditor,
  PhoneNumber: PhoneNumberEditor,
};
