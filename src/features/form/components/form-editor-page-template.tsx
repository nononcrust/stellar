import { Header as HeaderBase } from "@/components/layouts/header";
import { Button } from "@/components/ui/button";

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
  saveButton: React.ReactNode;
};

const Header = ({ saveButton }: FormEditorPageTemplateHeaderProps) => {
  return (
    <HeaderBase className="justify-end">
      <div className="flex items-center gap-2">
        <Button variant="outlined" size="small">
          미리보기
        </Button>
        {saveButton}
      </div>
    </HeaderBase>
  );
};

FormEditorPageTemplate.Header = Header;
