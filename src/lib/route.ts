export const ROUTE = {
  HOME: "/",
  LOGIN: "/login",
  DASHBOARD: {
    FORM: {
      LIST: "/forms",
      DETAIL: ({ id }: { id: string }) => `/forms/${id}`,
      CREATE: "/forms/create",
      EDIT: ({ id }: { id: string }) => `/forms/${id}/edit`,
    },
  },
  FORM_RESPONSE: ({ id }: { id: string }) => `/f/${id}`,
} as const;
