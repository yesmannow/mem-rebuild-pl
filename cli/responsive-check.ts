import fs from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer";

const args = process.argv.slice(2);
const urlArg = args[args.indexOf("--url") + 1] || "https://www.bearcavemarketing.com";
const outputArg = args[args.indexOf("--output") + 1] || "reports/responsive.json";

const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet", width: 834, height: 1112 },
  { name: "mobile", width: 390, height: 844 }
];

const browser = await puppeteer.launch();
const page = await browser.newPage();

const results: any[] = [];

for (const vp of viewports) {
  await page.setViewport({ width: vp.width, height: vp.height });
  await page.goto(urlArg, { waitUntil: "networkidle2" });

  // Collect some basic metrics
  const metrics = await page.evaluate(() => {
    return {
      title: document.title,
      headings: Array.from(document.querySelectorAll("h1,h2,h3")).map(h => h.textContent?.trim()),
      buttons: Array.from(document.querySelectorAll("button,a")).map(b => ({
        text: b.textContent?.trim(),
        visible: (b as HTMLElement).offsetParent !== null
      })),
      images: Array.from(document.querySelectorAll("img")).map(img => ({
        src: img.getAttribute("src"),
        alt: img.getAttribute("alt")
      }))
    };
  });

  // Simple heuristics for UX issues
  const issues: string[] = [];
  if (metrics.headings.length === 0) issues.push("No headings found — may harm accessibility.");
  if (metrics.buttons.filter(b => b.visible).length < 1) issues.push("No visible CTAs at this breakpoint.");
  if (metrics.images.some(img => !img.alt)) issues.push("Some images missing alt text.");

  results.push({
    viewport: vp.name,
    width: vp.width,
    height: vp.height,
    metrics,
    issues
  });
}

await browser.close();

fs.mkdirSync(path.dirname(outputArg), { recursive: true });
fs.writeFileSync(outputArg, JSON.stringify(results, null, 2));

console.log(`📊 Responsive report written to ${outputArg}`);