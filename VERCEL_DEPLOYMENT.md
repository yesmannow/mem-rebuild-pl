# Vercel Deployment Configuration

## Project Information

This repository is connected to the following Vercel project:

**Production URL**: https://mem-rebuild-55q0c32al-gpttttys-projects.vercel.app/

## Configuration

The project uses the configuration defined in `vercel.json` which includes:

- Build Command: `npm run build`
- Output Directory: `dist`
- Dev Command: `npm run dev`
- Install Command: `npm install`

## Environment Variables

For successful deployment, ensure the following environment variables are set in Vercel:

### Required Variables
- `NODE_ENV`: Set to `production` for production deployments

### Optional Variables
- `PUPPETEER_SKIP_DOWNLOAD`: Set to `true` to skip Puppeteer browser download during build
- `AI_FEATURES_ENABLED`: Set to `false` unless AI features are needed (default: false)
- `AI_DRY_RUN`: Set to `true` for testing AI endpoints without making API calls

### API Keys (if using AI features)
- `GPT_API_KEY`: OpenAI API key (server-side only)
- `GEMINI_API_KEY`: Google Gemini API key (server-side only)

## Deployment Process

### Automatic Deployments
- Pushing to `main` branch triggers production deployment
- Pull requests create preview deployments

### Manual Deployment
```bash
# Using Vercel CLI
vercel deploy

# For production
vercel deploy --prod
```

## Build Optimization

The build process includes:
1. Pre-build checks (`scripts/prebuild-guard.cjs`)
2. Image processing (`scripts/build-images.mjs`)
3. Vite build
4. Asset optimization

### Build Performance Notes
- Image processing can take 2-5 minutes depending on the number of images
- Set `PREBUILD_PIPELINE=off` to skip content generation if not needed

## Troubleshooting

### Build Fails with Puppeteer Errors
Add environment variable: `PUPPETEER_SKIP_DOWNLOAD=true`

### Build Timeout
- Increase Vercel build timeout in project settings
- Consider disabling image optimization for faster builds during development

### Missing Assets
Ensure all referenced images exist in `public/images/` or are generated during build

## Security Headers

The following security headers are configured in `vercel.json`:
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy: camera=(), microphone=(), geolocation=()

## Cache Configuration

Optimized caching strategies:
- Static assets (JS, CSS, images): 1 year
- JSON manifests: 1 hour
- Dynamic content: No cache

## Support

For deployment issues:
1. Check Vercel deployment logs
2. Verify all environment variables are set
3. Ensure package.json scripts are working locally
4. Review vercel.json configuration

## Project Structure for Vercel

```
/
├── dist/                  # Build output (auto-generated)
├── public/               # Static assets
├── src/                  # Source code
├── vercel.json          # Vercel configuration
└── package.json         # Dependencies and scripts
```
