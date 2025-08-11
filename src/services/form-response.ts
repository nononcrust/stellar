import { CreateFormResponseBody } from "@/server/routes/form-response";
import { useMutation } from "@tanstack/react-query";
import { api } from "./client";

export const formResponseApi = {
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
