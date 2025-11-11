import fs from 'node:fs/promises';
import { glob } from 'glob';

const RAW = /#[0-9a-f]{3,8}\b/gi;
const files = await glob(['src/**/*.{tsx,ts,css}', 'public/**/*.css']);

let bad = 0;
for (const f of files) {
  const t = await fs.readFile(f, 'utf8');
  if (RAW.test(t) && !t.includes('--cs-') && !t.includes('theme(')) {
    console.log('Raw color found in', f);
    bad++;
  }
}
if (bad) {
  console.error('❌ Raw hex colors detected. Use tokens or Tailwind theme.');
  process.exit(1);
} else {
  console.log('✅ No raw hex colors detected.');
}

