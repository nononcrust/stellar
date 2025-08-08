import { queryOptions, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../client";

export const dashboardFormApi = {
  getFormDetail: api.dashboard.forms[":id"].$get,
  createForm: api.dashboard.forms.$post,
  updateForm: api.dashboard.forms[":id"].$patch,
};

export const useCreateFormMutation = () => {
  return useMutation({
    mutationFn: dashboardFormApi.createForm,
  });
};

export const formDetailQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ["form", id],
    queryFn: async () => {
      const response = await dashboardFormApi.getFormDetail({
        param: { id },
      });

      return await response.json();
    },
  });

export const useUpdateFormMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: dashboardFormApi.updateForm,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(formDetailQueryOptions(variables.param.id));
    },
  });
};
