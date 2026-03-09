import { create } from 'zustand';

export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  isPinned: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface NotesState {
  notes: Note[];
  currentNote: Note | null;
  isLoading: boolean;
  setNotes: (notes: Note[]) => void;
  addNote: (note: Note) => void;
  updateNote: (note: Note) => void;
  removeNote: (id: string) => void;
  setCurrentNote: (note: Note | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useNotesStore = create<NotesState>((set) => ({
  notes: [],
  currentNote: null,
  isLoading: false,

  setNotes: (notes) => set({ notes }),
  
  addNote: (note) =>
    set((state) => ({
      notes: [note, ...state.notes],
    })),
  
  updateNote: (updatedNote) =>
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === updatedNote.id ? updatedNote : note
      ),
      currentNote: state.currentNote?.id === updatedNote.id ? updatedNote : state.currentNote,
    })),
  
  removeNote: (id) =>
    set((state) => ({
      notes: state.notes.filter((note) => note.id !== id),
      currentNote: state.currentNote?.id === id ? null : state.currentNote,
    })),
  
  setCurrentNote: (note) => set({ currentNote: note }),
  
  setLoading: (loading) => set({ isLoading: loading }),
}));
