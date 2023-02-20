import type { Event as EventDb } from "dbschema/interfaces";

export type CreateEventParams = Omit<EventDb, "user" | "id">;

// export type Event = Omit<EventDb, "user">;
export type Event = {
  id: string;
  name: string;
  draft?: boolean | null;
  endDate?: Date | null;
  onSale?: boolean | null;
  published?: boolean | null;
  startDate: Date;
  thumbnail?: string | null;
  description?: string | null;
  createdAt?: Date | null;
  inventory?: number | null;
  registration?: boolean | null;
};
