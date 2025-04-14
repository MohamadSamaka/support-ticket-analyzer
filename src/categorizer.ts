import { RawTicket } from "./types.js";

// keyword to category mapping
const DEFAULT_KEYWORDS: Record<string, string> = {
  login: "login",
  password: "login",
  payment: "payment",
  checkout: "payment",
  bug: "bug",
  error: "bug",
  feature: "feature-request",
  slow: "performance",
  performance: "performance"
};

export type KeywordMap = Record<string, string>;

export function categorise(
  ticket: RawTicket,
  keywords: KeywordMap = DEFAULT_KEYWORDS
): string {
  const haystack = `${ticket.subject ?? ""} ${ticket.description ?? ""}`.toLowerCase();
  for (const [word, category] of Object.entries(keywords)) {
    if (haystack.includes(word.toLowerCase())) return category;
  }
  return "uncategorised";
}