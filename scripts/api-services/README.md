# API Services

A collection of free, no-auth-required API service integrations for enhancing the portfolio site with images, metadata, and utility features.

## 📦 Services

### 1. Favicon Fetcher
Extract website favicons and logos using multiple providers with automatic fallback.

**File:** `favicon-fetcher.js`

**Features:**
- Multiple API providers (Favicone, Favicon.pub, Google S2)
- Automatic fallback handling
- Batch processing
- Manifest generation
- Size optimization

**Usage:**
```bash
# Fetch single favicon
node scripts/api-services/favicon-fetcher.js google.com

# Fetch multiple favicons
node scripts/api-services/favicon-fetcher.js github.com twitter.com facebook.com

# Custom size and output
node scripts/api-services/favicon-fetcher.js example.com --size=128 --output=./logos

# Generate manifest
node scripts/api-services/favicon-fetcher.js google.com --manifest=./data/logos.json
```

**Providers:**
- **Favicone** (Primary): `https://favicone.com/:domain`
- **Favicon.pub** (Fallback): `https://favicon.pub/:domain`
- **Google S2** (Fallback): `https://www.google.com/s2/favicons`

### 2. Image Provider
High-quality stock images and placeholders from Unsplash and Lorem Picsum.

**File:** `image-provider.js`

**Features:**
- Unsplash API integration for stock photos
- Lorem Picsum for placeholders
- Search functionality
- Random image generation
- Batch downloading

**Usage:**
```bash
# Search Unsplash
node scripts/api-services/image-provider.js search "technology" --count=5

# Get random images
node scripts/api-services/image-provider.js random --orientation=landscape

# Generate placeholders
node scripts/api-services/image-provider.js placeholder 800 600

# Download images
node scripts/api-services/image-provider.js search "business" --download --output=./images
```

**Environment:**
Set `UNSPLASH_API_KEY` for Unsplash access (optional, get free key at https://unsplash.com/developers)

### 3. Metadata Extractor
Extract comprehensive metadata from any website URL.

**File:** `metadata-extractor.js`

**Features:**
- Title, description, images extraction
- Open Graph metadata
- Twitter Card data
- Favicon detection
- Author and keywords
- Automatic fallback to HTML parsing

**Usage:**
```bash
# Extract metadata
node scripts/api-services/metadata-extractor.js https://example.com

# Multiple URLs
node scripts/api-services/metadata-extractor.js https://github.com https://google.com

# Save to file
node scripts/api-services/metadata-extractor.js https://example.com --output=metadata.json

# Skip API, use HTML parser only
node scripts/api-services/metadata-extractor.js https://example.com --no-jsonlink
```

**What it extracts:**
- Page title
- Meta description
- Primary image
- Favicon URL
- Open Graph tags
- Twitter Card data
- Author information
- Keywords

### 4. Utility Services
Miscellaneous API utilities for avatars, QR codes, demo data, and more.

**File:** `utility-services.js`

**Features:**
- UI Avatars for profile images
- QR Code generation
- RandomUser for demo data
- Advice Slip for quotes
- JokeAPI for developer humor

**Usage:**
```bash
# Generate avatar
node scripts/api-services/utility-services.js avatar "John Doe"
node scripts/api-services/utility-services.js avatar "Jane Smith" --size=256 --background=ff0000

# Generate QR code
node scripts/api-services/utility-services.js qr "https://example.com" --output=qr.png

# Generate demo users
node scripts/api-services/utility-services.js users 5 --gender=female

# Get random advice
node scripts/api-services/utility-services.js advice

# Get programming joke
node scripts/api-services/utility-services.js joke --safe
```

## 🚀 Integration Examples

### Example 1: Fetch Client Logos for Case Studies
```bash
# Fetch logos for all case study clients
node scripts/api-services/favicon-fetcher.js \
  graston.com \
  example-client.com \
  another-client.com \
  --output=public/images/logos/clients \
  --manifest=src/data/client-logos.json
```

### Example 2: Generate Hero Images
```bash
# Search for technology-themed images
export UNSPLASH_API_KEY=your_key_here
node scripts/api-services/image-provider.js search "technology workspace" \
  --count=10 \
  --orientation=landscape \
  --download \
  --output=public/images/hero
```

### Example 3: Extract Inspiration Site Metadata
```bash
# Extract metadata from inspiration sites
node scripts/api-services/metadata-extractor.js \
  https://dribbble.com \
  https://behance.net \
  https://awwwards.com \
  --output=src/data/inspiration-metadata.json
```

### Example 4: Generate Testimonial Avatars
```bash
# Generate avatars for testimonials
node scripts/api-services/utility-services.js avatar "Sarah Johnson"
node scripts/api-services/utility-services.js avatar "Michael Chen" --background=007bff
node scripts/api-services/utility-services.js avatar "Emily Rodriguez" --background=28a745
```

## 📋 NPM Scripts Integration

Add to `package.json`:
```json
{
  "scripts": {
    "fetch:favicons": "node scripts/api-services/favicon-fetcher.js",
    "fetch:images": "node scripts/api-services/image-provider.js",
    "extract:metadata": "node scripts/api-services/metadata-extractor.js",
    "generate:avatars": "node scripts/api-services/utility-services.js avatar",
    "generate:qr": "node scripts/api-services/utility-services.js qr"
  }
}
```

Usage:
```bash
npm run fetch:favicons -- google.com github.com
npm run fetch:images -- search "technology" --count=5
npm run extract:metadata -- https://example.com --output=metadata.json
```

## 🔒 Security & Privacy

All services used:
- ✅ Are free to use
- ✅ Require no authentication (except optional Unsplash)
- ✅ Use HTTPS
- ✅ Support CORS for client-side use
- ✅ Have no tracking or data collection
- ✅ Are production-ready and reliable

## 📊 Rate Limits

| Service | Free Tier Limit |
|---------|----------------|
| Favicone | Unlimited |
| Favicon.pub | Unlimited (with attribution) |
| Google S2 | Unlimited |
| Unsplash | 50 requests/hour |
| Lorem Picsum | Unlimited |
| JsonLink | Limited (fallback available) |
| UI Avatars | Unlimited |
| QR Code API | Unlimited |
| RandomUser | Unlimited |
| Advice Slip | ~0.5 req/sec |
| JokeAPI | 120 req/min |

## 🛠️ Technical Details

### Dependencies
- `cheerio` - HTML parsing for metadata extraction
- Standard Node.js `fetch` API (Node 18+)
- No additional dependencies required

### File Structure
```
scripts/api-services/
├── favicon-fetcher.js       # Logo/favicon extraction
├── image-provider.js        # Stock images & placeholders
├── metadata-extractor.js    # Website metadata
├── utility-services.js      # Avatars, QR codes, etc.
└── README.md               # This file
```

### Error Handling
All services include:
- Automatic retry with exponential backoff
- Graceful fallback to alternative providers
- Detailed error logging
- Non-breaking failures (returns null on error)

### Caching Strategy
Consider implementing:
- File system caching for downloaded assets
- In-memory caching for API responses
- TTL-based cache invalidation
- Cache manifest files for tracking

## 🎯 Use Cases

### For Portfolio Site
1. **Case Studies**: Fetch client logos automatically
2. **Hero Images**: High-quality backgrounds from Unsplash
3. **Testimonials**: Generated avatars for anonymous quotes
4. **Contact**: QR codes for vCard or calendar links
5. **Links**: Rich preview cards with metadata
6. **Loading States**: Placeholder images during content load
7. **Demo Data**: Realistic user profiles for mockups
8. **404 Page**: Random jokes or advice for entertainment

### For Development
1. **Prototyping**: Quick placeholder images and avatars
2. **Testing**: Generate demo data with RandomUser
3. **Design System**: Consistent avatar generation
4. **Documentation**: QR codes for links
5. **Branding**: Research competitor logos and colors

## 📖 Additional Resources

- [Public APIs Repository](https://github.com/public-apis/public-apis)
- [Unsplash API Documentation](https://unsplash.com/documentation)
- [Favicone GitHub](https://github.com/fransallen/favicone)
- [Lorem Picsum](https://picsum.photos/)
- [UI Avatars](https://ui-avatars.com/)
- [QR Server API](https://goqr.me/api/)
- [RandomUser.me](https://randomuser.me/)

## 🤝 Contributing

To add new API services:
1. Research the API (check public-apis repo)
2. Verify it's free and requires no auth (or minimal auth)
3. Create a new service class in appropriate file
4. Add CLI commands for testing
5. Document usage and examples
6. Update this README

## 📝 License

These scripts are part of the portfolio project and use free public APIs. Ensure compliance with individual API terms of service:
- Unsplash: Requires attribution
- Favicon.pub: Recommends attribution
- Others: Generally no attribution required

Always check the latest terms of service for each API provider.
