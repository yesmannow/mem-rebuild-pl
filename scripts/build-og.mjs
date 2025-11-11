import { createCanvas, loadImage, registerFont } from "canvas";
import { promises as fs } from "fs";
import path from "path";

const W = 1200;
const H = 630;

async function make(title: string, out: string = "public/images/og-generic.png") {
  const c = createCanvas(W, H);
  const ctx = c.getContext("2d");

  // Background gradient
  const grd = ctx.createLinearGradient(0, 0, W, H);
  grd.addColorStop(0, "#121317");
  grd.addColorStop(1, "#0a0b0c");
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, W, H);

  // Glow effects
  ctx.fillStyle = "rgba(73,195,178,.25)";
  ctx.beginPath();
  ctx.arc(300, 260, 260, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "rgba(240,138,69,.20)";
  ctx.beginPath();
  ctx.arc(800, 420, 280, 0, Math.PI * 2);
  ctx.fill();

  // Logo
  try {
    const logoPath = path.join(process.cwd(), "public/images/logos/header-logo.png");
    const logo = await loadImage(logoPath);
    ctx.drawImage(logo, 60, 140, 180, 180);
  } catch (e) {
    console.warn("Logo not found, skipping");
  }

  // Title
  ctx.fillStyle = "#fff";
  ctx.font = "700 60px Inter, system-ui, sans-serif";
  wrap(ctx, title, 320, 300, 800, 68);

  // Ensure directory exists
  await fs.mkdir(path.dirname(out), { recursive: true });
  await fs.writeFile(out, c.toBuffer("image/png"));
}

function wrap(
  ctx: any,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
) {
  const words = text.split(" ");
  let line = "";
  let currentY = y;

  for (const word of words) {
    const test = line ? line + " " + word : word;
    const metrics = ctx.measureText(test);
    if (metrics.width > maxWidth && line) {
      ctx.fillText(line, x, currentY);
      currentY += lineHeight;
      line = word;
    } else {
      line = test;
    }
  }
  if (line) {
    ctx.fillText(line, x, currentY);
  }
}

const title = process.argv.slice(2).join(" ") || "BearCave — Case Study";

make(title)
  .then(() => {
    console.log("✅ OG image created:", title);
  })
  .catch((err) => {
    console.error("❌ Error creating OG image:", err);
    process.exit(1);
  });

