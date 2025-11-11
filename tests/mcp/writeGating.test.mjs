import http from "http";
import { startServer, stopServer } from "../../mcp/server.js";

function postJson(port, path, body) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const req = http.request(
      { hostname: "127.0.0.1", port, path, method: "POST", headers: { "Content-Type": "application/json", "Content-Length": Buffer.byteLength(data) } },
      res => {
        let buf = "";
        res.setEncoding("utf8");
        res.on("data", chunk => (buf += chunk));
        res.on("end", () => resolve({ status: res.statusCode, body: buf }));
      }
    );
    req.on("error", reject);
    req.write(data);
    req.end();
  });
}

describe("write gating", () => {
  let server;
  let port;

  beforeAll(async () => {
    process.env.MCP_READONLY = "true";
    process.env.MCP_WRITE_ENABLED = "false";
    server = startServer(0);
    await new Promise(res => server.once("listening", res));
    port = server.address().port;
  });

  afterAll(async () => {
    delete process.env.MCP_READONLY;
    delete process.env.MCP_WRITE_ENABLED;
    await stopServer();
  });

  test("POST /write returns 403 when readOnly", async () => {
    const res = await postJson(port, "/write", { path: "tmp.txt", content: "x" });
    expect(res.status).toBe(403);
  });
});


