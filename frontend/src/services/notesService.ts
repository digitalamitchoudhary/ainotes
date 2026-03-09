import apiClient from '@/lib/api';

export interface CreateNoteData {
  title: string;
  content: string;
  tags?: string[];
  isPinned?: boolean;
}

export interface UpdateNoteData {
  title?: string;
  content?: string;
  tags?: string[];
  isPinned?: boolean;
}

export interface NoteResponse {
  id: string;
  title: string;
  content: string;
  tags: string[];
  isPinned: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface NotesListResponse {
  notes: NoteResponse[];
  total: number;
  page: number;
  limit: number;
}

export const notesService = {
  getNotes: async (page: number = 1, limit: number = 10): Promise<NotesListResponse> => {
    const response = await apiClient.get('/notes', {
      params: { page, limit },
    });
    return response.data;
  },

  getNoteById: async (id: string): Promise<NoteResponse> => {
    const response = await apiClient.get(`/notes/${id}`);
    return response.data;
  },

  createNote: async (data: CreateNoteData): Promise<NoteResponse> => {
    const response = await apiClient.post('/notes', data);
    return response.data;
  },

  updateNote: async (id: string, data: UpdateNoteData): Promise<NoteResponse> => {
    const response = await apiClient.patch(`/notes/${id}`, data);
    return response.data;
  },

  deleteNote: async (id: string): Promise<void> => {
    await apiClient.delete(`/notes/${id}`);
  },
};
