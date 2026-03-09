# Deployment Checklist

## Pre-Deployment

### Backend
- [ ] Test all endpoints locally with Postman/Insomnia
- [ ] Verify JWT authentication works
- [ ] Test all AI endpoints with valid OpenAI API key
- [ ] Check error handling and validation
- [ ] Build project: `npm run build`
- [ ] No compilation errors
- [ ] `.env` file properly configured
- [ ] All package.json scripts working

### Frontend
- [ ] Test all pages and features locally
- [ ] Verify login/register flows work
- [ ] Test CRUD operations on notes
- [ ] Test AI features integration
- [ ] Build project: `npm run build`
- [ ] No build warnings/errors
- [ ] `.env.local` configured correctly
- [ ] Tested on multiple browsers

## MongoDB Atlas Setup
- [ ] Created MongoDB account
- [ ] Created cluster
- [ ] Created database user with strong password
- [ ] Added IP whitelist entry (0.0.0.0/0 for dev or specific IPs for prod)
- [ ] Copied connection string
- [ ] Tested connection locally
- [ ] Database name in connection string matches app

## OpenAI Setup
- [ ] Created OpenAI account
- [ ] Generated API key
- [ ] Set up billing method
- [ ] Tested API calls locally
- [ ] Copied API key safely to environment

## Railway Backend Deployment
- [ ] Created Railway account with GitHub
- [ ] Connected GitHub repository
- [ ] Set environment variables:
  - [ ] MONGO_URI
  - [ ] JWT_SECRET (use strong, random value)
  - [ ] OPENAI_API_KEY
  - [ ] NODE_ENV=production
  - [ ] PORT=3000
- [ ] Build deployed successfully
- [ ] No deployment errors in logs
- [ ] Swagger API docs accessible at `/api`
- [ ] Copied production URL
- [ ] Health check endpoint `/` returns response
- [ ] Test API endpoints from deployed URL

## Vercel Frontend Deployment
- [ ] Created Vercel account with GitHub
- [ ] Connected GitHub repository
- [ ] Framework set to Next.js
- [ ] Set environment variables:
  - [ ] NEXT_PUBLIC_API_URL = Your Railway backend URL
- [ ] Build completed successfully
- [ ] No warnings/errors in build logs
- [ ] Deployment URL generated
- [ ] Frontend accessible at deployment URL
- [ ] Can navigate to login page
- [ ] Can navigate to register page

## Post-Deployment Testing
- [ ] Test register flow on production
- [ ] Test login flow on production
- [ ] Create a note on production
- [ ] Edit a note on production
- [ ] Delete a note on production
- [ ] Pin/unpin a note
- [ ] Test summarize AI feature
- [ ] Test rewrite AI feature
- [ ] Test generate title AI feature
- [ ] Test pagination
- [ ] Test logout functionality
- [ ] Verify JWT tokens work on production
- [ ] Check for CORS issues
- [ ] Monitor error logs for issues

## Security Verification
- [ ] JWT_SECRET is strong and random
- [ ] No sensitive keys in git history
- [ ] OPENAI_API_KEY not exposed in frontend
- [ ] CORS configured appropriately
- [ ] Password hashing working (bcrypt)
- [ ] No TODO or console.log statements in production code
- [ ] Database user has minimal required permissions
- [ ] Rate limiting considered

## Monitoring & Maintenance
- [ ] Set up error tracking (Sentry, LogRocket, etc.)
- [ ] Monitor API logs on Railway
- [ ] Check database storage on MongoDB Atlas
- [ ] Monitor deployment logs on Vercel
- [ ] Set up alerts for errors/failures
- [ ] Regular API key rotation schedule
- [ ] Backup strategy for database

## Domain Setup (Optional)
- [ ] Purchase or prepare domain name
- [ ] Configure DNS for Vercel (CNAME)
- [ ] Update `NEXT_PUBLIC_API_URL` in Vercel for new domain
- [ ] Update CORS in backend for production domain
- [ ] SSL certificate auto-configured by Vercel
- [ ] Test with custom domain

## Final Checks
- [ ] All URLs use HTTPS
- [ ] Database backups configured
- [ ] API documentation up to date
- [ ] Team has access to deployment platforms
- [ ] Emergency contact list for issues
- [ ] Rollback plan in place
- [ ] Performance monitoring set up
- [ ] Analytics configured (optional)

## Troubleshooting Reference

If deployment fails:
1. Check Railway/Vercel logs for errors
2. Verify environment variables are set
3. Ensure all required packages are installed
4. Test locally first before deploying
5. Check MongoDB Atlas connection string
6. Verify OpenAI API key is valid
7. Check network connectivity
8. Review error messages carefully
9. Roll back to previous version if critical issues

## Success Criteria

✅ Application loads without errors
✅ Can register a new user
✅ Can login with credentials
✅ Can create, read, update, delete notes
✅ AI features work with real OpenAI responses
✅ All links and navigation work
✅ Responsive design on mobile
✅ No console errors in browser
✅ API documentation accessible
✅ No performance issues

Deployment is complete when all items are checked and success criteria are met!
