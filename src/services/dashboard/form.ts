import { Form } from "@prisma/client";
import { queryOptions, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../client";

export const dashboardFormApi = {
  getFormList: api.dashboard.forms.$get,
  getFormDetail: api.dashboard.forms[":id"].$get,
  createForm: async () => {
    const response = await api.dashboard.forms.$post();
    return response.json();
  },
  updateForm: api.dashboard.forms[":id"].$patch,
  deleteForm: api.dashboard.forms[":id"].$delete,
};

export const useCreateFormMutation = () => {
  return useMutation({
    mutationFn: dashboardFormApi.createForm,
  });
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

export const useUpdateFormMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: dashboardFormApi.updateForm,
    onSuccess: async (_, { param }) => {
      await queryClient.invalidateQueries(formDetailQueryOptions(param));
    },
  });
};

export const useDeleteFormMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: dashboardFormApi.deleteForm,
    onSuccess: async (_, { param }) => {
      await queryClient.invalidateQueries(formListQueryOptions());
      queryClient.removeQueries(formDetailQueryOptions(param));
    },
  });
};

export const FORM_STATUS_LABEL: Record<Form["status"], string> = {
  PENDING: "시작 전",
  ACTIVE: "진행 중",
  ENDED: "종료됨",
};
