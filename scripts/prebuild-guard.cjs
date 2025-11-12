if (process.env.CI || process.env.CLOUDFLARE_PAGES) {
  process.env.PREBUILD_PIPELINE = 'off';
}

if (process.env.PREBUILD_PIPELINE !== 'on') {
  console.log('ℹ️ PREBUILD_PIPELINE=off → skipping any AI/content generation.');
}

// Skip image build if explicitly requested (useful for CI or fast local builds)
if (process.env.SKIP_IMAGE_BUILD === '1' || process.env.SKIP_IMAGE_BUILD === 'true') {
  console.log('⏭️  SKIP_IMAGE_BUILD=1 → skipping image manifest build');
  process.exit(0);
}

// Always build image manifest with timeout
const { execSync, spawn } = require('child_process');
const TIMEOUT_MS = 120000; // 2 minutes timeout

function runWithTimeout(command, args, timeout) {
  return new Promise((resolve, reject) => {
    const proc = spawn(command, args, { stdio: 'inherit', shell: true });
    let finished = false;

    const timeoutId = setTimeout(() => {
      if (!finished) {
        finished = true;
        proc.kill('SIGTERM');
        reject(new Error(`Command timed out after ${timeout}ms`));
      }
    }, timeout);

    proc.on('exit', (code) => {
      if (!finished) {
        finished = true;
        clearTimeout(timeoutId);
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`Command exited with code ${code}`));
        }
      }
    });

    proc.on('error', (err) => {
      if (!finished) {
        finished = true;
        clearTimeout(timeoutId);
        reject(err);
      }
    });
  });
}

(async () => {
  let exitCode = 0;

  // Always build image manifest
  try {
    console.log('📸 Building image manifest...');
    await runWithTimeout('npm', ['run', 'images:build'], TIMEOUT_MS);
  } catch (error) {
    console.warn('⚠️ Image build failed or timed out, continuing anyway:', error.message);
    // Don't exit with error - allow build to continue
  }

  // Always build datasets (demos.json and gallery.json)
  try {
    console.log('📊 Building datasets...');
    execSync('npm run datasets:build', { stdio: 'inherit', timeout: 30000 });
  } catch (error) {
    console.warn('⚠️ Dataset build failed, continuing anyway:', error.message);
    // Don't exit with error - allow build to continue
  }

  process.exit(exitCode);
})();

