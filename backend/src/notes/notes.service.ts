import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Note } from './schema/note.schema';
import { CreateNoteDto, UpdateNoteDto, NoteResponseDto } from './dto/note.dto';

@Injectable()
export class NotesService {
  constructor(@InjectModel(Note.name) private noteModel: Model<Note>) {}

  async create(createNoteDto: CreateNoteDto, userId: string): Promise<NoteResponseDto> {
    const note = await this.noteModel.create({
      ...createNoteDto,
      userId,
    });

    return this.formatNoteResponse(note);
  }

  async findAll(userId: string, page: number = 1, limit: number = 10): Promise<{
    notes: NoteResponseDto[];
    total: number;
    page: number;
    limit: number;
  }> {
    const skip = (page - 1) * limit;
    const notes = await this.noteModel
      .find({ userId })
      .sort({ isPinned: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await this.noteModel.countDocuments({ userId });

    return {
      notes: notes.map((note) => this.formatNoteResponse(note)),
      total,
      page,
      limit,
    };
  }

  async findById(id: string, userId: string): Promise<NoteResponseDto> {
    const note = await this.noteModel.findById(id);

    if (!note) {
      throw new NotFoundException('Note not found');
    }

    if (note.userId.toString() !== userId) {
      throw new ForbiddenException('You do not have permission to access this note');
    }

    return this.formatNoteResponse(note);
  }

  async update(id: string, updateNoteDto: UpdateNoteDto, userId: string): Promise<NoteResponseDto> {
    const note = await this.noteModel.findById(id);

    if (!note) {
      throw new NotFoundException('Note not found');
    }

    if (note.userId.toString() !== userId) {
      throw new ForbiddenException('You do not have permission to update this note');
    }

    const updatedNote = await this.noteModel.findByIdAndUpdate(id, updateNoteDto, {
      new: true,
    });

    if (!updatedNote) {
      throw new NotFoundException('Note not found');
    }

    return this.formatNoteResponse(updatedNote);
  }

  async delete(id: string, userId: string): Promise<void> {
    const note = await this.noteModel.findById(id);

    if (!note) {
      throw new NotFoundException('Note not found');
    }

    if (note.userId.toString() !== userId) {
      throw new ForbiddenException('You do not have permission to delete this note');
    }

    await this.noteModel.findByIdAndDelete(id);
  }

  private formatNoteResponse(note: Note): NoteResponseDto {
    return {
      id: note._id.toString(),
      title: note.title,
      content: note.content,
      tags: note.tags,
      isPinned: note.isPinned,
      createdAt: note.createdAt,
      updatedAt: note.updatedAt,
      userId: note.userId.toString(),
    };
  }
}
