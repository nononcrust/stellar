import { CreateFormResponseBody, GetFormResponseListQuery } from "@/server/routes/form-response";
import { queryOptions, useMutation } from "@tanstack/react-query";
import { api } from "./client";

export const formResponseApi = {
  getFormResponseList: async (query: GetFormResponseListQuery) => {
    const response = await api["form-responses"].$get({
      query: {
        page: query.page.toString(),
        limit: query.limit.toString(),
      },
    });
    return response.json();
  },
  createFormResponse: async (body: CreateFormResponseBody) => {
    const response = await api["form-responses"].$post({ json: body });
    return response.json();
  },
};

export const useCreateFormResponseMutation = () => {
  return useMutation({
    mutationFn: formResponseApi.createFormResponse,
  });
};

export const formResponseListQueryOptions = (query: GetFormResponseListQuery) =>
  queryOptions({
    queryKey: ["formResponseList", query],
    queryFn: () => formResponseApi.getFormResponseList(query),
  });
