/**
 * Shared helpers for NEXT_PUBLIC_STRAPI_URL (Vercel often has bare hostnames without https://).
 * @param {string | undefined} raw
 * @returns {string | undefined}
 */
function normalizePublicStrapiUrl(raw) {
  if (raw === undefined || raw === null) return undefined;
  if (typeof raw !== "string") return undefined;
  const t = raw.trim();
  if (!t) return undefined;
  if (/^https?:\/\//i.test(t)) return t;
  if (t.startsWith("//")) return `https:${t}`;
  if (/^localhost\b/i.test(t) || /^127\.\d+\.\d+\.\d+/.test(t)) {
    return `http://${t}`;
  }
  return `https://${t}`;
}

/** @param {string | undefined} raw */
function isValidPublicStrapiUrl(raw) {
  const n = normalizePublicStrapiUrl(raw);
  if (!n) return false;
  try {
    const u = new URL(n);
    if (u.protocol !== "http:" && u.protocol !== "https:") return false;
    return !!u.hostname;
  } catch {
    return false;
  }
}

module.exports = { normalizePublicStrapiUrl, isValidPublicStrapiUrl };
