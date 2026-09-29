/** KZ/RU phone mask "+7 (___) ___-__-__" (CODEX_TASKS P1-2). */

/**
 * Strips a country-code digit only when there are 11+ digits total (i.e. the
 * input clearly includes it, e.g. pasted "87051234567" or "+77051234567").
 * A bare 10-digit KZ mobile number already starts with 7 on its own
 * (7XX...), so stripping unconditionally would eat the first digit of the
 * real number.
 */
function localDigits(raw: string): string {
  let digits = raw.replace(/\D/g, "");
  if (digits.length >= 11 && (digits.startsWith("7") || digits.startsWith("8"))) {
    digits = digits.slice(1);
  }
  return digits.slice(0, 10);
}

export function formatPhoneMask(raw: string): string {
  const digits = localDigits(raw);
  if (digits.length === 0) return "";

  let out = `+7 (${digits.slice(0, 3)}`;
  if (digits.length >= 3) out += ")";
  if (digits.length > 3) out += ` ${digits.slice(3, 6)}`;
  if (digits.length > 6) out += `-${digits.slice(6, 8)}`;
  if (digits.length > 8) out += `-${digits.slice(8, 10)}`;
  return out;
}

/** True once exactly 10 digits (the number after +7) have been entered. */
export function isPhoneComplete(raw: string): boolean {
  return localDigits(raw).length === 10;
}
