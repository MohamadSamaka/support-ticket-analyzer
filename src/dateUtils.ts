import { parse, parseISO, isValid } from "date-fns";

const DATE_PATTERNS = [
  "yyyy/MM/dd HH:mm:ss",
  "MMMM d, yyyy HH:mm",
  "yyyy-MM-dd"
];

export function safeParse(dateStr: string | undefined): Date | null {
  if (!dateStr) return null;
  // Try ISO first
  let d = parseISO(dateStr);
  if (isValid(d)) return d;
  // Try custom patterns
  for (const fmt of DATE_PATTERNS) {
    d = parse(dateStr, fmt, new Date());
    if (isValid(d)) return d;
  }
  return null;
}