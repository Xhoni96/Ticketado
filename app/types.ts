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

export interface TicketTypes {
  allowedTTEdit: boolean;
  data: Array<{
    id?: number;
    label: string;
    event_id: string;
    price: string;
    vendor_id: string;
    quantity: null | number;
    min_limit_per_order: null | number;
    max_limit_per_order: null | number;
    start_date: null | string;
    end_date: null | string;
    time_zone: string;
    available: null | number;
  }>;
}

export type BestAvailableData = {
  token: string;
  expires: number;
  section_type: "ga" | "reserved";
  tickets: BestAvailableTicketsType;
};

type BestAvailableTicketsType = Array<{
  area_id: null | string;
  id?: number;
  section_id?: string;
  price: string;
  quantity: number;
  reservation_id: number;
  row_label: string;
  seat_id: number;
  seat_label: string;
  section_name: string;
  ticket_type_name: string;
  ticket_type_vendor_id: string;
}>;
