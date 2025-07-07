import apiClient from "./index";
import type { User, LoginResponse, RecipeListResponse } from "./interface";
import type { AxiosResponse } from "axios";

export const login = (
  credentials: User
): Promise<AxiosResponse<LoginResponse>> => {
  return apiClient.post("/auth/login", JSON.stringify(credentials));
};
export const getReceipies = (): Promise<AxiosResponse<RecipeListResponse>> => {
  return apiClient.get("/recipes");
};
