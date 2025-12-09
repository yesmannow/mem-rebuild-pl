# 🚨 QUICK FIX: Error 522 on www.bearcavemarketing.com

## The Problem

Your Cloudflare Pages site (`mem-rebuild-pl.pages.dev`) works perfectly, but your custom domain (`www.bearcavemarketing.com`) shows **Error 522: Connection Timed Out**.

## The Solution (5 minutes)

### ✅ Step 1: Add Custom Domain in Cloudflare Pages

This is the **most likely missing step**:

1. Go to https://dash.cloudflare.com/
2. Select your account
3. Click **Workers & Pages** in the left sidebar
4. Find and click **mem-rebuild-pl**
5. Click the **Custom domains** tab at the top
6. Click **Set up a custom domain** button
7. Enter: `bearcavemarketing.com` → Click **Continue**
8. Cloudflare will verify your DNS records → Click **Activate domain**
9. **Repeat** for `www.bearcavemarketing.com`:
   - Click **Set up a custom domain** again
   - Enter: `www.bearcavemarketing.com` → Click **Continue**
   - Click **Activate domain**

**Wait 5-10 minutes** for activation to complete.

### ✅ Step 2: Verify Your DNS Records

Your DNS records look correct, but double-check:

1. Go to Cloudflare Dashboard → Select **bearcavemarketing.com** domain
2. Click **DNS** → **Records**
3. Verify you have these records:

   | Type  | Name | Target | Proxy Status |
   |-------|------|--------|--------------|
   | CNAME | @    | mem-rebuild-pl.pages.dev | Proxied (Orange ☁️) |
   | CNAME | www  | bearcavemarketing.com | Proxied (Orange ☁️) |

4. **Important:** Both records MUST have the orange cloud icon enabled (Proxied)

### ✅ Step 3: Check SSL/TLS Settings

1. In Cloudflare Dashboard, go to **SSL/TLS** (left sidebar)
2. Verify encryption mode is set to **Full** or **Full (strict)**
3. If it's set to "Flexible", change it to **Full**

### ✅ Step 4: Wait and Test

1. **Wait 5-60 minutes** for changes to propagate
2. Test your site:
   - Open https://www.bearcavemarketing.com/ in a private/incognito window
   - Clear your browser cache if needed
3. Check DNS propagation: https://www.whatsmydns.net/#CNAME/www.bearcavemarketing.com

## Why This Happens

**Error 522** means Cloudflare can't connect to the origin server. With Cloudflare Pages:

- Your DNS points to Cloudflare ✅ (CNAME records configured)
- Cloudflare tries to connect to `mem-rebuild-pl.pages.dev` ✅ (exists)
- BUT Cloudflare Pages doesn't know about your custom domain ❌ (not added in dashboard)

**Solution:** Tell Cloudflare Pages about your custom domain by adding it in the dashboard (Step 1 above).

## Verification Commands

Run these commands to verify your configuration:

```bash
# Check repository configuration
npm run verify:cloudflare

# Check DNS resolution
nslookup www.bearcavemarketing.com
# Should show Cloudflare IPs: 104.21.x.x or 172.67.x.x

# Test SSL certificate
curl -I https://www.bearcavemarketing.com/
# Should return HTTP/2 200
```

## Still Not Working?

If you've completed all steps and still see Error 522 after 1 hour:

1. **Check Cloudflare Status:** https://www.cloudflarestatus.com/
2. **Review Pages Deployment:**
   - Go to Cloudflare Dashboard → Workers & Pages → mem-rebuild-pl
   - Check **Deployments** tab for any build failures
   - Latest deployment should be "Success"

3. **Verify Custom Domain Status:**
   - In Custom domains tab, both domains should show:
     - ✅ Active (green checkmark)
     - 🔒 Certificate: Active

4. **Contact Cloudflare Support:**
   - Provide the Ray ID from the error page (e.g., `9ab12fec4eb4b4c1`)
   - Mention you've added custom domains in Pages dashboard
   - Include screenshots of your DNS and Pages configuration

## Repository Status

✅ Your repository is **correctly configured** for Cloudflare Pages:
- `public/_headers` file exists and is properly formatted
- `public/_redirects` file exists with SPA routing
- `vite.config.js` uses root path (`/`) for custom domains
- Build configuration is correct

**The issue is NOT in your code** - it's a Cloudflare dashboard configuration.

## Need More Help?

📖 **Detailed guide:** [docs/CLOUDFLARE_CUSTOM_DOMAIN_SETUP.md](./docs/CLOUDFLARE_CUSTOM_DOMAIN_SETUP.md)

📧 **Questions?** Open an issue in this repository with:
- Screenshots of Cloudflare Pages custom domains page
- Output of `npm run verify:cloudflare`
- Results of `nslookup www.bearcavemarketing.com`

---

**TL;DR:** Add your custom domains in Cloudflare Pages dashboard (Step 1 above). Wait 10 minutes. Your site will work. ✨
