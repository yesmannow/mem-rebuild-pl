"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_fs_1 = __importDefault(require("node:fs"));
var puppeteer_1 = __importDefault(require("puppeteer"));
var _a = process.argv.slice(2), htmlPath = _a[0], pdfPath = _a[1];
if (!htmlPath || !pdfPath) {
    console.error('Usage: ts-node cli/export-resume-pdf.ts <input.html> <output.pdf>');
    process.exit(1);
}
var html = node_fs_1.default.readFileSync(htmlPath, 'utf-8');
var browser = await puppeteer_1.default.launch();
var page = await browser.newPage();
await page.setContent(html, { waitUntil: 'networkidle0' });
await page.pdf({
    path: pdfPath,
    format: 'A4',
    margin: { top: '20mm', right: '15mm', bottom: '20mm', left: '15mm' },
    printBackground: true
});
await browser.close();
console.log("\uD83D\uDDA8\uFE0F PDF exported \u2192 ".concat(pdfPath));
