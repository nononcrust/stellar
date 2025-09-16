import {
  CreateFormBody,
  UpdateFormBody,
  UpdateFormStatusBody,
} from "@/server/routes/dashboard/form";
import { Form } from "@prisma/client";
import { queryOptions, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../client";

export const dashboardFormApi = {
  getFormList: api.dashboard.forms.$get,
  getFormDetail: api.dashboard.forms[":id"].$get,
  createForm: async (body: CreateFormBody) => {
    const response = await api.dashboard.forms.$post({ json: body });
    return response.json();
  },
  updateForm: async ({ id, body }: { body: UpdateFormBody; id: string }) => {
    const response = await api.dashboard.forms[":id"].$patch({
      json: body,
      param: { id },
    });
    return response.json();
  },
  updateFormStatus: async ({ id, body }: { id: string; body: UpdateFormStatusBody }) => {
    const response = await api.dashboard.forms[":id"].status.$put({
      json: body,
      param: { id },
    });
    return response.json();
  },
  deleteForm: async ({ id }: { id: string }) => {
    const response = await api.dashboard.forms[":id"].$delete({ param: { id } });
    return response.json();
  },
  getFormResponseList: async ({
    id,
    query,
  }: {
    id: string;
    query: { page: number; limit: number };
  }) => {
    const response = await api.dashboard.forms[":id"].responses.$get({
      query: {
        page: query.page.toString(),
        limit: query.limit.toString(),
      },
      param: { id },
    });
    return response.json();
  },
};

export const formListQueryOptions = () =>
  queryOptions({
    queryKey: ["forms"],
    queryFn: async () => {
      const response = await dashboardFormApi.getFormList();
      return await response.json();
    },
  });

export const formDetailQueryOptions = (param: { id: string }) =>
  queryOptions({
    queryKey: ["forms", param],
    queryFn: async () => {
      const response = await dashboardFormApi.getFormDetail({ param });
      return await response.json();
    },
  });

export const formResponseListQueryOptions = (request: {
  id: string;
  query: { page: number; limit: number };
}) =>
  queryOptions({
    queryKey: ["formResponseList", request],
    queryFn: () => dashboardFormApi.getFormResponseList(request),
  });

export const useCreateFormMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: dashboardFormApi.createForm,
    onSuccess: async () => {
      await queryClient.invalidateQueries(formListQueryOptions());
    },
  });
};

export const useUpdateFormMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: dashboardFormApi.updateForm,
    onSuccess: async (_, { id }) => {
      await Promise.all([
        queryClient.invalidateQueries(formListQueryOptions()),
        queryClient.invalidateQueries(formDetailQueryOptions({ id })),
      ]);
    },
  });
};

export const useUpdateFormStatusMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: dashboardFormApi.updateFormStatus,
    onSuccess: async (_, { id }) => {
      await Promise.all([
        queryClient.invalidateQueries(formListQueryOptions()),
        queryClient.invalidateQueries(formDetailQueryOptions({ id })),
      ]);
    },
  });
};

export const useDeleteFormMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: dashboardFormApi.deleteForm,
    onSuccess: async (_, { id }) => {
      await queryClient.invalidateQueries(formListQueryOptions());
      queryClient.removeQueries(formDetailQueryOptions({ id }));
    },
  });
};

export const FORM_STATUS_LABEL: Record<Form["status"], string> = {
  PENDING: "시작 전",
  ACTIVE: "진행 중",
  PAUSED: "중단됨",
  CLOSED: "종료됨",
};
