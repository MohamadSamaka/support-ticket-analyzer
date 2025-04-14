import { parseJson } from "./parser/jsonParser";
import { parseCsv } from "./parser/csvParser";
import { safeParse } from "./dateUtils";
import { categorise, KeywordMap } from "./categorizer";
import { RawTicket, NormalizedTicket } from "./types";

export interface Summary {
  categoryCounts: Record<string, number>;
  invalid: number;
}

export async function analyse(
  path: string,
  since: Date | null,
  keywords?: KeywordMap
) {
  const ext = path.split(".").pop()?.toLowerCase();
  let raw: RawTicket[];
  if (ext === "csv") raw = await parseCsv(path);
  else raw = await parseJson(path);
  const summary: Summary = { categoryCounts: {}, invalid: 0 };
  const older: NormalizedTicket[] = [];

  for (const t of raw) {
    const createdAt = safeParse(t.created_at);
    if (!createdAt) summary.invalid++;

    const category = categorise(t, keywords);
    summary.categoryCounts[category] = (summary.categoryCounts[category] ?? 0) + 1;

    if (since && createdAt && createdAt < since) {
      older.push({
        id: t.ticketId ?? "(missing)",
        subject: t.subject ?? "",
        description: t.description ?? "",
        status: t.status ?? "",
        createdAt
      });
    }
  }

  return { summary, older };
}
