'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNotesStore } from '@/store/notesStore';
import { notesService } from '@/services/notesService';
import { aiService } from '@/services/aiService';
import type { Note } from '@/store/notesStore';

const noteSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  tags: z.string().optional(),
  isPinned: z.boolean().optional(),
});

type NoteForm = z.infer<typeof noteSchema>;

interface EditNoteModalProps {
  note: Note;
  onClose: () => void;
}

export default function EditNoteModal({ note, onClose }: EditNoteModalProps) {
  const updateNote = useNotesStore((state) => state.updateNote);
  const [error, setError] = useState('');
  const [aiLoading, setAiLoading] = useState<string | null>(null);
  const [aiMessage, setAiMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
  } = useForm<NoteForm>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      title: note.title,
      content: note.content,
      tags: note.tags.join(', '),
      isPinned: note.isPinned,
    },
  });

  const contentValue = watch('content');
  const titleValue = watch('title');

  const handleSummarize = async () => {
    if (!contentValue || contentValue.length === 0) {
      setAiMessage('Please add content to summarize');
      return;
    }

    try {
      setAiLoading('summarize');
      setAiMessage('');
      const result = await aiService.summarize({ text: contentValue });
      setValue('content', result.result);
      setAiMessage('Content summarized successfully');
      setTimeout(() => setAiMessage(''), 3000);
    } catch (err: any) {
      setAiMessage(err.response?.data?.message || 'Failed to summarize');
    } finally {
      setAiLoading(null);
    }
  };

  const handleRewrite = async () => {
    if (!contentValue || contentValue.length === 0) {
      setAiMessage('Please add content to rewrite');
      return;
    }

    try {
      setAiLoading('rewrite');
      setAiMessage('');
      const result = await aiService.rewrite({ text: contentValue });
      setValue('content', result.result);
      setAiMessage('Content rewritten successfully');
      setTimeout(() => setAiMessage(''), 3000);
    } catch (err: any) {
      setAiMessage(err.response?.data?.message || 'Failed to rewrite');
    } finally {
      setAiLoading(null);
    }
  };

  const handleGenerateTitle = async () => {
    if (!contentValue || contentValue.length === 0) {
      setAiMessage('Please add content to generate a title');
      return;
    }

    try {
      setAiLoading('generateTitle');
      setAiMessage('');
      const result = await aiService.generateTitle({ content: contentValue });
      setValue('title', result.result);
      setAiMessage('Title generated successfully');
      setTimeout(() => setAiMessage(''), 3000);
    } catch (err: any) {
      setAiMessage(err.response?.data?.message || 'Failed to generate title');
    } finally {
      setAiLoading(null);
    }
  };

  const onSubmit = async (data: NoteForm) => {
    try {
      setError('');
      const tags = data.tags
        ? data.tags.split(',').map((tag) => tag.trim())
        : [];

      const updatedNote = await notesService.updateNote(note.id, {
        title: data.title,
        content: data.content,
        tags,
        isPinned: data.isPinned,
      });

      updateNote(updatedNote as Note);
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update note');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Edit Note</h2>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded text-red-600">
            {error}
          </div>
        )}

        {aiMessage && (
          <div className={`mb-4 p-4 rounded ${aiMessage.includes('Failed') ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-green-50 text-green-600 border border-green-200'}`}>
            {aiMessage}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <div className="flex gap-2">
              <input
                {...register('title')}
                type="text"
                placeholder="Note title..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="button"
                onClick={handleGenerateTitle}
                disabled={aiLoading === 'generateTitle' || !contentValue}
                className="bg-purple-600 text-white px-3 py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50"
                title="Generate title using AI"
              >
                {aiLoading === 'generateTitle' ? '⚡' : '✨'} Title
              </button>
            </div>
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

          {/* AI Action Buttons */}
          <div className="flex gap-2 mb-4">
            <button
              type="button"
              onClick={handleSummarize}
              disabled={aiLoading === 'summarize' || !contentValue}
              className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 text-sm"
            >
              {aiLoading === 'summarize' ? '⚡ Summarizing...' : '📝 Summarize'}
            </button>
            <button
              type="button"
              onClick={handleRewrite}
              disabled={aiLoading === 'rewrite' || !contentValue}
              className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 text-sm"
            >
              {aiLoading === 'rewrite' ? '⚡ Rewriting...' : '✍️ Rewrite'}
            </button>
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

          <div>
            <label className="flex items-center gap-2">
              <input
                {...register('isPinned')}
                type="checkbox"
                className="w-4 h-4"
              />
              <span className="text-sm font-medium text-gray-700">Pin this note</span>
            </label>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
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
