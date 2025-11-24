# GitHub Pages Setup Guide

This document explains how to deploy and test the portfolio build on GitHub Pages.

## 🚀 Quick Start

The repository is configured to automatically deploy to GitHub Pages when changes are pushed to specific branches.

### Automatic Deployment

The GitHub Actions workflow (`.github/workflows/github-pages.yml`) automatically:
1. Builds the project with the correct base path
2. Uploads the build artifacts
3. Deploys to GitHub Pages

### Triggering a Deployment

You can trigger a deployment in several ways:

1. **Push to main branch:**
   ```bash
   git push origin main
   ```

2. **Push to test branch:**
   ```bash
   git push origin copilot/test-github-page-build
   ```

3. **Manual workflow dispatch:**
   - Go to the "Actions" tab in GitHub
   - Select "Deploy to GitHub Pages" workflow
   - Click "Run workflow"

## 🔧 Configuration

### Base Path Configuration

The project uses a dynamic base path in `vite.config.js`:
- When `GITHUB_PAGES=true`: Automatically detects the repository name from `GITHUB_REPOSITORY` and uses it as the base path (e.g., `/mem-rebuild-pl/`)
- Otherwise: Uses `/` for root domain deployments (Vercel, Netlify)

This makes the configuration portable and reusable across different repositories.

### Environment Variables

The workflow sets these environment variables for optimal builds:
- `PUPPETEER_SKIP_DOWNLOAD=true` - Skips Puppeteer download (not needed for static builds)
- `SKIP_IMAGE_BUILD=true` - Skips time-consuming image processing
- `CI=true` - Enables CI mode
- `GITHUB_PAGES=true` - Configures the correct base path
- `GITHUB_REPOSITORY` - Automatically set by GitHub Actions, used to determine the base path

## 📋 GitHub Repository Settings

To enable GitHub Pages deployment, ensure the following settings are configured:

1. **Go to Repository Settings > Pages**
2. **Source:** Select "GitHub Actions"
3. **Custom domain (optional):** Configure if you want a custom domain

## 🔍 Viewing the Deployed Site

After a successful deployment:
1. Go to the "Actions" tab
2. Click on the latest workflow run
3. Look for the deployment URL in the "deploy" job output
4. Or visit: `https://yesmannow.github.io/mem-rebuild-pl/`

## 🐛 Troubleshooting

### Build Fails
- Check the Actions tab for error logs
- Ensure all dependencies are listed in `package.json`
- Verify that the build works locally with: `GITHUB_PAGES=true npm run build`

### Pages Not Loading
- Verify the base path is correctly set in `vite.config.js`
- Check browser console for 404 errors on assets
- Ensure GitHub Pages is enabled in repository settings

### Assets Not Loading
- Confirm that asset paths include the `/mem-rebuild-pl/` prefix
- Check that the `base` configuration in `vite.config.js` matches your repository name

## 🧪 Testing Locally

To test the GitHub Pages build locally:

```bash
# Build with GitHub Pages configuration
GITHUB_PAGES=true npm run build

# Preview the build
npm run preview
```

Note: When previewing locally, you may need to adjust the base path or use a local server that handles the subpath correctly.

## 📝 Workflow Details

The workflow (`.github/workflows/github-pages.yml`) includes:
- **Build job:** Installs dependencies, builds the project, and uploads artifacts
- **Deploy job:** Deploys the artifacts to GitHub Pages

### Concurrency Control
- Only one deployment runs at a time
- New deployments wait for the current one to finish
- This prevents conflicts and ensures stable deployments

## 🔄 Updating the Deployment

To update the deployed site:
1. Make your changes
2. Commit and push to main or the test branch
3. The workflow will automatically rebuild and redeploy

## 📚 Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Vite Static Deploy Guide](https://vitejs.dev/guide/static-deploy.html)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
