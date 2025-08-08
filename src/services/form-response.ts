import { useMutation } from "@tanstack/react-query";
import { api } from "./client";

export const formResponseApi = {
  createFormResponse: api["form-responses"].$post,
};

export const useCreateFormResponseMutation = () => {
  return useMutation({
    mutationFn: formResponseApi.createFormResponse,
  });
};
