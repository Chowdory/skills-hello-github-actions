import { test } from "node:test";
import assert from "node:assert/strict";
import { normalizeName, buildGreeting } from "./greeting.js";

test("normalizeName handles the happy path", () => {
  assert.equal(normalizeName("Ada"), "Ada");
  assert.equal(normalizeName("  Grace Hopper "), "Grace Hopper");
});

test("normalizeName falls back to 'world' for junk input", () => {
  assert.equal(normalizeName(""), "world");
  assert.equal(normalizeName("   "), "world");
  assert.equal(normalizeName(undefined), "world");
  assert.equal(normalizeName(42), "world");
});

test("normalizeName strips angle brackets and clamps length", () => {
  assert.equal(normalizeName("<script>alert(1)</script>"), "scriptalert(1)/script");
  assert.equal(normalizeName("x".repeat(100)).length, 40);
});

test("buildGreeting renders a friendly message", () => {
  assert.match(buildGreeting("Ada"), /^Hello, Ada!/);
  assert.match(buildGreeting(null), /Hello, world!/);
});
