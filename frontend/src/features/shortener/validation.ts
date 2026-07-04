export const SHORT_CODE_PATTERN = /^[A-Za-z0-9_-]{4,32}$/;

export function validateShortCode(code: string) {
  const normalizedCode = code.trim();
  if (!normalizedCode) {
    return 'Enter a short code to look up.';
  }
  if (!SHORT_CODE_PATTERN.test(normalizedCode)) {
    return 'Enter a valid short code with 4-32 letters, numbers, hyphens, or underscores.';
  }
  return null;
}
