import { RawTicket } from "../types.js";
import fs from "node:fs";
import { parse } from "csv-parse";

export async function parseCsv(path: string): Promise<RawTicket[]> {
  return new Promise((res, rej) => {
    const records: RawTicket[] = [];
    fs.createReadStream(path)
      .pipe(parse({ columns: true, skip_empty_lines: true }))
      .on("data", (r) =>
        records.push({
          ticketId: r.ticketId ?? r.id ?? "(missing)",
          subject: r.subject ?? r.title ?? "",
          description: r.description ?? "",
          status: r.status ?? "",
          created_at: r.created_at ?? r.created ?? "",
        })
      )
      .on("end", () => res(records))
      .on("error", rej);
  });
}
