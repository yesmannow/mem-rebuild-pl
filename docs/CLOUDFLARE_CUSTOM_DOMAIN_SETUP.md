# Cloudflare Pages Custom Domain Setup Guide

## Problem: Error 522 on Custom Domain

If you're seeing "Error 522: Connection Timed Out" on your custom domain (like `www.bearcavemarketing.com`) but the Cloudflare Pages URL (like `mem-rebuild-pl.pages.dev`) works fine, this guide will help you fix it.

## Root Cause

**Error 522 means Cloudflare can't connect to your origin server.** When using Cloudflare Pages with a custom domain, you need to:
1. Configure DNS records (which you've done ✅)
2. **Add the custom domain in Cloudflare Pages dashboard** ← This is likely missing

## Step-by-Step Fix

### 1. Add Custom Domain in Cloudflare Pages Dashboard

1. Go to the [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Select your account
3. Navigate to **Workers & Pages** → **Pages**
4. Select your project: `mem-rebuild-pl`
5. Go to the **Custom domains** tab
6. Click **Set up a custom domain**
7. Enter your domain: `bearcavemarketing.com`
8. Click **Continue**
9. Cloudflare will verify your DNS records
10. Repeat for `www.bearcavemarketing.com`

### 2. Verify DNS Records

Your DNS records should look like this:

```
Type    Name                          Target                      Proxied
CNAME   bearcavemarketing.com         mem-rebuild-pl.pages.dev    Yes (Orange cloud)
CNAME   www.bearcavemarketing.com     bearcavemarketing.com       Yes (Orange cloud)
```

**Important:** Ensure the orange cloud icon is enabled (proxied) for both records.

### 3. Wait for DNS Propagation

- DNS changes can take 5-48 hours to propagate globally
- Check propagation status: https://www.whatsmydns.net/
- Test your domain: `https://www.bearcavemarketing.com/`

### 4. Verify SSL/TLS Settings

1. In Cloudflare Dashboard, go to **SSL/TLS**
2. Ensure SSL/TLS encryption mode is set to **Full** or **Full (strict)**
3. If using **Full (strict)**, Cloudflare Pages automatically provides an SSL certificate

## Common Issues and Solutions

### Issue: "This site can't provide a secure connection"

**Solution:** Check SSL/TLS settings:
- Go to Cloudflare Dashboard → SSL/TLS
- Change encryption mode to **Full** (not Flexible)
- Wait 5-10 minutes for certificate provisioning

### Issue: "DNS_PROBE_FINISHED_NXDOMAIN"

**Solution:** DNS records not configured correctly:
- Verify CNAME records point to `mem-rebuild-pl.pages.dev`
- Ensure records are proxied (orange cloud)
- Check DNS propagation with `nslookup www.bearcavemarketing.com`

### Issue: "Too many redirects"

**Solution:** Redirect loop caused by SSL mismatch:
- Set SSL/TLS mode to **Full** or **Full (strict)**
- Clear browser cache and cookies
- Check for conflicting redirect rules in `_redirects` file

### Issue: Site works on apex but not www (or vice versa)

**Solution:** Missing custom domain in Pages:
- Add BOTH `bearcavemarketing.com` AND `www.bearcavemarketing.com` in Cloudflare Pages custom domains
- Each subdomain must be added separately

## Testing Your Configuration

### 1. Test DNS Resolution

```bash
# Check if DNS points to Cloudflare
nslookup www.bearcavemarketing.com

# Should return Cloudflare IP addresses like:
# 104.21.x.x or 172.67.x.x
```

### 2. Test SSL Certificate

```bash
# Check SSL certificate
curl -vI https://www.bearcavemarketing.com/

# Look for:
# SSL certificate verify ok
# issuer: C=US; O=Cloudflare...
```

### 3. Test Page Load

```bash
# Test HTTP response
curl -I https://www.bearcavemarketing.com/

# Should return:
# HTTP/2 200
# server: cloudflare
```

## Repository Configuration

This repository is already configured for Cloudflare Pages deployment:

### ✅ `public/_headers` File

Configures proper MIME types and caching for assets:
- JavaScript modules served with `application/javascript`
- CSS files served with `text/css`
- Long-term caching for hashed assets
- Service worker configuration

### ✅ `public/_redirects` File

Enables client-side routing for single-page application:
```
/*    /index.html   200
```

This ensures all routes work correctly with React Router.

### ✅ `vite.config.js` Configuration

- Uses `base: '/'` for root domain deployment (default)
- Handles GitHub Pages deployment with `base: '/mem-rebuild-pl/'` when `GITHUB_PAGES=true`
- Optimized build output for Cloudflare Pages

## Build and Deploy

### Build for Cloudflare Pages

```bash
# Standard build (for custom domain with root path)
npm run build

# Output will be in dist/ directory
```

### Deploy via Cloudflare Dashboard

1. Cloudflare will auto-deploy from your GitHub repository
2. Or manually upload `dist/` folder in Cloudflare Pages dashboard
3. Or use Wrangler CLI:

```bash
# Install Wrangler (if not already installed)
npm install -g wrangler

# Deploy to Cloudflare Pages
wrangler pages publish dist --project-name=mem-rebuild-pl
```

## Quick Checklist

- [ ] Custom domains added in Cloudflare Pages dashboard (both apex and www)
- [ ] DNS records configured with CNAME to `mem-rebuild-pl.pages.dev`
- [ ] Orange cloud (proxy) enabled for DNS records
- [ ] SSL/TLS mode set to **Full** or **Full (strict)**
- [ ] Waited 5-60 minutes for DNS propagation
- [ ] Tested domain with `curl` or browser

## Additional Resources

- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Custom Domains on Cloudflare Pages](https://developers.cloudflare.com/pages/configuration/custom-domains/)
- [Cloudflare DNS Documentation](https://developers.cloudflare.com/dns/)
- [Troubleshooting Error 522](https://developers.cloudflare.com/support/troubleshooting/cloudflare-errors/troubleshooting-cloudflare-5xx-errors/#error-522-connection-timed-out)

## Support

If you continue to experience issues after following this guide:

1. Check [Cloudflare Status](https://www.cloudflarestatus.com/) for ongoing incidents
2. Review Cloudflare Pages deployment logs for build errors
3. Contact Cloudflare support with your Ray ID from the error page
4. Open an issue in this repository with detailed error information

---

**Note:** This is a DNS/hosting configuration issue, not a code issue. The repository is correctly configured for Cloudflare Pages deployment.
