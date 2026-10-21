/**
 * Pure greeting helpers — the unit under test in CI.
 */

const FALLBACK_NAME = "world";

/**
 * Sanitize a user-provided name and clamp its length.
 * Returns "world" when nothing usable is left.
 */
export function normalizeName(raw) {
  if (typeof raw !== "string") return FALLBACK_NAME;
  const cleaned = raw
    .replace(/[<>]/g, "") // strip angle brackets (no HTML injection)
    .trim()
    .slice(0, 40);
  return cleaned.length > 0 ? cleaned : FALLBACK_NAME;
}

/**
 * Build the greeting message returned by /api/v1/greet.
 */
export function buildGreeting(rawName) {
  const name = normalizeName(rawName);
  return `Hello, ${name}! Welcome to the Actions Lab. 🚀`;
}
