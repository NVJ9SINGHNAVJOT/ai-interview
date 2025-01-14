export function trimWhitespaceAndNewlines(value: string) {
  return value.trim().replace(/^\n+|\n+$/g, "");
}
