# AI Notes SaaS - Full Stack Application

A fully functional AI-powered notes application with Next.js frontend, NestJS backend, MongoDB database, and OpenAI integration.

## Project Structure

```
AO/
├── backend/          # NestJS API server
│   ├── src/
│   │   ├── auth/     # Authentication module
│   │   ├── users/    # Users module
│   │   ├── notes/    # Notes CRUD module
│   │   ├── ai/       # AI features module
│   │   └── main.ts   # Application entry point
│   ├── .env          # Environment variables
│   └── package.json
├── frontend/         # Next.js 14 application
│   ├── src/
│   │   ├── app/      # App Router pages
│   │   ├── components/
│   │   ├── services/
│   │   ├── store/
│   │   └── lib/
│   ├── .env.local    # Environment variables
│   └── package.json
└── README.md
```

## Prerequisites

- Node.js 18+ and npm
- Git
- Accounts for: MongoDB Atlas, OpenAI, Vercel, Railway

## Local Setup

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file with:
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/ai-notes?retryWrites=true&w=majority
JWT_SECRET=your_secure_jwt_secret_here_change_in_production
OPENAI_API_KEY=sk-xxxxxxxxxxxx
NODE_ENV=development
PORT=3000
```

4. Start development server:
```bash
npm run start:dev
```

Backend runs at `http://localhost:3000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file with:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

4. Start development server:
```bash
npm run dev
```

Frontend runs at `http://localhost:3000`

## Deployment Guide

### Step 1: Database Setup (MongoDB Atlas)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account if you don't have one
3. Create a new cluster:
   - Click "Create Deployment"
   - Choose "Free" tier
   - Select your preferred region
   - Create a cluster (takes 2-3 minutes)

4. Create database user:
   - Go to "Database Access"
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Set username and password (save these!)
   - Add user

5. Configure network access:
   - Go to "Network Access"
   - Click "Add IP Address"
   - Select "Allow Access from Anywhere" (for development)
   - Confirm

6. Get connection string:
   - Go to "Databases"
   - Click "Connect" on your cluster
   - Choose "Drivers"
   - Copy the connection string
   - Replace `<username>`, `<password>`, and database name

### Step 2: OpenAI API Setup

1. Go to [OpenAI Platform](https://platform.openai.com)
2. Sign up or log in
3. Navigate to "API Keys"
4. Click "Create new secret key"
5. Copy and save the API key securely

### Step 3: Backend Deployment (Railway)

1. Go to [Railway.app](https://railway.app)
2. Sign up with GitHub (easiest option)
3. Create a new project
4. Connect your GitHub repository or import this project
5. Create environment variables:
   - Click "Add Variable"
   - Add all variables from your `.env` file:
     - `MONGO_URI`
     - `JWT_SECRET`
     - `OPENAI_API_KEY`
     - `NODE_ENV=production`
6. Deploy:
   - Railway auto-detects Node.js
   - Builds and deploys automatically
7. Get your backend URL:
   - Go to "Deployments"
   - Click on the deployment
   - You'll see your production URL

### Step 4: Frontend Deployment (Vercel)

1. Go to [Vercel](https://vercel.com)
2. Sign up with GitHub
3. Click "New Project"
4. Import your GitHub repository
5. Framework: Select "Next.js"
6. Set environment variables:
   - `NEXT_PUBLIC_API_URL` = Your Railway backend URL (from Step 3)
7. Deploy
8. Your frontend is now live at `https://your-project-name.vercel.app`

## API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - User login

### Notes
- `GET /notes` - Get all notes (pagination)
- `GET /notes/:id` - Get single note
- `POST /notes` - Create note
- `PATCH /notes/:id` - Update note
- `DELETE /notes/:id` - Delete note

### AI Features
- `POST /ai/summarize` - Summarize text
- `POST /ai/rewrite` - Rewrite text
- `POST /ai/generate-title` - Generate title for content

All endpoints (except auth) require JWT token in Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Query** - Data fetching and caching
- **Zustand** - State management
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Axios** - HTTP client

### Backend
- **NestJS** - Node.js framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **Passport.js** - Authentication middleware
- **OpenAI API** - AI features
- **Swagger** - API documentation

## Features

✅ User authentication (register/login)
✅ Create, read, update, delete notes
✅ Note pinning
✅ Note tagging
✅ Pagination
✅ AI-powered summarization
✅ AI-powered text rewriting
✅ AI title generation
✅ JWT-based authorization
✅ Real-time validation
✅ Responsive design
✅ Production-ready deployment

## Environment Variables Reference

### Backend `.env`
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key_for_jwt
OPENAI_API_KEY=your_openai_api_key
NODE_ENV=development|production
PORT=3000
```

### Frontend `.env.local`
```
NEXT_PUBLIC_API_URL=http://localhost:3000|your_deployed_backend_url
```

## Security Considerations

⚠️ **Important for Production:**

1. Change `JWT_SECRET` to a strong, random string
2. Use environment variables for all sensitive data
3. Enable HTTPS on your domain
4. Set `NODE_ENV` to `production` in Railway
5. Restrict MongoDB network access to your IP/app
6. Rotate API keys regularly
7. Implement rate limiting
8. Use CORS appropriately

## Troubleshooting

### MongoDB Connection Failed
- Check your IP is whitelisted on MongoDB Atlas
- Verify connection string has correct username/password
- Ensure database name exists

### CORS Errors
- Backend CORS is enabled for all origins in dev
- Update main.ts for production: `origin: 'https://your-frontend-url.com'`

### AI Features Not Working
- Verify OpenAI API key is correct
- Check API quota and billing
- Ensure text doesn't exceed 1000 characters

### Build Failures
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Check Node.js version requirements

## Development Commands

### Backend
```bash
npm run start        # Production start
npm run start:dev    # Development mode (watch)
npm run build        # Build TypeScript
npm run test         # Run tests
```

### Frontend
```bash
npm run dev          # Development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## Support & Documentation

- **Backend Docs**: `http://localhost:3000/api` (Swagger UI)
- **Next.js Docs**: https://nextjs.org/docs
- **NestJS Docs**: https://docs.nestjs.com
- **MongoDB Atlas**: https://docs.atlas.mongodb.com

## License

MIT

## Author

Created as a full-stack SaaS project example with modern web technologies.
