import http from "http";
import { startServer, stopServer } from "../../mcp/server.js";

function getText(port, p) {
  return new Promise((resolve, reject) => {
    const req = http.request({ hostname: "127.0.0.1", port, path: p, method: "GET" }, res => {
      let data = "";
      res.setEncoding("utf8");
      res.on("data", c => (data += c));
      res.on("end", () => resolve({ status: res.statusCode, body: data, headers: res.headers }));
    });
    req.on("error", reject);
    req.end();
  });
}

describe("integration /health, /ls, /read, /api/monitoring/stats", () => {
  let server;
  let port;

  beforeAll(async () => {
    server = startServer(0);
    await new Promise(res => server.once("listening", res));
    port = server.address().port;
  });

  afterAll(async () => {
    await stopServer();
  });

  test("/health returns ok", async () => {
    const res = await getText(port, "/health");
    expect(res.status).toBe(200);
    const json = JSON.parse(res.body);
    expect(json.ok).toBe(true);
    expect(json.status).toBe("ok");
  });

  test("/ls lists root", async () => {
    const res = await getText(port, "/ls?path=.");
    expect(res.status).toBe(200);
    const arr = JSON.parse(res.body);
    expect(Array.isArray(arr)).toBe(true);
  });

  test("/read README.md is OK or 400 if not found", async () => {
    const res = await getText(port, "/read?path=README.md");
    expect([200, 400]).toContain(res.status);
  });

  test("/api/monitoring/stats returns expected keys", async () => {
    const res = await getText(port, "/api/monitoring/stats");
    expect(res.status).toBe(200);
    const stats = JSON.parse(res.body);
    expect(stats).toHaveProperty("totalChecks");
    expect(stats).toHaveProperty("consecutiveFailures");
    expect(stats).toHaveProperty("avgResponseMs");
  });
});


