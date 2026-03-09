'use client';

import type { Note } from '@/store/notesStore';

interface NoteCardProps {
  note: Note;
  onEdit: () => void;
  onDelete: () => void;
}

export default function NoteCard({ note, onEdit, onDelete }: NoteCardProps) {
  const truncateText = (text: string, length: number) => {
    return text.length > length ? text.substring(0, length) + '...' : text;
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${note.isPinned ? 'border-2 border-yellow-400' : ''}`}>
      {note.isPinned && (
        <div className="text-yellow-500 text-sm font-semibold mb-2">📌 Pinned</div>
      )}
      <h3 className="text-xl font-bold text-gray-900 mb-2">{truncateText(note.title, 50)}</h3>
      <p className="text-gray-600 text-sm mb-4">{truncateText(note.content, 150)}</p>

      {note.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {note.tags.map((tag) => (
            <span
              key={tag}
              className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex justify-between items-center text-xs text-gray-500 mb-4">
        <span>{new Date(note.createdAt).toLocaleDateString()}</span>
      </div>

      <div className="flex gap-2">
        <button
          onClick={onEdit}
          className="flex-1 bg-indigo-600 text-white px-3 py-2 rounded hover:bg-indigo-700"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="flex-1 bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
