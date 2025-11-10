if (process.env.CI || process.env.CLOUDFLARE_PAGES) {
  process.env.PREBUILD_PIPELINE = 'off';
}

if (process.env.PREBUILD_PIPELINE !== 'on') {
  console.log('ℹ️ PREBUILD_PIPELINE=off → skipping any AI/content generation.');
}

// Always build image manifest
const { execSync } = require('child_process');
try {
  console.log('📸 Building image manifest...');
  execSync('npm run images:build', { stdio: 'inherit' });
} catch (error) {
  console.warn('⚠️ Image build failed, continuing anyway:', error.message);
}

// Always build datasets (demos.json and gallery.json)
try {
  console.log('📊 Building datasets...');
  execSync('npm run datasets:build', { stdio: 'inherit' });
} catch (error) {
  console.warn('⚠️ Dataset build failed, continuing anyway:', error.message);
}

