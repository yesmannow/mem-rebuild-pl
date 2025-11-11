import path from "path";
import { fileURLToPath } from "url";
import { safeJoin } from "../../mcp/server.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..", "..");

describe("safeJoin", () => {
  test("resolves inside allowed path", () => {
    const p = safeJoin(repoRoot, "src");
    expect(p.startsWith(path.join(repoRoot, "src"))).toBe(true);
  });

  test("rejects traversal", () => {
    expect(() => safeJoin(repoRoot, "../..")).toThrow();
  });
});


