export interface User {
  username: string;
  password: string;
  expiresInMins?: string;
}

export interface LoginResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
}

export interface Recipe {
  id: number;
  name: string;
  image: string;
  difficulty: string;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
}

export interface RecipeListResponse {
  recipes: Recipe[];
  total: number;
  skip: number;
  limit: number;
}

