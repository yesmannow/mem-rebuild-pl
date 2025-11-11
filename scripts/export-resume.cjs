// scripts/export-resume.cjs

const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const DIST = path.join(ROOT, 'dist');
const OUT_DIR = path.join(DIST, 'resume');
const OUT_FILE = path.join(OUT_DIR, 'index.html');

const DATA_PATHS = [
  path.join(ROOT, 'src', 'data', 'resume.json'),
  path.join(ROOT, 'public', 'resume.json'),
];

function readResumeData() {
  for (const p of DATA_PATHS) {
    if (fs.existsSync(p)) {
      try {
        return JSON.parse(fs.readFileSync(p, 'utf8'));
      } catch (e) {
        console.error('Failed to parse resume data at', p, e);
      }
    }
  }
  return null;
}

function renderHtml(resume) {
  const title = `${resume?.name || 'Resume'} - ${resume?.title || ''}`;
  const description = resume?.summary || resume?.executiveSummary || '';
  const contact = resume?.contact?.email || resume?.links?.email || '';

  const experienceHtml = (resume?.experience || [])
    .map(item => `
      <article class="exp">
        <h3>${escapeHtml(item.role || '')} — ${escapeHtml(item.company || '')}</h3>
        <p class="meta">${escapeHtml(item.dates || '')}${item.location ? ' • ' + escapeHtml(item.location) : ''}</p>
        <div class="desc">${escapeHtml(item.summary || '')}</div>
        ${item.achievements && item.achievements.length > 0 ? `
          <ul class="achievements">
            ${item.achievements.slice(0, 5).map(ach => `<li>${escapeHtml(ach)}</li>`).join('')}
          </ul>
        ` : ''}
      </article>
    `).join('\n');

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>${escapeHtml(title)}</title>
<meta name="description" content="${escapeHtml(description.substring(0, 160))}"/>
<link rel="canonical" href="/resume"/>
<style>
  body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#111;padding:28px;max-width:900px;margin:0 auto;line-height:1.6}
  header h1{margin:0;font-size:1.8rem;font-weight:600}
  header p{margin:4px 0 18px;color:#555;font-size:1rem}
  header .contact{margin-top:8px;color:#666;font-size:0.9rem}
  main{margin-top:32px}
  .exp{margin:24px 0;padding:16px 0;border-top:1px solid #eee}
  .exp:first-child{border-top:none;padding-top:0}
  .exp h3{margin:0 0 8px;font-size:1.2rem;font-weight:600}
  .meta{color:#666;font-size:0.9rem;margin:4px 0}
  .desc{margin:8px 0;color:#333}
  .achievements{margin:8px 0 0 20px;color:#444;font-size:0.95rem}
  .achievements li{margin:4px 0}
  footer{margin-top:48px;padding-top:24px;border-top:1px solid #eee;color:#888;font-size:0.85rem;text-align:center}
  @media print{
    body{padding:0}
    .exp{page-break-inside:avoid}
  }
</style>
</head>
<body>
<header>
  <h1>${escapeHtml(resume?.name || '—')}</h1>
  <p>${escapeHtml(resume?.title || '')}</p>
  ${contact ? `<p class="contact">${escapeHtml(contact)}</p>` : ''}
</header>
<main>
  ${experienceHtml}
</main>
<footer>
  <p>Generated on ${new Date().toISOString().split('T')[0]}</p>
</footer>
</body>
</html>`;
}

function escapeHtml(s) {
  return String(s || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function run() {
  const resume = readResumeData();
  if (!resume) {
    console.error('No resume data found in', DATA_PATHS.join(', '));
    process.exitCode = 2;
    return;
  }

  ensureDir(OUT_DIR);
  const html = renderHtml(resume);
  fs.writeFileSync(OUT_FILE, html, 'utf8');
  console.log('✅ Wrote', OUT_FILE);
}

if (require.main === module) run();

module.exports = { run };

