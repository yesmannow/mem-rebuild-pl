# 🌐 Custom Domain Setup: Cloudflare → Vercel

This guide walks you through connecting your Cloudflare domain to your Vercel deployment.

---

## 📋 Prerequisites

- Domain registered with Cloudflare (or transferred to Cloudflare)
- Vercel project deployed and working
- Access to both Cloudflare and Vercel dashboards

---

## 🚀 Step-by-Step Setup

### Step 1: Add Domain in Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Navigate to **Settings** → **Domains**
4. Click **Add Domain**
5. Enter your domain:
   - `yourdomain.com` (apex/root domain)
   - `www.yourdomain.com` (www subdomain)
6. Click **Add** for each domain
7. **Copy the DNS configuration values** Vercel provides (you'll need these for Cloudflare)

---

### Step 2: Configure DNS in Cloudflare

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Select your domain
3. Go to **DNS** → **Records**
4. Configure the following records:

#### For Apex Domain (`yourdomain.com`)

**Option A: A Record (Recommended)**
```
Type: A
Name: @
Content: 76.76.21.21  (Use the IP Vercel provides - this may vary)
Proxy status: DNS only (grey cloud) ⚠️ IMPORTANT
TTL: Auto
```

**Option B: CNAME Flattening** (if Cloudflare supports it)
```
Type: CNAME
Name: @
Target: cname.vercel-dns.com
Proxy status: DNS only (grey cloud)
TTL: Auto
```

#### For WWW Subdomain (`www.yourdomain.com`)

```
Type: CNAME
Name: www
Target: cname.vercel-dns.com
Proxy status: DNS only (grey cloud) ⚠️ IMPORTANT
TTL: Auto
```

---

### ⚠️ Critical: Cloudflare Proxy Settings

**MUST USE DNS ONLY (GREY CLOUD) for Vercel records**

- ✅ **Grey Cloud (DNS Only)**: Allows Vercel to handle SSL certificates automatically
- ❌ **Orange Cloud (Proxied)**: Can interfere with Vercel's SSL certificate generation

**Why?**
- Vercel issues SSL certificates automatically via Let's Encrypt
- Cloudflare's proxy intercepts requests before they reach Vercel
- This prevents Vercel from validating domain ownership for SSL
- Results in SSL certificate errors or no SSL

**Exception:**
- You can use Cloudflare's proxy for other subdomains (like `api.yourdomain.com`)
- But **NOT** for the main domain pointing to Vercel

---

### Step 3: Wait for DNS Propagation

1. DNS changes typically propagate within 5-60 minutes
2. Check propagation status:
   ```bash
   # Check A record
   dig yourdomain.com

   # Check CNAME
   dig www.yourdomain.com
   ```
3. Or use online tools:
   - [WhatsMyDNS.net](https://www.whatsmydns.net/)
   - [DNS Checker](https://dnschecker.org/)

---

### Step 4: Verify SSL Certificate

1. Vercel automatically requests an SSL certificate from Let's Encrypt
2. This typically completes within 1-2 minutes after DNS propagation
3. Check status in Vercel Dashboard → **Settings** → **Domains**
4. You should see:
   - ✅ **Valid Configuration**
   - ✅ **SSL Certificate: Issued**

---

### Step 5: Test Your Domain

1. Visit `https://yourdomain.com` (should redirect to HTTPS automatically)
2. Visit `https://www.yourdomain.com`
3. Test redirects:
   - `http://yourdomain.com` → `https://yourdomain.com`
   - `http://www.yourdomain.com` → `https://www.yourdomain.com`
   - `www.yourdomain.com` → `yourdomain.com` (if configured)

---

## 🔧 Cloudflare SSL/TLS Settings

Even though Vercel handles SSL, you can optimize Cloudflare settings:

1. Go to **SSL/TLS** in Cloudflare
2. Set **SSL/TLS encryption mode** to:
   - **Full** or **Full (strict)** (recommended)
   - This ensures secure connection between Cloudflare and Vercel

---

## 🔄 Redirect Configuration

### Option 1: Vercel (Recommended)

Vercel can handle redirects automatically. In your `vercel.json`:

```json
{
  "redirects": [
    {
      "source": "/(.*)",
      "destination": "https://yourdomain.com/$1",
      "permanent": true
    }
  ]
}
```

### Option 2: Cloudflare Page Rules

If you want Cloudflare to handle redirects:

1. Go to **Rules** → **Page Rules**
2. Create a rule:
   - **URL Pattern**: `http://*yourdomain.com/*`
   - **Settings**:
     - **Forwarding URL**: `301 Permanent Redirect`
     - **Destination**: `https://yourdomain.com/$1`

---

## 🐛 Troubleshooting

### Issue: SSL Certificate Not Issued

**Symptoms:**
- Domain shows "Invalid Configuration" in Vercel
- Browser shows SSL errors

**Solutions:**
1. Verify DNS records are set to **DNS only (grey cloud)** in Cloudflare
2. Wait 5-10 minutes for DNS propagation
3. In Vercel, remove and re-add the domain
4. Check that records point to correct Vercel targets

### Issue: Domain Points to Wrong Site

**Solutions:**
1. Clear DNS cache:
   ```bash
   # Windows
   ipconfig /flushdns

   # macOS/Linux
   sudo dscacheutil -flushcache
   ```
2. Verify DNS records in Cloudflare match Vercel's requirements
3. Check Vercel Dashboard → Domains for specific error messages

### Issue: Slow Response Times

**Solutions:**
1. Ensure Cloudflare proxy is **OFF** (grey cloud) for Vercel records
2. Vercel's CDN is already global - Cloudflare proxy adds unnecessary latency
3. If you need Cloudflare features (WAF, DDoS protection), consider using Vercel's built-in features instead

---

## ✅ Verification Checklist

- [ ] Domain added in Vercel Dashboard
- [ ] A record created for apex domain (DNS only)
- [ ] CNAME record created for www subdomain (DNS only)
- [ ] DNS records set to **grey cloud** (DNS only, not proxied)
- [ ] DNS propagation complete (checked via dig/online tool)
- [ ] SSL certificate issued in Vercel Dashboard
- [ ] `https://yourdomain.com` loads correctly
- [ ] `https://www.yourdomain.com` loads correctly
- [ ] HTTP → HTTPS redirects work
- [ ] All pages load without SSL errors

---

## 📚 Additional Resources

- [Vercel Domain Documentation](https://vercel.com/docs/concepts/projects/domains)
- [Cloudflare DNS Documentation](https://developers.cloudflare.com/dns/)
- [Cloudflare SSL/TLS Documentation](https://developers.cloudflare.com/ssl/)

---

## 🎯 Next Steps

After domain is connected:

1. **Update URLs in Codebase** (if needed):
   - Update canonical URLs
   - Update Open Graph URLs
   - Update sitemap URLs

2. **Submit to Search Engines**:
   - Google Search Console
   - Bing Webmaster Tools

3. **Monitor Performance**:
   - Vercel Analytics
   - Cloudflare Analytics (if using)

4. **Set Up Monitoring**:
   - Uptime monitoring
   - SSL certificate monitoring

---

**Last Updated:** January 2025
**Status:** ✅ Ready for Use

