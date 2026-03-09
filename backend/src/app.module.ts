import { Module, Logger } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { NotesModule } from './notes/notes.module';
import { AiModule } from './ai/ai.module';

const logger = new Logger('AppModule');

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(
      process.env.MONGO_URI || 'mongodb://localhost:27017/ai-notes',
      {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      }
    ),
    AuthModule,
    UsersModule,
    NotesModule,
    AiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    logger.log('AppModule initialized');
  }
}
