export function trimWhitespaceAndNewlines(value: string): string {
  // Step 1: Trim leading and trailing white spaces and newlines
  const trimmedValue = value.trim().replace(/^\n+|\n+$/g, "");
  // Step 2: Remove trailing white spaces from each line
  const lines = trimmedValue.split("\n").map((line) => line.replace(/\s+$/, ""));
  // Step 3: Join the lines back together
  return lines.join("\n");
}
