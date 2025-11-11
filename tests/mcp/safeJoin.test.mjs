import path from "path";
import { fileURLToPath } from "url";
import { safeJoin } from "../../mcp/server.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..", "..");

describe("safeJoin", () => {
  test("resolves inside allowed path (tmp)", () => {
    const p = safeJoin(repoRoot, "tmp");
    expect(p.startsWith(path.join(repoRoot, "tmp"))).toBe(true);
  });

  test("rejects traversal", () => {
    expect(() => safeJoin(repoRoot, "../..")).toThrow();
  });
});


