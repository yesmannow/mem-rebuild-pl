# AI API Setup Guide (Gemini & OpenAI)

## Current Status

✅ Scripts updated to support **Gemini API** (preferred) and OpenAI API
✅ Gemini API is working! 🎉
✅ Scripts automatically use Gemini if available, otherwise fall back to OpenAI

## Quick Setup

### Option 1: Gemini API (Recommended - Free Tier Available)

1. **Get Your Gemini API Key:**
   - Go to: https://aistudio.google.com/
   - Sign in with your Google account
   - Click "Get API Key"
   - Create a new key or use an existing project
   - Copy the key

2. **Update `.env` File:**
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

### Option 2: OpenAI API

1. **Get Your OpenAI API Key:**
   - Go to: https://platform.openai.com/account/api-keys
   - Sign in to your OpenAI account
   - Click "Create new secret key"
   - Copy the key

2. **Update `.env` File:**
   ```env
   OPENAI_API_KEY=sk-your_openai_api_key_here
   ```

### Priority Order

The script will use APIs in this order:
1. **Gemini** (if `GEMINI_API_KEY` is set)
2. **OpenAI** (if `OPENAI_API_KEY` is set and Gemini is not available)
3. **Mock Data** (if neither API key is available)

## Verify Setup

Run this command to test:

```bash
npm run generate:quiz
```

You should see:
- `✅ Using GEMINI API` or `✅ Using OPENAI API`
- Successful generation of quiz questions and comparisons

## Available Models

### Gemini (Current)
- **Model**: `gemini-2.0-flash-exp`
- **Features**: Fast, cost-effective, JSON mode support
- **Free Tier**: Yes! Generous free tier available

### OpenAI (Fallback)
- **Model**: `gpt-4o-mini`
- **Features**: Fast, reliable, JSON mode support
- **Free Tier**: Limited

## Troubleshooting

### Error: "No AI API key found"
- Make sure at least one API key is set in `.env`
- Check that the `.env` file is in the project root
- Verify no extra spaces or quotes around the key

### Error: "API key invalid"
- **Gemini**: Verify key at https://aistudio.google.com/
- **OpenAI**: Verify key at https://platform.openai.com/account/api-keys
- Make sure the key is active and not expired

### Error: "Rate limit exceeded"
- Wait a few minutes and try again
- Check your API usage limits
- The script includes automatic delays between requests

### Error: "Quota exceeded"
- **Gemini**: Check usage at https://aistudio.google.com/
- **OpenAI**: Add credits at https://platform.openai.com/account/billing

## Current Configuration

- **Primary Provider**: Gemini (if available)
- **Fallback Provider**: OpenAI
- **Final Fallback**: Mock data
- **Temperature**: `0.7` (balanced creativity)
- **Response Format**: JSON (structured output)

## Benefits of Gemini

✅ **Free Tier Available** - Generous free usage
✅ **Fast Responses** - Quick generation times
✅ **JSON Mode** - Native support for structured output
✅ **Cost-Effective** - Lower costs than OpenAI
✅ **Reliable** - Stable API performance

## Next Steps

1. Add your `GEMINI_API_KEY` to `.env` file
2. Run `npm run generate:quiz` to generate AI-powered content
3. The script will automatically use Gemini when available

## Example `.env` File

```env
# Use Gemini (recommended)
GEMINI_API_KEY=AIzaSy...

# Or use OpenAI (fallback)
OPENAI_API_KEY=sk-proj-...

# Or use both (Gemini will be preferred)
GEMINI_API_KEY=AIzaSy...
OPENAI_API_KEY=sk-proj-...
```

