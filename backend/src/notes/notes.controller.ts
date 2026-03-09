import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { NotesService } from './notes.service';
import { CreateNoteDto, UpdateNoteDto, NoteResponseDto } from './dto/note.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Notes')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('notes')
export class NotesController {
  constructor(private notesService: NotesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new note' })
  @ApiResponse({
    status: 201,
    description: 'Note created successfully',
    type: NoteResponseDto,
  })
  async create(@Body() createNoteDto: CreateNoteDto, @Request() req): Promise<NoteResponseDto> {
    return this.notesService.create(createNoteDto, req.user.userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all notes for the user' })
  @ApiResponse({
    status: 200,
    description: 'Notes retrieved successfully',
  })
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Request() req,
  ) {
    return this.notesService.findAll(req.user.userId, page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a note by ID' })
  @ApiResponse({
    status: 200,
    description: 'Note retrieved successfully',
    type: NoteResponseDto,
  })
  async findById(@Param('id') id: string, @Request() req): Promise<NoteResponseDto> {
    return this.notesService.findById(id, req.user.userId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a note' })
  @ApiResponse({
    status: 200,
    description: 'Note updated successfully',
    type: NoteResponseDto,
  })
  async update(
    @Param('id') id: string,
    @Body() updateNoteDto: UpdateNoteDto,
    @Request() req,
  ): Promise<NoteResponseDto> {
    return this.notesService.update(id, updateNoteDto, req.user.userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a note' })
  @ApiResponse({
    status: 200,
    description: 'Note deleted successfully',
  })
  async delete(@Param('id') id: string, @Request() req): Promise<void> {
    return this.notesService.delete(id, req.user.userId);
  }
}
