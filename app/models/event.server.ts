import { e, client } from "~/db.server";
import type { Event, VenueWithoutId } from "~/types";

export function UserQuery(id: string) {
  return e.select(e.User, () => ({
    // email: true,
    // ...e.User["*"],
    filter_single: { id },
  }));
}
// const VenueQuery = (id: string) => {
//   return e.select(e.Venue, (venue) => ({
//     // ...e.Venue["*"],
//     filter_single: { id },
//   }));
// };

export async function getEvent(params: { id: string; userId: string }) {
  const userEvents = e.select(e.Event, (event) => ({
    filter: e.op(event.user, "=", UserQuery(params.userId)),
  }));

  const event = e.select(userEvents, (event) => ({
    ...e.Event["*"],
    venue: {
      ...e.Venue["*"],
    },
    filter_single: e.op(event.id, "=", e.uuid(params.id)),
  }));

  return event.run(client);
}

export async function getEvents(params: { userId: string }) {
  const events = await e
    .select(e.Event, (event) => ({
      ...e.Event["*"],
      venue: {
        ...e.Venue["*"],
      },
      order_by: { expression: event.createdAt, direction: e.DESC },
      filter: e.op(event.user, "=", UserQuery(params.userId)),
    }))
    .run(client);

  return events;
}

export async function getEventsByName(params: { name: string; userId: string }) {
  const events = await e
    .select(e.Event, (event) => ({
      ...e.Event["*"],
      venue: {
        ...e.Venue["*"],
      },
      // order_by: { expression: event.createdAt, direction: e.DESC },
      filter: e.op(
        e.op(event.user, "=", UserQuery(params.userId)),
        "and",
        e.op(event.name, "ilike", `${params.name}%`)
      ),
    }))
    .run(client);

  return events;
}

const getVenueQuery = (venueData: VenueWithoutId | null, user: any, id: string) => {
  let venue = null;

  if (venueData) {
    id === "custom"
      ? (venue = e.insert(e.Venue, {
          ...venueData,
          user,
        }))
      : (venue = e.update(e.Venue, () => ({
          filter_single: { id },
          set: venueData,
        })));
  }
  return venue;
};

export async function createEvent(
  eventParams: Omit<Event, "id">,
  userId: string,
  venueData: VenueWithoutId | null,
  venueId: string
) {
  const user = UserQuery(userId);
  const venue = getVenueQuery(venueData, user, venueId);

  const insertEvent = e.insert(e.Event, {
    ...eventParams,
    user,
    venue,
  });

  // return await e.select(insertEvent, () => ({ ...e.Event["*"] })).run(client);
  return insertEvent.run(client);
}

export const updateEvent = async (
  userId: string,
  id: string,
  event: { [key: string]: any },
  venueData: VenueWithoutId | null,
  venueId: string
) => {
  const user = UserQuery(userId);
  const venue = getVenueQuery(venueData, user, venueId);

  const update = e.update(e.Event, () => ({
    filter_single: { id },
    set: { ...event, venue },
  }));

  return update.run(client);
};

export const updateEventProperty = async (id: string, value: { [key: string]: string | boolean | number }) => {
  const update = e.update(e.Event, () => ({
    filter_single: { id },
    set: value,
  }));

  // return update;
  // return await e.select(update, () => ({ ...e.Event["*"] })).run(client);
  return update.run(client);
};

export async function deleteEvent(params: { eventId: string; userId: string }) {
  const deleted = await e
    .delete(e.Event, (event) => ({
      filter: e.op(e.op(event.id, "=", e.uuid(params.eventId)), "and", e.op(event.user, "=", UserQuery(params.userId))),
    }))
    .run(client);
  return deleted.length;
}
