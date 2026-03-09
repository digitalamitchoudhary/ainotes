'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNotesStore } from '@/store/notesStore';
import { notesService } from '@/services/notesService';
import type { Note } from '@/store/notesStore';

const noteSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  tags: z.string().optional(),
});

type NoteForm = z.infer<typeof noteSchema>;

interface CreateNoteModalProps {
  onClose: () => void;
}

export default function CreateNoteModal({ onClose }: CreateNoteModalProps) {
  const addNote = useNotesStore((state) => state.addNote);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NoteForm>({
    resolver: zodResolver(noteSchema),
  });

  const onSubmit = async (data: NoteForm) => {
    try {
      setError('');
      const tags = data.tags
        ? data.tags.split(',').map((tag) => tag.trim())
        : [];

      const createdNote = await notesService.createNote({
        title: data.title,
        content: data.content,
        tags,
      });

      addNote(createdNote as Note);
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create note');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6">
        <h2 className="text-2xl font-bold mb-4">Create New Note</h2>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              {...register('title')}
              type="text"
              placeholder="Note title..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <textarea
              {...register('content')}
              placeholder="Note content..."
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.content && (
              <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tags (comma-separated)
            </label>
            <input
              {...register('tags')}
              type="text"
              placeholder="tag1, tag2, tag3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50"
            >
              {isSubmitting ? 'Creating...' : 'Create Note'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 text-gray-800 py-2 rounded-lg font-medium hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
