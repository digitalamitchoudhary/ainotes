import { IsString, IsArray, IsBoolean, IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateNoteDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsArray()
  @IsOptional()
  tags?: string[];

  @IsBoolean()
  @IsOptional()
  isPinned?: boolean;
}

export class UpdateNoteDto extends PartialType(CreateNoteDto) {}

export class NoteResponseDto {
  id: string;
  title: string;
  content: string;
  tags: string[];
  isPinned: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}
