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
    <header className="bg-background sticky top-0 right-0 left-0 z-20 flex h-16 items-center justify-end px-3">
      <div className="flex items-center gap-2">
        <Button variant="secondary" size="small">
          미리보기
        </Button>
        {saveButton}
      </div>
    </header>
  );
};

FormEditorPageTemplate.Header = Header;
