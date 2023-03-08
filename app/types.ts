import type { Event as EventDb } from "dbschema/interfaces";
import type { Venue as VenueDb } from "../dbschema/interfaces";

// export type CreateEventParams = Omit<EventDb, "user" | "id">;

// export type Event = Omit<EventDb, "user">;

export type Venue = Omit<VenueDb, "user">;
export type Event = Omit<EventDb, "user">;

export type VenueWithoutId = Omit<Venue, "id">;

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// export type Event = {
//   venue?: Venue;
//   id: string;
//   name: string;
//   draft?: boolean | null;
//   endDate?: Date | null;
//   onSale?: boolean | null;
//   published?: boolean | null;
//   startDate: Date;
//   thumbnail?: string | null;
//   description?: string | null;
//   createdAt?: Date | null;
//   inventory?: number | null;
//   registration?: boolean | null;
// };
