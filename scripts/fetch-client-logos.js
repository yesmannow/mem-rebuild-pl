import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

// Parse command line arguments
const args = process.argv.slice(2);
const domainsArg = args.find(arg => arg.startsWith('--domains='));
const apiArg = args.find(arg => arg.startsWith('--api='));

const domains = domainsArg ? domainsArg.split('=')[1].split(',') : [];
const apiProvider = apiArg ? apiArg.split('=')[1] : 'logosnap';

const LOGOS_DIR = path.join(ROOT, 'public/images/logos/clients');
const MANIFEST_PATH = path.join(ROOT, 'src/data/client-logos.json');

// API configurations
const API_CONFIGS = {
  logosnap: {
    baseUrl: 'https://logosnap.io/api',
    requiresToken: true,
    tokenEnv: 'LOGOSNAP_TOKEN',
  },
  brandlogos: {
    baseUrl: 'https://brandlogos.org/api/get/images',
    requiresToken: true,
    tokenEnv: 'BRANDLOGOS_API_KEY',
  },
};

async function fetchLogo(domain, apiConfig) {
  const token = process.env[apiConfig.tokenEnv];

  if (!token && apiConfig.requiresToken) {
    throw new Error(`API token required. Set ${apiConfig.tokenEnv} environment variable.`);
  }

  let url;
  if (apiProvider === 'logosnap') {
    url = `${apiConfig.baseUrl}/${domain}?token=${token}`;
  } else if (apiProvider === 'brandlogos') {
    // BrandLogos requires SHA256 hash of API key + brand name
    const crypto = await import('crypto');
    const hash = crypto.createHash('sha256').update(token + domain).digest('hex');
    url = `${apiConfig.baseUrl}/?brand=${domain}&size=medium&format=png&token=${hash}`;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API returned ${response.status}`);
    }

    if (apiProvider === 'logosnap') {
      const data = await response.json();
      return data.logo || data.url;
    } else {
      const data = await response.json();
      return data.logo_url || data.url;
    }
  } catch (error) {
    console.error(`Error fetching logo for ${domain}:`, error.message);
    return null;
  }
}

async function downloadLogo(logoUrl, domain) {
  try {
    const response = await fetch(logoUrl);
    if (!response.ok) throw new Error(`Download failed: ${response.status}`);

    const buffer = await response.arrayBuffer();
    const ext = logoUrl.split('.').pop() || 'png';
    const filename = `${domain.replace(/\./g, '-')}.${ext}`;
    const filepath = path.join(LOGOS_DIR, filename);

    await fs.mkdir(LOGOS_DIR, { recursive: true });
    await fs.writeFile(filepath, Buffer.from(buffer));

    return { filename, path: `/images/logos/clients/${filename}` };
  } catch (error) {
    console.error(`Error downloading logo for ${domain}:`, error.message);
    return null;
  }
}

async function main() {
  if (domains.length === 0) {
    console.error('Usage: node scripts/fetch-client-logos.js --domains="company1.com,company2.com" [--api=logosnap|brandlogos]');
    process.exit(1);
  }

  const apiConfig = API_CONFIGS[apiProvider];
  if (!apiConfig) {
    console.error(`Unknown API provider: ${apiProvider}`);
    process.exit(1);
  }

  console.log(`Fetching logos for ${domains.length} domain(s) using ${apiProvider}...\n`);

  const manifest = [];

  for (const domain of domains) {
    console.log(`Fetching logo for ${domain}...`);
    const logoUrl = await fetchLogo(domain, apiConfig);

    if (!logoUrl) {
      console.log(`  ✗ Failed to fetch logo\n`);
      continue;
    }

    const logoData = await downloadLogo(logoUrl, domain);
    if (logoData) {
      manifest.push({
        domain,
        filename: logoData.filename,
        path: logoData.path,
        fetchedAt: new Date().toISOString(),
      });
      console.log(`  ✓ Saved: ${logoData.filename}\n`);
    }
  }

  // Save manifest
  await fs.writeFile(
    MANIFEST_PATH,
    JSON.stringify({ logos: manifest }, null, 2)
  );

  console.log(`✓ Complete! Manifest saved to ${MANIFEST_PATH}`);
}

main().catch(console.error);

