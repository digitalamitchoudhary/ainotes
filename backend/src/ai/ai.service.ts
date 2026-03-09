import { Injectable, BadRequestException } from '@nestjs/common';
import OpenAI from 'openai';
import { SummarizeDto, RewriteDto, GenerateTitleDto, AiResponseDto } from './dto/ai.dto';

@Injectable()
export class AiService {
  private openai: OpenAI;

  constructor() {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY environment variable is not set');
    }
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async summarize(summarizeDto: SummarizeDto): Promise<AiResponseDto> {
    const { text } = summarizeDto;

    if (!text || text.length === 0) {
      throw new BadRequestException('Text is required');
    }

    if (text.length > 1000) {
      throw new BadRequestException('Text must not exceed 1000 characters');
    }

    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'user',
            content: `Please summarize the following text in 2-3 sentences:\n\n${text}`,
          },
        ],
        max_tokens: 500,
      });

      const result = response.choices[0].message.content || '';

      return {
        result,
      };
    } catch (error) {
      throw new BadRequestException('Failed to summarize text: ' + error.message);
    }
  }

  async rewrite(rewriteDto: RewriteDto): Promise<AiResponseDto> {
    const { text } = rewriteDto;

    if (!text || text.length === 0) {
      throw new BadRequestException('Text is required');
    }

    if (text.length > 1000) {
      throw new BadRequestException('Text must not exceed 1000 characters');
    }

    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'user',
            content: `Please rewrite the following text in a more professional and clear manner:\n\n${text}`,
          },
        ],
        max_tokens: 500,
      });

      const result = response.choices[0].message.content || '';

      return {
        result,
      };
    } catch (error) {
      throw new BadRequestException('Failed to rewrite text: ' + error.message);
    }
  }

  async generateTitle(generateTitleDto: GenerateTitleDto): Promise<AiResponseDto> {
    const { content } = generateTitleDto;

    if (!content || content.length === 0) {
      throw new BadRequestException('Content is required');
    }

    if (content.length > 1000) {
      throw new BadRequestException('Content must not exceed 1000 characters');
    }

    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'user',
            content: `Generate a concise and descriptive title for the following note content. Return only the title, nothing else:\n\n${content}`,
          },
        ],
        max_tokens: 100,
      });

      const result = response.choices[0].message.content || '';

      return {
        result,
      };
    } catch (error) {
      throw new BadRequestException('Failed to generate title: ' + error.message);
    }
  }
}
