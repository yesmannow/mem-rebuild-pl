# Environment Variables Setup

## Overview

This project uses environment variables for configuration. Variables are stored differently depending on the deployment platform.

## Cloudflare Pages (Production)

Environment variables are configured in the Cloudflare Pages dashboard:

- `SUPABASE_URL` - Supabase project URL
- `SUPABASE_ANON_KEY` - Supabase anonymous/public API key

These are already configured in your Cloudflare Pages project settings.

## Local Development

For local development with Supabase features:

1. Create a `.env` file in the project root (already gitignored)

2. Add your Supabase credentials:
   ```bash
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

3. Access in code:
   ```typescript
   const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
   const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
   ```

**Note:** Vite requires the `VITE_` prefix for environment variables to be exposed to the client.

## Current Usage

Currently, Supabase variables are configured but not actively used in the codebase. They are prepared for future features like:

- User authentication
- Admin panel access control
- Custom color scheme persistence
- Content management features

## Security Notes

- **Never commit** `.env` files to version control
- The `.env` file is already listed in `.gitignore`
- `ANON_KEY` is safe for client-side use (it's public by design)
- For admin features, implement Row Level Security (RLS) in Supabase
- Use Supabase Auth for protected operations

## Testing

To verify environment variables are loaded:

```bash
# In your code
console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL ? 'Loaded' : 'Not loaded')
```

## Additional Resources

- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [Cloudflare Pages Environment Variables](https://developers.cloudflare.com/pages/platform/build-configuration/#environment-variables)
- [Supabase Documentation](https://supabase.com/docs)
