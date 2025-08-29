import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  LONG_TEXT_MAX_LENGTH,
  MAX_DROPDOWN_OPTIONS,
  MAX_SINGLE_CHOICE_OPTIONS,
  SHORT_TEXT_MAX_LENGTH,
} from "../config";
import { Option, StellarFormField } from "../schema";
import { OptionEditor } from "./option-editor";

const ShortTextEditor = () => {
  return (
    <Input readOnly placeholder={`최대 ${SHORT_TEXT_MAX_LENGTH}자`} className="text-placeholder" />
  );
};

const LongTextEditor = () => {
  return (
    <Textarea
      readOnly
      placeholder={`최대 ${LONG_TEXT_MAX_LENGTH}자`}
      className="text-placeholder"
    />
  );
};

const EmailEditor = () => {
  return <Input readOnly placeholder="stellar@gmail.com" className="text-placeholder" />;
};

const PhoneNumberEditor = () => {
  return <Input readOnly placeholder="000-0000-0000" className="text-placeholder" />;
};

const NumberEditor = () => {
  return <Input readOnly placeholder="숫자만 입력 가능" className="text-placeholder" />;
};

type DropdownEditorProps = {
  field: Extract<StellarFormField, { type: "DROPDOWN" }>;
  onFieldChange: (field: Extract<StellarFormField, { type: "DROPDOWN" }>) => void;
};

const DropdownEditor = ({ field, onFieldChange }: DropdownEditorProps) => {
  const onOptionsChange = (options: Option[]) => {
    onFieldChange({
      ...field,
      options,
    });
  };

  return (
    <div className="flex flex-col">
      <OptionEditor
        options={field.options}
        onOptionsChange={onOptionsChange}
        maxOptions={MAX_DROPDOWN_OPTIONS}
      />
    </div>
  );
};

type SingleChoiceEditorProps = {
  field: Extract<StellarFormField, { type: "SINGLE_CHOICE" }>;
  onFieldChange: (field: Extract<StellarFormField, { type: "SINGLE_CHOICE" }>) => void;
};

const SingleChoiceEditor = ({ field, onFieldChange }: SingleChoiceEditorProps) => {
  const onOptionsChange = (options: Option[]) => {
    onFieldChange({
      ...field,
      options,
    });
  };

  return (
    <div className="flex flex-col">
      <OptionEditor
        options={field.options}
        onOptionsChange={onOptionsChange}
        maxOptions={MAX_SINGLE_CHOICE_OPTIONS}
      />
    </div>
  );
};

type MultipleChoiceEditorProps = {
  field: Extract<StellarFormField, { type: "MULTIPLE_CHOICE" }>;
  onFieldChange: (field: Extract<StellarFormField, { type: "MULTIPLE_CHOICE" }>) => void;
};

const MultipleChoiceEditor = ({ field, onFieldChange }: MultipleChoiceEditorProps) => {
  const onOptionsChange = (options: Option[]) => {
    onFieldChange({
      ...field,
      options,
    });
  };

  return (
    <div className="flex flex-col">
      <OptionEditor
        options={field.options}
        onOptionsChange={onOptionsChange}
        maxOptions={MAX_SINGLE_CHOICE_OPTIONS}
      />
    </div>
  );
};

export const FieldEditor = {
  ShortText: ShortTextEditor,
  LongText: LongTextEditor,
  Email: EmailEditor,
  PhoneNumber: PhoneNumberEditor,
  Number: NumberEditor,
  Dropdown: DropdownEditor,
  SingleChoice: SingleChoiceEditor,
  MultipleChoice: MultipleChoiceEditor,
};
