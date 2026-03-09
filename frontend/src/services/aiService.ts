import apiClient from '@/lib/api';

export interface SummarizeRequest {
  text: string;
}

export interface RewriteRequest {
  text: string;
}

export interface GenerateTitleRequest {
  content: string;
}

export interface AiResponse {
  result: string;
}

export const aiService = {
  summarize: async (data: SummarizeRequest): Promise<AiResponse> => {
    const response = await apiClient.post('/ai/summarize', data);
    return response.data;
  },

  rewrite: async (data: RewriteRequest): Promise<AiResponse> => {
    const response = await apiClient.post('/ai/rewrite', data);
    return response.data;
  },

  generateTitle: async (data: GenerateTitleRequest): Promise<AiResponse> => {
    const response = await apiClient.post('/ai/generate-title', data);
    return response.data;
  },
};
