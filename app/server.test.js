import { test } from "node:test";
import assert from "node:assert/strict";
import { createServer } from "./server.js";

async function withServer(fn) {
  const server = createServer();
  await new Promise((resolve) => server.listen(0, resolve));
  const { port } = server.address();
  try {
    return await fn(`http://localhost:${port}`);
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
}

test("GET /health returns ok", async () => {
  await withServer(async (base) => {
    const res = await fetch(`${base}/health`);
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.status, "ok");
  });
});

test("GET /api/v1/greet greets by name", async () => {
  await withServer(async (base) => {
    const res = await fetch(`${base}/api/v1/greet?name=Linus`);
    const body = await res.json();
    assert.match(body.message, /Hello, Linus!/);
  });
});

test("GET /api/v1/greet is safe against injected names", async () => {
  await withServer(async (base) => {
    const res = await fetch(`${base}/api/v1/greet?name=${encodeURIComponent("<b>x</b>")}`);
    const body = await res.json();
    assert.ok(!body.message.includes("<"), "no raw HTML in response");
  });
});

test("unknown routes return 404 and POST returns 405", async () => {
  await withServer(async (base) => {
    assert.equal((await fetch(`${base}/nope`)).status, 404);
    assert.equal(
      (await fetch(`${base}/health`, { method: "POST" })).status,
      405
    );
  });
});
