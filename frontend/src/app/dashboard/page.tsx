'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/store/authStore';
import { notesService } from '@/services/notesService';
import { useNotesStore } from '@/store/notesStore';
import NoteCard from '@/components/NoteCard';
import CreateNoteModal from '@/components/CreateNoteModal';
import EditNoteModal from '@/components/EditNoteModal';
import { useTheme } from '@/components/ThemeProvider';
import type { Note } from '@/store/notesStore';

export default function Dashboard() {
  const router = useRouter();
  const { user, accessToken, logout } = useAuthStore();
  const { notes, setNotes } = useNotesStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const theme = useTheme();

  useEffect(() => {
    if (!accessToken) {
      router.push('/login');
    }
  }, [accessToken, router]);

  const { data: notesData, isLoading } = useQuery({
    queryKey: ['notes', currentPage],
    queryFn: () => notesService.getNotes(currentPage, 10),
    enabled: !!accessToken,
  });

  useEffect(() => {
    if (notesData) {
      setNotes(notesData.notes as Note[]);
    }
  }, [notesData, setNotes]);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const handleDeleteNote = async (id: string) => {
    try {
      await notesService.deleteNote(id);
      setNotes(notes.filter((note) => note.id !== id));
    } catch (err) {
      console.error('Failed to delete note', err);
    }
  };

  if (!user) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}
      <header className="bg-white shadow dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">AI Notes</h1>
            <p className="text-gray-600 dark:text-gray-300">Welcome, {user.firstName}!</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Notes</h2>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800"
          >
            + New Note
          </button>
        </div>

        {isLoading ? (
          <div className="text-center text-gray-600 dark:text-gray-400">Loading notes...</div>
        ) : notes.length === 0 ? (
          <div className="text-center text-gray-600 dark:text-gray-400 py-12">
            <p>No notes yet. Create your first note!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onEdit={() => setEditingNote(note)}
                onDelete={() => handleDeleteNote(note.id)}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {notesData && notesData.total > 10 && (
          <div className="flex justify-center gap-2 mt-8">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-4 py-2">Page {currentPage}</span>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={!notesData.notes.length || notesData.notes.length < 10}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </main>

      {/* Create Note Modal */}
      {showCreateModal && (
        <CreateNoteModal onClose={() => setShowCreateModal(false)} />
      )}

      {/* Edit Note Modal */}
      {editingNote && (
        <EditNoteModal note={editingNote} onClose={() => setEditingNote(null)} />
      )}
    </div>
  );
}
