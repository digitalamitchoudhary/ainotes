# Quick Start Guide - AI Notes SaaS

## 🚀 Getting Started in 5 Minutes

### Prerequisites
- Node.js 18+ and npm
- A terminal/command prompt

### Step 1: Backend Setup (Terminal 1)

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file from example
cp .env.example .env

# Edit .env with MongoDB and OpenAI keys (for now, just save as is)
# Open backend/.env and update:
# - MONGO_URI: Your MongoDB Atlas connection string
# - JWT_SECRET: A random secure string
# - OPENAI_API_KEY: Your OpenAI API key

# Start development server
npm run start:dev
```

Backend will start at `http://localhost:3000`
- Swagger docs available at `http://localhost:3000/api`

### Step 2: Frontend Setup (Terminal 2)

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will start at `http://localhost:3000`

## 🔑 Getting API Keys (Required for Testing)

### 1. MongoDB Atlas (Free)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a cluster (free tier)
4. Create user in "Database Access"
5. Copy connection string to `.env` MONGO_URI

### 2. OpenAI API (Paid, but cheap)
1. Go to https://platform.openai.com
2. Create account and add payment method
3. Generate API key
4. Copy to `.env` OPENAI_API_KEY

## 🧪 Testing the Application

### 1. Register a User
- Go to `http://localhost:3000/register`
- Create account with email and password
- Click "Create Account"

### 2. Login
- Go to `http://localhost:3000/login`
- Use credentials from registration
- Click "Sign In"

### 3. Create a Note
- Click "+ New Note" button
- Fill in title and content
- Click "Create Note"

### 4. Test AI Features
- Edit a note
- Click "📝 Summarize" to summarize content
- Click "✍️ Rewrite" to rewrite professionally
- Click "✨ Title" to auto-generate title

### 5. Other Features
- Pin notes with checkbox
- Add tags (comma-separated)
- Edit and delete notes
- Navigate pages
- Logout

## 📂 Project Structure Quick Reference

```
AO/
├── backend/           # NestJS API
│   ├── src/
│   │   ├── auth/     # Login/Register
│   │   ├── notes/    # CRUD endpoints
│   │   └── ai/       # Summarize, Rewrite, Title
│   ├── .env          # Config (create from .env.example)
│   └── package.json
├── frontend/          # Next.js App
│   ├── src/
│   │   ├── app/      # Pages
│   │   ├── components/ # UI components
│   │   └── services/  # API calls
│   └── .env.local    # Config
└── README.md         # Full documentation
```

## 🔧 Common Issues & Solutions

### "Cannot connect to MongoDB"
- Check MONGO_URI in .env
- Ensure IP is whitelisted in MongoDB Atlas
- Verify credentials are correct

### "Invalid API key" for AI features
- Check OPENAI_API_KEY in .env
- Verify key is from https://platform.openai.com/api-keys
- Check account has billing enabled

### "Port 3000 already in use"
- Kill existing process: `lsof -i :3000` (Mac/Linux)
- Or change PORT in backend/.env

### Frontend can't reach backend
- Ensure backend is running on port 3000
- Check `NEXT_PUBLIC_API_URL` in frontend/.env.local
- Verify CORS is enabled (it is by default)

## 📚 Additional Resources

- **Backend API Docs:** http://localhost:3000/api (Swagger)
- **Main README:** See README.md in root directory
- **Deployment Guide:** See DEPLOYMENT_CHECKLIST.md
- **Project Completion:** See PROJECT_COMPLETION.md

## 🎯 Next Steps

1. **Local Testing:** Run the steps above and test all features
2. **Fix .env:** Add real MongoDB and OpenAI credentials
3. **Try AI Features:** Test summarize, rewrite, and title generation
4. **Deployment:** Follow DEPLOYMENT_CHECKLIST.md when ready
5. **Customize:** Modify styling, add features, deploy to production

## 💡 Development Tips

### Watch for Changes
Both `npm run start:dev` and `npm run dev` watch for file changes.

### API Testing
Use Swagger UI at http://localhost:3000/api to test endpoints without frontend.

### Debug AI Features
Make sure text is under 1000 characters and API key is valid.

### Styling
Tailwind CSS classes are available in all components. Modify colors/sizes in `src/**` files.

## ✅ Verification Checklist

- [ ] Backend running on http://localhost:3000
- [ ] Frontend running on http://localhost:3000 (in another terminal)
- [ ] Can register new user
- [ ] Can login
- [ ] Can create note
- [ ] Can edit note
- [ ] Can delete note
- [ ] Can test AI features (if OpenAI key is set)
- [ ] No errors in browser console
- [ ] No errors in terminal

## 🚢 Ready to Deploy?

Once everything works locally:

1. Push code to GitHub
2. Deploy backend to Railway.app (Backend Setup Guide)
3. Deploy frontend to Vercel (Frontend Setup Guide)
4. Update API URL in Vercel environment variables
5. Test production deployment

See full deployment guide in DEPLOYMENT_CHECKLIST.md

---

**Questions?** Check the full README.md or PROJECT_COMPLETION.md for detailed information.

Happy coding! 🎉
