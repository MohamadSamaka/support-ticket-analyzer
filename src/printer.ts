import chalk from "chalk";
import { format } from "date-fns";
import fs from "node:fs/promises";
import { Summary } from "./index";
import { NormalizedTicket } from "./types";

export async function printResults(
  summary: Summary,
  older: NormalizedTicket[],
  since: Date | null,
  output?: string
) {
  console.log(chalk.bold("\nCategory Summary:"));
  console.table(summary.categoryCounts);
  console.log(chalk.yellow(`Invalid / missing date rows: ${summary.invalid}`));

  if (since) {
    console.log(chalk.bold(`\nTickets before ${format(since, "yyyy-MM-dd")}:`));
    console.table(
      older.map((t) => ({
        id: t.id,
        subject: t.subject,
        created: format(t.createdAt!, "yyyy-MM-dd"),
      }))
    );
  }

  if (output) {
    await fs.writeFile(output, JSON.stringify({ summary, older }, null, 2));
    console.log(chalk.green(`\n✓  Exported results to ${output}`));
  }
}
