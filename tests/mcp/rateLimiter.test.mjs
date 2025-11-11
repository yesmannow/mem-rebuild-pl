import http from "http";
import { startServer, stopServer } from "../../mcp/server.js";

function get(port, p) {
  return new Promise((resolve, reject) => {
    const req = http.request({ hostname: "127.0.0.1", port, path: p, method: "GET" }, res => {
      resolve(res.statusCode);
    });
    req.on("error", reject);
    req.end();
  });
}

describe("rate limiter", () => {
  let server;
  let port;

  beforeAll(async () => {
    process.env.MCP_RATE_LIMIT_WINDOW_MS = "1000";
    process.env.MCP_RATE_LIMIT_MAX = "1";
    process.env.MCP_RATE_LIMIT_KEY = "test-key";
    server = startServer(0);
    await new Promise(res => server.once("listening", res));
    port = server.address().port;
  });

  afterAll(async () => {
    delete process.env.MCP_RATE_LIMIT_WINDOW_MS;
    delete process.env.MCP_RATE_LIMIT_MAX;
    delete process.env.MCP_RATE_LIMIT_KEY;
    await stopServer();
  });

  test("second request within window is 429", async () => {
    const first = await get(port, "/health");
    expect(first).toBe(200);
    const second = await get(port, "/health");
    expect(second).toBe(429);
  });
});


