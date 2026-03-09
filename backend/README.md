# AI Notes Backend - NestJS API

A production-ready NestJS REST API for an AI-powered notes application with MongoDB, JWT authentication, and OpenAI integration.

## Features

- ✅ User authentication with JWT
- ✅ Full CRUD operations for notes
- ✅ AI-powered text summarization
- ✅ AI-powered text rewriting  
- ✅ AI title generation
- ✅ Input validation with Zod
- ✅ MongoDB with Mongoose
- ✅ Swagger API documentation
- ✅ CORS enabled
- ✅ Error handling

## Quick Start

```bash
# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your values

# Start development server
npm run start:dev

# Build for production
npm run build

# Start production server
npm run start:prod
```

## Environment Variables

```env
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/db?retryWrites=true&w=majority
JWT_SECRET=your_long_random_secret_key_here
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxx
NODE_ENV=development
PORT=3000
```

## API Documentation

Swagger UI available at: `http://localhost:3000/api`

### Authentication Endpoints

#### Register User
```
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123",
  "firstName": "John",
  "lastName": "Doe"
}
```

#### Login User
```
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

### Notes Endpoints

All notes endpoints require JWT token in Authorization header:
```
Authorization: Bearer <access_token>
```

- `GET /notes` - Get all notes with pagination
- `GET /notes/:id` - Get single note
- `POST /notes` - Create note
- `PATCH /notes/:id` - Update note
- `DELETE /notes/:id` - Delete note

### AI Endpoints

- `POST /ai/summarize` - Summarize text
- `POST /ai/rewrite` - Rewrite text
- `POST /ai/generate-title` - Generate title

## Project Structure

```
src/
├── auth/          # Authentication module
├── users/         # Users module
├── notes/         # Notes CRUD module
├── ai/            # AI features module
├── app.module.ts  # Root module
└── main.ts        # Application entry
```

## Development

```bash
# Start in watch mode
npm run start:dev

# Run tests
npm run test

# Lint code
npm run lint

# Format code
npm run format
```

## Deployment

See main project README for deployment instructions on Railway.

## License

MIT
