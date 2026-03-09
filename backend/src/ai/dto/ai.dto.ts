import { IsString, MaxLength } from 'class-validator';

export class SummarizeDto {
  @IsString()
  @MaxLength(1000)
  text: string;
}

export class RewriteDto {
  @IsString()
  @MaxLength(1000)
  text: string;
}

export class GenerateTitleDto {
  @IsString()
  @MaxLength(1000)
  content: string;
}

export class AiResponseDto {
  result: string;
}
