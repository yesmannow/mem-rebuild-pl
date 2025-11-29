import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';

const templatePath = new URL('./resume-template/resume-template.html', import.meta.url);
const outputPath = path.resolve('public/resume/resume-jd-draft.pdf');

async function buildResumePdf() {
  const html = await fs.promises.readFile(templatePath, 'utf-8');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
    await page.pdf({
      path: outputPath,
      format: 'letter',
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: '0in', right: '0in', bottom: '0in', left: '0in' },
    });
    console.log(`Generated PDF: ${outputPath}`);
  } finally {
    await browser.close();
  }
}

buildResumePdf().catch((error) => {
  console.error('Failed to generate resume PDF:', error);
  process.exitCode = 1;
});
