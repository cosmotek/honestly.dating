/**
 * Best-effort approximate location (city / region / country) from the visitor's
 * IP, looked up client-side at submit time. A static site has no request headers
 * to read, so we ask a free IP-geolocation service instead. This is coarse
 * (city-level), needs no permission prompt, and never blocks the form: any
 * failure, block (ad-blockers), or timeout resolves to empty strings.
 *
 * The result is memoized so repeated submits only look it up once.
 */

/** @typedef {{ city: string, region: string, country: string, ip: string }} ApproxLocation */

const EMPTY = /** @type {ApproxLocation} */ ({ city: '', region: '', country: '', ip: '' });

/** @type {Promise<ApproxLocation> | undefined} */
let cached;

/** @param {string} url @param {number} ms */
async function getJson(url, ms) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) throw new Error(`geo ${res.status}`);
    return await res.json();
  } finally {
    clearTimeout(timer);
  }
}

/** @param {unknown} v */
const str = (v) => (typeof v === 'string' ? v.trim() : '');

/** @returns {Promise<ApproxLocation>} */
async function lookup() {
  // Try providers in order; first success wins. Both are free, HTTPS, CORS, keyless.
  const providers = [
    async () => {
      const d = await getJson('https://get.geojs.io/v1/ip/geo.json', 4000);
      return { city: str(d.city), region: str(d.region), country: str(d.country), ip: str(d.ip) };
    },
    async () => {
      const d = await getJson('https://ipwho.is/', 4000);
      if (d && d.success === false) throw new Error('ipwho failed');
      return { city: str(d.city), region: str(d.region), country: str(d.country), ip: str(d.ip) };
    }
  ];
  for (const provider of providers) {
    try {
      const loc = await provider();
      if (loc.city || loc.region || loc.country || loc.ip) return loc;
    } catch {
      // try the next provider
    }
  }
  return EMPTY;
}

/** @returns {Promise<ApproxLocation>} */
export function getApproxLocation() {
  if (!cached) cached = lookup().catch(() => EMPTY);
  return cached;
}
