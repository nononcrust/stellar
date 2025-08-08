import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LONG_TEXT_MAX_LENGTH, SHORT_TEXT_MAX_LENGTH } from "../config";

type LongTextProps = React.ComponentPropsWithRef<typeof Textarea>;

const LongText = (props: LongTextProps) => {
  return <Textarea maxLength={LONG_TEXT_MAX_LENGTH} {...props} />;
};

type ShortTextProps = React.ComponentPropsWithRef<typeof Input>;

const ShortText = (props: ShortTextProps) => {
  return <Input maxLength={SHORT_TEXT_MAX_LENGTH} {...props} />;
};

export const Field = {
  LongText,
  ShortText,
};
