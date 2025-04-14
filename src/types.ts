export interface RawTicket {
  ticketId?: string;
  subject?: string;
  description?: string;
  status?: string;
  created_at?: string;
  [key: string]: unknown;
}

export interface NormalizedTicket {
  id: string;
  subject: string;
  description: string;
  status: string;
  createdAt: Date | null; // null ⇒ invalid date
}

export type Category = string;
