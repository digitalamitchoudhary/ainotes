# 🚀 AI Notes SaaS - Full-Stack Application

> A modern, full-stack SaaS application for intelligent note-taking with AI-powered features using Gemini API.

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](.)
[![Status](https://img.shields.io/badge/status-production%20ready-blue)](.)
[![License](https://img.shields.io/badge/license-MIT-green)](.)

## ✨ Features

### Core Functionality
- 📝 **Create, Read, Update, Delete** notes with full CRUD operations
- 🏷️ **Tag Support** - Organize notes with tags
- 📌 **Pin Notes** - Mark important notes for quick access
- 📄 **Pagination** - Efficiently browse through notes
- 🔐 **JWT Authentication** - Secure user sessions
- 👤 **User Profiles** - Register and manage accounts

### AI-Powered Features (Gemini API)
- 📊 **Summarize** - Condense long text into concise summaries
- ✍️ **Rewrite** - Improve text clarity and professionalism  
- 🎯 **Auto Title** - Generate appropriate titles for content

### User Experience
- 🌓 **Dark/Light Mode** - Theme support
- 📱 **Responsive Design** - Works on all devices
- ⚡ **Real-time Updates** - Instant feedback
- 🎨 **Modern UI** - Clean, intuitive interface
- ✅ **Form Validation** - Helpful error messages

## 🏗️ Technology Stack

### Backend
```
NestJS 11          - Progressive Node.js framework
MongoDB + Mongoose - NoSQL database
Gemini AI          - AI/ML capabilities
Passport.js + JWT  - Authentication
Swagger/OpenAPI    - API documentation
```

### Frontend
```
Next.js 16         - React framework with SSR
TypeScript         - Type-safe JavaScript
Tailwind CSS       - Utility-first styling
Zustand            - State management
React Query        - Data fetching & caching
React Hook Form    - Form handling
```

## 📦 Installation

### Prerequisites
- **Node.js** 18+ and npm
- **MongoDB Atlas** account ([Free tier available](https://www.mongodb.com/cloud/atlas/register))
- **Google Gemini API Key** ([Get it free](https://ai.google.dev/))

### Backend Setup

```bash
# Clone the repository
cd backend

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/ainotes
JWT_SECRET=your-secret-key-generate-a-random-string-min-32-chars
GEMINI_API_KEY=your-google-gemini-api-key
NODE_ENV=development
PORT=3000
EOF

# Start development server
npm run start:dev

# Application available at http://localhost:3000
# API docs at http://localhost:3000/api
```

### Frontend Setup

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Create .env.local file
cat > .env.local << EOF
NEXT_PUBLIC_API_URL=http://localhost:3000
EOF

# Start development server
npm run dev

# Application available at http://localhost:3001
```

## 🎯 Quick Start

1. **Start Backend**
   ```bash
   cd backend
   npm run start:dev
   ```

2. **Start Frontend** (in another terminal)
   ```bash
   cd frontend
   npm run dev
   ```

3. **Open Application**
   - Visit http://localhost:3001
   - Register a new account
   - Create your first note
   - Try the AI features!

## 📚 API Documentation

### Interactive API Docs
Visit `http://localhost:3000/api` for Swagger/OpenAPI documentation

### Authentication Endpoints
```
POST   /auth/register              # Create account
POST   /auth/login                 # Login
```

### Notes Endpoints
```
GET    /notes?page=1&limit=10      # List notes
GET    /notes/:id                  # Get note
POST   /notes                       # Create note
PATCH  /notes/:id                  # Update note
DELETE /notes/:id                  # Delete note
```

### AI Endpoints
```
POST   /ai/summarize               # Summarize text
POST   /ai/rewrite                 # Rewrite text
POST   /ai/generate-title          # Generate title
```

## 📋 Project Structure

```
├── backend/                    # NestJS backend
│   ├── src/
│   │   ├── auth/              # Authentication module
│   │   ├── users/             # User management
│   │   ├── notes/             # Notes CRUD
│   │   ├── ai/                # AI features
│   │   └── main.ts            # Entry point
│   └── package.json
│
├── frontend/                   # Next.js frontend
│   ├── src/
│   │   ├── app/               # Pages & routing
│   │   ├── components/        # React components
│   │   ├── services/          # API services
│   │   ├── store/             # Zustand stores
│   │   └── lib/               # Utilities
│   └── package.json
│
└── docs/                       # Documentation
    ├── COMPLETE_SETUP_GUIDE.md
    ├── FEATURES_IMPLEMENTATION.md
    └── DEPLOYMENT_CHECKLIST.md
```

## 🚀 Deployment

### Deploy Backend to Railway
```bash
# 1. Create Railway account and connect GitHub repo
# 2. Set environment variables in Railway dashboard
# 3. Push to main branch to auto-deploy
```

### Deploy Frontend to Vercel
```bash
# 1. Create Vercel account and connect GitHub repo
# 2. Set environment variable: NEXT_PUBLIC_API_URL
# 3. Push to main branch to auto-deploy
```

See [COMPLETE_SETUP_GUIDE.md](./COMPLETE_SETUP_GUIDE.md) for detailed instructions.

## 🧪 Testing

### Backend Tests
```bash
cd backend

npm run test              # Run tests
npm run test:watch       # Watch mode
npm run test:cov         # Coverage report
```

### Frontend Tests
```bash
cd frontend

npm run test             # Run tests
```

## 🏗️ Building

### Build Backend
```bash
cd backend
npm run build

# Run production build
npm run start:prod
```

### Build Frontend
```bash
cd frontend
npm run build

# Preview production build
npm run start
```

## 🔐 Security Features

- ✅ JWT-based authentication with 7-day expiration
- ✅ Bcrypt password hashing (10 salt rounds)
- ✅ Protected API routes with Guards
- ✅ CORS configuration
- ✅ Server-side API key storage
- ✅ User data isolation
- ✅ SQL injection prevention
- ✅ XSS protection

## 📊 Performance

- **Frontend**: Optimized builds, code splitting, caching
- **Backend**: Connection pooling, indexing, pagination
- **Database**: Indexed queries, proper schema design
- **API**: Response compression, efficient serialization

## 🐛 Troubleshooting

### MongoDB Connection Issues
```
Error: MONGO_URI not found in .env
Solution: Create .env file with valid MongoDB Atlas URI
```

### Gemini API Failures
```
Error: GEMINI_API_KEY is invalid
Solution: Verify API key at https://ai.google.dev/
```

### Frontend Can't Connect to Backend
```
Error: Network error when accessing /notes
Solution: Check NEXT_PUBLIC_API_URL and backend is running
```

### Tests Failing
```
Error: jest-environment-jsdom not found
Solution: Run npm install jest-environment-jsdom --save-dev
```

## 📖 Documentation

- [Complete Setup Guide](./COMPLETE_SETUP_GUIDE.md) - Detailed setup & deployment
- [Features & Implementation](./FEATURES_IMPLEMENTATION.md) - Technical architecture
- [Deployment Checklist](./DEPLOYMENT_CHECKLIST.md) - Pre-deployment verification
- [API Documentation](http://localhost:3000/api) - Interactive Swagger docs

## 🎓 Learning Resources

### Backend Stack
- [NestJS Documentation](https://docs.nestjs.com/)
- [MongoDB Manual](https://docs.mongodb.com/manual/)
- [Passport.js Guide](http://www.passportjs.org/)
- [Google Generative AI](https://ai.google.dev/)

### Frontend Stack
- [Next.js Docs](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Zustand Docs](https://github.com/pmndrs/zustand)

## 📈 Future Enhancements

- [ ] Rich text editor (Markdown, formatting)
- [ ] Collaborative editing
- [ ] Full-text search
- [ ] Note categories/organization
- [ ] Reminders & notifications
- [ ] Export to PDF/Markdown
- [ ] Mobile app (React Native)
- [ ] Offline support (Service Workers)
- [ ] Rate limiting
- [ ] Analytics dashboard

## 🤝 Contributing

This is a complete, production-ready application. Feel free to:
- Fork the repository
- Create feature branches
- Submit pull requests
- Report issues

## 📄 License

MIT License - See [LICENSE](./LICENSE) file for details

## 💬 Support

- 📚 Check the troubleshooting section above
- 📖 Review API docs at `/api`
- 🐛 Check browser console for errors
- 📋 Review server logs for backend errors

## 🎉 Built With Love

This application demonstrates:
- ✅ Modern full-stack development
- ✅ Production-ready code structure
- ✅ Security best practices
- ✅ Scalable architecture
- ✅ User-friendly interface

---

**Status**: ✅ Production Ready  
**Last Updated**: March 13, 2026  
**Version**: 1.0.0

Start building your AI-powered notes application today! 🚀
