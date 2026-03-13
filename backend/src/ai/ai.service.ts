import { Injectable, BadRequestException } from '@nestjs/common';
import { SummarizeDto, RewriteDto, GenerateTitleDto, AiResponseDto } from './dto/ai.dto';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class AiService {
  private client: GoogleGenerativeAI;
  private model: any;

  constructor() {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY environment variable is not set');
    }
    this.client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    this.model = this.client.getGenerativeModel({ model: 'gemini-2.5-flash' });
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
      const prompt = `Please summarize the following text concisely in 2-3 sentences:\n\n${text}`;
      const result = await this.model.generateContent(prompt);
      const response = result.response;
      const summary = response.text();

      return {
        result: summary,
      };
    } catch (error) {
      throw new BadRequestException('Failed to summarize text: ' + (error as Error).message);
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
      const prompt = `Please rewrite the following text in a professional and clear manner:\n\n${text}`;
      const result = await this.model.generateContent(prompt);
      const response = result.response;
      const rewrittenText = response.text();

      return {
        result: rewrittenText,
      };
    } catch (error) {
      throw new BadRequestException('Failed to rewrite text: ' + (error as Error).message);
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
      const prompt = `Generate a short, concise title for the following content:\n\n${content}`;
      const result = await this.model.generateContent(prompt);
      const response = result.response;
      const title = response.text();

      return {
        result: title,
      };
    } catch (error) {
      throw new BadRequestException('Failed to generate title: ' + (error as Error).message);
    }
  }
}
