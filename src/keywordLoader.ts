import fs from "node:fs/promises";
import { load } from "js-yaml";

export type KeywordMap = Record<string, string>;

export async function loadKeywords(path?: string): Promise<KeywordMap | undefined> {
  if (!path) return;
  const raw = await fs.readFile(path, "utf8");
  const parsed = load(raw);

  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error("Keyword file must map word → category");
  }
  return parsed as KeywordMap;
}
