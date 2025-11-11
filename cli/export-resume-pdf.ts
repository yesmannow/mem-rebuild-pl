import fs from 'node:fs';
import puppeteer from 'puppeteer';

const [htmlPath, pdfPath] = process.argv.slice(2);
if (!htmlPath || !pdfPath) {
  console.error('Usage: ts-node cli/export-resume-pdf.ts <input.html> <output.pdf>');
  process.exit(1);
}

const html = fs.readFileSync(htmlPath, 'utf-8');
const browser = await puppeteer.launch();
const page = await browser.newPage();

await page.setContent(html, { waitUntil: 'networkidle0' });
await page.pdf({
  path: pdfPath,
  format: 'A4',
  margin: { top: '20mm', right: '15mm', bottom: '20mm', left: '15mm' },
  printBackground: true
});

await browser.close();
console.log(`🖨️ PDF exported → ${pdfPath}`);