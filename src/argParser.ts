import { Command } from "commander";

export interface CliFlags {
  file: string;
  since?: string;
  keywords?: string;
  output?: string;
}

export function parseArgs(): CliFlags {
  return new Command()
    .name("sta")
    .description("Support‑Ticket Analyzer")
    .requiredOption("-f, --file <path>", "Tickets JSON/CSV file")
    .option("-s, --since <date>", "Only tickets before YYYY‑MM‑DD")
    .option("-k, --keywords <file>", "Custom keywords JSON/YAML")
    .option("-o, --output <file>", "Export results to JSON")
    .parse()
    .opts<CliFlags>();
}
