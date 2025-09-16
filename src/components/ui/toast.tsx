import { toast as RhtToast, Toaster as RhtToaster } from "react-hot-toast";

const Toaster = () => {
  return (
    <RhtToaster
      toastOptions={{
        position: "bottom-center",
        style: {
          margin: 0,
          alignItems: "center",
          borderRadius: "1rem",
          fontWeight: 600,
          padding: "1rem",
          maxWidth: "100vw",
          backgroundColor: "var(--color-background)",
          color: "var(--color-main)",
        },
        success: {
          iconTheme: {
            primary: "var(--color-primary)",
            secondary: "var(--color-white)",
          },
        },
        error: {
          iconTheme: {
            primary: "var(--color-error)",
            secondary: "var(--color-white)",
          },
        },
      }}
    />
  );
};

const toast = RhtToast;

export { toast, Toaster };
