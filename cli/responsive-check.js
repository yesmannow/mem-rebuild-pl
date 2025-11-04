"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_fs_1 = __importDefault(require("node:fs"));
var node_path_1 = __importDefault(require("node:path"));
var puppeteer_1 = __importDefault(require("puppeteer"));
var args = process.argv.slice(2);
var urlArg = args[args.indexOf("--url") + 1] || "https://www.bearcavemarketing.com";
var outputArg = args[args.indexOf("--output") + 1] || "reports/responsive.json";
var viewports = [
    { name: "desktop", width: 1440, height: 900 },
    { name: "tablet", width: 834, height: 1112 },
    { name: "mobile", width: 390, height: 844 }
];
var browser = await puppeteer_1.default.launch();
var page = await browser.newPage();
var results = [];
for (var _i = 0, viewports_1 = viewports; _i < viewports_1.length; _i++) {
    var vp = viewports_1[_i];
    await page.setViewport({ width: vp.width, height: vp.height });
    await page.goto(urlArg, { waitUntil: "networkidle2" });
    // Collect some basic metrics
    var metrics = await page.evaluate(function () {
        return {
            title: document.title,
            headings: Array.from(document.querySelectorAll("h1,h2,h3")).map(function (h) { var _a; return (_a = h.textContent) === null || _a === void 0 ? void 0 : _a.trim(); }),
            buttons: Array.from(document.querySelectorAll("button,a")).map(function (b) {
                var _a;
                return ({
                    text: (_a = b.textContent) === null || _a === void 0 ? void 0 : _a.trim(),
                    visible: b.offsetParent !== null
                });
            }),
            images: Array.from(document.querySelectorAll("img")).map(function (img) { return ({
                src: img.getAttribute("src"),
                alt: img.getAttribute("alt")
            }); })
        };
    });
    // Simple heuristics for UX issues
    var issues = [];
    if (metrics.headings.length === 0)
        issues.push("No headings found — may harm accessibility.");
    if (metrics.buttons.filter(function (b) { return b.visible; }).length < 1)
        issues.push("No visible CTAs at this breakpoint.");
    if (metrics.images.some(function (img) { return !img.alt; }))
        issues.push("Some images missing alt text.");
    results.push({
        viewport: vp.name,
        width: vp.width,
        height: vp.height,
        metrics: metrics,
        issues: issues
    });
}
await browser.close();
node_fs_1.default.mkdirSync(node_path_1.default.dirname(outputArg), { recursive: true });
node_fs_1.default.writeFileSync(outputArg, JSON.stringify(results, null, 2));
console.log("\uD83D\uDCCA Responsive report written to ".concat(outputArg));
