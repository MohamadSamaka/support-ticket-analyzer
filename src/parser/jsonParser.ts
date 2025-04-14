import { RawTicket } from "../types";
import fs from 'node:fs/promises';

export async function parseJson(path: string): Promise<RawTicket[]> {
  const raw = JSON.parse(await fs.readFile(path, "utf8"));

  let tickets: any[] = [];

  if (Array.isArray(raw)) tickets = raw;
  if (Array.isArray(raw.tickets)) tickets = raw.tickets;
  if (Array.isArray(raw.dashboardTickets)) tickets = raw.dashboardTickets;

  if (!tickets.length) throw new Error("JSON does not contain tickets array");

  return tickets.map((t) => ({
    ticketId: t.id ?? t.ticketId ?? "(missing)",
    subject: t.title ?? t.subject ?? "",
    description: t.description ?? "",
    status: t.status ?? "",
    created_at: t.created ?? t.created_at ?? "",
  }));
}