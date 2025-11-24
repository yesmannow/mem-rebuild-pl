# GitHub Pages Quick Start 🚀

Get your portfolio live on GitHub Pages in minutes!

## ✅ Prerequisites

- Repository pushed to GitHub
- GitHub Actions enabled in your repository

## 🎯 One-Time Setup

### Enable GitHub Pages in Repository Settings

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. Click **Save**

That's it! GitHub Pages is now ready.

## 🚀 Deploy Your Site

### Option 1: Push to Main Branch (Automatic)
```bash
git checkout main
git merge copilot/test-github-page-build
git push origin main
```

### Option 2: Push to Test Branch (Automatic)
```bash
git push origin copilot/test-github-page-build
```

### Option 3: Manual Deployment
1. Go to **Actions** tab in GitHub
2. Click **Deploy to GitHub Pages** workflow
3. Click **Run workflow** button
4. Select branch and click **Run workflow**

## 🌐 View Your Live Site

After deployment completes (2-3 minutes):

**Visit:** https://yesmannow.github.io/mem-rebuild-pl/

## 📊 Monitor Deployment

1. Go to **Actions** tab
2. Click on the latest workflow run
3. Watch the progress:
   - ✅ Build job (installs deps, builds site)
   - ✅ Deploy job (publishes to GitHub Pages)
4. Click on **deploy** → **Deploy to GitHub Pages** to see the live URL

## 🔄 Update Your Site

Just push changes to the configured branches:

```bash
# Make your changes
git add .
git commit -m "Update portfolio content"
git push origin main  # or copilot/test-github-page-build
```

The site will automatically rebuild and redeploy!

## ⚡ Local Testing

Test the GitHub Pages build on your local machine:

```bash
# Build with GitHub Pages configuration
GITHUB_PAGES=true GITHUB_REPOSITORY=yesmannow/mem-rebuild-pl npm run build

# Preview the build
npm run preview
```

## 🐛 Troubleshooting

### Build Fails
- Check the **Actions** tab for error details
- Ensure all dependencies are in `package.json`
- Try building locally to reproduce the issue

### Pages Not Loading
- Wait 2-3 minutes after deployment
- Check **Settings** → **Pages** shows "Your site is live at..."
- Verify the workflow completed successfully

### 404 on Assets
- Ensure GitHub Actions is selected as the source (not a branch)
- Check the workflow logs for any build errors
- Verify `.nojekyll` file exists in the build

## 📚 More Information

For detailed documentation, see [GITHUB_PAGES_SETUP.md](./GITHUB_PAGES_SETUP.md)

## 🎉 Success!

Once deployed, share your portfolio:
- Main site: https://yesmannow.github.io/mem-rebuild-pl/
- Case studies: https://yesmannow.github.io/mem-rebuild-pl/#/case-studies
- Applications: https://yesmannow.github.io/mem-rebuild-pl/#/applications

Happy deploying! 🚀
