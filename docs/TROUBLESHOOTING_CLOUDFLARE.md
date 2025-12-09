# Cloudflare Pages Troubleshooting Guide

This guide helps you diagnose and fix common issues when deploying to Cloudflare Pages with a custom domain.

## Table of Contents

- [Error 522: Connection Timed Out](#error-522-connection-timed-out)
- [Error 521: Web Server Is Down](#error-521-web-server-is-down)
- [Error 523: Origin Is Unreachable](#error-523-origin-is-unreachable)
- [DNS Issues](#dns-issues)
- [SSL/TLS Issues](#ssltls-issues)
- [Routing Issues](#routing-issues)
- [Build Issues](#build-issues)

## Error 522: Connection Timed Out

**Symptom:** Custom domain shows "Error 522" but `*.pages.dev` URL works fine.

**Cause:** Cloudflare can reach your domain but can't connect to the origin server.

### Solution Checklist

- [ ] **Add custom domain in Cloudflare Pages dashboard**
  - Go to Workers & Pages → Your Project → Custom domains
  - Add both `example.com` AND `www.example.com`
  - Wait 5-10 minutes for activation
  
- [ ] **Verify DNS records are proxied**
  - Orange cloud (☁️) must be enabled
  - CNAME records should point to `your-project.pages.dev`
  
- [ ] **Check SSL/TLS settings**
  - Should be "Full" or "Full (strict)", not "Flexible"
  - Cloudflare Pages provides automatic SSL certificates
  
- [ ] **Wait for DNS propagation**
  - Can take 5-60 minutes
  - Test with: `nslookup yourdomain.com`

### Verification Commands

```bash
# Check DNS
dig www.yourdomain.com +short
# Should return Cloudflare IPs (104.21.x.x or 172.67.x.x)

# Test connection
curl -I https://www.yourdomain.com/
# Should return HTTP/2 200 or 301/302 redirect

# Check certificate
openssl s_client -connect www.yourdomain.com:443 -servername www.yourdomain.com < /dev/null 2>/dev/null | grep -A2 'Verify return code'
# Should return: Verify return code: 0 (ok)
```

## Error 521: Web Server Is Down

**Symptom:** "Error 521: Web server is down"

**Cause:** Origin server (Cloudflare Pages) is not responding.

### Solution Checklist

- [ ] **Check Cloudflare Pages deployment status**
  - Go to Workers & Pages → Your Project → Deployments
  - Verify latest deployment shows "Success"
  - Check deployment logs for errors
  
- [ ] **Verify build settings**
  - Build command: `npm run build`
  - Build output directory: `dist`
  - Root directory: `/` (or leave empty)
  
- [ ] **Check for build failures**
  - Review build logs in Cloudflare dashboard
  - Test build locally: `npm run build`
  - Verify dist/ contains index.html and assets/
  
- [ ] **Retry deployment**
  - Go to Deployments tab
  - Click "Retry deployment" on latest build
  - Or push a new commit to trigger rebuild

## Error 523: Origin Is Unreachable

**Symptom:** "Error 523: Origin is unreachable"

**Cause:** DNS resolution fails for origin server.

### Solution Checklist

- [ ] **Verify CNAME target is correct**
  - Should point to `your-project.pages.dev`
  - NOT to Cloudflare IPs (104.21.x.x)
  - NOT to other services
  
- [ ] **Check DNS propagation**
  - Use https://www.whatsmydns.net/
  - Verify CNAME resolves globally
  - Wait up to 48 hours for full propagation
  
- [ ] **Verify Cloudflare nameservers**
  - Your domain should use Cloudflare nameservers
  - Check with: `dig NS yourdomain.com +short`
  - Should show: `*.ns.cloudflare.com`

## DNS Issues

### DNS_PROBE_FINISHED_NXDOMAIN

**Symptom:** Browser shows "This site can't be reached" or "DNS_PROBE_FINISHED_NXDOMAIN"

**Cause:** DNS records don't exist or aren't propagated yet.

### Solution

1. **Verify DNS records exist:**
   ```bash
   nslookup www.yourdomain.com
   # Should return Cloudflare IPs, not "can't find"
   ```

2. **Check Cloudflare DNS settings:**
   - Log into Cloudflare Dashboard
   - Select your domain
   - Go to DNS → Records
   - Verify CNAME records exist with orange cloud

3. **Wait for propagation:**
   - New DNS records: 5-60 minutes
   - Changed DNS records: up to 48 hours
   - Clear DNS cache: `ipconfig /flushdns` (Windows) or `sudo dscacheutil -flushcache` (Mac)

### Wrong IP Address

**Symptom:** Site loads but shows wrong content or certificate error.

**Solution:**

1. **Verify CNAME target:**
   ```bash
   dig www.yourdomain.com CNAME +short
   # Should return: your-project.pages.dev
   ```

2. **Don't use A records for Pages:**
   - Cloudflare Pages requires CNAME records
   - A records won't work correctly
   - Convert A records to CNAME

## SSL/TLS Issues

### "This site can't provide a secure connection"

**Symptom:** ERR_SSL_PROTOCOL_ERROR or connection refused on HTTPS.

**Cause:** SSL/TLS encryption mode mismatch.

### Solution

1. **Set correct encryption mode:**
   - Go to Cloudflare Dashboard → SSL/TLS
   - Select **Full** or **Full (strict)**
   - Never use "Flexible" with Cloudflare Pages
   - Wait 5 minutes for changes to apply

2. **Verify certificate:**
   ```bash
   curl -vI https://www.yourdomain.com/
   # Look for: SSL certificate verify ok
   # Issuer should be: Cloudflare
   ```

3. **Enable "Always Use HTTPS":**
   - Go to SSL/TLS → Edge Certificates
   - Enable "Always Use HTTPS"
   - Redirects HTTP to HTTPS automatically

### Certificate Errors

**Symptom:** "NET::ERR_CERT_COMMON_NAME_INVALID" or certificate mismatch.

**Solution:**

1. **Wait for certificate provisioning:**
   - Cloudflare Pages auto-provisions certificates
   - Can take 5-30 minutes after adding custom domain
   - Check status in Custom domains tab

2. **Verify custom domain is active:**
   - Go to Workers & Pages → Your Project → Custom domains
   - Domain should show: ✅ Active, 🔒 Certificate: Active
   - If pending, wait 10-30 minutes

### Too Many Redirects

**Symptom:** ERR_TOO_MANY_REDIRECTS or redirect loop.

**Cause:** SSL/TLS encryption mode is "Flexible" instead of "Full".

**Solution:**

1. Change SSL/TLS mode to **Full** or **Full (strict)**
2. Clear browser cache and cookies
3. Test in private/incognito window
4. Check `_redirects` file doesn't have conflicting rules

## Routing Issues

### 404 on Refresh or Direct Links

**Symptom:** Homepage works, but refreshing `/about` shows 404.

**Cause:** Missing SPA routing configuration.

### Solution

Verify `public/_redirects` file exists with:

```
/*    /index.html   200
```

This enables client-side routing for React Router.

### Assets Not Loading (404)

**Symptom:** Site loads but CSS/JS files show 404 errors.

**Cause:** Incorrect base path in build configuration.

### Solution

1. **Check Vite configuration:**
   - For custom domain: `base: '/'`
   - For GitHub Pages: `base: '/repo-name/'`

2. **Verify build output:**
   ```bash
   npm run build
   ls -la dist/
   # Should contain: index.html, assets/, public/ files
   ```

3. **Check _headers file:**
   - Verify `public/_headers` sets correct MIME types
   - CSS: `Content-Type: text/css`
   - JS: `Content-Type: application/javascript`

## Build Issues

### Build Fails in Cloudflare

**Symptom:** Deployment shows "Failed" with build errors.

### Solution

1. **Test build locally:**
   ```bash
   npm install
   npm run build
   # Should complete without errors
   ```

2. **Check build settings in Cloudflare:**
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Node version: Latest (or specify in `.nvmrc`)

3. **Review build logs:**
   - Go to Deployments tab
   - Click on failed deployment
   - Review "Build log" section
   - Fix errors and redeploy

### Missing Dependencies

**Symptom:** "Cannot find module" or "Module not found" during build.

**Solution:**

1. **Verify package.json:**
   - All dependencies listed correctly
   - No typos in package names
   - Versions are compatible

2. **Lock file issues:**
   - Ensure `package-lock.json` is committed
   - Or use `pnpm-lock.yaml` with Cloudflare Pages
   - Don't commit both lock files

3. **Clear cache and rebuild:**
   - In Cloudflare: Delete and recreate project
   - Locally: Delete node_modules, reinstall

## General Debugging

### Enable Debug Mode

1. **Check Cloudflare status:**
   - https://www.cloudflarestatus.com/
   - Look for ongoing incidents

2. **Test Pages URL directly:**
   - Visit: `https://your-project.pages.dev/`
   - If this works, issue is with custom domain
   - If this fails, issue is with deployment/build

3. **Compare working vs broken:**
   - Test both `*.pages.dev` and custom domain
   - Note differences in behavior
   - Check network tab in browser DevTools

### Collect Diagnostic Information

When seeking help, provide:

1. **Error details:**
   - Full error message
   - Cloudflare Ray ID (from error page)
   - Browser and OS version

2. **Configuration:**
   ```bash
   # Run verification script
   npm run verify:cloudflare
   
   # DNS records
   dig www.yourdomain.com +short
   
   # SSL test
   curl -I https://www.yourdomain.com/
   ```

3. **Screenshots:**
   - Cloudflare Pages custom domains page
   - DNS records page
   - Error page with Ray ID

## Quick Reference

### Essential Commands

```bash
# Verify repository configuration
npm run verify:cloudflare

# Build for production
npm run build

# Test DNS resolution
nslookup www.yourdomain.com

# Test HTTPS connection
curl -I https://www.yourdomain.com/

# Check SSL certificate
openssl s_client -connect www.yourdomain.com:443 -servername www.yourdomain.com < /dev/null 2>/dev/null | grep 'Verify return code'
```

### Critical Files

- `public/_headers` - MIME types and caching
- `public/_redirects` - SPA routing
- `vite.config.js` - Build configuration
- `package.json` - Dependencies and scripts

### Support Resources

- **Cloudflare Pages Docs:** https://developers.cloudflare.com/pages/
- **Cloudflare Status:** https://www.cloudflarestatus.com/
- **DNS Propagation Checker:** https://www.whatsmydns.net/
- **SSL Checker:** https://www.sslshopper.com/ssl-checker.html

---

Still stuck? Open an issue with:
- Output of `npm run verify:cloudflare`
- Screenshots of Cloudflare configuration
- Any error messages with Ray IDs
