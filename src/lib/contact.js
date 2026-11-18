/**
 * Validation for the waitlist's single contact field, which accepts EITHER an
 * email address OR a phone number (not both, and not two separate fields).
 * We detect which the user meant, validate it, and normalize it for sending.
 */

/** @typedef {'email' | 'phone'} ContactKind */
/**
 * Discriminated on `ok` so a successful result always carries `kind`+`value`
 * and a failure always carries `error`.
 * @typedef {{ ok: true, kind: ContactKind, value: string }} ContactOk
 * @typedef {{ ok: false, error: string }} ContactErr
 * @typedef {ContactOk | ContactErr} ContactResult
 */

// Pragmatic email check: something@something.tld, no spaces. Not RFC-complete
// on purpose; the real gate is the confirmation step after launch.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Decide whether the raw input looks more like an email or a phone number.
 * Anything containing a letter or "@" is treated as an email attempt.
 * @param {string} raw
 * @returns {ContactKind}
 */
export function detectKind(raw) {
  const value = raw.trim();
  if (value.includes('@') || /[a-zA-Z]/.test(value)) return 'email';
  return 'phone';
}

/**
 * Validate and normalize a phone number. Accepts common separators and an
 * optional leading "+". Requires 10–15 digits (E.164 range). Returns the
 * digits with a single leading "+" preserved only if the user typed one.
 * @param {string} raw
 * @returns {ContactResult}
 */
export function validatePhone(raw) {
  const value = raw.trim();
  const hasPlus = value.startsWith('+');
  const digits = value.replace(/[^\d]/g, '');
  if (digits.length < 10 || digits.length > 15) {
    return { ok: false, error: 'Please enter a valid phone number.' };
  }
  // Reject leftover junk like letters mixed into a "phone" guess.
  if (/[a-zA-Z]/.test(value)) {
    return { ok: false, error: 'Please enter a valid phone number.' };
  }
  return { ok: true, kind: 'phone', value: (hasPlus ? '+' : '') + digits };
}

/**
 * Validate and normalize an email address (lowercased, trimmed).
 * @param {string} raw
 * @returns {ContactResult}
 */
export function validateEmail(raw) {
  const value = raw.trim();
  if (!EMAIL_RE.test(value)) {
    return { ok: false, error: 'Please enter a valid email address.' };
  }
  return { ok: true, kind: 'email', value: value.toLowerCase() };
}

/**
 * Validate the single contact field: one email OR one phone number.
 * @param {string} raw
 * @returns {ContactResult}
 */
export function validateContact(raw) {
  const value = (raw ?? '').trim();
  if (!value) {
    return { ok: false, error: 'Enter your email or phone number to join.' };
  }
  return detectKind(value) === 'email' ? validateEmail(value) : validatePhone(value);
}
