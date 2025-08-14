# Deployment Guide - Movy Nyt

## Railway Deployment

### Prerequisites
- GitHub repository with the code
- Railway account (https://railway.app)

### Step-by-Step Deployment

1. **Push code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Movy Nyt streaming platform"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Connect to Railway**
   - Go to https://railway.app
   - Sign in with GitHub
   - Click "New Project" > "Deploy from GitHub repo"
   - Select your Movy Nyt repository

3. **Configure Build Settings**
   Railway should automatically detect the project as a Node.js app. The following settings should be configured:

   **Build Command:**
   ```
   npm run build
   ```

   **Start Command:**
   ```
   npm run start
   ```

   **Deploy Branch:**
   ```
   main
   ```

4. **Environment Variables**
   No environment variables are required for this demo version.

5. **Deploy**
   - Railway will automatically build and deploy your application
   - The build process will:
     - Install dependencies (`npm install`)
     - Run TypeScript compilation and Vite build (`npm run build`)
     - Start the preview server (`npm run start`)

6. **Access Your App**
   - Railway will provide a URL like: `https://your-app-name.up.railway.app`
   - The app should be accessible within a few minutes

### Build Configuration Details

The project includes:
- `railway.toml` - Railway configuration
- `package.json` - Build scripts and dependencies
- `vite.config.ts` - Vite configuration optimized for production
- `tsconfig.json` - TypeScript configuration

### Troubleshooting

**Build Fails:**
- Check that all dependencies are in `package.json`
- Ensure TypeScript compilation passes locally with `npm run build`

**App Doesn't Start:**
- Verify the start command in `package.json`
- Check Railway logs for error messages

**Routing Issues:**
- Single Page Application routing should work with Vite's built-in SPA fallback

### Performance Optimization

The build includes:
- Code splitting with separate vendor and MUI chunks
- Source maps for debugging
- Optimized assets and images
- Tree shaking to remove unused code

### Post-Deployment Verification

Test the following features on the deployed app:
- Navigation between all pages
- Form interactions (authentication, search, newsletter)
- Responsive design on mobile/tablet
- Button hover effects and animations
- Image loading and floating animations

### Continuous Deployment

Railway automatically deploys when you push to the main branch:
```bash
git add .
git commit -m "Update: feature description"
git push origin main
```

The deployment will be live in 2-3 minutes after the push.
