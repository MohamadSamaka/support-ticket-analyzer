# Support‑Ticket Analyzer 🛠️

A lightweight **TypeScript CLI** that ingests a JSON or CSV file of support tickets, auto‑classifies them by keyword, and prints a clear summary—plus any tickets created *before* a date you choose.

*Built in a “keep‑it‑simple, ship‑fast” spirit for the Quack.ai home assignment.*

---

## ✨  Features

| Capability             | Detail                                                                                                   |
| ---------------------- | --------------------------------------------------------------------------------------------------------- |
| **File formats**       | `tickets.json`, `tickets.csv` (header row required)                                                      |
| **Date handling**      | ISO (`2025‑03‑25T10:30:00Z`), `YYYY/MM/DD HH:mm:ss`, or free text like `“March 23, 2025 09:30”`          |
| **Keyword categories** | Built‑in list (`login`, `payment`, `bug`, `performance`, …) **or** a custom JSON/YAML map via `--keywords` |
| **Filtering**          | `--since YYYY‑MM‑DD` lists tickets older than that date                                                  |
| **Output**             | Pretty console tables (via `console.table`) and optional JSON export with `-o/--output`                  |
| **Zero‑config run**    | Works straight from TypeScript (`npm run dev …`) *or* compiled (`npm run build …`)                       |

---

## 🏁  Quick start

```bash
git clone https://github.com/MohamadSamaka/support-ticket-analyzer
cd support-ticket-analyzer
npm install          # installs ts‑node + deps
npm run dev -- -f sample/tickets.json -s 2025-03-23
```

Output:

```
Category Summary:
┌───────────────┬────────┐
│ (index)       │ Values │
├───────────────┼────────┤
│ login         │ 1      │
│ payment       │ 1      │
│ feature-request│ 1     │
└───────────────┴────────┘
Invalid / missing date rows: 0

Tickets before 2025-03-23:
┌─────────┬─────────────────────┬────────────┐
│ (index) │ subject             │ created    │
├─────────┼─────────────────────┼────────────┤
│    0    │ Payment failure     │ 2025-03-21 │
└─────────┴─────────────────────┴────────────┘
```

---

## 🧪 Example ticket file (JSON)

```json
{
  "tickets": [
    {
      "ticketId": "T1",
      "subject": "Login issue",
      "description": "User cannot login due to password error",
      "status": "open",
      "created_at": "2025-03-25T10:30:00Z"
    },
    {
      "ticketId": "T2",
      "subject": "Payment failure",
      "description": "Card was declined",
      "status": "closed",
      "created_at": "2025-03-21"
    },
    {
      "ticketId": "T3",
      "subject": "Feature request: Dark mode",
      "description": "Add dark theme to UI",
      "status": "open",
      "created_at": "2025-03-26T07:45:00Z"
    }
  ]
}
```

Run it:

```bash
npm run dev -- --file sample/tickets.json --since 2025-03-23
```

---

## 🚀  One‑line global CLI (optional)

```bash
npm run build               # compile to dist/
npm link                    # now “sta” is on your PATH
sta -f sample/tickets.csv -s 2025-03-23 -o report.json
```

(“sta” = **S**upport **T**icket **A**nalyzer. Change in `package.json → bin` if you prefer another name.)

---

## 📂  Project layout

```
src/
├─ cli.ts            entry point (argument parsing & orchestration)
├─ argParser.ts      commander setup
├─ keywordLoader.ts  loads custom keyword map
├─ printer.ts        console output + JSON export
├─ index.ts          core analyse() logic
├─ parser/           csvParser.ts & jsonParser.ts (with field normalisation)
├─ categorizer.ts    keyword → category mapping
├─ dateUtils.ts      safeParse() for messy dates
└─ types.ts          RawTicket / NormalizedTicket types

sample/
├─ tickets.json       example file for JSON-based run
├─ tickets.csv        example CSV file for testing comma handling
└─ keywords.yml       optional custom category mapping
```

---

## 🔧  Scripts

| Script                | What it does                                  |
|-----------------------|-----------------------------------------------|
| `npm run dev …`       | Run directly from `.ts` files (ts‑node)       |
| `npm run build`       | Compile TypeScript → `dist/`                  |
| `npm run sta …`       | Alias for `ts-node src/cli.ts` (see package.json) |

---

## 📝  Custom keyword file

`keywords.yml` (YAML **or** JSON)

```yaml
downtime: infra
glitch: bug
slow: performance
login: auth
```

Run with:

```bash
sta -f sample/tickets.json -k sample/keywords.yml
```

---

## 📑  CSV gotcha

If a field contains a comma, wrap it in quotes:

```csv
id,title,created
DT4,Data Sync Issue,"March 23, 2025 09:30"
```

Otherwise the CSV parser thinks the row has too many columns.

---

## 🙌  Contributing

PRs are welcome for:

* Extra date patterns
* Better keyword defaults
* Performance tweaks on huge CSVs

---

## 📄  License

ISC — free to use, tweak, and ship.