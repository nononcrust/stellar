import { Header as HeaderBase } from "@/components/layouts/header";
import { Button } from "@/components/ui/button";
import { Sheet } from "@/components/ui/sheet";
import { noop } from "es-toolkit";
import { StellarForm } from "../schema";
import { FormRenderer } from "./form-renderer";

type FormEditorPageTemplateProps = {
  header: React.ReactNode;
  editor: React.ReactNode;
};

export const FormEditorPageTemplate = ({ header, editor }: FormEditorPageTemplateProps) => {
  return (
    <>
      {header}
      <main className="mx-auto max-w-2xl px-4 py-8">{editor}</main>
    </>
  );
};

type FormEditorPageTemplateHeaderProps = {
  stellarForm: StellarForm;
  saveButton: React.ReactNode;
};

const Header = ({ saveButton, stellarForm }: FormEditorPageTemplateHeaderProps) => {
  return (
    <HeaderBase className="justify-end">
      <div className="flex items-center gap-2">
        <Sheet>
          <Sheet.Trigger
            render={
              <Button variant="outlined" size="small">
                미리보기
              </Button>
            }
          />
          <Sheet.Content className="max-w-[640px]">
            <div className="mx-auto w-full max-w-xl px-4 py-12">
              <FormRenderer stellarForm={stellarForm} onSubmit={noop} />
            </div>
          </Sheet.Content>
        </Sheet>
        {saveButton}
      </div>
    </HeaderBase>
  );
};

FormEditorPageTemplate.Header = Header;
