import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log('[STARTUP] Initializing NestFactory...');
  console.log('[ENV] PORT:', process.env.PORT || 3000);
  console.log('[ENV] NODE_ENV:', process.env.NODE_ENV);
  
  try {
    const app = await NestFactory.create(AppModule, {
      logger: ['log', 'error', 'warn', 'debug'],
    });
    console.log('[STARTUP] NestFactory created');

    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }));
    console.log('[STARTUP] Global pipes configured');

    app.enableCors({
      origin: '*',
      credentials: true,
    });
    console.log('[STARTUP] CORS enabled');

    const config = new DocumentBuilder()
      .setTitle('AI Notes SaaS API')
      .setDescription('API for AI Notes application')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
    console.log('[STARTUP] Swagger configured');

    const port = process.env.PORT || 3000;
    console.log('[STARTUP] Starting to listen on port', port);
    
    await app.listen(port);
    
    console.log('');
    console.log('✅ =============================================');
    console.log(`✅ Server is running on http://localhost:${port}`);
    console.log(`✅ API Docs: http://localhost:${port}/api`);
    console.log('✅ =============================================');
    console.log('');
  } catch (error) {
    console.error('[ERROR] Bootstrap failed:', error);
    process.exit(1);
  }
}

process.on('unhandledRejection', (reason, promise) => {
  console.error('[ERROR] Unhandled Rejection:', reason);
});

bootstrap();

