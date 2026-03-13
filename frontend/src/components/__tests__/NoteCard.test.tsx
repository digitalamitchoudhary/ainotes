import { render, screen, fireEvent } from '@testing-library/react';
import NoteCard from '../NoteCard';

describe('NoteCard', () => {
  const mockNote = {
    id: '1',
    title: 'Test Note',
    content: 'This is a test note.',
    tags: ['test', 'note'],
    isPinned: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    userId: 'user1',
  };

  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();

  it('renders the note title and content', () => {
    render(<NoteCard note={mockNote} onEdit={mockOnEdit} onDelete={mockOnDelete} />);

    expect(screen.getByText('Test Note')).toBeInTheDocument();
    expect(screen.getByText(/This is a test note/)).toBeInTheDocument();
  });

  it('calls onEdit when the Edit button is clicked', () => {
    render(<NoteCard note={mockNote} onEdit={mockOnEdit} onDelete={mockOnDelete} />);

    fireEvent.click(screen.getByText('Edit'));
    expect(mockOnEdit).toHaveBeenCalledTimes(1);
  });

  it('calls onDelete when the Delete button is clicked', () => {
    render(<NoteCard note={mockNote} onEdit={mockOnEdit} onDelete={mockOnDelete} />);

    fireEvent.click(screen.getByText('Delete'));
    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });
});