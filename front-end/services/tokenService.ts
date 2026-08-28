import api from "../lib/api";

export interface ExternalToken {
  id: string;
  serviceName: string;
  token: string;
  apiUrl?: string | null;
  description: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrUpsertTokenInput {
  serviceName: string;
  token: string;
  apiUrl?: string | null;
  description?: string;
  isActive?: boolean;
}

export interface UpdateTokenInput {
  serviceName?: string;
  token?: string;
  apiUrl?: string | null;
  description?: string;
  isActive?: boolean;
}

export const tokenService = {
  getAll: async (): Promise<ExternalToken[]> => {
    const response = await api.get<ExternalToken[]>("/tokens");
    return response.data;
  },

  getById: async (id: string): Promise<ExternalToken> => {
    const response = await api.get<ExternalToken>(`/tokens/${id}`);
    return response.data;
  },

  getByServiceName: async (serviceName: string): Promise<ExternalToken> => {
    const response = await api.get<ExternalToken>(`/tokens/service/${serviceName}`);
    return response.data;
  },

  createOrUpsert: async (data: CreateOrUpsertTokenInput): Promise<ExternalToken> => {
    const response = await api.post<ExternalToken>("/tokens", data);
    return response.data;
  },

  update: async (id: string, data: UpdateTokenInput): Promise<ExternalToken> => {
    const response = await api.put<ExternalToken>(`/tokens/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<{ message: string }> => {
    const response = await api.delete<{ message: string }>(`/tokens/${id}`);
    return response.data;
  },
};
