import { getApproxLocation } from './location.js';

/**
 * Submit a validated waitlist contact.
 *
 * If VITE_WAITLIST_ENDPOINT is set at build time, POSTs to it. It targets a
 * SheetDB sheet (https://sheetdb.io), so the body uses SheetDB's `{ data: {...} }`
 * shape and each submission becomes a row. The sheet's first row must hold the
 * column headers: `date`, `kind`, `contact`, `source`, `city`, `region`,
 * `country`, `ip`, `useragent`.
 *
 * City/region/country/ip are a best-effort approximate IP lookup (see
 * location.js) and may be blank; they never block or fail the submission.
 *
 * With no endpoint set, runs in "stub" mode: validates only and resolves success
 * without sending anywhere, so the site works end-to-end with no backend.
 *
 * @param {{ kind: 'email' | 'phone', value: string }} contact
 * @param {string} [source]  Which form this came from (e.g. "marketing-waitlist", "volunteer").
 * @returns {Promise<{ ok: boolean, stub: boolean, error?: string }>}
 */
export async function submitWaitlist(contact, source = 'marketing-waitlist') {
  const endpoint = import.meta.env.VITE_WAITLIST_ENDPOINT?.trim();

  if (!endpoint) {
    // Stub mode: pretend success so the flow is testable pre-launch.
    await new Promise((r) => setTimeout(r, 450));
    return { ok: true, stub: true };
  }

  const location = await getApproxLocation();

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'content-type': 'application/json', accept: 'application/json' },
      body: JSON.stringify({
        data: {
          date: new Date().toISOString(),
          kind: contact.kind,
          contact: contact.value,
          source,
          city: location.city,
          region: location.region,
          country: location.country,
          ip: location.ip,
          useragent: typeof navigator !== 'undefined' ? navigator.userAgent : ''
        }
      })
    });
    if (!res.ok) {
      return { ok: false, stub: false, error: 'Something went wrong. Please try again.' };
    }
    return { ok: true, stub: false };
  } catch {
    return { ok: false, stub: false, error: 'Network error. Please check your connection and try again.' };
  }
}
