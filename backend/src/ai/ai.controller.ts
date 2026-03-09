import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AiService } from './ai.service';
import { SummarizeDto, RewriteDto, GenerateTitleDto, AiResponseDto } from './dto/ai.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('AI')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('ai')
export class AiController {
  constructor(private aiService: AiService) {}

  @Post('summarize')
  @ApiOperation({ summary: 'Summarize text using AI' })
  @ApiResponse({
    status: 200,
    description: 'Text summarized successfully',
    type: AiResponseDto,
  })
  async summarize(@Body() summarizeDto: SummarizeDto): Promise<AiResponseDto> {
    return this.aiService.summarize(summarizeDto);
  }

  @Post('rewrite')
  @ApiOperation({ summary: 'Rewrite text using AI' })
  @ApiResponse({
    status: 200,
    description: 'Text rewritten successfully',
    type: AiResponseDto,
  })
  async rewrite(@Body() rewriteDto: RewriteDto): Promise<AiResponseDto> {
    return this.aiService.rewrite(rewriteDto);
  }

  @Post('generate-title')
  @ApiOperation({ summary: 'Generate title for note content using AI' })
  @ApiResponse({
    status: 200,
    description: 'Title generated successfully',
    type: AiResponseDto,
  })
  async generateTitle(@Body() generateTitleDto: GenerateTitleDto): Promise<AiResponseDto> {
    return this.aiService.generateTitle(generateTitleDto);
  }
}
