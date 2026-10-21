import http from "node:http";
import { buildGreeting } from "./greeting.js";

/**
 * Create the demo HTTP server. Exported for tests; `npm start` runs it.
 */
export function createServer() {
  return http.createServer(async (req, res) => {
    const url = new URL(req.url, `http://${req.headers.host ?? "localhost"}`);

    const send = (status, body) => {
      res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
      res.end(JSON.stringify(body));
    };

    if (req.method !== "GET") {
      return send(405, { error: "method not allowed" });
    }

    if (url.pathname === "/health") {
      return send(200, {
        status: "ok",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
      });
    }

    if (url.pathname === "/api/v1/greet") {
      return send(200, {
        message: buildGreeting(url.searchParams.get("name")),
        timestamp: new Date().toISOString(),
      });
    }

    return send(404, { error: "not found" });
  });
}

// Start the server when run directly (`npm start`).
if (import.meta.url === `file://${process.argv[1]}`) {
  const port = Number(process.env.PORT ?? 3000);
  createServer().listen(port, () => {
    console.log(`Actions Lab demo API listening on http://localhost:${port}`);
  });
}
