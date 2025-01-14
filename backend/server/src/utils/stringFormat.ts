export function checkWhitespaceAndNewlines(value: string, maxLength: number) {
  const trimValue = value.trim().replace(/^\n+|\n+$/g, "");

  if (trimValue.length === 0) {
    return false;
  }
  if (trimValue.length > maxLength) {
    return false;
  }
  return value.length === trimValue.length;
}
